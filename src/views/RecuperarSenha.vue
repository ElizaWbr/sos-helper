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
            <h3 class="texto-h3-paginas">RECUPERAÇÃO DE SENHA</h3>
        </v-card-title>
        <v-card-subtitle class="cardsubtitle mb-0 fonte-regular">
            Para recuperar a sua senha, informe o seu email que um link para a alteração da senha será enviado.
        </v-card-subtitle>
        <v-card-text class="card-text">
            <v-text-field
                v-model="state.emailRecuperarSenha"
                hide-details="true"
                variant="solo"
                label="Email"
                class="mb-3 fonte-regular"
            ></v-text-field>
            <v-card-subtitle v-if="v$.emailRecuperarSenha.$error" class="cardsubtitle fonte-regular">
                {{ v$.emailRecuperarSenha.$errors[0].$message }} 
            </v-card-subtitle>
            <v-card-subtitle v-if="mensagemEnviada != '' " class="cardsubtitle fonte-regular">
                {{ mensagemEnviada }} 
            </v-card-subtitle>
            <v-btn
                class="botao-login text-font-botao"
                @click="validarDados"
            >
                Enviar
            </v-btn>
        </v-card-text>
    </div>
</v-card>
</template>

<script>
import { defineComponent } from 'vue';
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { auth } from '@/main.js'
import { sendPasswordResetEmail } from 'firebase/auth'

export default defineComponent({
name: 'RecuperarSenha',
data: () => ({
        mensagemEnviada: '',
    }),
setup() {
        const state = reactive({
            emailRecuperarSenha:'',
        })
        const rules = computed(() => {
            return{
                emailRecuperarSenha: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                    email: helpers.withMessage('Este não é um email válido', email)
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
                alert('Form successfully submitted.')
                this.RecuperarSenha();
            } else {
                alert('Form failed validation')
                console.log(this.v$)
            }
        },
        RecuperarSenha(){
            sendPasswordResetEmail(auth, this.state.emailRecuperarSenha)
            .then(() => {
                this.mensagemEnviada = 'Email enviado! Verifique a sua caixa de entrada.'
            })
            .catch((error) => {
                this.mensagemEnviada = 'Email não enviado, verifique se o endereço de email está correto'
                console.log('Não enviou ' + error)
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
