import Api from '@/services/Api'

export default { 
register (data) {
return Api().post('message', data)
},
delete (data) {
return Api().delete('message/'+data)
}, 
update (data, id) {
return Api().put('message/'+id, data)
},
getAll (id1, id2) {
return Api().get('message/'+id1+'/'+id2)
},
getAll (id) {
return Api().get('message/'+id)
},
}