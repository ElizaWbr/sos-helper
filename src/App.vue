<template>
  <v-app>
    <div v-if="$route.path != '/cadastrar' && 
      $route.path != '/login' && 
      $route.path != '/recuperarsenha' && 
      $route.path != '/adicionardadospessoais' && 
      $route.path != '/adicionardadosendereco' && 
      $route.path != '/adicionardadosmedicos' && 
      $route.path != '/adicionardadoscontato'">
      <NavBarComponent />
    </div>
    <v-main class="app-background-color">
      <router-view />
    </v-main>
  </v-app>
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