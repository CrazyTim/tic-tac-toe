// sometimes html entities in JSX are escaped, so we need to use unicode in a JavaScript string
export const NON_BREAKING_SPACE = '\u00A0'; // &nbsp;
export const ZERO_WIDTH_SPACE = '\u200B'; // &ZeroWidthSpace;

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

/* Wrapper for `localStorage` to check if the browser supports it */
export class WebStorage {

  save (key, val) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, val);
      return true;
    }
    return false;
  }

  /* Note: localStorage will always return a string
  /* You may need to coerce the type after loading
  */
  load (key) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return ''
  }

}
