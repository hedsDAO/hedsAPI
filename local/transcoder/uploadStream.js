const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { b2Authorize } = require("./b2Auth");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const uploadDirectory = async (auth, bucketId, dir, destPath) => {
    const files = await fs.promises.readdir(dir);
    console.log("files", files);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = await fs.promises.lstat(fullPath);
      if (stat.isDirectory()) {
        await uploadDirectory(
          auth,
          bucketId,
          fullPath,
          `${destPath}/${file}`
        );
      } else {
        const fileContent = await fs.promises.readFile(fullPath);
        await uploadStream(auth, bucketId, `${destPath}/${file}`, fileContent);
        console.log("Uploaded file:", `${destPath}/${file}`);
      }
    }
    return;
  };

  const uploadStream = async (auth, bucketId, fileName, fileContent) => {
    const getUploadUrlResponse = await axios.post(
      `${auth.apiUrl}/b2api/v3/b2_get_upload_url`,
      {
        bucketId,
      },
      {
        headers: {
          Authorization: auth.authorizationToken,
        },
      }
    );
  
    const uploadUrl = getUploadUrlResponse.data.uploadUrl;
    const uploadAuthToken = getUploadUrlResponse.data.authorizationToken;
  
    try {
      const uploadResponse = await axios.post(uploadUrl, fileContent, {
        headers: {
          Authorization: uploadAuthToken,
          "X-Bz-File-Name": fileName,
          "Content-Type": "b2/x-auto",
          "X-Bz-Content-Sha1": "do_not_verify",
        },
      });
      // console.log("Uploaded file:", fileName);
      return uploadResponse.data;
    } catch (error) {
      console.error("Error uploading file:", fileName, error);
    }

    await delay(450); // Delay for the specified milliseconds

  };

  const main = async () => {
    const auth = await b2Authorize();
    await uploadDirectory(
      auth,
      "d52e02539903d4668af0091b",
      "m3u8/hedsRadio/009-SALENIE",
      "transcodedVideos/videos/hedsRadio/009-SALENIE"
    );
  };

  main();