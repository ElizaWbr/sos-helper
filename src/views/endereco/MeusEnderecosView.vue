<template>
    <div v-if="meusenderecos == true">
        <v-card-title class="align-center justify-center d-flex pb-4 pt-4">
            <h3 class="texto-h3-paginas">MEUS ENDEREÇOS</h3>
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
                    <v-list-item-subtitle class="fonte-regular">{{ item.endereco }}, {{ item.numero }}, {{ item.bairro }}, {{ item.cidade }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn
                    variant="text"
                    size="large"
                    icon
                    @click="EditarDadosEndereco(item.editId)"
                    >
                    <v-icon color="#a80b29">mdi-pencil</v-icon>
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
                    <v-list-item-title class="navigation-list-title fonte text-uppercase title-white-space-normal pl-2 pr-2">Nenhum endereço encontrado</v-list-item-title>
                    <v-list-item-subtitle class="fonte-regular title-white-space-normal pa-2">Tente verificar se as palavras foram digitadas corretamente ou utilize outra palavra-chave.</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
            </div>
        </v-card>
        <div class="pl-4 pr-4">
            <v-btn
                class="botao-login text-font-botao"
                to="/adicionarendereco"
            >
                ADICIONAR NOVO ENDEREÇO
            </v-btn>
        </div>
    </div>
    <div v-if="editarendereco==true">
        <v-card-title class="align-center justify-center d-flex pa-0">
            <h3 class="texto-h3-paginas mt-4">ADICIONAR ENDEREÇO</h3>
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

            <v-card-subtitle v-if="ErroAoExcluir == true" class="cardsubtitle fonte-regular mb-0">
                Não foi possível excluir este endereço. É obrigatório ter no mínimo um endereço salvo. 
            </v-card-subtitle>

        </v-card-text>
        <div class="pl-4 pr-4">
            <v-btn
            variant="text"
            class="botao-delete mb-2"
            @click="dialogCerteza = true"
            >
                Excluir endereço
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
                ENDEREÇO?
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
                @click="DeleteContato(id_)"
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
import axios from 'axios'
import {mask} from 'vue-the-mask'
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'

import { auth, db } from '@/main.js'
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore'

export default({
    directives: {mask},
    data: () => ({
        items:[],
        response: null,
        baseUrl: 'https://viacep.com.br/ws/',

        pesquisa: '',
        MensagemPesquisaSemResposta: false,
        ErroAoExcluir: false,
        dialogCerteza: false,
        id_:'',

        meusenderecos: true,
        editarendereco: false,
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

          id_:'',
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
    methods: {
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
                this.EnviarDadosEditados();

            } else {
                console.log(this.v$)
            }
        },
        EnviarDadosEditados(){
        setDoc(doc(db, "usuario/" + auth.currentUser.uid + "/endereco", this.state.id_), {
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

          this.meusenderecos = true;
          this.editarendereco = false;
        },
        async EditarDadosEndereco(enderecoId){
            this.meusenderecos = false;
            this.editarendereco = true;
            this.id_ = enderecoId;

            const querySnapshot = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/endereco'))
            querySnapshot.forEach((doc) => {
                if(doc.id == enderecoId){
                    this.state.nomeendereco= doc.data().nome_endereco;
                    this.state.cep = doc.data().cep;
                    this.state.endereco = doc.data().endereco;
                    this.state.numero = doc.data().numero;
                    this.state.complemento = doc.data().complemento;
                    this.state.referencia = doc.data().referencia;
                    this.state.bairro = doc.data().bairro;
                    this.state.estado = doc.data().estado;
                    this.state.cidade = doc.data().cidade;

                    this.state.id_ = doc.id;
                }
            })
        },
        SemResposta(filteredSearch){
            if(filteredSearch == 1){
                this.MensagemPesquisaSemResposta = false;
            }
            if(filteredSearch.length == 0){
                this.MensagemPesquisaSemResposta = true;
                console.log('variavel true')
            } else {
                this.MensagemPesquisaSemResposta = false;
                console.log('variavel false')
            }
        },
        async DeleteContato(enderecoId){
            const querySnapshot = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/endereco'))
            this.dialogCerteza = false
            if(querySnapshot.docs.length > 1){
                const docRef = doc(db, "usuario/" + auth.currentUser.uid + '/endereco', enderecoId);
                deleteDoc(docRef);
                this.meusenderecos = true;
                this.editarendereco = false;
                //deletar o usuario selecionado
            }else{
                this.ErroAoExcluir = true;
            }
        }
    },
    async mounted(){
        const querySnapshot = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/endereco'));
        querySnapshot.forEach((doc) => {
            this.items.push({
                title: doc.data().nome_endereco,
                endereco: doc.data().endereco,
                numero: doc.data().numero,
                bairro: doc.data().bairro,
                cidade: doc.data().cidade,
                editId: doc.id,
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
    max-width: 82%;
}
</style>