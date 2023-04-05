<template>
    <div>
        <v-card-title class="align-center justify-center d-flex pt-4">
            <h3 class="texto-h3-paginas">CONFIGURAÇÕES</h3>
        </v-card-title>
        <v-card class="mt-2 mr-4 ml-4 mb-4 pa-2">
            <div class="d-flex align-center flex-row mt-2 mb-2 ml-2">
                <v-icon color="#a80b29" class="mr-2">mdi-account</v-icon>
                <v-list-item-title class="navigation-list-title fonte">USUÁRIO</v-list-item-title>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    color="#ebe7e0"
                    to="/editardadosprincipais"
                    >
                    <v-icon color="#a80b29">mdi-pencil</v-icon>
                </v-btn>
        </div>
        <v-divider class="mx-4"></v-divider>
        <div class="ma-4">
            <v-list-item-content>
                <div class="d-flex justify-space-between">
                    <v-list-item-title class="navigation-list-title fonte">NOME: </v-list-item-title>
                    <v-list-item-title class="ml-2 fonte-regular">{{ this.nomeCompleto }}</v-list-item-title>
                </div>
                <div class="d-flex justify-space-between">
                    <v-list-item-title class="navigation-list-title fonte">EMAIL: </v-list-item-title>
                    <v-list-item-title class="ml-2 fonte-regular">{{ this.emailLogin }}</v-list-item-title>
                </div>
                <div class="d-flex justify-space-between">
                    <v-list-item-title class="navigation-list-title fonte">TELEFONE: </v-list-item-title>
                    <v-list-item-title class="ml-2 fonte-regular">{{ this.numeroTelefone }}</v-list-item-title>
                </div>
            </v-list-item-content>
        </div>
        </v-card>
        <v-card
        v-for="item in items"
        :key="item.title"
        class="ma-4 pa-2"
        >
            <div class="d-flex align-center flex-row">
                <v-list-item-icon class="pl-2">
                    <v-icon color="#a80b29">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="pl-2 list-content-not-full">
                    <v-list-item-title class="navigation-list-title fonte title-white-space-normal">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    color="#ebe7e0"
                    :to="item.path"
                    >
                    <v-icon color="#a80b29">mdi-pencil</v-icon>
                </v-btn>
            </div>
        </v-card>
        <v-card
        v-for="item in itemstutorial"
        :key="item.title"
        class="ma-4 pa-2"
        >
            <div class="d-flex align-center flex-row">
                <v-list-item-icon class="pl-2">
                    <v-icon color="#a80b29">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="pl-2 list-content-not-full">
                    <v-list-item-title class="navigation-list-title fonte title-white-space-normal">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    color="#ebe7e0"
                    :to="item.path"
                    >
                    <v-icon color="#a80b29">mdi-help</v-icon>
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
  import { getDoc, doc } from 'firebase/firestore'
  import { auth, db } from '@/main.js'
export default({
    data: () => ({
        items: [
            { title: 'EDITAR DADOS PESSOAIS', icon: 'mdi-card-account-details', path: '/editardadospessoais'},
            { title: 'EDITAR DADOS MÉDICOS', icon: 'mdi-medical-bag', path: '/editardadosmedicos'},
            { title: 'EDITAR ENDEREÇOS', icon: 'mdi-home-city', path: '/meusenderecos'},
            { title: 'EDITAR CONTATOS', icon: 'mdi-contacts', path: '/meuscontatos'},
            ],
        // itemstutorial:[
        //     {title: 'PERMITIR USO DA LOCALIZAÇÃO', icon: 'mdi-map-marker', path: '/tutoriallocalizacao'}
        // ],
        emailLogin:'',
        nomeCompleto:'',
        numeroTelefone:'',
    }),
    async mounted(){
        const dados = await getDoc(doc(db, 'usuario', auth.currentUser.uid));
        console.log(dados.data())
        this.emailLogin = dados.data().email;
        this.nomeCompleto = dados.data().nome_completo;
        this.numeroTelefone = dados.data().numero;
      }
});
</script>