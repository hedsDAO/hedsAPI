import { PKPass, Field, OverridablePassProps } from "passkit-generator";
import { PrismaClient, events } from "@prisma/client";
import axios from "axios";

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

    const passModelPath = "./src/data/heds event.pass/pass.json";
    const logoText = "heds";
    const labelColor = "rgb(192,192,192)";
    const foregroundColor = "rgb(255,255,255)";
    const backgroundColor = "rgb(0,0,0)";
    const relevantDate = new Date(event.start_time).toISOString();
    const organizationName = "heds";
    const passTypeIdentifier = "pass.heds.space";
    const teamIdentifier = "UU29QT4RMW";
    const formatVersion = 1;

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
        organizationName,
        passTypeIdentifier,
        teamIdentifier,
        formatVersion,
        serialNumber: `${event.id}-${displayName}`,
        description: event.description,
        logoText,
        foregroundColor,
        backgroundColor,
        labelColor,
        eventTicket: setEventPassFields(event, displayName),
        relevantDate,
      } as OverridablePassProps
    );

    await addImagesToPass(newPass, event);

    return newPass;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const setEventPassFields = (event: events, displayName: string) => {
  if (!event.description || !event.start_time) return;

  const eventPassFields: {
    headerFields: Field[];
    auxiliaryFields: Field[];
    secondaryFields: Field[];
    backFields: Field[];
  } = {
    headerFields: [],
    auxiliaryFields: [],
    secondaryFields: [],
    backFields: [],
  };

  const startTimeHours = new Date(event.start_time).getHours();
  const startTimeMinutes = new Date(event.start_time).getMinutes();
  const formattedDate = new Date(event.start_time).toISOString();
  const getAmOrPm = startTimeHours >= 12 ? "PM" : "AM";
  const formatHours = startTimeHours % 12 || 12;
  const startTime = `${formatHours}:${startTimeMinutes} ${getAmOrPm}`;

  eventPassFields.headerFields.push({
    key: "startTime",
    label: startTime,
    value: formattedDate,
    timeStyle: "PKDateStyleNone",
    dateStyle: "PKDateStyleShort",
    textAlignment: "PKTextAlignmentRight",
  });

  eventPassFields.auxiliaryFields.push({
    key: "instructions",
    label: "Instructions",
    value: "Please have ID ready when you arrive",
  });

  eventPassFields.secondaryFields.push(
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

  eventPassFields.backFields.push(
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

  return eventPassFields;
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
};

const downloadImageFromUrl = async (url: string) => {
  const response = await axios({
    method: "get",
    url: url,
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
};
