function isEmpty(obj: any) {
  if (typeof obj !== 'object') return true;
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

export default isEmpty;
