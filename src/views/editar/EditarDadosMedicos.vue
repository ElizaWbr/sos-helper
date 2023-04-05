<template>
  <v-card-title class="align-center justify-center d-flex pa-0">
      <h3 class="texto-h3-paginas mt-4">INFORMAÇÕES MÉDICAS</h3>
  </v-card-title>
  <v-card-text class="card-text">
      <v-text-field
          v-model="state.cartaosus"
          v-mask="'### #### #### ####'"
          hide-details="true"
          variant="solo"
          label="Número do cartão do SUS"
          class="mb-3 fonte-regular"
      ></v-text-field>
      <v-card-subtitle v-if="v$.cartaosus.$error" class="cardsubtitle fonte-regular">
          {{ v$.cartaosus.$errors[0].$message }} 
      </v-card-subtitle>

      <v-select
          :items="itemsSangue"
          v-model="state.selectSangue"
          label="Tipo Sanguíneo"
          variant="solo"
      ></v-select>
      <v-card-subtitle v-if="v$.selectSangue.$error" class="cardsubtitle fonte-regular">
          {{ v$.selectSangue.$errors[0].$message }} 
      </v-card-subtitle>

      <v-select
          :items="itemsDoenca"
          v-model="selectDoenca"
          label="Possui alguma doença ou síndrome?"
          variant="solo"
      ></v-select>
      <v-text-field
          v-if="selectDoenca == 'Sim'"
          v-model="doenca"
          hide-details="true"
          variant="solo"
          label="Qual?"
          class="mb-3 fonte-regular"
      ></v-text-field>

      <v-select
          :items="itemsAlergia"
          v-model="selectAlergia"
          label="Possui alguma alergia?"
          variant="solo"
      ></v-select>
      <v-text-field
          v-if="selectAlergia == 'Sim'"
          v-model="alergia"
          hide-details="true"
          variant="solo"
          label="Qual?"
          class="mb-3 fonte-regular"
      ></v-text-field>

      <v-select
          :items="itemsMedicacao"
          v-model="selectMedicacao"
          label="Faz uso de alguma medicação?"
          variant="solo"
      ></v-select>
      <v-text-field
          v-if="selectMedicacao == 'Sim'"
          v-model="medicacao"
          hide-details="true"
          variant="solo"
          label="Qual?"
          class="mb-3 fonte-regular"
      ></v-text-field>

      <v-select
          :items="itemsCirurgia"
          v-model="selectCirurgia"
          label="Já fez alguma cirurgia?"
          variant="solo"
      ></v-select>
      <v-text-field
          v-if="selectCirurgia == 'Sim'"
          v-model="cirurgia"
          hide-details="true"
          variant="solo"
          label="Qual?"
          class="mb-3 fonte-regular"
      ></v-text-field>

      <v-select
          :items="itemsPlano"
          v-model="selectPlano"
          label="Possui plano de saúde?"
          variant="solo"
      ></v-select>
      <v-text-field
          v-if="selectPlano == 'Sim'"
          v-model="planoNome"
          hide-details="true"
          variant="solo"
          label="Nome do Plano"
          class="mb-3 fonte-regular"
      ></v-text-field>
      <v-text-field
          v-if="selectPlano == 'Sim'"
          v-model="planoCartao"
          hide-details="true"
          variant="solo"
          label="Número do cartão"
          class="mb-3 fonte-regular"
      ></v-text-field>
      
  </v-card-text>
  <div class="pl-4 pr-4">
      <v-btn
      class="botao-salvar"
      @click="validarDados"
      >
          Salvar
      </v-btn>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/main.js'


