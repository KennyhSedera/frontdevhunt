import Api from '@/services/Api'

export default { 
register (data) {
return Api().post('etudiant', data)
},
delete (data) {
return Api().delete('etudiant/'+data)
}, 
update (data, id) {
return Api().put('etudiant/'+id, data)
},
getAll () {
return Api().get('etudiant')
},
getOne (id) {
return Api().get('etudiant/'+id)
},
beforeUpdate (id) {
return Api().get('beforeUpdate/'+id)
},
beforeCreate (id) {
return Api().get('beforeCreate/'+id)
},

}