<template>
    <v-card class="login-card">
        <div>
            <v-card-title class="align-centers justify-center d-flex pa-0">
                <div class="d-flex" >
                    <h1 class="fonte logo-primeiro">SOS</h1>
                    <h1 class="fonte">HELPER</h1>
                </div>
            </v-card-title>
            <v-card-title class="align-center justify-center d-flex pa-0">
                <h3 class="texto-h3-paginas">INFORMAÇÕES PESSOAIS</h3>
            </v-card-title>
            <v-card-text class="card-text">
                <v-text-field
                    v-model="state.nascimento"
                    v-mask="'##/##/####'"
                    hide-details="true"
                    variant="solo"
                    label="Data de nascimento"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.nascimento.$error" class="cardsubtitle fonte-regular">
                    {{ v$.nascimento.$errors[0].$message }} 
                </v-card-subtitle>
                <v-text-field
                    v-model="state.naturalidade"
                    hide-details="true"
                    variant="solo"
                    label="Naturalidade"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.naturalidade.$error" class="cardsubtitle fonte-regular">
                    {{ v$.naturalidade.$errors[0].$message }} 
                </v-card-subtitle>
                <v-text-field
                    v-model="state.profissao"
                    hide-details="true"
                    variant="solo"
                    label="Profissão"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.profissao.$error" class="cardsubtitle fonte-regular">
                    {{ v$.profissao.$errors[0].$message }} 
                </v-card-subtitle>
                <v-text-field
                    v-model="state.cpfcnpj"
                    v-mask="['###.###.###-##', '##.###.###/####-##']"
                    hide-details="true"
                    variant="solo"
                    label="CPF/CNPJ"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.cpfcnpj.$error" class="cardsubtitle fonte-regular">
                    {{ v$.cpfcnpj.$errors[0].$message }} 
                </v-card-subtitle>
                <v-text-field
                    v-model="state.rg"
                    hide-details="true"
                    variant="solo"
                    label="RG"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.rg.$error" class="cardsubtitle fonte-regular">
                    {{ v$.rg.$errors[0].$message }} 
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
import {mask} from 'vue-the-mask'
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { dataValida } from "@/validators";
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '@/main.js'
// import { addDoc, collection } from 'firebase/firestore'
import { setDoc, doc } from 'firebase/firestore'


export default({
    directives: {mask},
    setup() {
        const state = reactive({
            nascimento:'',
            naturalidade:'',
            profissao:'',
            cpfcnpj:'',
            rg:'',
        })
        const rules = computed(() => {
            return{
                nascimento: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                    dataValida: helpers.withMessage('Insira uma data válida', dataValida),
                },
                naturalidade: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) 
                },
                profissao: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) 
                },
                cpfcnpj: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) , minLength: helpers.withMessage('O cpf/cnpj deve ter no mínimo 11 caracteres', minLength(14))
                },
                rg: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                },
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
                console.log('Formulário aprovado.')
                this.CadastrarDadosPessoais();
            } else {
                console.log(this.v$)
            }
        },
        CadastrarDadosPessoais() {
            setDoc(doc(db, "usuario/" + auth.currentUser.uid + "/info_pessoal", "0"), {
              data_nasc: this.state.nascimento,
              naturalidade: this.state.naturalidade,
              profissao: this.state.profissao,
              cpf_cnpj: this.state.cpfcnpj,
              rg: this.state.rg,
            });

            this.$router.push('/adicionardadosendereco')
        }
    },
    async mounted(){
        const querySnapshot = await getDocs(collection(db, 'usuario/a@a.com/info_pessoal'));
        querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    })
    }
});
</script>



  