<template>
    <div>
        <v-card class="ma-4">
                <v-card-title class="fonte">BARRA DE NAVEGAÇÃO</v-card-title>
                <!-- appbar, navbar, botoes -->
                <v-card-subtitle class="fonte-regular">Ao clicar nas três linhas alinhadas (1) a barra de navegação do aplicativo se abrirá.</v-card-subtitle>
                <v-img class="ma-4" alt="App Bar" src="@/assets/img/app-bar.png" />

                <v-card-subtitle class="fonte-regular">
                        Na barra de navegação, ao clicar em cada botão você será redirecionado para diferentes páginas, são elas:  
                </v-card-subtitle>
                <v-card-subtitle class="fonte-regular">
                        Ao clicar no botão Home (1), você será redirecionado a página principal.

                </v-card-subtitle>
                <v-card-subtitle class="fonte-regular">
                        Ao clicar no botão Meus Contatos (2), você será redirecionado para a página que contém todos os seus contatos.
                </v-card-subtitle>
                <v-card-subtitle class="fonte-regular">
                        Ao clicar no botão Meus Endereços (3), você será redirecionado para a página que contém todos os seus endereços.
                </v-card-subtitle>
                <v-card-subtitle class="fonte-regular">
                        Ao clicar no botão Telefones Úteis (4), você será redirecionado para a página que contém números de telefones úteis para diversas ocasiões específicas.
                </v-card-subtitle>
                <v-card-subtitle class="fonte-regular">
                        Ao clicar no botão Tutorial (5), você será redirecionado para esta página.
                </v-card-subtitle>
                <v-card-subtitle class="fonte-regular">
                        Ao clicar no botão Configurações (6), você será redirecionado para a página de consigurações, onde é possível editar seus dados e exclui-los caso desejado.
                </v-card-subtitle>
                <v-card-subtitle class="fonte-regular">
                        Ao clicar no botão Sair (7), você realizará logout e caso queira utilizar o aplicativo novamente seá necessário realizar a autenticação primeiro.
                </v-card-subtitle>
                <v-img class="ma-4" alt="Nav Bar" src="@/assets/img/nav-bar.png" />
        </v-card>
        <v-card class="ma-4">
                <v-card-title class="fonte">TELA INICIAL</v-card-title>
                <v-card-subtitle class="fonte-regular">
                        Ao clicar em algum dos botões da tela principal (1) o aplicativo enviará seus dados cadastrados para seus contatos de emeregência e acionará a entidade selecionada.
                </v-card-subtitle>
                <v-img class="ma-4" alt="Botao Home" src="@/assets/img/botao-home.png" />
        </v-card>
        <v-card class="ma-4">
                <v-card-title class="fonte">LISTAGEM DE TELEFONES</v-card-title>
                <!-- telefons uteis e explicacao -->
                <v-card-subtitle class="fonte-regular">
                        Ao abrir a página dos telefones úteis uma lista deles será exibida, você pode filtrar os números usando a barra de pesquisa. Ao clicar no botão de interrogação (1) o aplicarivo exibirá uma descrição sobre para que aquele número serve e em que ocasião deve ser acionado. No botão de telefone (2) você irá realizar uma chamada de seu celular ao número selecionado.
                </v-card-subtitle>
                <v-img class="ma-4" alt="Botõe home" src="@/assets/img/telefones-uteis.png" />
                <v-card-subtitle class="fonte-regular">
                        Depois de abrir a descrição de um determinado número você pode clicar no X (1) para fechar a página ou no botão de telefone (2) para realizar uma ligação.
                </v-card-subtitle>
                <v-img class="ma-4" alt="Botõe home" src="@/assets/img/telefones-uteis-explicacao.png" />
        </v-card>
        <v-card class="ma-4">
                <v-card-title class="fonte">LISTANDO INFORMAÇÕES</v-card-title>
                <!-- meus endereços -->
                <v-card-subtitle class="fonte-regular">
                        Nas telas Meus Endereços, Meus Contatos e Telefones Úteis são listadas todas as informações que o aplicativo tem sobre cada tópico, elas podem ser filtradas pela barra de pesquisa (1). Cada um desses dados pode ser editado ao selecionar o botão de edição (2). É possível também adicionar um novo contato ou endereço ao grupo selecionando o botão Adicionar Novo Endereço (3).
                </v-card-subtitle>
                <v-img class="ma-4" alt="Botõe home" src="@/assets/img/meus-enderecos.png" />
        </v-card>
        <v-card class="ma-4">
                <v-card-title class="fonte">ALTERANDO INFORMAÇÕES</v-card-title>
                <!-- editar info -->
                <v-card-subtitle class="fonte-regular">
                        Ao selecionar a opção de editar alguma informação você será redirecionado para a página de edição onde poderá editar os dados e salvar (2) ou excluir aquela informação da sua conta (1).
                </v-card-subtitle>
                <v-img class="ma-4" alt="Botõe home" src="@/assets/img/editar-info.png" />
        </v-card>
        <v-card class="ma-4">
                <v-card-title class="fonte">EXCLUINDO INFORMAÇÕES</v-card-title>
                <!-- TEM CERTEZA, inserir senha -->
                <v-card-subtitle class="fonte-regular">
                        Ao selecionar a opção Exluir Contato, Endereço ou Conta será exibido um alerta e dependendo da informação a ser alterada será necessário a repetição da senha.
                </v-card-subtitle>
                <v-img class="ma-4" alt="Botõe home" src="@/assets/img/tem-certeza.png" />
                <v-img class="ma-4" alt="Botõe home" src="@/assets/img/inserir-senha.png" />
        </v-card>
    </div>
</template>

<script>
export default({
data: () => ({
}),
});
</script>

<style>
.btn-actions{
display: flex;
align-items: center;
flex-direction: column;
}
</style>