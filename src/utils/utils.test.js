import * as Util from './utils.js'

test('clone() - works for objects', () => {

  // Arrange
  const obj = {a: 1, b: 2};

  // Act
  const result = Util.clone(obj);

  // Assert
  expect(result).toEqual({a: 1, b: 2});
  expect(Object.is(obj, result)).toEqual(false);

});

test('clone() - works for arrays', () => {

  // Arrange
  const obj = [1,2];

  // Act
  const result = Util.clone(obj);

  // Assert
  expect(result).toEqual([1,2]);
  expect(Object.is(obj, result)).toEqual(false);

});

test('clone() - works for everything else', () => {

  // Assert
  expect(Util.clone('1')).toEqual('1');
  expect(Util.clone(1)).toEqual(1);
  expect(Util.clone(true)).toEqual(true);
  expect(Util.clone(null)).toEqual(null);
  expect(Util.clone(undefined)).toEqual(undefined);

});

test('isNumber()', () => {

  // Assert
  expect(

    // only process numbers and strings
    Util.isNumber(0) &&
    Util.isNumber('0') &&
    Util.isNumber(.0) &&
    Util.isNumber('.0') &&
    Util.isNumber(.1) &&
    Util.isNumber('.1') &&
    Util.isNumber(1) &&
    Util.isNumber('1') &&
    Util.isNumber(-1) &&
    Util.isNumber('-1') &&
    Util.isNumber(1.0) &&
    Util.isNumber('1.0') &&
    Util.isNumber(-1.0) &&
    Util.isNumber('-1.0') &&
    Util.isNumber(1.1) &&
    Util.isNumber('1.1') &&
    Util.isNumber(-1.1) &&
    Util.isNumber('-1.1') &&
    Util.isNumber(1e+1) &&
    Util.isNumber('1e+1') &&
    Util.isNumber(-1e+1) &&
    Util.isNumber('-1e+1') &&

    // return false for everything else
    !Util.isNumber('') &&
    !Util.isNumber(NaN) &&
    !Util.isNumber(null) &&
    !Util.isNumber(undefined) &&
    !Util.isNumber({}) &&
    !Util.isNumber([]) &&
    !Util.isNumber(true) &&
    !Util.isNumber(false)

  ).toEqual(true);

});

test('WebStorage()', () => {

  // Arrange
  const storage = new Util.WebStorage();

  // Act
  storage.save('1', '1');

  // Assert
  expect(storage.load('1')).toEqual('1');

});
