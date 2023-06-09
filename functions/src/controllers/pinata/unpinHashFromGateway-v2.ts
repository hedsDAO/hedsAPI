import axios from 'axios';

export const unpinHashFromGateway = async (ipfsCid: string) => {
  const config = {
    method: 'delete',
    url: `https://api.pinata.cloud/pinning/unpin/${ipfsCid}`,
    headers: {
      pinata_api_key: `${process.env.PINATA_API_KEY}`,
      pinata_secret_api_key: `${process.env.PINATA_API_SECRET}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return await axios(config)
    .then((response) => {
      if (response.status === 200) {
        console.log(`Successfully unpinned ${ipfsCid}`);
      } else {
        console.log(`Failed to unpin ${ipfsCid}, status code: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Failed to unpin ${ipfsCid}: ${error}`);
    });
};
