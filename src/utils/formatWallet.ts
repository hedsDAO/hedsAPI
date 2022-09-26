const formatWallet = (wallet: string): string => {
  return wallet.slice(0, 4) + '...' + wallet.slice(wallet.length - 4, wallet.length);
};

export { formatWallet };
