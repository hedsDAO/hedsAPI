import * as functions from "firebase-functions/v1";
// import {onSchedule} from "firebase-functions/v2/scheduler";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import axios from "axios";

if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

const B2_API_URL = "https://api.backblazeb2.com/b2api/v3";
const BUCKET_ID = "d52e02539903d4668af0091b";

interface B2_AUTH_RESPONSE {
  authorizationToken: string;
  apiInfo: {
    storageApi: {
      absoluteMinimumPartSize: number;
      apiUrl: string;
      bucketId: string;
      bucketName: string;
      capabilities: string[];
      downloadUrl: string;
      infoType: string;
      namePrefix: string;
      recommendedPartSize: number;
      s3ApiUrl: string;
    };
  };
}

const b2Authorize = async (): Promise<B2_AUTH_RESPONSE> => {
  const applicationKeyId = process.env.B2_KEY_ID || "";
  const applicationKey = process.env.B2_APPLICATION_KEY || "";
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
  return response.data;
};

const b2ListFileNames = async (
  auth: { apiUrl: string; authorizationToken: string },
  bucketId: string
) => {
  const response = await axios.post(
    `${auth.apiUrl}/b2api/v3/b2_list_file_names`,
    {
      bucketId,
      maxFileCount: 100,
    },
    {
      headers: {
        Authorization: auth.authorizationToken,
      },
    }
  );
  functions.logger.log("response", response.data);
  return response.data;
};

const b2DownloadFileByName = async (
  auth: { downloadUrl: string; authorizationToken: string },
  bucketName: string,
  fileName: string,
  localFilePath: string
) => {
  const response = await axios.get(
    `${auth.downloadUrl}/file/${bucketName}/${fileName}`,
    {
      responseType: "stream",
      headers: {
        Authorization: auth.authorizationToken,
      },
    }
  );

  const writer = fs.createWriteStream(localFilePath);
  response.data.pipe(writer);

  return new Promise<void>((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const startLargeFileUpload = async (
    auth: { apiUrl: string; authorizationToken: string },
    bucketId: string,
    fileName: string
    ) => {
    const response = await axios.post(
        `${auth.apiUrl}/b2api/v3/b2_start_large_file`,
        {
        bucketId,
        fileName,
        contentType: "b2/x-auto",
        },
        {
        headers: {
            Authorization: auth.authorizationToken,
        },
        }
    );
    return response.data;
    };

const b2UploadFile = async (
  auth: { apiUrl: string; authorizationToken: string },
  bucketId: string,
  fileName: string,
  fileContent: Buffer
) => {
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
  functions.logger.log("fileContent", fileContent);
  const uploadResponse = await axios.post(uploadUrl, fileContent, {
    headers: {
      Authorization: uploadAuthToken,
      "X-Bz-File-Name": fileName,
      "Content-Type": "b2/x-auto",
      "X-Bz-Content-Sha1": "do_not_verify",
    },
  });
  functions.logger.log("response", uploadResponse.data);
  return uploadResponse.data;
};

const b2DeleteFileVersion = async (
  auth: { apiUrl: string; authorizationToken: string },
  fileId: string,
  fileName: string
) => {
  const response = await axios.post(
    `${auth.apiUrl}/b2api/v3/b2_delete_file_version`,
    {
      fileId,
      fileName,
    },
    {
      headers: {
        Authorization: auth.authorizationToken,
      },
    }
  );
  return response.data;
};

const transcodeVideo = 
functions
  .runWith({ memory: "8GB", timeoutSeconds: 540})
  .pubsub
  .schedule("*/5 * * * *")
  .onRun(async (event) => {
    try {
      const auth = await b2Authorize();
      const refinedAuth = {
        authorizationToken: auth.authorizationToken,
        apiUrl: auth.apiInfo.storageApi.apiUrl,
      };

      // List all files in the raw videos directory
      functions.logger.log("refinedAuth", refinedAuth);
      const rawVideos = await b2ListFileNames(refinedAuth, BUCKET_ID);

      const file = rawVideos.files[9];

      const fileName = path.basename(file.fileName);
      const tempLocalFile = path.join(os.tmpdir(), fileName);
      const tempLocalOutputDir = path.join(
        os.tmpdir(),
        fileName.replace(".", "_output")
      );
      const tempLocalOutput = path.join(tempLocalOutputDir, "output.m3u8");

      // Download the raw video file
      try {
        await b2DownloadFileByName(
          { ...refinedAuth, downloadUrl: auth.apiInfo.storageApi.downloadUrl },
          "hedsData",
          file.fileName,
          tempLocalFile
        );
      } catch (downloadError) {
        console.error("Error downloading file:", downloadError);
      }

      fs.mkdirSync(tempLocalOutputDir);

      await new Promise<null | void>((resolve, reject) => {
        ffmpeg(tempLocalFile)
          .outputOptions([
            "-map 0:v",
            "-map 0:a",
            "-b:v:0 800k",
            "-b:v:1 400k",
            "-b:v:2 200k",
            "-s:v:0 1280x720",
            "-s:v:1 854x480",
            "-s:v:2 640x360",
            "-c:v libx264",
            "-c:a aac",
            "-f hls",
            "-hls_time 10",
            "-hls_list_size 0",
            "-hls_segment_filename",
            `${tempLocalOutputDir}/v%v/fileSequence%d.ts`,
            "-master_pl_name",
            "master.m3u8",
          ])
          .output(tempLocalOutput)
          .on("end", async () => {
            try {
              const outputFiles = fs.readdirSync(tempLocalOutputDir);
              for (const outputFile of outputFiles) {
                const relativeFilePath = path.relative(
                  tempLocalOutputDir,
                  path.join(tempLocalOutputDir, outputFile)
                );
                const targetFilePath = path
                  .join(path.dirname(file.fileName), "hls", relativeFilePath)
                  .replace(/\\/g, "/"); // Ensure UNIX style paths
                const fileContent = fs.readFileSync(
                  path.join(tempLocalOutputDir, outputFile)
                );
                await b2UploadFile(
                  refinedAuth,
                  BUCKET_ID,
                  targetFilePath,
                  fileContent
                );
              }
              fs.unlinkSync(tempLocalFile);
              fs.rmdirSync(tempLocalOutputDir, { recursive: true });
              resolve();
            } catch (uploadError) {
              console.error("Error uploading transcoded files:", uploadError);
              reject(uploadError);
            }
          })
          .on("error", (err) => {
            console.error("Error processing video:", err);
            fs.unlinkSync(tempLocalFile);
            fs.rmdirSync(tempLocalOutputDir, { recursive: true });
            reject(err);
          })
          .run();
      });

      // Delete the raw video file after processing
      try {
        await b2DeleteFileVersion(refinedAuth, file.fileId, file.fileName);
      } catch (deleteError) {
        console.error("Error deleting original file:", deleteError);
      }

      return;
    } catch (error: any) {
      console.error("Error in transcodeVideo function:", error);
      throw new Error(error);
    }
  });

export default transcodeVideo;
