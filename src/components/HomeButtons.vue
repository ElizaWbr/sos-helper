<template>
        <div class="full-height">
            <v-card-text class="full-height">
                <v-btn
                    class="botao-home mb-4 texto-h3-paginas"
                    @click="pedirAjuda(numeroSamu)"
                    :href="`tel:${numeroSamu}`"

                >
                    Chamar SAMU
                </v-btn>
                <v-btn
                    class="botao-home mb-4 texto-h3-paginas"
                    @click="pedirAjuda(numeroBombeiros)"
                    :href="`tel:${numeroBombeiros}`"
                >
                    Chamar Bombeiros
                </v-btn>
                <v-btn
                    class="botao-home mb-4 texto-h3-paginas"
                    @click="pedirAjuda(numeroPolicia)"
                    :href="`tel:${numeroPolicia}`"
                >
                    Chamar Polícia
                </v-btn>
            </v-card-text>
        </div>
</template>

<script>
import { auth, db } from '@/main.js'
import { jsPDF } from "jspdf";
import emailjs from 'emailjs-com';

import { collection, getDocs, getDoc, doc } from 'firebase/firestore'

export default({
data: () => ({
    dialogpermissao: false,

    currentposition:'',

    pdfOutput:'',

    //numeros emergencia
    numeroSamu: '192',
    numeroBombeiros: '193',
    numeroPolicia: '190',

    numeroParagrafo: 0,
    paragrafoAtual: 0,

    //base
    nomeCompleto:'',
    emailUsuario:'',
    numeroUsuario:'',

    //info pessoal
    nascimento:'',
    naturalidade:'',
    profissao:'',
    cpfcnpj:'',
    rg:'',

    //info saude
    alergia:'',
    cartaoSus:'',
    cirurgia:'',
    doencaSindrome:'',
    medicacao:'',
    palno:'',
    nomePlano:'',
    cartaoPlano:'',
    tipoSanguineo:'',

    //enderecos
    endereco:[],

    //contatos
    contato:[],
  }),
  methods:{
    async gerarpdf(){
        console.log('criar pdf')
        const doc = new jsPDF();
        const width = doc.internal.pageSize.getWidth()
        //horizontal, vertical
        doc.setFontSize(12).setFont('undefined', 'bold');
        doc.text("Nome Completo: " + this.nomeCompleto, width/2, 20, { align: 'center' });
        doc.text("Email: " + this.emailUsuario, width/2, 25, { align: 'center' });
        doc.text("Número: " + this.numeroUsuario, width/2, 30, { align: 'center' });

        doc.text("Informações Pessoais:", width/2, 40, { align: 'center' });
        doc.setFontSize(10).setFont('undefined', 'normal');
        doc.text("Nascimento: " + this.nascimento, 20, 50,);
        doc.text("Naturalidade: " + this.naturalidade, 20, 55,);
        doc.text("Profissão: " + this.profissao, 20, 60,);
        doc.text("CPF/CNPJ: " + this.cpfcnpj, 20, 65,);
        doc.text("RG: " + this.rg, 20, 70,);

        doc.setFontSize(12).setFont('undefined', 'bold').text("Informações Médicas:", width/2, 80, { align: 'center' });
        doc.setFontSize(10).setFont('undefined', 'normal');
        doc.text("Número do Cartão do SUS: " + this.cartaoSus, 20, 90,);
        doc.text("Tipo Sanguíneo: " + this.tipoSanguineo, 20, 95,);
        doc.text("Possuí alguma doença ou síndrome: " + this.doencaSindrome, 20, 100,);
        doc.text("Possui alguma alergia: " + this.alergia, 20, 105,);
        doc.text("Faz uso de alguma medicação: " + this.medicacao, 20, 110,);
        doc.text("Já fez alguma cirurgia: " + this.cirurgia, 20, 115,);
        doc.text("Possui plano de saúde: " + this.plano, 20, 120,);
        if(this.plano != 'Não'){
            doc.text("Nome do plano: " + this.planoNome, 20, 125,);
            doc.text("Número do plano: " + this.planoCartao, 20, 130,);
            this.numeroParagrafo = 130;
        }else{
            this.numeroParagrafo = 120;
        }

        doc.setFontSize(12).setFont('undefined', 'bold').text("Endereços:", width/2, this.numeroParagrafo + 10, { align: 'center' });
        doc.setFontSize(10).setFont('undefined', 'normal');
        for(let e = 0; e < this.endereco.length; e++){
            const textoEndereco = this.endereco[e];
            doc.text("Endereço " + (e+1) + ": " + textoEndereco, 20, (this.numeroParagrafo + 20) + (5*e));
            this.paragrafoAtual = this.numeroParagrafo + 20 + (5*e);
        }
        this.numeroParagrafo = this.paragrafoAtual;
        console.log(this.numeroParagrafo)

        doc.setFontSize(12).setFont('undefined', 'bold').text("Contatos:", width/2, this.numeroParagrafo + 10, { align: 'center' });
        doc.setFontSize(10).setFont('undefined', 'normal');
        for(let c = 0; c < this.contato.length; c++){
            const textoContato = this.contato[c];
            doc.text("Contato " + (c+1) + ": " + textoContato, 20, (this.numeroParagrafo + 20) + (5*c));
            this.paragrafoAtual = this.numeroParagrafo + 20 + (5*c);
        }
        this.numeroParagrafo = this.paragrafoAtual;
        console.log(this.numeroParagrafo)

        //doc.save("Dados Usuario " + this.nomeCompleto + ".pdf");
        const pdfOutput = doc.output("datauristring");
        return pdfOutput;

    },
    onSuccess(position) {
        this.currentposition = position.coords.latitude + ', ' + position.coords.longitude;
    },
    onError(error) {
        console.log('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
        
        if (error.code == error.PERMISSION_DENIED){
            console.log("you denied me :-(");
            this.dialogpermissao=true;
        }
        return (error.code)
    },
    gerarLocalizacao(){
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },

    async pedirAjuda(numeroEmergencia){
        console.log(numeroEmergencia)
        this.gerarLocalizacao();
        console.log(this.currentposition)

        this.gerarpdf();
        let pdfOutput = await this.gerarpdf();
        console.log(pdfOutput)

        const contatos = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/contato'))
        contatos.forEach((doc) => {
            emailjs.send("service_w3gggec","template_yp1dgqu",{
            from_name: this.nomeCompleto,
            to_name: doc.data().nome_contato,
            real_location: this.currentposition,
            generated_pdf: pdfOutput,
            to_email: doc.data().email_contato,
        }, "8j9sSUIEGFVlafpDP")
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
    })
    }
  },
  async mounted(){
    const querySnapshot_base = await getDoc(doc(db, 'usuario', auth.currentUser.uid));
    this.nomeCompleto = querySnapshot_base.data().nome_completo;
    this.emailUsuario = querySnapshot_base.data().email;
    this.numeroUsuario = querySnapshot_base.data().numero;
    console.log("Pegou Info Base");

    const querySnapshot_pessoal = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/info_pessoal'));
    querySnapshot_pessoal.forEach((doc) => {
        this.nascimento = doc.data().data_nasc;
        this.naturalidade = doc.data().naturalidade;
        this.profissao = doc.data().profissao
        this.cpfcnpj = doc.data().cpf_cnpj;
        this.rg = doc.data().rg;
        console.log("Pegou Info Pessoal");
    })

    const querySnapshot_saude = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/info_saude'));
    querySnapshot_saude.forEach((doc) => {
        this.tipoSanguineo = doc.data().tipo_sanguineo;
        this.cartaoSus = doc.data().cartao_sus;
        this.doencaSindrome = doc.data().doenca_sindrome;
        this.alergia = doc.data().alergia;
        this.medicacao = doc.data().medicacao;
        this.cirurgia = doc.data().cirurgia;

        //PLANO DE SAÚDE
        if(doc.data().plano == 'Não'){
        this.plano = 'Não';
        } else {
        this.plano = 'Sim';
        this.planoNome = doc.data().plano_saude[0];
        this.planoCartao = doc.data().plano_saude[1];
        }
        console.log("Pegou Info Saude");
    })

    const querySnapshot_endereco = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/endereco'))
    querySnapshot_endereco.forEach((doc) => {
        this.endereco.push(
            doc.data().endereco + ", " +
            doc.data().numero + ", " +
            doc.data().bairro + ", " +
            doc.data().cidade + "."
        )
    })

    const querySnapshot_contato = await getDocs(collection(db, 'usuario/' + auth.currentUser.uid + '/contato'))
    querySnapshot_contato.forEach((doc) => {
        this.contato.push(
            "Nome: " + doc.data().nome_contato + " - Email: " +
            doc.data().email_contato + " - Número: " +
            doc.data().numero_contato
        )
    })
  }
});
</script>
