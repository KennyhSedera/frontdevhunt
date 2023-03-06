import Api from '@/services/Api'

export default { 
register (data) {
return Api().post('niveau', data)
},
delete (data) {
return Api().delete('niveau/'+data)
}, 
update (data, id) {
return Api().put('niveau/'+id, data)
},
getAll () {
return Api().get('niveau')
}

     }