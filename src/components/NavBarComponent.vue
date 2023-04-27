<template>
    <v-app-bar
    class="border-b app-bar"
    :elevation="0"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div class="d-flex mr-4">
        <h1 class="fonte logoNavBar logo-primeiro">SOS</h1>
        <h1 class="fonte logoNavBar logo-segundo">HELPER</h1>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      class="app-bar app-nav-bar"
      temporary
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          link
        >
        <div class="d-flex align-center">
          <v-list-item-icon>
            <v-icon color="#a80b29">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="pl-2">
            <v-list-item-title class="navigation-list-title fonte">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </div>
        </v-list-item>
        <v-list-item @click="LogOut">
          <div class="d-flex align-center">
            <v-list-item-icon>
              <v-icon color="#a80b29">mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content class="pl-2">
              <v-list-item-title class="navigation-list-title fonte">SAIR</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>
</template>

<script>
import firebase from 'firebase/compat/app';

export default({
  data: () => ({
    drawer: false,
    items: [
          { title: 'HOME', icon: 'mdi-home', path: '/'},
          { title: 'MEUS CONTATOS', icon: 'mdi-contacts', path: '/meuscontatos'},
          { title: 'MEUS ENDEREÇOS', icon: 'mdi-home-city', path: '/meusenderecos'},
          { title: 'TELEFONES ÚTEIS', icon: 'mdi-phone-classic', path: '/telefonesuteis'},
          { title: 'TUTORIAL', icon: 'mdi-help-box', path: '/tutorial'},
          { title: 'CONFIGURAÇÕES', icon: 'mdi-cog', path: '/editardados'},

        ],
    }),
    methods:{
        LogOut: function() {
          firebase.auth().signOut().then(() => {
            this.$router.replace('login')
          })
        }
      }
});
</script>
<style>
.logoNavBar{
  font-size: 2.1rem !important;
}
</style>
