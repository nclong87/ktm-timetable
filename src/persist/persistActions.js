import * as types from './persistTypes';

export function update({ isHydrated }) {
  return {
    type: types.UPDATE,
    isHydrated,
  };
}

export default update;
