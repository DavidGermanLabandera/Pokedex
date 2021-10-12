<template>
 <v-card
    :color="tipo"
    class="mx-auto my-14 main-card pb-16"
    shaped
    dark
    max-width="400"
    max-height="440"
  >

   <v-card
    :color="tipo"
    shaped
    dark
    max-width="400"
    @click="showStats = !showStats"
  >
 <div v-if="pokemon.sprites" >
    <img
      class="avatar-pokemon"
      :src="pokemon.sprites.other['official-artwork'].front_default"
      alt=""
    />
  </div>

    <v-card-title 
      class="capitalize d-flex justify-center display-1 font-weight-bold"
    >
      {{ poke.name }} # {{poke.url.substring(34).replace("/","")}}
    </v-card-title>
    <v-card-text class="rounded-xl pb-16 white" >
      <v-row>
        <v-col cols="12">
          <h3 class="grey--text text--darken-3 text-center">Type</h3>
        </v-col>
        <v-col
          cols="6"
          class="py-0 my-0"
          v-for="type in pokemon.types"
          :key="type.id"
        >
          <h3 class="pa-1 rounded-pill text-center capitalize" :class="tipo">
            {{ type.type.name }}
          </h3>
        </v-col>
        <v-divider class="grey lighten-2 mt-4 mx-4"></v-divider>
        <v-col cols="12" class="pb-1">
          <h3 class="grey--text text--darken-3 text-center font-weight-bold">
            Abilities
          </h3>
        </v-col>
        <v-col
          cols="6"
          class="py-0 my-0"
          v-for="ability in pokemon.abilities"
          :key="ability.id"
        >
          <h3 class="grey--text pa-1 text-center capitalize">
            {{ ability.ability.name }}
          </h3>
        </v-col>
      </v-row>
    </v-card-text>
     </v-card>

    <v-card shaped class="sprites" @click="showStats = !showStats">
      <v-card-actions>
        <v-divider class="grey lighten-2 mt-4 mx-4"></v-divider>
        <v-btn text>[ Detalles ] </v-btn>
        <v-spacer><v-divider class="grey lighten-2 mt-4 mx-4"></v-divider></v-spacer>
        <v-btn icon >
          <v-icon  >{{
            showStats ?  "x" : "+"
          }}</v-icon>
        </v-btn>
     
      </v-card-actions>
      <v-expand-transition>
        
        <div v-show="showStats" class="overflow-hidden" max-height="460">
          
            <v-card class="mx-auto my-5 main-card pb-19"  :color="tipo">
              <v-row class="m-0">
                <v-col cols="12">
                <v-row align-content="center" >
                <v-col cols="3">
                  <img
                      class="avatar-pokemon"
                      :src="pokemon.sprites.other['official-artwork'].front_default"
                      height="100" width="100"
                    />
                </v-col>
                <v-col cols="9" style="font-size:21px">
                 # {{poke.url.substring(34).replace("/","")}} -  <strong style="font-size:25px">{{ poke.name }}</strong>
                 <v-divider class="grey lighten-2 mt-4 mx-4"></v-divider>
                </v-col>
                
                  <v-col  cols="4"  style="margin-top:20px">
                        <v-card  color="white" align="center">
                    <strong class="text-center" style="color:black" >Tipos:</strong>
                      </v-card>
                  </v-col>
                  <v-col
                   style="margin-top:20px"
                    cols="4"
                    v-for="type in pokemon.types"
                    :key="type.id"
                  >
                    <v-card  :color="tipo" align="center" >
                      <strong class="pa-1 rounded-pill text-center capitalize" :class="tipo">
                      {{ type.type.name }}
                    </strong>
                      </v-card>
                  </v-col>
                  <v-col cols="12">  <v-divider class="grey lighten-2 mt-4 mx-4"></v-divider></v-col>
                
                  <v-col cols="4"  style="margin-top:18px">
                        <v-card  color="white" align="center">
                          <strong class="text-center" style="color:black" >Habilidades:</strong>
                    
                      </v-card>
                  </v-col>
                 <v-col
                    style="margin-top:20px"
                    cols="4"
                    v-for="ability in pokemon.abilities"
                    :key="ability.id"
                  >
                     <v-card :color="tipo" align="center" >
                      <strong class="text-center capitalize" :class="tipo">
                   {{ ability.ability.name }}
                    </strong>
                      </v-card>
                  </v-col>
                
               </v-row>

             </v-col>
 
            </v-row>

           </v-card>
      
          <v-row class="m-0">
            <v-col cols="12">
             <h1 align="center">Estadísticas</h1>
              <v-divider class="grey lighten-2 mt-4 mx-4"></v-divider>
            </v-col>
            
          </v-row>

          <v-row class="m-0">
            <v-col cols="4" v-for="stat in pokemon.stats" :key="stat.id">
              <h5 class="capitalize text-center">{{ stat.stat.name }}</h5>
              <h5 class="text-center mt-1 font-weight-regular">
                 <v-progress-linear
                  :value="stat.base_stat"
                  :buffer-value="stat.base_stat"
                  :color="tipo"
                  height="14"
                > {{ stat.base_stat }}</v-progress-linear>
              
                <v-divider></v-divider>
              </h5>
            </v-col>
          </v-row>
           <v-row class="m-0">
            <v-col cols="12">
             
            </v-col>
          </v-row>
        </div>
 
      </v-expand-transition>

    </v-card>

  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: { poke: Object },
  name: "CardPokemon",
  data() {
    return {
      pokemon: {
      },
      showSprite: false,
      showDream: false,
      showStats: false,
      tipo: "",

    };
  },
  methods: {
    async getPokemon() {
      let poke = this.poke;
      try {
        let datos = await axios.get(poke.url);
        this.pokemon = datos.data;

      } catch (error) {
        console.log(error);
      } finally {
        console.log();
      }
    },
    colourtype() {
      let type = this.pokemon.types[0].type.name;
      switch (type) {
        case "normal":
          this.tipo = "grey";
          break;
        case "fire":
          this.tipo = "deep-orange";
          break;
        case "water":
          this.tipo = "blue";
          break;
        case "grass":
          this.tipo = "green";
          break;
        case "electric":
          this.tipo = "amber";
          break;
        case "ice":
          this.tipo = "cyan lighten-3";
          break;
        case "fighting":
          this.tipo = "red darken-4";
          break;
        case "poison":
          this.tipo = "deep-purple darken-1";
          break;
        case "ground":
          this.tipo = "lime darken-4";
          break;
        case "flying":
          this.tipo = "teal lighten-3";
          break;
        case "psychic":
          this.tipo = "purple accent-3";
          break;
        case "bug":
          this.tipo = "lime darken-2";
          break;
        case "rock":
          this.tipo = "brown darken-2";
          break;
        case "ghost":
          this.tipo = "indigo lighten-2";
          break;
        case "dragon":
          this.tipo = "indigo darken-4";
          break;
        case "dark":
          this.tipo = "blue-grey darken-4";
          break;
        case "steel":
          this.tipo = "blue-grey lighten-1";
          break;
        case "fairy":
          this.tipo = "pink lighten-3";
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.getPokemon();
  },
  updated() {
    this.colourtype();
  },
};
</script>

<style lang="sass" scoped>
.main-card
  background-image: url('../assets/img/bg.svg')
  background-size: 80%
  background-position: center
  position: relative

.sprites
  position: absolute
  width: 100%
  bottom: -3.5em

.capitalize
  text-transform: capitalize

.avatar-pokemon
  margin-top: -100px
  margin-bottom: -50px
  width: 100%
</style>