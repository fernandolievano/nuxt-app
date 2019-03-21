import env from '~/env.js'

export const state = () => ({
  gifs: [],
  stickers: [],
  results: [],
  limit: 12,
  limitResults: 6,
  rating: 'g',
  query: '',
  offset: 0
})

export const mutations = {
  SET_GIFS(state, gifs) {
    state.gifs = gifs
  },
  SET_STICKERS(state, stickers) {
    state.stickers = stickers
  },
  SET_RESULTS(state, results) {
    state.results = results
  },
  CLEAN_RESULTS(state) {
    state.results = []
  },
  SET_QUERY(state, query) {
    state.query = query
  },
  NEXT_PAGE(state) {
    state.offset += state.limitResults
  }
}

export const actions = {
  async fetchGifs({ commit, state }) {
    const response = await this.$axios.$get(
      `https://api.giphy.com/v1/gifs/trending?api_key=${env.API_KEY}&limit=${
        state.limit
      }&rating=${state.rating}`
    )
    commit('SET_GIFS', response.data)
  },
  async fetchStickers({ commit, state }) {
    const response = await this.$axios.$get(
      `https://api.giphy.com/v1/stickers/trending?api_key=${
        env.API_KEY
      }&limit=${state.limit}&rating=${state.rating}`
    )
    commit('SET_STICKERS', response.data)
  },
  async searchGifs({ commit, state }) {
    const response = await this.$axios.$get(
      `https://api.giphy.com/v1/gifs/search?api_key=${env.API_KEY}&limit=${
        state.limitResults
      }&rating=${state.rating}&q=${state.query}&offset=${state.offset}`
    )
    commit('SET_RESULTS', response.data)
  },
  async resultsNextPage({ dispatch, commit }) {
    await commit('NEXT_PAGE')
    dispatch('searchGifs')
  },
  setQuery({ commit }, query) {
    commit('SET_QUERY', query)
  }
}
export const getters = {
  //
}
