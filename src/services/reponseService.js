import Api from '@/services/Api'

export default { 
register (data) {
return Api().post('reponse', data)
},
delete (data) {
return Api().delete('reponse/'+data)
}, 
update (data, id) {
return Api().put('reponse/'+id, data)
},
getAll () {
return Api().get('reponse')
}
}