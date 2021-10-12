import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    objPokemon: {},
    pokemon: [],
    user: {
      initials: "JD",
      fullName: "Jesus David Germán Labandera",
      email: "jdgerman@hotmail.com",
      cel: "6621074622",
      edad: "23",
      carrera: "TICS",
      ciudad: "Hermosillo,Son.",
    },
    filter: {
      nombre: "",
    },
    pokemonUrl: "",
    recargar: true,
  },
  mutations: {
    GET_POKEMONS(state, payload) {
      state.pokemon = payload;
      state.recargar = true;
    },
    GET_POKEMON(state, payload) {
      state.objPokemon = payload;
    },
    NEXT_POKEMON(state, payload) {
      let nextDatos = payload.results.forEach((pokemon) => {
        state.pokemon.results.push(pokemon);
      });
      state.pokemon.next = nextDatos.next;
    },
    BUSCAR(state, payload) {
      if (state.filter.nombre != "") {
        let r = payload.results.filter((e) => {
          return (
            e.name.toLowerCase().includes(state.filter.nombre.toLowerCase()) ||
            e.url
              .substring(34)
              .replace("/", "")
              .toLowerCase()
              .includes(state.filter.nombre.toLowerCase())
          );
        });
        payload.results = r;
      }
      state.pokemon = payload;
      state.recargar = true;
    },
  },
  actions: {
    async getPokemons({ commit }) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/`)
        .then((response) => commit("GET_POKEMONS", response.data));
    },
    async getPokemon({ commit, state }) {
      await axios
        .get(state.pokemonUrl)
        .then((response) => commit("GET_POKEMON", response.data));
    },
    async nextPokemon({ commit, state }) {
      await axios
        .get(state.pokemon.next)
        .then((response) => commit("NEXT_POKEMON", response.data));
    },
    async buscar({ commit }) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/`)
        .then((response) => commit("BUSCAR", response.data));
    },
  },
  getters: {
    usuarios(state) {
      return state.user;
    },
    pokemons(state) {
      return state.pokemon;
    },
    pokemon(state) {
      return state.objPokemon;
    },
  },
});
