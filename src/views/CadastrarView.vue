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
              <h3 class="texto-h3-paginas">CADASTRAR</h3>
          </v-card-title>
          <v-card-text class="card-text">
            <v-text-field
                v-model="state.nomeCompleto"
                hide-details="true"
                variant="solo"
                label="Nome Completo"
                class="mb-3 fonte-regular"
            ></v-text-field>
            <v-card-subtitle v-if="v$.nomeCompleto.$error" class="cardsubtitle fonte-regular">
                  {{ v$.nomeCompleto.$errors[0].$message }} 
            </v-card-subtitle>
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
              v-model="state.numeroTelefone"
              v-mask="['+#############']"
              hide-details="true"
              variant="solo"
              label="Número de Telefone"
              class="mb-3 fonte-regular"
            ></v-text-field>
            <v-card-subtitle v-if="v$.numeroTelefone.$error" class="cardsubtitle fonte-regular">
                  {{ v$.numeroTelefone.$errors[0].$message }} 
            </v-card-subtitle>
            <v-text-field
                v-model="state.senhaLogin"
                hide-details="true"
                variant="solo"
                label="Senha"
                class="mb-3 fonte-regular"
                type="password"
            ></v-text-field>
            <v-card-subtitle v-if="v$.senhaLogin.$error" class="cardsubtitle fonte-regular">
                  {{ v$.senhaLogin.$errors[0].$message }} 
            </v-card-subtitle>

            <v-text-field
                v-model="state.senhaCorrespondente"
                hide-details="true"
                variant="solo"
                label="Repita a Senha"
                class="mb-3 fonte-regular"
                type="password"
            ></v-text-field>
            <v-card-subtitle v-if="v$.senhaCorrespondente.$error" class="cardsubtitle fonte-regular">
                  {{ v$.senhaCorrespondente.$errors[0].$message }} 
            </v-card-subtitle>

            <v-card-subtitle class="mb-4 fonte-regular" v-if="mensagemErro != '' && mensagemErro.includes('email-already-in-use')">
              Não foi possível efetuar o cadastro, este email já está sendo usado.
            </v-card-subtitle>

            <v-btn
                class="botao-login text-font-botao"
                @click="validarDados"
            >
                Cadastrar
            </v-btn>
            <div class="btn-actions pt-2">
                <v-spacer></v-spacer>
                <router-link @click="trocando" to="/login">
                    Fazer Login
                </router-link>
            </div>
        </v-card-text>
      </div>
  </v-card>
</template>

<script>
import {mask} from 'vue-the-mask'
import { defineComponent } from 'vue';
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import firebase from 'firebase/compat/app';
// import { addDoc, collection } from 'firebase/firestore'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/main.js'

export default defineComponent({
  directives: {mask},
  name: 'CadastrarView',
data: () => ({
  mensagemErro:'',
  show: false,
}),
setup() {
        const state = reactive({
            nomeCompleto:'',
            emailLogin:'',
            numeroTelefone:'',
            senhaLogin:'',
            senhaCorrespondente:'',
        })
        const rules = computed(() => {
            return{
                nomeCompleto:{
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                },
                emailLogin: { 
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                  email: helpers.withMessage('Este não é um email válido', email)
                },
                numeroTelefone: {
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                  minLength: helpers.withMessage('O numero de telefone deve ter no mínimo 13 caracteres', minLength(14))
                },
                senhaLogin: {
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                    minLength: helpers.withMessage('A senha deve ter no mínimo 6 caracteres', minLength(6))
                },
                senhaCorrespondente:{
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) , 
                  sameAs: helpers.withMessage('As senhas não correspondem', sameAs(state.senhaLogin)) 
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
                console.log('Formulário Aprovado.')
                this.RegistrarUsuario();
            } else {
                console.log(this.v$)
            }
        },
        RegistrarUsuario() {
          firebase.auth().createUserWithEmailAndPassword(this.state.emailLogin, this.state.senhaLogin)
          .then(data => {
            setDoc(doc(db, "usuario", auth.currentUser.uid), {
              nome_completo: this.state.nomeCompleto,
              email: this.state.emailLogin,
              numero: this.state.numeroTelefone,
            });
            console.log(data)
            this.$router.push('/adicionardadospessoais')
          })

          .catch((error) => {
            this.mensagemErro = error.message;
          });

    },
  }
});
</script>
