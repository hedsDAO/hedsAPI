import { PKPass } from "passkit-generator";
import { PrismaClient, events } from "@prisma/client";
import axios from "axios";
import { DateTimeFormatOptions } from "luxon";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WWDR: string;
      SIGNER_CERT: string;
      SIGNER_KEY: string;
      SIGNER_KEY_PASSPHRASE: string;
    }
  }
}

const prisma = new PrismaClient();

export const generatePass = async (eventId: number, displayName: string) => {
  try {
    const event = await prisma.events.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event || !event.start_time || !event.description) {
      throw new Error("Event not found");
    }

    const passModelPath = "./src/data/hedsEvent.pass";

    const relevantDate = new Date(event.start_time).toISOString();

    const newPass = await PKPass.from(
      {
        model: passModelPath,
        certificates: {
          wwdr: process.env.WWDR,
          signerCert: process.env.SIGNER_CERT,
          signerKey: process.env.SIGNER_KEY,
          signerKeyPassphrase: process.env.SIGNER_KEY_PASSPHRASE,
        },
      },
      {
        serialNumber: `${event.id}-${displayName}`,
        description: event.description,
        groupingIdentifier: "heds",
      }
    );

    await setEventPassFields(newPass, event, displayName);

    await addImagesToPass(newPass, event);
    newPass.setRelevantDate(new Date(relevantDate));
    newPass.setLocations({
      latitude: 34.0836,
      longitude: -118.3562,
    });

    return newPass;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const setEventPassFields = (
  newPass: PKPass,
  event: events,
  displayName: string
) => {
  if (!event.description || !event.start_time) return;
  const formattedDate = new Date(event.start_time).toISOString();

  const formatEventTime = (event: events) => {
    if (!event.start_time) return;
    const eventDate = new Date(event.start_time);

    const options: DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
      hour12: true,
    };

    const formattedTime = eventDate.toLocaleTimeString("en-US", options);

    return formattedTime;
  };

  newPass.headerFields.push({
    key: "startTime",
    label: formatEventTime(event),
    value: formattedDate,
    timeStyle: "PKDateStyleNone",
    dateStyle: "PKDateStyleShort",
    textAlignment: "PKTextAlignmentRight",
  });

  newPass.auxiliaryFields.push({
    key: "instructions",
    label: "Instructions",
    value: event.pass_instructions,
  });

  newPass.secondaryFields.push(
    {
      key: "eventName",
      label: "Event",
      value: event.name,
    },
    {
      key: "attendee",
      label: "Attendee",
      value: displayName,
    }
  );

  newPass.backFields.push(
    {
      key: "about",
      label: "About",
      value: event.description,
    },
    {
      key: "address",
      label: "Address",
      value: "7515 Melrose Ave, Los Angeles, CA 90046",
      dataDetectorTypes: ["PKDataDetectorTypeAddress"],
    }
  );

  return;
};

const addImagesToPass = async (newPass: PKPass, event: events) => {
  const logoUrl =
    "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/applePass%2FheddotLogoWalletPass.png?alt=media&token=eb6e5e64-5986-4293-8302-59524fd999e8";
  const iconUrl =
    "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/applePass%2FheddotIcon.png?alt=media&token=95b413bb-7e76-4b0d-ad1e-d2aca5a63b73";
  const stripUrl = event.strip_image;

  if (logoUrl) {
    const logoBuffer = await downloadImageFromUrl(logoUrl);
    newPass.addBuffer("logo.png", logoBuffer);
    newPass.addBuffer("logo@2x.png", logoBuffer);
  }

  if (iconUrl) {
    const iconBuffer = await downloadImageFromUrl(iconUrl);
    newPass.addBuffer("icon.png", iconBuffer);
    newPass.addBuffer("icon@2x.png", iconBuffer);
  }

  if (stripUrl) {
    const stripBuffer = await downloadImageFromUrl(stripUrl);
    newPass.addBuffer("strip.png", stripBuffer);
    newPass.addBuffer("strip@2x.png", stripBuffer);
  }
  return;
};

const downloadImageFromUrl = async (url: string) => {
  const response = await axios({
    method: "get",
    url: url,
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
};
