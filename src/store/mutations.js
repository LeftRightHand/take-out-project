import  * as types from './mutation-types'

const mutations = {
  [types.SET_FOOD](state, food) {
    state.food = food
  }
};

export default mutations
