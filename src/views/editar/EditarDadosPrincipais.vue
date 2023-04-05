<template>
    <v-card-title class="align-center justify-center d-flex pa-0">
        <h3 class="texto-h3-paginas mt-4">INFORMAÇÕES PRINCIPAIS</h3>
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
        <v-card-subtitle v-if="ErroExclusao == true" class="cardsubtitle fonte-regular mb-0">
            Não foi possível excluir a conta.
        </v-card-subtitle>
        <v-card-subtitle v-if="ErroEditarDados == true" class="cardsubtitle fonte-regular mb-0">
            Não foi possível alterar os dados 
        </v-card-subtitle>
    </v-card-text>
    <div class="pl-4 pr-4">
        <v-btn
        variant="text"
        class="botao-delete mb-2"
        @click="dialogCerteza = true"
        >
            Excluir conta
        </v-btn>
        <v-btn
        class="botao-salvar"
        @click="dialogSalvarDados = true"
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
                DESEJA EXCLUIR A
            </v-card-title>
            <v-card-title class="texto-h3-paginas d-flex justify-center">
                SUA CONTA?
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
                @click="dialogExclusao = true, dialogCerteza = false"
                >
                    Sim
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
    <!-- /Tem Certeza -->

    <!-- Excluir Conta Dialog -->
    <v-dialog
      v-model="dialogExclusao"
      max-width="290"
    >
        <v-card class="pa-4">
            <v-card-title class="texto-h3-paginas d-flex justify-center mb-3">
                INSIRA SUA SENHA
            </v-card-title>

            <v-text-field
                v-model="state.senhaExclusao"
                hide-details="true"
                type="password"
                variant="solo"
                label="Senha"
                class="mb-3 fonte-regular"
            ></v-text-field>
            <v-card-subtitle v-if="ErroSenhaExclusao == true " class="cardsubtitle mb-3 fonte-regular mb-0">
                Senha Inválida
            </v-card-subtitle>
            <v-btn
            class="botao-salvar"
            @click="DeletarConta"
            >
                Deletar
            </v-btn>
        </v-card>
    </v-dialog>
    <!-- /Excluir Conta Dialog -->

    <!-- Salvar Novos Dados Dialog -->
    <v-dialog
      v-model="dialogSalvarDados"
      max-width="290"
    >
        <v-card class="pa-4">
            <v-card-title class="texto-h3-paginas d-flex justify-center">
                INSIRA SUA SENHA
            </v-card-title>

            <v-text-field
                v-model="state.senhaSalvarDados"
                hide-details="true"
                type="password"
                variant="solo"
                label="Senha"
                class="mb-3 fonte-regular"
            ></v-text-field>
        
            <v-btn
            class="botao-salvar"
            @click="validarDados"
            >
                Salvar
            </v-btn>
        </v-card>
        <v-card-subtitle v-if="ErroSenhaEditarDados == true" class="cardsubtitle fonte-regular mb-0">
            Senha Inválida
        </v-card-subtitle>
    </v-dialog>
    <!-- /Salvar Novos Dados Dialog -->

  </template>
  
  <script>
  import {mask} from 'vue-the-mask'
  import { reactive, computed } from 'vue'
  import useValidate from '@vuelidate/core'
  import { required, email, helpers, minLength } from '@vuelidate/validators'
  import { getDoc, setDoc, deleteDoc, doc } from 'firebase/firestore'
  import { auth, db } from '@/main.js'

  import firebase from 'firebase/compat/app';
  import { updateEmail, deleteUser } from 'firebase/auth'
  
  export default({
    directives: {mask},
    data: () => ({
        dialogSalvarDados: false,
        dialogCerteza: false,
        dialogExclusao: false,
        ErroExclusao: false,
        ErroSenhaExclusao: false,
        ErroSenhaEditarDados: false,
        ErroEditarDados: false,
    }),
    setup() {
        const state = reactive({
            emailLogin:'',
            nomeCompleto:'',
            senhaExclusao:'',
            senhaSalvarDados:'',
            numeroTelefone:'',
        })
        const rules = computed(() => {
            return{
                emailLogin: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                    email: helpers.withMessage('Este não é um email válido', email)
                },
                nomeCompleto: { 
                    required: helpers.withMessage('Esse campo não pode ficar vazio', required) 
                },
                numeroTelefone: {
                  required: helpers.withMessage('Esse campo não pode ficar vazio', required) ,
                  minLength: helpers.withMessage('O numero de telefone deve ter no mínimo 13 caracteres', minLength(14))
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
                this.validarSenhaEditarDados();
            } else {
                console.log(this.v$);
            }
        },
        validarSenhaEditarDados(){
            const emailNovo = this.state.emailLogin;
            firebase.auth()
            .signInWithEmailAndPassword(auth.currentUser.email, this.state.senhaSalvarDados)
            .then (() => {
                console.log('Senha Aprovada')
                updateEmail(auth.currentUser, emailNovo).then(() => {
                    console.log('Usuário alterado')
                    this.EnviarDadosEditados();
                }).catch((error) => {
                    this.ErroEditarDados = true
                    console.log('Não alterou' + error)
                });
            }).catch((error) => {
                this.ErroSenhaEditarDados = true
                console.log('Senha inválida ' + error)
            })
        },
        EnviarDadosEditados(){
          setDoc(doc(db, "usuario/" + auth.currentUser.uid), {
              email: this.state.emailLogin,
              nome_completo: this.state.nomeCompleto,
              numero: this.state.numeroTelefone,
            });
  
            this.$router.push('/editardados')
        },
        DeletarConta(){
            const usuario = auth.currentUser;
            const usuarioId = auth.currentUser.uid;
            const docRef = doc(db, "usuario", usuarioId);
            firebase.auth()
            .signInWithEmailAndPassword(auth.currentUser.email, this.state.senhaExclusao)
            .then (() => {
                console.log('Senha do delete Aprovada')
                deleteUser(usuario).then(() => {
                    console.log('Usuário deletado')
                    deleteDoc(docRef);
                    this.$router.push('/login')
                }).catch((error) => {
                    this.ErroExclusao = true
                    console.log('Dados não excluidos' + error);
                });
            }).catch((error) => {
                this.ErroSenhaExclusao = true
                console.log(this.ErroSenhaExclusao)
                console.log('Dados não excluidos' + error)
            })

        },
    },
    async mounted(){
        const dados = await getDoc(doc(db, 'usuario', auth.currentUser.uid));
        console.log(dados.data())
        this.state.emailLogin = dados.data().email;
        this.state.nomeCompleto = dados.data().nome_completo;
        this.state.numeroTelefone = dados.data().numero;
        console.log(this.dialogSalvarDados)
      }
  });
  </script>
  
  
  
  