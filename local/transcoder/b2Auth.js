const axios = require("axios");
const B2_API_URL = "https://api.backblazeb2.com/b2api/v3";
const BUCKET_ID = "d52e02539903d4668af0091b";

const b2Authorize = async () => {
  const applicationKeyId = "5e239346a09b";
  const applicationKey = "002908889b3bbf133c3acc6d3254cf48a76935aeaf";
  const authString = `${applicationKeyId}:${applicationKey}`;
  const authHeader = `Basic ${Buffer.from(authString).toString("base64")}`;

  const response = await axios.post(
    `${B2_API_URL}/b2_authorize_account`,
    {},
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );
  const refinedAuth = {
    authorizationToken: response.data.authorizationToken,
    apiUrl: response.data.apiInfo.storageApi.apiUrl,
    downloadUrl: response.data.apiInfo.storageApi.downloadUrl,
  };
  return refinedAuth;
};

module.exports = { b2Authorize };
