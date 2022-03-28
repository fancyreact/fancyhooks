import cloneDeep from 'lodash/cloneDeep';

import deepClone from './deepClone.utility';

jest.mock('lodash/cloneDeep');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('deepClone.utility', () => {
  test('should not call mocked `cloneDeep` if type of value function', (done) => {
    const cloned = deepClone(jest.fn());

    expect(typeof cloned).toEqual('function');
    expect(cloneDeep).toBeCalledTimes(0);

    done();
  });

  test('should call mocked `cloneDeep` if type of value number', (done) => {
    const value = 123;
    deepClone(value);

    expect(cloneDeep).toBeCalledTimes(1);
    expect(cloneDeep).toBeCalledWith(value);

    done();
  });

  test('should call mocked `cloneDeep` if type of value string', (done) => {
    const value = 'fancyhooke';
    deepClone(value);

    expect(cloneDeep).toBeCalledTimes(1);
    expect(cloneDeep).toBeCalledWith(value);

    done();
  });

  test('should call mocked `cloneDeep` if type of value object', (done) => {
    const value = { name: 'fancyhooke' };
    deepClone(value);

    expect(cloneDeep).toBeCalledTimes(1);
    expect(cloneDeep).toBeCalledWith(value);

    done();
  });

  test('should call mocked `cloneDeep` if type of value array', (done) => {
    const value = ['fancyhooke'];
    deepClone(value);

    expect(cloneDeep).toBeCalledTimes(1);
    expect(cloneDeep).toBeCalledWith(value);

    done();
  });
});
