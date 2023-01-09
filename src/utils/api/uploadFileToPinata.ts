import axios from 'axios';

const uploadFileToPinata = (formData: FormData) => {
  return axios
    .post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        pinata_api_key: `${process.env.PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.PINATA_API_SECRET}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export default uploadFileToPinata;