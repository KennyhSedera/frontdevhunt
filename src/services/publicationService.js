import Api from '@/services/Api'

export default { 
register (data) {
return Api().post('publication', data)
},
delete (data) {
return Api().delete('publication/'+data)
}, 
update (data, id) {
return Api().put('publication/'+id, data)
},
getAll () {
return Api().get('publication')
},
getOne (id) {
return Api().get('publication/'+id)
},
}