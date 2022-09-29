function isEmpty(obj: any) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

export default isEmpty;
