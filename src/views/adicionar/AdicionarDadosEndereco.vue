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
                <h3 class="texto-h3-paginas">ADICIONAR ENDEREÇO</h3>
            </v-card-title>
            <v-card-text class="card-text">
                <v-text-field
                    v-model="state.nomeendereco"
                    hide-details="true"
                    variant="solo"
                    label="Nome do Endereço"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.nomeendereco.$error" class="cardsubtitle fonte-regular">
                    {{ v$.nomeendereco.$errors[0].$message }} 
                </v-card-subtitle>
                <div class="div-dividida">
                    <v-text-field
                        v-model="state.cep"
                        v-mask="'#####-###'"
                        hide-details="true"
                        variant="solo"
                        label="CEP"
                        class="mb-3 dividida-grande pr-3 fonte-regular"
                    ></v-text-field>
                    <v-btn
                        class="dividida-pequena botao-pesquisar"
                        @click="CarregarEndereco"
                    >
                        Confirmar
                    </v-btn>
                </div>
                <v-card-subtitle v-if="this.state.valor==true" class="cardsubtitle fonte-regular">
                    Cep não encontrado
                </v-card-subtitle>
                <v-card-subtitle v-if="v$.cep.$error" class="cardsubtitle fonte-regular">
                    {{ v$.cep.$errors[0].$message }} 
                </v-card-subtitle>
                <v-text-field
                    v-model="state.endereco"
                    hide-details="true"
                    variant="solo"
                    label="Endereço"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.endereco.$error" class="cardsubtitle fonte-regular">
                    {{ v$.endereco.$errors[0].$message }} 
                </v-card-subtitle>
                <div class="div-dividida">
                    <v-text-field
                        v-model="state.numero"
                        hide-details="true"
                        variant="solo"
                        label="Número"
                        class="mb-3 dividida-pequena pr-3 fonte-regular"
                    ></v-text-field>
                    <v-text-field
                        v-model="state.complemento"
                        hide-details="true"
                        variant="solo"
                        label="Complemento"
                        class="mb-3 dividida-grande pr-0 fonte-regular"
                    ></v-text-field>
                </div>
                <v-card-subtitle v-if="v$.numero.$error" class="cardsubtitle fonte-regular">
                    {{ v$.numero.$errors[0].$message }} 
                </v-card-subtitle>
                <v-text-field
                    v-model="state.referencia"
                    hide-details="true"
                    variant="solo"
                    label="Referência"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-text-field
                    v-model="state.bairro"
                    hide-details="true"
                    variant="solo"
                    label="Bairro"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.bairro.$error" class="cardsubtitle fonte-regular">
                    {{ v$.bairro.$errors[0].$message }} 
                </v-card-subtitle>
                <div class="div-dividida">
                    <v-text-field
                        v-model="state.estado"
                        hide-details="true"
                        variant="solo"
                        label="Estado"
                        class="mb-3 dividida-pequena pr-3 fonte-regular"
                    ></v-text-field>
                    <v-text-field
                        v-model="state.cidade"
                        hide-details="true"
                        variant="solo"
                        label="Cidade"
                        placeholder=""
                        class="mb-3 dividida-grande pr-0 fonte-regular"
                    ></v-text-field>
                </div>
                <v-card-subtitle v-if="v$.estado.$error" class="cardsubtitle fonte-regular">
                    {{ v$.estado.$errors[0].$message }} 
                </v-card-subtitle>
                <v-card-subtitle v-if="v$.cidade.$error" class="cardsubtitle fonte-regular">
                    {{ v$.cidade.$errors[0].$message }} 
                </v-card-subtitle>
            </v-card-text>
            <div class="pl-4 pr-4">
                <v-btn
                class="botao-salvar"
                @click="validarDados"
                >
                    Salvar
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios'
import {mask} from 'vue-the-mask'
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'

import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '@/main.js'

export default({
  directives: {mask},
  data: () => ({
      response: null,
      baseUrl: 'https://viacep.com.br/ws/'
  }),
  setup() {
      const state = reactive({
          nomeendereco:'',
          cep:'',
          endereco:'',
          numero:'',
          complemento:'',
          referencia:'',
          bairro:'',
          estado:'',
          cidade:'',

          valor: false,
      })
      const rules = computed(() => {
          return{
              nomeendereco: { 
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
              },
              cep: { 
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required),
                  minLength: helpers.withMessage('O cep deve ter no mínimo 8 caracteres', minLength(9)),
              },
              endereco: { 
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) 
              },
              numero: { 
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) 
              },
              bairro: { 
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) 
              },
              estado: { 
                  required: helpers.withMessage('O campo estado não pode ficar vazio', required) 
              },
              cidade: { 
                  required: helpers.withMessage('O campo cidade não pode ficar vazio', required) 
              },
          }
      })
      const v$ = useValidate(rules, state)
      return { state, v$ }
  },
methods:{
  CarregarEndereco(){
      const url = `${this.baseUrl}${this.state.cep}/json/`
      axios.get(url).then(resp => {
          const data = resp.data
          this.state.endereco = data.logradouro;
          this.state.numero = data.numero;
          this.state.complemento = data.complemento;
          this.state.bairro = data.bairro;
          this.state.estado = data.uf;
          this.state.cidade = data.localidade;
          console.log(data)
          if (!data.erro) {
            this.response = data
            this.state.valor = false;
          } else {
            alert('Cep não encontrado')
            this.state.valor = true;
            
          }
      }).catch(error => {
          console.error(error);
      })  
  },
  validarDados() {
    this.v$.$validate() // checks all inputs
    if (!this.v$.$error) {
        // if ANY fail validation
        console.log('Formulário aprovado.')
        this.CadastrarEndereco();

    } else {
        console.log(this.v$)
    }
  },
  CadastrarEndereco(){
    addDoc(collection(db, "usuario/" + auth.currentUser.uid + "/endereco"), {
      nome_endereco: this.state.nomeendereco,
      cep: this.state.cep,
      endereco: this.state.endereco,
      numero: this.state.numero,
      complemento: this.state.complemento,
      referencia: this.state.referencia,
      bairro: this.state.bairro,
      estado: this.state.estado,
      cidade: this.state.cidade,
    });
    this.$router.push('/adicionardadosmedicos')
  }
}
});
</script>

