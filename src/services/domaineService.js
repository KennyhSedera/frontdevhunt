import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('domaine', data)
   },
   delete (data) {
       return Api().delete('domaine/'+data)
       }, 
   update (data) {
       return Api().put('domaine', data)
       },
   getAll () {
       return Api().get('domaine')
       }
    
     }