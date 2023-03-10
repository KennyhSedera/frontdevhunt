import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from "js-cookie"
import messageService from '@/services/messageService'

Vue.use(Vuex)

export default  new Vuex.Store({
    strict:true,
   plugins :[
       createPersistedState({
           storage: {
               getItem: (key) => Cookies.get(key),
               setItem : (key,value) => Cookies.set(key,value,{expires : 3, secure: true}),
               removeItem : (key)=> Cookies.remove(key),
           },
       }),
    ],
    state: {
        token: null,
        user: null,
        isUserLoggedIn : false,
        routeHistory: [],
        lastEvent:[],
        isAdmin:false,
        isUser:false,
        isConsultant:false,
        message:[],
        notification:[],
        unseenMessage:0,
        unseenNotif:0
    },
    getters : {
        Message : state =>{
            return state.message
        },
        unseenNotif : state =>{
            return state.unseenNotif
        },
        unseenMessage : state =>{
            return state.unseenMessage
        },
        Notification : state =>{
            return state.notification
        },
        User :state=>{
            return {id_user:state.user.id_user,nom:state.user.nom,prenom: state.user.prenom}
        },
        isLoggedIn : state =>{
            return state.isUserLoggedIn
        },
        isAdmin : state =>{
            return state.isAdmin
        },
        isConsultant : state =>{
            return state.isConsultant
        },
        isUser : state =>{
            return state.isUser
        },
        lastEvent: state =>{
            return state.lastEvent
        },
        getEmail: state=>{
            return state.user.email
        },
        getRouteHistory: state =>{
            return state.routeHistory
        }
        
    },
    mutations :{
       
        setToken (state, token)  {
            state.token = token
            if(token){
                state.isUserLoggedIn = true
            }
            else{
                state.isUserLoggedIn = false
            }
        },
        setUser (state,user) {
            state.user = user
            state.isAdmin = user.role_permission.toLowerCase().indexOf('admin')>-1
            state.isUser =  user.role_permission.toLowerCase().indexOf('user')>-1
            state.isConsultant = user.role_permission.toLowerCase().indexOf('consult')>-1
        },
        setRouteHistory (state,route) {
            state.routeHistory.push(route)
            
        },
        setLastEvent(state,event){
            state.lastEvent =event
        },
        setMessage (state,payload) {
            state.message = payload
        },
        setunseenMsg (state,payload) {
            state.unseenMessage = payload
        },
        setunseenNotif (state,payload) {
            state.unseenNotif = payload
        },
       addMessage (state,message) {
        if(state.message === undefined || state.message.length<=0){
            state.message = []
            state.message.push(message)

        }else{
            state.message.push(message)
        }
        if(message.id_user !== 1){
            state.unseenMessage +=1
        }
     }
    },
    actions:{
        setNbrMsg({commit},nbr){
            commit('setunseenMsg',nbr)
        },
        setNbrNotif({commit},nbr){
            commit('setunseenNotif',nbr)
        },
        setMessage:async ({commit},id)=>{
            let {data} = messageService.getAll(id)
            commit('setMessage',data)
        },
        addMessage({commit},message){
            commit('addMessage',message)
        },
        setToken({commit},token){
            commit('setToken',token)
        },
         setUser({commit},user){
            commit('setUser',user)
        },
        setRouteHistory({commit},routeHistory){
            commit('setRouteHistory',routeHistory)
        },
        setLastEvent({commit},event){
            commit('setLastEvent',event)
        }
    }

})
                                                                               