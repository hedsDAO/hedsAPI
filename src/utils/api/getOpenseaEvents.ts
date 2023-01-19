import axios from 'axios';

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': process.env.OPENSEA_API_KEY },
};
const getOpenseaEvents = async (slug: string) => {
  return await fetch(`https://api.opensea.io/api/v1/events?only_opensea=true&collection_slug=${slug}&event_type=created`, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
};

export default getOpenseaEvents;
