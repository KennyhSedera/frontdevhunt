import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Commentaire from './views/Commentaire/commentaire.vue'
import Register from './views/Register/index.vue'
import Login from './views/login/index.vue'
import changePassword from './views/changePassword/index.vue'
import User from './views/userList/index.vue'
import NotFound from './views/pageNotFound/index.vue'
import Profil from './views/userProfil/index.vue'
import HistoriqueConnexion from './views/HistoriqueConnexion/index.vue'
import Dashboard from './views/Dashboard.vue'
import Message from './components/discussionMessage.vue'
import Publication from './views/Publication/pagePublication.vue'
import Domaine from './views/Informations/domaine.vue'
import Matiere from './views/Informations/matiere.vue'
import Niveau from './views/Informations/niveau.vue'
import Parcour from './views/Informations/parcour.vue'

>>>>>>> 270881744082996834af54bb997f1da908102a7c
Vue.use(Router)


const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/accueil',
      name: 'Home',
      meta: {
        title: 'Accueil'
      },
      component: Home
    },
    {
      path: '/publication',
      name: 'Publication',
      meta: {
        title: 'Publication'
      },
      component: Publication
    },
    {
      path: '/admin/gerer/matiere',
      name: 'Matiere',
      meta: {
        title: 'Matiere'
      },
      component: Matiere
    },
    {
      path: '/admin/gerer/domaines',
      name: 'Domaine',
      meta: {
        title: 'Domaine'
      },
      component: Domaine
    },
    {
      path: '/admin/gerer/matiere',
      name: 'Matiere',
      meta: {
        title: 'Matiere'
      },
      component: Matiere
   },
    {
      path: '/admin/gerer/niveau',
      name: 'Niveau',
      meta: {
        title: 'Niveau'
      },
      component: Niveau
    },
    {
      path: '/admin/gerer/parcours',
      name: 'Parcour',
      meta: {
        title: 'Parcour'
      },
      component: Parcour
    },
    {
    path: '/dashboard',
      name: 'Dashboard',
      meta: {
        title: 'Bilan'
      },
      component: Dashboard
    },
    {
      path: '/message',
      name: 'Message',
      meta: {
        title: 'Message'
      },
      component: Message
    },
    {
      path: '/',
      name: 'Login',
      meta: {
        title: `S'authentifier`
      },
      component: Login
    },
    {
      path: '/changepassword',
      name: 'ChangePW',
      meta: {
        title: `Changer le mot de passe`
      },
      component: changePassword
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: 'Création du compte'
      },
      component: Register
    },
    {
      path: '/historique-connexion',
      name: 'HistoriqueConnexion',
      meta: {
        title: 'Historiques de connexion'
      },
      component: HistoriqueConnexion
    },
    {
      path: '/commentaire',
      name: 'commentaire',
      meta: {
        title: 'Commentaires'
      },
      component: Commentaire
    },
    {
      path: '/utilisateur',
      name: 'utilisateur',
      meta: {
        title: 'Liste des utilisateurs'
      },
      component: User
    },
    {
      path:'/Profil',
      name:'Profil',
      meta: {
        title: 'Mon profil'
      },
      component : Profil

    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      meta: {
        title: "Page introuvable 404"
      },
      component : NotFound
    }
  ]
})
export default router