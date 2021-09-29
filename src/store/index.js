import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user: "",
    shop: {},
    remain: {},
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    shop(state, payload) {
      state.shop = payload;
    },
    remain(state, payload) {
      state.remain = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "https://rocky-wave-13285.herokuapp.com/api/login",
        {
          email: email,
          password: password,
        }
      );
      const responseUser = await axios.get(
        "https://rocky-wave-13285.herokuapp.com/api/user",
        {
          params: {
            email: email,
          }
        }
      );
      commit("auth", responseLogin.data.auth);
      commit("user", responseUser.data.data[0]);
      if (this.state.auth == true) {
        console.log(this.remain);
        if (this.remain != null) {
          router.replace(`/detail/${this.state.remain.shop_id}`);
        } else {
          router.replace("/mypage");
        }
      }
    },
    async seeDetail(context, data) {
      await context.commit("shop", data);
    },
    async remain(context, data) {
      await context.commit("remain", data);
    },
    logout({ commit }) {
      axios
        .post("https://rocky-wave-13285.herokuapp.com/api/logout", {
          auth: this.state.auth,
        })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
          commit("user", "");
          router.replace("/login");
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
  modules: {
  }
})
