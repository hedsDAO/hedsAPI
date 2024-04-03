import twilio from "twilio";
import { PrismaClient } from "@prisma/client";
import * as functions from "firebase-functions";
import { getAllUsers } from "../app/user";

const prisma = new PrismaClient();

export class SMSRequest {
  recipients: string[];
  message: string;

  constructor(recipients: string[], message: string) {
    this.recipients = recipients;
    this.message = message;
  }

  validate(): Error | null {
    if (this.message === "") {
      return new Error("message cannot be empty");
    }
    if (!this.recipients.every(validatePhoneNumber)) {
      return new Error("all phone numbers must be in E.164 format");
    }
    return null;
  }
}

function validatePhoneNumber(phoneNumber: string): boolean {
  const e164Pattern = /^\+[1-9]\d{1,14}$/;
  return e164Pattern.test(phoneNumber);
}

export async function getPhoneNumbersByEventId(
  eventId: number
): Promise<string[]> {
  const phoneNumbers = await prisma.users.findMany({
    where: {
      event_rsvps: {
        some: {
          event_id: eventId,
        },
      },
    },
    select: {
      phone_number: true,
    },
  });

  const filteredPhoneNumbers = phoneNumbers
    .map((user) => user.phone_number)
    .filter((phoneNumber): phoneNumber is string => phoneNumber !== null);

  if (filteredPhoneNumbers.length === 0) {
    throw new Error("No phone numbers found for this event");
  }
  return filteredPhoneNumbers;
}

export async function getAllPhoneNumbersFromEvents() {
  const phoneNumbers = await prisma.users.findMany({
    select: {
      phone_number: true,
    },
  });

  const filteredPhoneNumbers = phoneNumbers
    .map((user) => user.phone_number)
    .filter((phoneNumber): phoneNumber is string => phoneNumber !== null);

  if (filteredPhoneNumbers.length === 0) {
    throw new Error("No phone numbers found for this event");
  }

  return filteredPhoneNumbers;
}

export async function bulkSMS(request: SMSRequest): Promise<string> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioMessagingServiceSID = process.env.TWILIO_MESSAGING_SID;

  if (!accountSid || !authToken || !twilioMessagingServiceSID) {
    functions.logger.log({ accountSid, authToken, twilioMessagingServiceSID });
    throw new Error("Twilio configuration is missing");
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

export async function sendSMS(request: {
  recipients: string[];
  message: string;
}): Promise<string> {
  // Validate the message and phone number
  const { recipients, message } = request;
  functions.logger.log({ recipients, message });
  const phoneNumber = recipients[0];
  if (message === "") {
    throw new Error("Message cannot be empty");
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioMessagingServiceSID = process.env.TWILIO_MESSAGING_SID;

  if (!accountSid || !authToken || !twilioMessagingServiceSID) {
    functions.logger.log({ accountSid, authToken, twilioMessagingServiceSID });
    throw new Error("Twilio configuration is missing");
  }

  const client = twilio(accountSid, authToken);

  try {
    functions.logger.log("Sending message", { phoneNumber, message });
    await client.messages.create({
      to: phoneNumber,
      body: message,
      messagingServiceSid: twilioMessagingServiceSID,
    });
    return `Message sent successfully to ${phoneNumber}`;
  } catch (err) {
    console.error(err);
    throw new Error(
      `Message could not be sent to ${phoneNumber}, please check your Twilio logs for more information`
    );
  }
}

export async function getPhoneNumbers() {
  // Fetch all users
  const allUsers = await getAllUsers();

  // Filter out users without a phone number and map to get only phone numbers
  const phoneNumbers = allUsers
    ?.filter((user) => user.phone_number) // Assuming the field is named 'phoneNumber'
    .map((user) => user.phone_number);

  return phoneNumbers;
}
