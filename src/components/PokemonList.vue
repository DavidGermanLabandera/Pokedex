<template>
  <v-container>
    <v-row>
       <v-col align="center" cols="12" >     
         <h1 v-if="$store.getters.pokemons.results == 0 ">No se encontraron coincidencias, favor de cargar mas pokemons</h1>        
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
        v-for="poke in $store.getters.pokemons.results"
        :key="poke.id"
      >
        <CardPokemon :poke="poke" v-if="$store.state.recargar"/>
        
      </v-col>
    </v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn ref="refToElement" @click="nextPokemon" depressed rounded x-large color="primary" class="ma-10">Cargar Más </v-btn>
    </v-col>

  </v-container>
</template>

<script>
import CardPokemon from "@/components/CardPokemon.vue";

export default {
  name: "PokemonList",
  components: {
    CardPokemon,
  },
  methods: {
     getPokemons(){
       this.$store.dispatch("getPokemons");
     }, 
     nextPokemon(){
       this.$store.dispatch("nextPokemon");
     }
  },
  created() {
    this.getPokemons();
    if(this.$store.getters.pokemons.lenght == 0){
       this.$refs.refToElement.focus();
    }
  },
  updated(){
    
  }

};
</script>
