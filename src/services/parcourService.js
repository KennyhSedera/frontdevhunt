import Api from '@/services/Api'

export default { 
register (data) {
return Api().post('parcours', data)
},
delete (data) {
return Api().delete('parcours/'+data)
}, 
update (data, id) {
return Api().put('parcours/'+id, data)
},
getAll () {
return Api().get('parcours')
}
}