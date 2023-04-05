<template>
    <div v-if="tutorial != true">
        <v-card-title class="align-center justify-center d-flex pb-4 pt-4">
            <h3 class="texto-h3-paginas">TELEFONES ÚTEIS</h3>
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
                    <v-list-item-subtitle class="navigation-list-title fonte-regular">{{ item.numero }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn
                    variant="text"
                    size="large"
                    icon
                    @click="AbrirTutorial(item.numero)"
                    >
                    <v-icon color="#a80b29">mdi-help</v-icon>
                </v-btn>
                <v-btn
                    color="#ebe7e0"
                    icon
                    :href="`tel:${item.numero}`"
                >
                <!-- :href="`tel:${item.numero}`" -->
                <!-- @click="realizarLigacaoAndroid(item.numero)" -->
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
                    <v-list-item-title class="navigation-list-title fonte text-uppercase title-white-space-normal pl-2 pr-2">Nenhum telefone encontrado</v-list-item-title>
                    <v-list-item-subtitle class="fonte-regular title-white-space-normal pa-2">Tente verificar se as palavras foram digitadas corretamente ou utilize outra palavra-chave.</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
            </div>
        </v-card>
    </div>
    <div v-if="tutorial == true">
        <v-card-title class="align-center justify-center d-flex pb-0 pt-4 text-uppercase title-white-space-normal">
            <h3 class="texto-h3-paginas">{{ nome_ }}</h3>
        </v-card-title>
        <v-card class="ma-4 pa-2">
            <div class="d-flex align-center flex-row">
                <v-list-item-content class="pl-2 list-content-not-full">
                    <v-list-item-title class="navigation-list-title fonte text-uppercase title-white-space-normal">{{ numero_ }}</v-list-item-title>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn
                    variant="text"
                    size="large"
                    icon
                    @click="AbrirTutorial(numero_)"
                    >
                    <v-icon color="#a80b29">mdi-close</v-icon>
                </v-btn>
                <v-btn
                    color="#ebe7e0"
                    icon
                    :href="`tel:${numero_}`"
                >
                    <v-icon color="#a80b29">mdi-phone</v-icon>
                </v-btn>
            </div>
            <v-list-item-subtitle class="pa-2 fonte-regular">
                {{ descricao_ }}
            </v-list-item-subtitle>
        </v-card>
    </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/main.js'

export default({
    data: () => ({
        items: [],
        tutorial: false,

        pesquisa: '',
        MensagemPesquisaSemResposta: false,

        nome_:'',
        numero_:'',
        descricao_:'',
    }),
    methods: {
        realizarLigacaoAndroid(numero){
            this.$router.push(`tel:${numero}`)
        },
        async AbrirTutorial(numeroId){
            if(this.tutorial == false){
                this.tutorial = true;
                // aqui acontece os negocio
                const querySnapshot = await getDocs(collection(db, 'telefonesuteis/'))
                querySnapshot.forEach((doc) => {
                    if(doc.id == numeroId){
                        this.nome_ = doc.data().nome;
                        this.numero_ = doc.data().numero;
                        this.descricao_ = doc.data().descricao;
                    }
                })
            } else if(this.tutorial == true){
                this.tutorial = false;
            }
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
    },
    async mounted(){
    const querySnapshot = await getDocs(collection(db, 'telefonesuteis/'));
    querySnapshot.forEach((doc) => {
        this.items.push({
            title: doc.data().nome, 
            numero: doc.data().numero, 
            descricao: doc.data().descricao, 
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

<style scoped
>
.list-content-not-full{
    max-width: 68%;
}
</style>