import { erc721ABI } from 'wagmi';

const formatContractArgs = (wallet: string) => {
  const temp = {
    '0xeeb431caa15b526f48ee4db3697fe57ec8223a8e': {
      image: 'https://www.heds.cloud/ipfs/QmbXhwWfQWA9n8L4ZHiqJXJBjWmpZ1WXCrCi1TFLuWUbwv',
      name: 'Good Society',
    },
    '0x832B323D761EfA6a77205F7020a77D35B4B9Fe4D': {
      image: 'https://www.heds.cloud/ipfs/QmbnGKrUsfRwxcPNxdXuKwHFmtu29F7UYSAfY5aEMGZtPc',
      name: 'Secret Garden',
    },
    '0xDE8a0b17D3Dc0468AdC65309881D9d6A6Cd66372': {
      image: 'https://www.heds.cloud/ipfs/QmXGBtC58AiRdMqiBVtamj9rh4UmuLKN8HA5f2PD8wR9aN',
      name: 'hedsTAPE 01',
    },
    '0x5083cF11003f2B25Ca7456717e6dC980545002e5': {
      image: 'https://www.heds.cloud/ipfs/QmcYqfpVAwzJ1cQjGqE1Ej4fa6KoMNMekjkeaMk1pKhMnj',
      name: 'hedsTAPE 02',
    },
    '0x567e687C93103010962F9E9Cf5730Ae8DBFC6d41': {
      image: 'https://www.heds.cloud/ipfs/Qmd5ueooXtUWb6heW1TXPjLJX8cRvK2tAF2K86BtebePVr',
      name: 'hedsTAPE 03',
    },
    '0x8045fd700946a00436923f37d08f280ade3b4af6': {
      image: 'https://www.heds.cloud/ipfs/QmdtwqTZ1KZKneLVob62GyKiioJXsEU2bBhMbL1XgoADNb',
      name: 'hedsTAPE 04',
    },
    '0x8f36eB094F7B960a234a482d4d8FFb8b37f728C6': {
      image: 'https://www.heds.cloud/ipfs/QmPwE8FgSs87296wFbFAKmYPECBNfWg96PDtHzC2BPCnAA',
      name: 'hedsTAPE 05',
    },
    '0x885236535D5Cf7033BdC5bC1050CaD7fdf4970a6': {
      image: 'https://www.heds.cloud/ipfs/QmTxzFqXq2MNjM4GBVds5NEvRL49aQL7ScKM55awbRsDPy',
      name: 'hedsTAPE 06',
    },
    '0x20F2717F113d0B3815124876F3D72f8E1179341e': {
      image: 'https://www.heds.cloud/ipfs/QmWofBVVJnCWoqUoxXgdwNLPiq46hvMeJttZGe22ENtTAi',
      name: 'hedsTAPE 07',
    },
    '0xA2acEd918E8cff703b8BB4129a30146A1Dc35675': {
      image: 'https://www.heds.cloud/ipfs/QmNrmpMNpoVVa5ized1eCWqFnWNsxeKZaA5W9HphEDLjKh',
      name: 'hedsTAPE 08',
    },
    '0xEb8377be44222e90388Ff8BB04be27F9bFC6a98e': {
      image: 'https://www.heds.cloud/ipfs/Qmb1Zr5K4kUxM5AVswCqZvMBJk3wL2iR3hp8iK4h9hsiFc',
      name: 'hedsTAPE 09',
    },
    '0x9f396644ec4b2a2bc3c6cf665d29165dde0e83f1': {
      image: 'https://www.heds.cloud/ipfs/QmRgDWnPfwcbib6DtAvCu3VTt74NwaQiXV32gda7MBQeuJ',
      name: 'hedsTAPE 10',
    },
    '0xfDF7D7FFe3D363f858644057EBC62afABb99152A': {
      image: 'https://www.heds.cloud/ipfs/QmSiebUqSnJmzDVz5KyW9Hbx76ofEqoBhxjv2LWcxtxMuX',
      name: 'hedsTAPE 11',
    },
    '0xb18510437452dad3fe78e518afab1f314540db68': {
      image: 'https://www.heds.cloud/ipfs/QmQTv6yF5rQCxwgXa6AKHJZGx1NUwS4KVAwjrg6muLzufJ',
      name: 'hedsTAPE 12',
    },
    '0xdac992430bd547e91e9a4631d92f7613ffa47e47': {
      image: 'https://www.heds.cloud/ipfs/QmY2z5HEK6rD3SQ27MPpitZmqeqywKEwB7Ci1ABjqwe6J9',
      name: 'hedsTAPE 13',
    },
  };
  return Object.keys(temp).map((key) => ({
    address: key.toLowerCase() as `0x${string}`,
    functionName: 'balanceOf',
    abi: erc721ABI,
    args: [wallet],
    chainId: 1,
  }));
};

export default formatContractArgs;
