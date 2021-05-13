import Vue from "vue"
import Vuex from "vuex"

import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";
import state from "./state";
//vuex的报告日志 可以提供mutation赋值数据变化情况
import createLogger from "vuex/dist/logger";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
