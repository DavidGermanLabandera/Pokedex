<template>
      <div>
            <v-toolbar
              dark
              src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
              <v-app-bar-nav-icon><v-img max-height="50" max-width="50" src="../assets/img/pokebola.png"></v-img></v-app-bar-nav-icon>

              <v-toolbar-title>POKEDEX</v-toolbar-title>

              <v-spacer style="margin-Top:26px">
                  <v-container>
                  <v-row>
                    
                    <v-col cols="7">
                      <v-text-field 
                          v-model="filtro" 
                          v-onChange
                          filled
                          rounded
                          dense
                          placeholder="Pokémon" append-icon="mdi-magnify" label="Nombre y/o Número"></v-text-field>
                    </v-col>
                    <v-col cols="2" style="margin-Top:10px">
                      <v-btn @click="getPokemons" elevation="2">Buscar</v-btn>
                    </v-col>
                  </v-row>
                </v-container> 
              </v-spacer>

              <v-app-bar-nav-icon>  
              <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="black"
              size="48"
            >
              <span class="white--text text-h5">{{ $store.getters.usuarios.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>


        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="black"
              >
                <span class="white--text text-h5">{{ $store.getters.usuarios.initials }}</span>
              </v-avatar>
              <h3>Mi Cuenta</h3>
              <p class="text-caption mt-1">
                Ciudad: <strong>{{$store.getters.usuarios.ciudad}}</strong>
              </p>

              <h3>{{ $store.getters.usuarios.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ $store.getters.usuarios.email }}
              </p>
              <p class="text-caption mt-1">
                {{ $store.getters.usuarios.cel }}
              </p>
              <p class="text-caption mt-1">
                {{ $store.getters.usuarios.edad }} años
              </p>
            
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Disconnect
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
        
      </v-menu>
              </v-app-bar-nav-icon>
              
          </v-toolbar>

               
        </div>
</template>

<script>

export default {
  name: "Menu",
  data (){
    return{filtro: ''}
  },
  methods: {
     getPokemons(){
        this.$store.state.filter.nombre = this.filtro;
        this.$store.state.recargar = false;
        this.$store.dispatch("buscar");

     }, 
  },
  created() {
    this.getPokemons();
  },
};
</script>