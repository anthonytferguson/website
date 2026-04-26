import emailjs from '@emailjs/browser';

// These should be configured in your .env file
// You can get these from https://www.emailjs.com/
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export interface EmailParams {
  to_name: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  [key: string]: any;
}

export const sendEmailNotification = async (templateId: string, params: EmailParams) => {
  if (!SERVICE_ID || !templateId || !PUBLIC_KEY) {
    console.warn('EmailJS is not fully configured. Email skipped.', {
      serviceId: !!SERVICE_ID,
      templateId: !!templateId,
      publicKey: !!PUBLIC_KEY
    });
    return;
  }

  try {
    const result = await emailjs.send(SERVICE_ID, templateId, params, PUBLIC_KEY);
    console.log('Email sent successfully:', result.text);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
