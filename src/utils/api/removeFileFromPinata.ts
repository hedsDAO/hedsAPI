import axios from 'axios';

const removeFileFromPinata = (cid: string) => {
  axios
    .delete(`https://api.pinata.cloud/pinning/unpin/${cid}`, {
      headers: {
        pinata_api_key: `${process.env.PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.PINATA_API_SECRET}`,
      },
    })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};

export default removeFileFromPinata;
