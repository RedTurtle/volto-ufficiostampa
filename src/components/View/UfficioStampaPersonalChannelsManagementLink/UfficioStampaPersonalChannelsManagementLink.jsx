import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { getParentUrl } from '@plone/volto/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'design-react-kit';
import HoneypotWidget from '../HoneypotWidget/HoneypotWidget';
import {
  sendChannelManagementLink,
  resetSendChannelManagementLink,
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
      'Se vuoi cancellarti da uno o più canali, inserisci il tuo indirizzo e-mail nell’apposito campo. Riceverai una e-mail con un link per confermare. Il link scadrà entro 24 ore..',
  },
  emailLabel: {
    id: 'personal-channels-management-email-label',
    defaultMessage: 'Indirizzo e-mail',
  },
  sendLinkSuccess: {
    id: 'personal-channels-management-send-link-success',
    defaultMessage:
      'Riceverai una e-mail con il link per gestire i tuoi canali di iscrizione.',
  },
  sendLinkError: {
    id: 'personal-channels-management-send-link-error',
    defaultMessage:
      "Si è verificato un errore durante l'invio della e-mail. Riprova più tardi.",
  },
  sendButtonLabel: {
    id: 'personal-channels-management-send-button-label',
    defaultMessage: 'Invia',
  },
});

const UfficioStampaPersonalChannelsManagementLink = ({ location }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content.data);
  const path = getParentUrl(location.pathname ?? '/');

  const [email, setEmail] = useState('');
  const [subHoney, setSubHoney] = useState('');

  const {
    loading: sendLinkLoading,
    loaded: sendLinkLoaded,
    error: sendLinkError,
  } = useSelector((state) => state.sendChannelManagementLink);

  // SendLink success
  useEffect(() => {
    if (sendLinkLoaded && !sendLinkError) {
      setEmail('');
      setSubHoney('');
      toast.success(intl.formatMessage(messages.sendLinkSuccess));
      return () => {
        dispatch(resetSendChannelManagementLink());
      };
    }
  }, [dispatch, intl, sendLinkLoaded, sendLinkError]);

  // SendLink generic error
  useEffect(() => {
    if (sendLinkError) {
      const message =
        sendLinkError?.response?.body?.message ||
        intl.formatMessage(messages.sendLinkError);
      toast.error(message);
      return () => {
        dispatch(resetSendChannelManagementLink());
      };
    }
  }, [sendLinkError, intl]);

  let fieldHoney = process.env.RAZZLE_HONEYPOT_FIELD;
  if (__CLIENT__) {
    fieldHoney = window.env.RAZZLE_HONEYPOT_FIELD;
  }

  const sendForm = () => {
    dispatch(
      sendChannelManagementLink({
        email,
        [fieldHoney]: subHoney,
      }),
    );
  };

  return (
    <div id="page-document" className="ui container newsletter-confirm px-4">
      <div className="mb-4">
        <div className="px-0 py-lg-2 col-lg-8">
          <h1>{intl.formatMessage(messages.title)}</h1>
        </div>
        <div>
          <p className="description">
            {intl.formatMessage(messages.description)}
          </p>
          <Form
            action={`${path}/@personal-channels-management-send-link`}
            className="personal-channels-management-form"
            method="post"
            tag="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!(sendLinkLoaded && !sendLinkError)) {
                sendForm();
              }
            }}
          >
            <Input
              type="email"
              id="send-link-email"
              name="send-link-email"
              placeholder="mail@example.com"
              className="mb-3"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label={intl.formatMessage(messages.emailLabel)}
            />
            <HoneypotWidget
              updateFormData={(_, value) => {
                setSubHoney(value);
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
              {/* <Icon icon="it-mail" color="white" padding={false} size="" /> */}
              <span>{intl.formatMessage(messages.sendButtonLabel)}</span>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UfficioStampaPersonalChannelsManagementLink;
