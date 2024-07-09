// store.js V3
import Vue from 'vue';
import Vuex from 'vuex';
import { io } from 'socket.io-client';

Vue.use(Vuex);

const socket = io('http://10.0.88.221:3000');

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    UPDATE_CART(state, cart) {
      state.cart = cart;
    }
  },
  actions: {
    initializeWebSocket({ commit }) {
      socket.on('cart', (cart) => {
        commit('UPDATE_CART', cart);
      });
    },
    addItemToCart(_, item) {
      socket.emit('add_item', item);
    }
  }
});
