import Api from '@/services/Api'

export default { 
register (data) {
return Api().post('reaction', data)
},
delete (data) {
return Api().delete('reaction/'+data)
}, 
update (data, id) {
return Api().put('reaction/'+id, data)
},
getAll () {
return Api().get('reaction')
},
getOne (id) {
return Api().get('reaction/'+id)
},
}