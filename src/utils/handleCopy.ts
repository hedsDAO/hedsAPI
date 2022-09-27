const handleCopy = (setIsCopied: Function, wallet: string) => {
  setIsCopied(true);
  const el = document.createElement('textarea');
  el.value = wallet;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  const timer = setTimeout(() => {
    setIsCopied(false);
  }, 1000);
  return () => clearTimeout(timer);
};

export default handleCopy;
