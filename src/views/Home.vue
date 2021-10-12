<template>
  <v-app class="deep-purple lighten-4"> 
    <header class="header">
       <Menu />
    </header>
    <v-container >
        <section class="section" color="primary">
          <div class="d-flex justify-center">
            <v-img max-width="300px" src="../assets/img/logopokemon.png"></v-img>
          </div>
          <PokemonList />
        </section>
    </v-container>
  </v-app>
</template>

<script>

import PokemonList from "@/components/PokemonList.vue";
import Menu from "@/components/Menu.vue";

export default {
  name: "Home",
  components: {
    PokemonList,
    Menu,
  },
};
</script>