export default({
  directives: {mask},
data: () => ({
  itemsSangue: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-',],
  itemsDoenca: ['Sim', 'Não'],
  itemsAlergia: ['Sim', 'Não'],
  itemsMedicacao: ['Sim', 'Não'],
  itemsCirurgia: ['Sim', 'Não'],
  itemsPlano: ['Sim', 'Não'],

  selectDoenca: 'Não',
  selectAlergia: 'Não',
  selectMedicacao: 'Não',
  selectCirurgia: 'Não',
  selectPlano: 'Não',

  doenca:'',
  alergia:'',
  medicacao:'',
  cirurgia:'',
  planoNome:'',
  planoCartao:'',

  doenca_sindrome:'',
  alergia_:'',
  medicacao_:'',
  cirurgia_:'',
  plano_:'',
  planoNome_:'',
  planoCartao_:'',
}),
setup() {
      const state = reactive({
          cartaosus:'',
          selectSangue:'',
      })
      const rules = computed(() => {
          return{
              cartaosus: { 
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                  minLength: helpers.withMessage('O número do cartão do SUS deve ter no mínimo 15 caracteres', minLength(18)),
              },
              selectSangue: { 
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required),
              },
          }
      })
      const v$ = useValidate(rules, state)
      return { state, v$ }
  },
methods:{
  validarDados() {
    this.v$.$validate() // checks all inputs
    if (!this.v$.$error) {
        // if ANY fail validation
        console.log('Formulário aprovado.');
        this.EnviarDadosEditados();
    } else {
        console.log(this.v$);
    }
  },
  EnviarDadosEditados(){
    if(this.selectDoenca == 'Não'){
        this.doenca_sindrome = 'Não';
    }else{
        this.doenca_sindrome = this.doenca;
    }
    if(this.selectAlergia == 'Não'){
        this.alergia_ = 'Não';
    }else{
        this.alergia_ = this.alergia;
    }
    if(this.selectMedicacao == 'Não'){
        this.medicacao_ = 'Não';
    }else{
        this.medicacao_ = this.medicacao;
    }
    if(this.selectCirurgia == 'Não'){
        this.cirurgia_ = 'Não';
    }else{
        this.cirurgia_ = this.cirurgia;
    }
    if(this.selectPlano == 'Não'){
      this.plano_ = 'Não';
      this.planoNome_ = '';
      this.planoCartao_ = '';
    } else {
      this.plano_ = this.selectPlano;
      this.planoNome_ = this.planoNome;
      this.planoCartao_ = this.planoCartao;
    }
    setDoc(doc(db, 'usuario/' + auth.currentUser.uid + '/info_saude', '0'), {
        tipo_sanguineo: this.state.selectSangue,
        cartao_sus: this.state.cartaosus,
        doenca_sindrome: this.doenca_sindrome,
        alergia: this.alergia_,
        medicacao: this.medicacao_,
        cirurgia: this.cirurgia_,
        plano: this.plano_,
        plano_saude:[
            this.planoNome_,
            this.planoCartao_
        ]
      });

      this.$router.push('/editardados')
  }
},
async mounted(){
  const querySnapshot = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/info_saude'));
  querySnapshot.forEach((doc) => {
    this.state.selectSangue = doc.data().tipo_sanguineo;
    this.state.cartaosus = doc.data().cartao_sus;

    //DOENÇA OU SÍNDROME
    if(doc.data().doenca_sindrome == 'Não'){
      this.selectDoenca = 'Não';
    } else {
      this.selectDoenca = 'Sim';
      this.doenca = doc.data().doenca_sindrome;
    }

    //ALERGIA
    if(doc.data().alergia == 'Não'){
      this.selectAlergia = 'Não';
    } else {
      this.selectAlergia = 'Sim';
      this.alergia = doc.data().alergia;
    }

    //CIRURGIA
    if(doc.data().cirurgia == 'Não'){
      this.selectCirurgia = 'Não';
    } else {
      this.selectCirurgia = 'Sim';
      this.cirurgia = doc.data().cirurgia;
    }

    //MEDICAÇÃO
    if(doc.data().medicacao == 'Não'){
      this.selectMedicacao = 'Não';
    } else {
      this.selectMedicacao = 'Sim';
      this.medicacao = doc.data().medicacao;
    }

    //PLANO DE SAÚDE
    if(doc.data().plano == 'Não'){
      this.selectPlano = 'Não';
    } else {
      this.selectPlano = 'Sim';
      this.plano = doc.data().plano;
      this.planoNome = doc.data().plano_saude[0];
      this.planoCartao = doc.data().plano_saude[1];
    }

  })
}
});
</script>

