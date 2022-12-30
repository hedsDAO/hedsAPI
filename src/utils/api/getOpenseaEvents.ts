import axios from 'axios';

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': '96f93b237cd14aafbda92f6d5cbf49ca' },
};
const getOpenseaEvents = async (slug: string) => {
  return await fetch('https://api.opensea.io/v2/listings/collection/' + slug + '/all', options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
};

export default getOpenseaEvents;
