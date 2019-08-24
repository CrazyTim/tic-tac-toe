
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
