import Api from '@/services/Api'

export default { 
register (data) {
return Api().post('matiere', data)
},
delete (data) {
return Api().delete('matiere/'+data)
}, 
update (data, id) {
return Api().put('matiere/'+id, data)
},
getAll () {
return Api().get('matiere')
},
getOne (id) {
return Api().get('matiere/'+id)
},

}