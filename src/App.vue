<template>
  <div class="cellphone-bottom-top d-flex align-center justify-center" style="top: 0px">
    <div class="camera-circle"></div>
  </div>
  <v-app class="background-size">
    <div v-if="$route.path != '/cadastrar' && 
      $route.path != '/login' && 
      $route.path != '/recuperarsenha' && 
      $route.path != '/adicionardadospessoais' && 
      $route.path != '/adicionardadosendereco' && 
      $route.path != '/adicionardadosmedicos' && 
      $route.path != '/adicionardadoscontato'">
      <NavBarComponent />
    </div>
    <v-main class="app-background-color layout-bottom">
      <router-view />
    </v-main>
  </v-app>
  <div class="cellphone-bottom-top" style="bottom: 0px"></div>
</template>

<script>
import firebase from 'firebase/compat/app';
import NavBarComponent from '@/components/NavBarComponent.vue';

export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: { 
    NavBarComponent 
  },
  methods:{
    LogOut: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>