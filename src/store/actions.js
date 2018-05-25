import * as types from './mutation-types'

export const selectFood = function ({commit, state}, {food}) {
  commit(types.SET_FOOD, food);
}
