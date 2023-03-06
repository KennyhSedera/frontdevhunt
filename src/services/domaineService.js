import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('domaine', data)
   },
   delete (data) {
       return Api().delete('domaine/'+data)
       }, 
   update (data, id) {
       return Api().put('domaine/'+id, data)
       },
   getAll () {
       return Api().get('domaine')
       },
   getOne (id) {
       return Api().get('domaine/'+id)
       },
    
     }