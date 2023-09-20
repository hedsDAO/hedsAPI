import {prisma} from "../../..//prisma/client";
import functions from "firebase-functions";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export const validateTwitterHandle = async (twitterHandle: string): Promise<boolean> => {
    try {
      const users = await prisma.users.findMany({
        where: {
          twitter_handle: {
            equals: twitterHandle,
          },
        },
      });
      return users.length > 0;
    } catch (error: any) {
      throw new Error(`Failed to validate Twitter handle: ${error.message}`);
    }
  };
  
  export const validateUserByDisplayName = async (displayName: string): Promise<boolean> => {
    try {
      const users = await prisma.users.findMany({
        where: {
          display_name: {
            equals: displayName,
            mode: "insensitive",
          },
        },
      });
      return users.length > 0;
    } catch (error: any) {
      throw new Error(`Failed to validate display name: ${error.message}`);
    }
  };

  export const sendTwilioVerification = async (to: string) => {
    try {
        return twilioClient.verify.v2
                .services(process.env.TWILIO_VERIFY_SID as string)
                .verifications.create({ to: to, channel: "sms" });
    } catch (e: any) {
        functions.logger.error(e)
        throw new Error(e);
    }
  }

  export const verifyTwilioCode = async (to: string, code: string) => {
    try {
        return twilioClient.verify.v2
                .services(process.env.TWILIO_VERIFY_SID as string)
                .verificationChecks.create({ to: to, code: code })
    } catch (e: any) {
        functions.logger.error(e)
        throw new Error(e);
    }
  }