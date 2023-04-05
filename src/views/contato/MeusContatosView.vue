<template>
    <div v-if="meuscontatos==true">
        <v-card-title class="align-center justify-center d-flex pb-4 pt-4">
            <h3 class="texto-h3-paginas">MEUS CONTATOS</h3>
        </v-card-title>
        <v-card-text class="pb-0">
            <v-text-field
                v-model="pesquisa"
                density="compact"
                variant="solo"
                placeholder="Pesquise aqui..."
                label="Pesquise aqui..."
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                class="fonte-regular"
            ></v-text-field>
        </v-card-text>
        <v-card
            v-for="(item, index) in filteredList"
            :key="index"
            class="ma-4 pa-2"
            link
        >
            <div class="d-flex align-center flex-row">
                <v-list-item-content class="pl-2 list-content-not-full">
                    <v-list-item-title class="navigation-list-title fonte text-uppercase title-white-space-normal">{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle class="fonte-regular">{{ item.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn
                    variant="text"
                    size="large"
                    icon
                    @click="EditarDadosContato(item.editId)"
                    >
                    <v-icon color="#a80b29">mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                    color="#ebe7e0"
                    icon
                    :href="`tel:${item.numero}`"
                >
                    <v-icon color="#a80b29">mdi-phone</v-icon>
                </v-btn>
            </div>
        </v-card>
        <v-card
        v-if="MensagemPesquisaSemResposta == true"
        class="ma-4 pa-2"
        link
        >
            <div>
                <v-list-item-content>
                    <v-list-item-title class="navigation-list-title fonte text-uppercase title-white-space-normal pl-2 pr-2">Nenhum contato encontrado</v-list-item-title>
                    <v-list-item-subtitle class="fonte-regular title-white-space-normal pa-2">Tente verificar se as palavras foram digitadas corretamente ou utilize outra palavra-chave.</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
            </div>
        </v-card>
        <div class="pl-4 pr-4">
            <v-btn
                class="botao-login text-font-botao"
                to="/adicionarcontato"
            >
                ADICIONAR NOVO CONTATO
            </v-btn>
        </div>
    </div>
    <div v-if="editarcontato==true">
        <v-card-title class="align-center justify-center d-flex pa-0">
            <h3 class="texto-h3-paginas mt-4">EDITAR CONTATO</h3>
        </v-card-title>
        <v-card-text class="card-text">
            <v-text-field
                v-model="state.nome_completo_"
                hide-details="true"
                variant="solo"
                label="Nome Completo"
                class="mb-3 fonte-regular"
            ></v-text-field>
            <v-card-subtitle v-if="v$.nome_completo_.$error" class="cardsubtitle fonte-regular">
                {{ v$.nome_completo_.$errors[0].$message }} 
            </v-card-subtitle>

            <v-text-field
                v-model="state.apelido_"
                hide-details="true"
                variant="solo"
                label="Apelido"
                class="mb-3 fonte-regular"
            ></v-text-field>
            <v-card-subtitle v-if="v$.apelido_.$error" class="cardsubtitle fonte-regular">
                {{ v$.apelido_.$errors[0].$message }} 
            </v-card-subtitle>

            <v-text-field
                v-model="state.email_"
                hide-details="true"
                variant="solo"
                label="Email"
                class="mb-3 fonte-regular"
            ></v-text-field>
            <v-card-subtitle v-if="v$.email_.$error" class="cardsubtitle fonte-regular">
                {{ v$.email_.$errors[0].$message }} 
            </v-card-subtitle>
            
            <v-text-field
                v-model="state.numero_"
                v-mask="['+#############']"
                hide-details="true"
                variant="solo"
                label="Número de Telefone"
                class="mb-3 fonte-regular"
            ></v-text-field>
            <v-card-subtitle v-if="v$.numero_.$error" class="cardsubtitle fonte-regular">
                {{ v$.numero_.$errors[0].$message }} 
            </v-card-subtitle>

            <v-card-subtitle v-if="ErroAoExcluir == true" class="cardsubtitle fonte-regular mb-0">
                Não foi possível excluir este contato. É obrigatório ter no mínimo um contato salvo. 
            </v-card-subtitle>

        </v-card-text>
        <div class="pl-4 pr-4">
            <v-btn
            variant="text"
            class="botao-delete mb-2"
            @click="dialogCerteza = true"
            >
                Excluir contato
            </v-btn>
            <v-btn
            class="botao-salvar"
            @click="validarDados"
            >
                Salvar
            </v-btn>
        </div>
    <!-- Tem Certeza -->
    <v-dialog
      v-model="dialogCerteza"
      max-width="290"
    >
        <v-card class="pa-4">
            <v-card-title class="texto-h3-paginas d-flex justify-center">
                TEM CERTEZA QUE
            </v-card-title>
            <v-card-title class="texto-h3-paginas d-flex justify-center">
                DESEJA EXCLUIR ESTE
            </v-card-title>
            <v-card-title class="texto-h3-paginas d-flex justify-center">
                CONTATO?
            </v-card-title>
    
            <div class="d-flex ma-4">
                <v-btn
                class="botao-certeza-nao"
                @click="dialogCerteza = false"
                >
                    Não
                </v-btn>
                <v-btn
                variant="text"
                class="botao-certeza-sim"
                @click="DeleteContato(state.id_)"
                >
                    Sim
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
    <!-- /Tem Certeza -->
    </div>
</template>

<script>
import {mask} from 'vue-the-mask'
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore'

import { auth, db } from '@/main.js'

export default({
    directives: {mask},
    data: () => ({
            items:[],
            meuscontatos: true,
            editarcontato: false,
            dialogCerteza: false,

            pesquisa: '',
            MensagemPesquisaSemResposta: false,
            ErroAoExcluir: false,
    }),
    setup() {
        const state = reactive({
            nome_completo_:'',
            apelido_: '',
            email_:'',
            numero_:'',
            id_:'',
        })
        const rules = computed(() => {
            return{
                nome_completo_: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                },
                apelido_: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                },
               numero_: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                    minLength: helpers.withMessage('O numero de telefone deve ter no mínimo 13 caracteres', minLength(14))
                },
                email_: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required),
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
                console.log('Formulário aprovado.');
                this.EnviarDadosEditados();
            } else {
                console.log(this.v$);
            }
        },
        EnviarDadosEditados(){
            setDoc(doc(db, "usuario/" + auth.currentUser.uid + "/contato", this.state.id_), {
                nome_contato: this.state.nome_completo_,
                apelido_contato: this.state.apelido_,
                email_contato: this.state.email_,
                numero_contato: this.state.numero_,
            });

            this.meuscontatos = true;
            this.editarcontato = false;
        },
        async EditarDadosContato(contatoId){
            this.meuscontatos = false;
            this.editarcontato = true;

            console.log(contatoId)
            const querySnapshot = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/contato'))
            querySnapshot.forEach((doc) => {
                if(doc.id == contatoId){
                    this.state.nome_completo_ = doc.data().nome_contato;
                    this.state.apelido_ = doc.data().apelido_contato;
                    this.state.email_ = doc.data().email_contato
                    this.state.numero_ = doc.data().numero_contato;
                    this.state.id_ = doc.id;

                    console.log("CONTATO SELECIONADO - " + doc.id, "=>", doc.data());
                }
            })
        },
        SemResposta(filteredSearch){
            if(filteredSearch == 1){
                this.MensagemPesquisaSemResposta = false;
            }
            if(filteredSearch.length == 0){
                this.MensagemPesquisaSemResposta = true;
            } else {
                this.MensagemPesquisaSemResposta = false;
            }
        },
        async DeleteContato(contatoId){
            const querySnapshot = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/contato'))
            this.dialogCerteza = false
            if(querySnapshot.docs.length > 1){
                const docRef = doc(db, "usuario/" + auth.currentUser.uid + '/contato', contatoId);
                deleteDoc(docRef);
                this.meuscontatos = true;
                this.editarcontato = false;
                console.log('Contato ' + contatoId + ' foi deletado com sucesso!')
                //deletar o usuario selecionado
            }else{
                this.ErroAoExcluir = true;
            }
        }
    },
    async mounted(){
        const querySnapshot = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/contato'));
        querySnapshot.forEach((doc) => {
            this.items.push({
                title: doc.data().apelido_contato, 
                subtitle: doc.data().numero_contato, 
                editId: doc.id, 
                numero: doc.data().numero_contato,
            })
        })
    },
    computed: {
        filteredList() {
            if(this.pesquisa.length == 0){
                const valor = 1
                this.SemResposta(valor)
            }
            if(this.pesquisa.trim().length > 0){
                const filteredSearch = this.items.filter((item) => item.title.toLowerCase().includes(this.pesquisa.trim().toLowerCase()))
                if(filteredSearch.length == 0){
                    console.log('ta vazio')
                    this.SemResposta(filteredSearch);
                } else {
                this.SemResposta(filteredSearch);
                }
                return filteredSearch
            }
            return this.items
        },
    },
});
</script>
<style scoped>
.list-content-not-full{
    max-width: 68%;
}
</style>
