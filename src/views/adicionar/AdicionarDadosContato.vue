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
                <h3 class="texto-h3-paginas">ADICIONAR CONTATO</h3>
            </v-card-title>
            <v-card-text class="card-text">
                <v-text-field
                    v-model="state.nomeContatoCompleto"
                    hide-details="true"
                    variant="solo"
                    label="Nome Completo"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.nomeContatoCompleto.$error" class="cardsubtitle fonte-regular">
                    {{ v$.nomeContatoCompleto.$errors[0].$message }} 
                </v-card-subtitle>

                <v-text-field
                    v-model="state.nomeContatoApelido"
                    hide-details="true"
                    variant="solo"
                    label="Apelido"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.nomeContatoApelido.$error" class="cardsubtitle fonte-regular">
                    {{ v$.nomeContatoApelido.$errors[0].$message }} 
                </v-card-subtitle>

                <v-text-field
                    v-model="state.emailContato"
                    hide-details="true"
                    variant="solo"
                    label="Email"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.emailContato.$error" class="cardsubtitle fonte-regular">
                    {{ v$.emailContato.$errors[0].$message }} 
                </v-card-subtitle>
                
                <v-text-field
                    v-model="state.numeroContato"
                    v-mask="['+#############']"
                    hide-details="true"
                    variant="solo"
                    label="Número de Telefone"
                    class="mb-3 fonte-regular"
                ></v-text-field>
                <v-card-subtitle v-if="v$.numeroContato.$error" class="cardsubtitle fonte-regular">
                    {{ v$.numeroContato.$errors[0].$message }} 
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
import { required, email, minLength, helpers } from '@vuelidate/validators'

import { getDocs, addDoc, collection } from 'firebase/firestore'
import { auth, db } from '@/main.js'

export default({
    directives: {mask},
    setup() {
        const state = reactive({
            nomeContatoCompleto:'',
            nomeContatoApelido: '',
            numeroContato:'',
            emailContato:'',
        })
        const rules = computed(() => {
            return{
                nomeContatoCompleto: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                },
                nomeContatoApelido: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                },
                numeroContato: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                    minLength: helpers.withMessage('O numero de telefone deve ter no mínimo 13 caracteres', minLength(14))
                },
                emailContato: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required),
                    email: helpers.withMessage('Este não é um email válido', email)
                },
            }
        })
        const v$ = useValidate(rules, state)
        return { state, v$ }
    },
    async mounted(){
        const querySnapshot = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/contato'));
        console.log(querySnapshot.docs.length)
    },
    methods: {
        validarDados() {
            this.v$.$validate() // checks all inputs
            if (!this.v$.$error) {
                // if ANY fail validation
                console.log('Formulário aprovado.')
                this.CadastrarContato();

            } else {
                console.log(this.v$)
            }
        },
        CadastrarContato() {
            addDoc(collection(db, "usuario/" + auth.currentUser.uid + "/contato"), {
                nome_contato: this.state.nomeContatoCompleto,
                apelido_contato: this.state.nomeContatoApelido,
                email_contato: this.state.emailContato,
                numero_contato: this.state.numeroContato,
            });
            this.$router.push('/home')
        }
    },
});
</script>