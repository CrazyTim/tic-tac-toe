export const ZERO_WIDTH_SPACE = '\u200B';
export const NON_BREAKING_SAPCE = '\u00A0';

export function clone(x) {
  // clone an array or object

  if (x === null) {
    return x;
  } else if (Array.isArray(x)) {
    return [...x];
  } else if (typeof x === 'object'){
    return {...x};
  } else {
    return x;
  }

}

export function isNumber(s) {
  if (typeof s !== "string" && typeof s !== "number") return false; // only process numbers and strings
  if (s === 0) return true;
  // could also coerce to string: str = ""+str
  return !isNaN(s) && !isNaN(parseFloat(s));
}
