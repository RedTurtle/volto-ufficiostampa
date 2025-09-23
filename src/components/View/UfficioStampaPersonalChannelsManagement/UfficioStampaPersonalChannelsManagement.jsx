import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { getParentUrl } from '@plone/volto/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, FormGroup, Label } from 'design-react-kit';
import HoneypotWidget from '../HoneypotWidget/HoneypotWidget';
import {
  updatePersonalChannels,
  resetUpdatePersonalChannels,
  verifyToken,
  resetVerifyToken,
} from 'volto-ufficiostampa/actions/personal_channels_management';
import { toast } from 'react-toastify';

const messages = defineMessages({
  title: {
    id: 'personal-channels-management-title',
    defaultMessage: 'Gestione canali di iscrizione',
  },
  description: {
    id: 'personal-channels-management-description',
    defaultMessage:
      'Qusta è la lista dei canali a cui sei iscritto. Puoi deselezionare uno o più canali e salvare per aggiornare le tue preferenze.',
  },
  verifyTokenError: {
    id: 'personal-channels-management-verify-token-error',
    defaultMessage:
      'Si è verificato un errore durante la verifica del token. Il link potrebbe essere scaduto o non valido.',
  },
  sendButtonLabel: {
    id: 'personal-channels-management-send-button-label',
    defaultMessage: 'Salva',
  },
  tokenErrorDiv: {
    id: 'personal-channels-management-token-error-div',
    defaultMessage:
      'Si è verificato un errore durante la verifica del token. Il link potrebbe essere scaduto o non valido.',
  },
  updatePersonalChannelsSuccess: {
    id: 'personal-channels-management-update-personal-channels-success',
    defaultMessage: 'Le tue preferenze sono state aggiornate con successo.',
  },
  updatePersonalChannelsError: {
    id: 'personal-channels-management-update-personal-channels-error',
    defaultMessage:
      "Si è verificato un errore durante l'aggiornamento delle tue preferenze. Riprova più tardi.",
  },
});

const UfficioStampaPersonalChannelsManagement = ({ location }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const path = getParentUrl(location.pathname ?? '/');
  const params = new URLSearchParams(location.search);
  const secret = params.get('secret');
  const authenticator = params.get('_authenticator');

  let fieldHoney = process.env.RAZZLE_HONEYPOT_FIELD;
  if (__CLIENT__) {
    fieldHoney = window.env.RAZZLE_HONEYPOT_FIELD;
  }

  const [channels, setChannels] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [channelsHoney, setChannelsHoney] = useState('');

  const {
    loading: updatePersonalChannelsLoading,
    loaded: updatePersonalChannelsLoaded,
    error: updatePersonalChannelsError,
  } = useSelector((state) => state.updatePersonalChannels);

  const {
    loading: verifyTokenLoading,
    loaded: verifyTokenLoaded,
    error: verifyTokenError,
    result: verifyTokenResult,
  } = useSelector((state) => state.tokenVerifyPersonalChannels);

  useEffect(() => {
    dispatch(verifyToken({ secret }));
  }, []); // solo al mount

  // verify token success
  useEffect(() => {
    if (verifyTokenLoaded && !verifyTokenError) {
      setChannels(verifyTokenResult?.channels || []);
      setSelectedChannels(verifyTokenResult?.channels || []);
      return () => {
        dispatch(resetVerifyToken());
      };
    }
  }, [verifyTokenLoaded, verifyTokenError]);

  // verifyToken generic error
  useEffect(() => {
    if (verifyTokenError) {
      const message =
        verifyTokenError?.response?.body?.message ||
        intl.formatMessage(messages.verifyTokenError);
      toast.error(message);
      return () => {
        dispatch(resetVerifyToken());
      };
    }
  }, [verifyTokenError, intl]);

  // updatePersonalChannels success
  useEffect(() => {
    if (updatePersonalChannelsLoaded && !updatePersonalChannelsError) {
      setChannels([]);
      setSelectedChannels([]);
      toast.success(intl.formatMessage(messages.updatePersonalChannelsSuccess));
      return () => {
        dispatch(verifyToken({ secret }));
        dispatch(resetUpdatePersonalChannels());
      };
    }
  }, [
    dispatch,
    intl,
    updatePersonalChannelsLoaded,
    updatePersonalChannelsError,
  ]);

  // updatePersonalChannels generic error
  useEffect(() => {
    if (updatePersonalChannelsError) {
      const message =
        updatePersonalChannelsError?.response?.body?.message ||
        intl.formatMessage(messages.updatePersonalChannelsError);
      toast.error(message);
      return () => {
        dispatch(verifyToken({ secret }));
        dispatch(resetUpdatePersonalChannels());
      };
    }
  }, [updatePersonalChannelsError, intl]);

  const sendForm = () => {
    dispatch(
      updatePersonalChannels({
        channels: selectedChannels,
        secret,
        _authenticator: authenticator,
        [fieldHoney]: channelsHoney,
      }),
    );
  };

  let pageBody = null;

  if (verifyTokenError) {
    pageBody = <div>{intl.formatMessage(messages.tokenErrorDiv)}</div>;
  } else if (verifyTokenLoading) {
    pageBody = <div>Loading...</div>;
  } else if (updatePersonalChannelsLoaded && !updatePersonalChannelsError) {
    pageBody = (
      <div>{intl.formatMessage(messages.updatePersonalChannelsSuccess)}</div>
    );
  } else {
    pageBody = (
      <>
        <p className="description">
          {intl.formatMessage(messages.description)}
        </p>

        <Form
          action={`${path}/@personal-channels-management-update`}
          className="personal-channels-management-form"
          method="post"
          tag="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !(updatePersonalChannelsLoaded && !updatePersonalChannelsError)
            ) {
              sendForm();
            }
          }}
        >
          {channels?.map((v, index) => (
            <FormGroup check key={`channel-${index}-${v}`}>
              <Input
                id={`channel-${v}`}
                name="channels"
                type="checkbox"
                onChange={() => {
                  console.log(v);
                  setSelectedChannels(
                    (prev) =>
                      prev.includes(v)
                        ? prev.filter((item) => item !== v) // rimuovo se già presente
                        : [...prev, v], // aggiungo se non presente
                  );
                }}
                addon // Needed to avoid application of form-control class as of kit v4.0.2
                checked={selectedChannels.includes(v)}
              />
              <Label for={`channel-${v}`} check>
                {v}
              </Label>
            </FormGroup>
          ))}
          <HoneypotWidget
            updateFormData={(_, value) => {
              setChannelsHoney(value);
            }}
            field={fieldHoney}
          />

          <Button
            color="primary"
            className="btn-icon"
            type="submit"
            tag="button"
            icon={false}
          >
            <span>{intl.formatMessage(messages.sendButtonLabel)}</span>
          </Button>
        </Form>
      </>
    );
  }
  return (
    <div id="page-document" className="ui container newsletter-confirm px-4">
      <div className="mb-4">
        <div className="px-0 py-lg-2 col-lg-8">
          <h1>{intl.formatMessage(messages.title)}</h1>
        </div>
        <div>{pageBody}</div>
      </div>
    </div>
  );
};

export default UfficioStampaPersonalChannelsManagement;
