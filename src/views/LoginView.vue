<template>
    <v-card class="login-card">
        <div>
            <v-card-title class="align-center justify-center d-flex pa-0">
                <div class="d-flex" >
                    <h1 class="fonte logo-primeiro">SOS</h1>
                    <h1 class="fonte">HELPER</h1>
                </div>
            </v-card-title>
            <v-card-title class="align-center justify-center d-flex pa-0">
                <h3 class="texto-h3-paginas">LOGIN</h3>
            </v-card-title>
            <v-card-text class="card-text">
                <v-text-field
                    v-model="state.emailLogin"
                    hide-details="true"
                    variant="solo"
                    label="Email"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.emailLogin.$error" class="cardsubtitle fonte-regular">
                    {{ v$.emailLogin.$errors[0].$message }} 
                </v-card-subtitle>

                <v-text-field
                    v-model="state.senhaLogin"
                    hide-details="true"
                    variant="solo"
                    label="Senha"
                    class="mb-3 fonte-regular"
                    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append-inner="show = !show"
                ></v-text-field>
                <v-card-subtitle v-if="v$.senhaLogin.$error" class="cardsubtitle fonte-regular">
                    {{ v$.senhaLogin.$errors[0].$message }} 
                </v-card-subtitle>

                <v-btn
                    class="botao-login text-font-botao"
                    @click="validarDados"
                >
                    Entrar
                </v-btn>
                <div class="btn-actions pt-2">
                    <router-link to="/recuperarsenha">
                        Esqueceu a senha?
                    </router-link>
                    <v-spacer></v-spacer>
                    <router-link to="/cadastrar">
                        Cadastrar
                    </router-link>
                </div>
            </v-card-text>
        </div>
    </v-card>
</template>
  
<script>
import { defineComponent } from 'vue';
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import firebase from 'firebase/compat/app';
  
export default defineComponent({
    name: 'LoginView',
    data: () => ({
      show: false,
    }),
    setup() {
        const state = reactive({
            emailLogin:'',
            senhaLogin:'',
        })
        const rules = computed(() => {
            return{
                emailLogin: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                    email: helpers.withMessage('Este não é um email válido', email)
                },
                senhaLogin: {
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                }
            }
        })
        const v$ = useValidate(rules, state)
        return { state, v$ }
    },
    methods: {
        validarDados() {
            this.v$.$validate() // checks all inputs
            if (!this.v$.$error) {
                // if ANY fail validation
                console.log('Formulario Enviado')
                this.LoginUsuario();
            } else {
                console.log(this.v$)
            }
        },
        LoginUsuario() {
        firebase.auth().signInWithEmailAndPassword(this.state.emailLogin, this.state.senhaLogin)
        .then(() => {
            this.$router.push('/home')
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    },
});
</script>

  <style>
.v-field.v-field--appended{
    padding-right: 16px;
}
</style>
  