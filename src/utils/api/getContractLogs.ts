import axios, { AxiosResponse } from 'axios';

const getContractLogs = (address: string) => {
  return axios
    .get(
      `https://api.etherscan.io/api?module=logs&action=getLogs&address=${address}&fromBlock=1&toBlock=99999999&page=1&offset=1000&apikey=${process.env.ETHERSCAN_API_KEY}`,
    )
    .then((res: AxiosResponse<any>) => res.data)
    .catch((err) => console.log(err));
};

export default getContractLogs;
