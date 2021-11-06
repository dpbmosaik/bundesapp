<template>
  <div>
    <h1> Startseite </h1>
    <v-card>
      <v-toolbar
        :color=this.farbe
        dark
        flat
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Your Dashboard</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs
            farbe="light-green darken-3"
            v-model="tab"
            align-with-title
            show-arrows
          >
            <v-tabs-slider color="light-green lighten-1"></v-tabs-slider>

            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}  
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
          <v-card flat>
            {{getInhalt(item)}}
            <v-img src="@/assets/aussicht.jpg" 
            aspect-ratio="1" 
            v-on:click=atClick() 
            v-if= "item==this.items[0]"
            >
           
            <div class="centered">
                  Click
              </div>
            </v-img>
          </v-card>
          
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    

    <!-- <v-img
      aspect-ratio="1"
      src="@/assets/aussicht.jpg"
    ></v-img> -->
      <v-row>
    <v-col
      v-for="n in 4"
      :key="n"
      class="d-flex child-flex"
      cols="6"
    >
    {{getPicture(n)}}
      <v-img
        aspect-ratio="1"
        :src=getPicture(n)
        class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  </div>
</template>

<script>
export default {
    data () {
      return {
        tab: null,
        items: [
          'Start', 'Anmelden','Registrieren','Wiki','Kalender','Inspirator','Pfinder',
        ],
        farbe : "light-green darken-3"
      }
    },
    methods:{
      atClick(){
        this.farbe="green lighten-2"
      },
      getInhalt(item){
        let text
        switch (item) {
          case this.items[0]:
            text= "Es gibt keine Inhlat1, sry";
            break;
          case this.items[1]:
            text="Es gibt keine Inhlat2, sry";
            break;
          case this.items[2]:
            text= "Es gibt keine Inhlat3, sry";
            break;
          case this.items[4]:
            text= "Es gibt keine Inhlat4, sry";
            break;
          default:
            text="Es gibt keine Inhlat, sry";
        }return  text;    
      },
      getPicture(num){
        let text
        switch (num) {
          case 1:
            text= "@/assets/wiese.jpg"
            break;
          case 2:
            text= "@/assets/aussicht.jpg"
            break;
          case 3:
            text= "@/assets/feuer.jpg"
            break;
          case 4:
            text= "@/assets/wandern.jpg"
            break;
          default:
            text="hier stünde ihr pfad";
        }return  text;
      }
    },
  }
</script>

<style>
.centered {
  background-color:rgba(0, 255, 64, 0);
  color:rgb(56, 27, 27);
  font-weight:bolder;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -40%);
}
</style>