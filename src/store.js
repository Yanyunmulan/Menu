import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menu: [],
  ws: null
}

const mutations = {
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  ADD_ITEM: (state, item) => {
    state.menu.push(item)
  },
  SET_WEBSOCKET: (state, ws) => {
    state.ws = ws
  }
}

const actions = {
  initializeWebSocket({ commit, dispatch }) {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type === 'updateMenu') {
        commit('SET_MENU', message.menu)
      } else if (message.type === 'addItem') {
        commit('ADD_ITEM', message.item)
      }
    }

    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
      // Reconnect after a delay
      setTimeout(() => {
        dispatch('initializeWebSocket')
      }, 1000)
    }

    commit('SET_WEBSOCKET', ws)
  },
  addItem({ commit, state }, item) {
    commit('ADD_ITEM', item)
    // Send the updated item to the server
    if (state.ws) {
      state.ws.send(JSON.stringify({ type: 'addItem', item }))
    }
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
