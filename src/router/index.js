import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/compat/app';

import LoginView from '../views/LoginView.vue'
import CadastrarView from '../views/CadastrarView.vue'

import HomeView from '../views/HomeView.vue'

import RecuperarSenha from '../views/RecuperarSenha.vue'
import TutorialView from '../views/TutorialView.vue'
import TelefonesUteisView from '../views/TelefonesUteisView.vue'
import MeusContatosView from '../views/contato/MeusContatosView.vue'
import MeusEnderecosView from '../views/endereco/MeusEnderecosView.vue'
import EditarView from '../views/EditarView.vue'

//EDITAR

import EditarDadosPessoais from '../views/editar/EditarDadosPessoais.vue'
import EditarDadosMedicos from '../views/editar/EditarDadosMedicos.vue'
import EditarDadosPrincipais from '../views/editar/EditarDadosPrincipais.vue'

//ADICIONAR DADOS
import AdicionarDadosPessoais from '../views/adicionar/AdicionarDadosPessoais.vue'
import AdicionarDadosEndereco from '../views/adicionar/AdicionarDadosEndereco.vue'
import AdicionarMaisEndereco from '../views/adicionar/AdicionarMaisEndereco.vue'
import AdicionarDadosMedicos from '../views/adicionar/AdicionarDadosMedicos.vue'
import AdicionarDadosContato from '../views/adicionar/AdicionarDadosContato.vue'
import AdicionarMaisContato from '../views/adicionar/AdicionarMaisContato.vue'


const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },

  // INÍCIO

  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/cadastrar',
    name: 'cadastrar',
    component: CadastrarView,
  },
  {
    path: '/recuperarsenha',
    name: 'recuperarsenha',
    component: RecuperarSenha,
  },

  //ADICIONAR DADOS

  {
    path: '/adicionardadospessoais',
    name: 'adicionardadospessoais',
    component: AdicionarDadosPessoais,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/adicionardadosendereco',
    name: 'adicionardadosendereco',
    component: AdicionarDadosEndereco,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adicionarendereco',
    name: 'adicionarendereco',
    component: AdicionarMaisEndereco,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adicionardadosmedicos',
    name: 'adicionardadosmedicos',
    component: AdicionarDadosMedicos,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/adicionardadoscontato',
    name: 'adicionardadoscontato',
    component: AdicionarDadosContato,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adicionarcontato',
    name: 'adicionarcontato',
    component: AdicionarMaisContato,
    meta: {
      requiresAuth: true
    }
  },

  // PÁGINAS

  {
    path: '/tutorial',
    name: 'tutorial',
    component: TutorialView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/telefonesuteis',
    name: 'telefonesuteis',
    component: TelefonesUteisView,
    meta: {
      requiresAuth: true
    }
  },

  //MINHAS PÁGINAS

  {
    path: '/meuscontatos',
    name: 'meuscontatos',
    component: MeusContatosView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/meusenderecos',
    name: 'meusenderecos',
    component: MeusEnderecosView,
    meta: {
      requiresAuth: true
    }
  },

  //EDITAR

  {
    path: '/editardados',
    name: 'editardados',
    component: EditarView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editardadospessoais',
    name: 'editardadospessoais',
    component: EditarDadosPessoais,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editardadosmedicos',
    name: 'editardadosmedicos',
    component: EditarDadosMedicos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editardadosprincipais',
    name: 'editardadosprincipais',
    component: EditarDadosPrincipais,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});


export default router
