import { getBaseUrl } from '@plone/volto/helpers';

const SendComunicatoPreview = ({ pathname, form }) => {
  // TODO: url escape
  const notes = form?.state?.formData?.notes || '';
  const attachments = form?.state?.formData.attachments || [];
  return (
    <>
      <iframe
        width="800px"
        height="600px"
        scr
        title="preview"
        src={`${getBaseUrl(pathname)}/send-preview/@@download/html?notes=${notes}${attachments.map((a) => `&attachmenst=${a}`)}`}
      />
    </>
  );
};

export default SendComunicatoPreview;
