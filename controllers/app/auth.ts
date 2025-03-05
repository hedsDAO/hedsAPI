import { prisma } from '../../prisma/client';
import functions from 'firebase-functions';
import twilio from 'twilio';
import axios from 'axios';

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Validate if a Twitter handle exists in the database.
 *
 * @param {string} twitter_handle - The Twitter handle to check.
 * @returns {Promise<boolean>} True if exists, false otherwise.
 */
export const validateTwitterHandle = async (twitter_handle: string): Promise<boolean> => {
  try {
    const users = await prisma.users.findMany({
      where: {
        twitter_handle: {
          equals: twitter_handle,
        },
      },
    });
    return users.length > 0;
  } catch (error: any) {
    throw new Error(`Failed to validate Twitter handle: ${error.message}`);
  }
};

/**
 * Validate if a display name exists in the database.
 *
 * @param {string} display_name - The display name to check.
 * @returns {Promise<boolean>} True if exists, false otherwise.
 */
export const validateUserByDisplayName = async (display_name: string): Promise<boolean> => {
  try {
    const users = await prisma.users.findMany({
      where: {
        display_name: {
          equals: display_name,
          mode: 'insensitive',
        },
      },
    });
    return users.length > 0;
  } catch (error: any) {
    throw new Error(`Failed to validate display name: ${error.message}`);
  }
};

/**
 * Send a verification code via Twilio.
 *
 * @param {string} to - The phone number to which the code should be sent.
 * @returns {Promise<Object>} Twilio verification response.
 */
export const sendTwilioVerification = async (to: string) => {
  try {
    return twilioClient.verify.v2.services(process.env.TWILIO_VERIFY_SID as string).verifications.create({ to: to, channel: 'sms' });
  } catch (e: any) {
    functions.logger.error(e);
    throw new Error(e);
  }
};

/**
 * Verify a given code for a phone number via Twilio.
 *
 * @param {string} to - The phone number to be verified.
 * @param {string} code - The verification code.
 * @returns {Promise<Object>} Twilio verification check response.
 */
export const verifyTwilioCode = async (to: string, code: string) => {
  try {
    return twilioClient.verify.v2.services(process.env.TWILIO_VERIFY_SID as string).verificationChecks.create({ to: to, code: code });
  } catch (e: any) {
    functions.logger.error(e);
    throw new Error(e);
  }
};

/**
 * Send a custom message via Twilio SMS.
 *
 * @param {string} to - The phone number to which the message should be sent.
 * @param {string} body - The message body.
 * @returns {Promise<Object>} Twilio message response.
 */
 export const sendTwilioMessage = async (to: string, body: string) => {
  try {
    return twilioClient.messages.create({
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER as string, // Your Twilio phone number
      body: body,
    });
  } catch (e: any) {
    // Assuming you have a logger set up similar to your verification functions
    console.error(e); // You can replace this with your logger if available
    throw new Error(e.message);
  }
};

/**
 * Get user information from Google using a provided token.
 *
 * @param {string} token - The Google OAuth token.
 * @returns {Promise<Object>} Google user information.
 */
export const getGoogleUserData = async (token: string) => {
  try {
    const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    return userInfoResponse.data;
  } catch (e: any) {
    functions.logger.error(e);
    throw new Error(e);
  }
};
