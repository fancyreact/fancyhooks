import cloneDeep from 'lodash/cloneDeep';

export function deepClone<T>(value: T): T {
  return typeof value === 'function' ? value.bind({}) : cloneDeep(value);
}

export default deepClone;
