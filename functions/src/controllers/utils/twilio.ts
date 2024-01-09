import twilio from 'twilio';
import * as functions from 'firebase-functions';

export class SMSRequest {
  recipients: string[];
  message: string;

  constructor(recipients: string[], message: string) {
    this.recipients = recipients;
    this.message = message;
  }

  validate(): Error | null {
    if (this.message === '') {
      return new Error('message cannot be empty');
    }
    if (!this.recipients.every(validatePhoneNumber)) {
      return new Error('all phone numbers must be in E.164 format');
    }
    return null;
  }
}

function validatePhoneNumber(phoneNumber: string): boolean {
  const e164Pattern = /^\+[1-9]\d{1,14}$/;
  return e164Pattern.test(phoneNumber);
}

export async function bulkSMS(request: SMSRequest): Promise<string> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioMessagingServiceSID = process.env.TWILIO_MESSAGING_SID;

  if (!accountSid || !authToken || !twilioMessagingServiceSID) {
    functions.logger.log({ accountSid, authToken, twilioMessagingServiceSID });
    throw new Error('Twilio configuration is missing');
  }

  const client = twilio(accountSid, authToken);
  let numberOfFailedRequests = 0;

  for (const recipient of request.recipients) {
    try {
      await client.messages.create({
        to: recipient,
        body: request.message,
        messagingServiceSid: twilioMessagingServiceSID,
      });
    } catch (err) {
      console.error(err);
      numberOfFailedRequests++;
    }
  }

  if (numberOfFailedRequests > 0) {
    const errorMessage = `${numberOfFailedRequests} message(s) could not be sent, please check your Twilio logs for more information`;
    throw new Error(errorMessage);
  }

  return `${request.recipients.length} message(s) sent successfully`;
}
