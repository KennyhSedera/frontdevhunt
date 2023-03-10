<template>
  <nav>
      <v-app-bar top dark app  elevate-on-scroll >
        <v-app-bar-nav-icon  class="grey--text"  @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title   class=" grey--text mr-16 font-weight-black text-xlg-h3 text-lg-h4 text-md-h4 text-sm-h4 text-xs-h4" >
            <span class=" blue--text"  @click="navigateTo({name: 'Home'})">E.<span class="white--text">Fanampy</span> </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
         <div class="text-center mx-4" >
             <v-menu
                class="mt-4 full-screen elevation-2"
                bottom left
                :close-on-content-click="false"
                rounded='lg'
                offset-y
                transition="slide-y-transition"
                v-for="badge, i in badges " :key='i'
                v-model="badge.model" >
             <template v-slot:activator="{on,attrs}">
                   <v-badge 
                       v-if="i===0 ?unseenMessage>0 : unseenNotif>0"
                        :content='getContent(i)'
                        color='error'
                        border='left'
                        colored-border
                        type='grey'
                        overlap
                        x-small
                        class='mx-2 pointer'
                        >
                    <v-icon 
                        v-on="on" v-bind="attrs">{{badge.icon}}</v-icon>
                </v-badge>
                <v-icon class='mx-2 pointer' v-if="i===0 ?unseenMessage<=0 : unseenNotif<=0" v-on="on" v-bind="attrs" >{{badge.icon}}</v-icon>
             </template>
                <component :is="badge.component" :items='badge.items'></component>
             </v-menu>
            <v-menu
                class="ml-8"
                bottom left
                :close-on-content-click="false"
                v-model="clickContent"
                rounded='lg'
                offset-y
                transition="slide-y-transition">
             <template v-slot:activator="{ on, attrs }">
                    <v-avatar v-bind="attrs"   v-on="on" size="30" class="mx-4 grey lighten-2">
                        <img src='admin.jpg' />
                    </v-avatar>
                </template>  
                <v-list nav dense  width="250px">
                    <v-list-item-group>
                        <template  v-for="(item, index) in items">
                            <v-list-group
                                v-if="item.subGroup"
                                :key="item.title"
                                append-icon="fas fa-caret-down"
                                multiple 
                               >
                                <template v-slot:activator>
                                    <v-list-item-action>
                                        <v-icon small>{{item.icon}}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content >
                                        <v-list-item-title >{{item.title}}</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                               
                                  <v-list-item
                                    class="pl-6"
                                    v-for="(child) in item.subGroup"
                                    :key="child.text"
                                    router :to="child.route"  >
                                    <v-list-item-icon>
                                        <v-icon small>{{child.icon}}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content >
                                        <v-list-item-title class="ml-0"
                                       >{{child.title}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                            <v-list-item
                               v-else
                                :key="item.title"
                                link >
                                <v-list-item-icon >
                                    <v-icon small>{{item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>
                                    <span  @click="navigateTo({name: item.route})">{{ item.title }}</span>
                                </v-list-item-title>
                            </v-list-item>
                            <v-divider :key="index"></v-divider>
                        </template>
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon small >fas fa-power-off</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                <span  @click="logout" class=' text-capitalize' >Déconnexion</span>
                            </v-list-item-title>
                       </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-menu>           
          </div>
      </v-app-bar>
     <v-navigation-drawer dark  app v-model="drawer" >
          <v-layout column align-center>
              <v-flex class="mt-5" >
                <v-avatar size="100" class="grey lighten-2">
                   <img src='web image/background_image (2).jpeg' />
                </v-avatar> 
                <p  class="white--text subheading mt-1">
                     
                </p>
              </v-flex>            
          </v-layout>  
        <v-list>
        <v-list v-for="item,i in drawers" :key="i">
        <v-list-item 
          v-if="!item.items"
          router 
          :to="item.route"  >
         <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
         </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >{{item.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-group v-else
                sub-group
                 :prepend-icon="item.icon"
                 multiple
                 class="ml-n2 disable-icon-rotate"
            >
                <template v-slot:activator >
                <v-list-item-content @click=" drawers[i].value = !item.value">
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item-content>
                 <v-list-item-action>
                    <v-icon >{{item.value===false ?'fas fa-caret-down' : 'fas fa-caret-up'}}</v-icon>
                    </v-list-item-action>
                </template>

                <v-list-item
                class="pl-12"
                v-for="child in item.items"
                :key="child.text"
                router :to="child.route"
                >
                <v-list-item-action>
                    <v-icon>{{child.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title >{{child.text}}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-group> 
         </v-list>
      </v-list> 
       
    </v-navigation-drawer>
    <pageLoader ref="loader" text="Déconnexion" :overlay="false" />
  </nav>
</template>

<script>
import pageLoader from '../components/pageLoader'
import server from  '../services/server.config'
import Notification from '../components/notification'
import Message from '../components/MessageListe'
import {mapGetters} from 'vuex'

export default {
    name: 'navBar',
    components: {
        pageLoader
       },
    data () {
        return {
            server:server.URL,
            clickContent:false,
            menu:false,
            drawer : false,
            badges:[
                  {
                    icon: 'far fa-envelope',
                    title:'Message',
                    component: Message,
                    items:[],
                   model:false,
                   nbr: this.$store.getters.unseenMessage
                  }, 
                    {
                    icon: 'far fa-bell',
                    title:'Notifications',
                    items:[{
                            reference: '',
                            nom:"Avoutra",
                            prenom:"Randriah",
                            created_at:'2022-09-26 19:02:00',
                            action: 'commenter',
                            seen_at: '0000-00-00 00:00:00',
                            id_user:  1,
                            vu:false},
                            {
                            reference: '',
                            nom:"Avoutra",
                            prenom:"Randriah",
                            created_at:'2022-09-26 19:02:00',
                            action: 'commenter',
                            seen_at: '0000-00-00 00:00:00',
                            id_user:  1,
                            vu:true}, {
                            reference: '',
                            nom:"Avoutra",
                            prenom:"Randriah",
                            created_at:'2022-09-26 19:02:00',
                            action: 'commenter',
                            seen_at: '0000-00-00 00:00:00',
                            id_user:  1,
                            vu:false},
                             {
                            reference: '',
                            nom:"Avoutra",
                            prenom:"Randriah",
                            created_at:'2022-09-26 19:02:00',
                            action: 'commenter',
                            seen_at: '0000-00-00 00:00:00',
                            id_user:  1,
                            vu:false}
                            ],
                   component:Notification,
                   model:false,
                   nbr: this.$store.getters.unseenNotif
                    
                    },
                     
            ],
            drawers:[
              { text: 'Accueil',icon:'fas fa-home',route:'/accueil' },
              { text: 'Dashboard',icon:'fas fa-chart-bar',route:'/dashboard' },
              { text: 'Gérer informations',icon:'fas fa-screwdriver-wrench',
                items:[
                        { icon:'fas fa-users',text:'Domaines',route:'/admin/gerer/domaines'},
                        { icon:'fas fa-book',text:'Matières',route:'/admin/gerer/matiere'},
                        { icon:'fas fa-users',text:'Parcours',route:'/admin/gerer/parcours'},
                        { icon:'fas fa-graduation-cap',text:'Niveau',route:'/admin/gerer/niveau'},
                        { icon:'fas fa-calendar',text:'Année universitaire',route:'/admin/gerer/annee-univ'},
                      ]},
              { text: 'Publications',icon:'fas fa-upload',route:'/publication' },
              { text: 'Ressources humaines',icon:'fas fa-users',route:'/utilisateur' },
              { text: 'Historiques',icon:'fas fa-history',
                  items:[
                          { icon:'fas fa-users',text:'Approbations compte',route:'/historique-user'},
                          { icon:'fas fa-upload',text:'Approbations publications',route:'/historique-publication'},
                      ] },
              ],
       items: [
         { title: 'Profil',icon:'fas fa-user',route:'Profil' },
         { title: 'Historiques',icon:'fas fa-history',subGroup:[ 
           {title: 'Historiques personnelles',icon:'fas fa-users',route:'historique' },
           {title: 'Historiques de connexion',icon:'fas fa-laptop',route:'historique-connexion' } 
         ],
        }
      ],
        }
    },
    computed:{
            ...mapGetters(['unseenNotif','unseenMessage'])
     },
    watch:{
        options: {
        handler () {
        },
        deep: true,
      },
    },
    methods :{
        getContent(id){
           var content = id===0 ? this.unseenMessage : this.unseenNotif
           return content
        },
      getIcon(id){
       return id ===0 ? this.unseenMessage >0 : this.unseenNotif > 0
      },
        setSeen(id){
            if(id===0){
                this.$store.dispatch('setNbrMsg',0)
            }else{
                 this.$store.dispatch('setNbrNotif',0)
            }
        },
    navigateTo (route) {
          if(!this.$store.state.isUserLoggedIn)
           {
            alert('Veuillez vous connecter d\'abord !')
                this.$router.push({name: 'Login'})
            }
         else{
            this.$router.push(route)
            }
        },
        logout () {
            this.$refs.loader.loading()
              
             setTimeout(() => {   
             
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.drawer = false
           
             this.$store.dispatch('setRouteHistory',null)
            this.$router.push({name: 'Login'})
         },4000);
           
        }
    },
    mounted(){
 }
  }
</script>
<style>
.pointer {
    cursor:pointer
}
.titre{
  text-shadow: 2px;
  font-weight: 900;
}
</style>

