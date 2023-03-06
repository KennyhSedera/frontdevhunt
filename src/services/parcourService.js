import Api from '@/services/Api'

export default { 
register (data) {
return Api().post('parcours', data)
},
delete (data) {
return Api().delete('parcour/'+data)
}, 
update (data, id) {
return Api().put('parcour/'+id, data)
},
getAll () {
return Api().get('parcour')
}
}