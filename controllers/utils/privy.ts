import { PrivyClient } from "@privy-io/server-auth";
import { bulkUsers } from "../../data/bulkUsers";
import * as functions from "firebase-functions";

const privy = new PrivyClient(
  "clt3mv1nl01mqieupyxwnjkax",
  "jAgAK4yDhi8UFVarKMy9QydCHf3i8A6ifESNSAnMQ9KK5j9ko7ZNj6zKGRY1L23YujfajVjNJVKJr9YCKv3NLqD"
);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function importUserWithBackoff(phoneNumber: string, attempt = 0) {
  try {
    const response = await privy.importUser({
      linkedAccounts: [{ type: "phone", number: phoneNumber }],
      createEmbeddedWallet: true,
    });
    return response;
  } catch (error: any) {
    // Assuming the error or its response contains a status code to check
    // Adjust this condition based on how PrivyClient indicates rate limiting
    if (error.statusCode === 429 || error.response?.status === 429) {
      const delay = Math.pow(2, attempt) * 2000; // Exponential back-off
      console.log(`Rate limited. Retrying in ${delay} ms.`);
      await sleep(delay);
      return importUserWithBackoff(phoneNumber, attempt + 1);
    }
    // Re-throw the error if it's not a rate limit error
    throw error;
  }
}

const getAllCurrentPrivyUsers = async () => {
    try {
      const users = await privy.getUsers();
      const phoneNumbers = users.map(user => {
        // Remove spaces from each phone number
        return user.phone?.number.replace(/\s/g, '');
      }).filter(number => number); // This additional filter removes any undefined or null values if any
      return phoneNumbers;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  

export const bulkUpload = async () => {
  const success = [];
  const privyUsers = await getAllCurrentPrivyUsers();
  functions.logger.log("privyUsers", privyUsers.length);
  functions.logger.log("bulkUsers", bulkUsers.length);
  for (const phoneNumber of bulkUsers) {
    // Assuming bulkUsers is an array of phone numbers
    if (privyUsers.includes(phoneNumber)) {
    //   functions.logger.log(
    //     `Skipping ${phoneNumber} as it already exists in Privy.`
    //   );
      continue;
    }
    try {
        functions.logger.log(`Importing ${phoneNumber}...`);
      await importUserWithBackoff(phoneNumber);
      success.push(phoneNumber);
    } catch (error) {
      console.error(`Failed to import ${phoneNumber}:`, error);
      // Decide how to handle failures: log, collect failed numbers, etc.
    }
  }
  return success;
};

export const addUserToPrivy = async (phoneNumber: string) => {
  try {
    const response = await privy.importUser({
      linkedAccounts: [{ type: "phone", number: phoneNumber }],
      createEmbeddedWallet: true,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};
