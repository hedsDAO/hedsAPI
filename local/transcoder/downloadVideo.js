const { b2Authorize } = require("./b2Auth");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const b2ListFileNames = async (auth, bucketId) => {
  const response = await axios.post(
    `${auth.apiUrl}/b2api/v3/b2_list_file_names`,
    {
      bucketId,
      maxFileCount: 1000,
    },
    {
      headers: {
        Authorization: auth.authorizationToken,
      },
    }
  );
  return response.data;
};

const b2DownloadFileByName = async (
  auth,
  bucketName,
  fileName,
  localFilePath
) => {
  console.log("DOwnload file args", {
    auth,
    bucketName,
    fileName,
    localFilePath,
  });
  await fs.promises.mkdir(path.dirname(localFilePath), { recursive: true });
  const response = await axios.get(
    `https://f002.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_zd52e02539903d4668af0091b_f2417c2898dc3f840_d20240603_m005319_c002_v0001122_t0028_u01717375999104`,
    {
      responseType: "stream",
      headers: {
        Authorization: auth.authorizationToken,
      },
    }
  );

  const totalLength = response.headers["content-length"];

  console.log("Starting download");
  let downloadedLength = 0;
  response.data.on("data", (chunk) => {
    downloadedLength += chunk.length;
    console.log(
      `Downloading: ${((downloadedLength / totalLength) * 100).toFixed(
        2
      )}% done`
    );
  });

  const writer = fs.createWriteStream(localFilePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const main = async () => {
  const auth = await b2Authorize();
  const fileNames = await b2ListFileNames(
    auth,
    "d52e02539903d4668af0091b"
  );
  for (let i = 0; i < fileNames.files.length; i++) {
    console.log({ index: i, fileName: fileNames.files[i].fileName });
  }

    const fileName = fileNames.files[471].fileName;
    await b2DownloadFileByName(
      auth,
      "heds",
      fileName,
      `/Users/0xcambot/heds/build/prod/hedsAPI/local/transcoder/mp4/${fileName}`
    );
};

main();
