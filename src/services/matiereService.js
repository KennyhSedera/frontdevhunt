import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('matiere', data)
   },
   delete (data) {
       return Api().delete('matiere/'+data)
       }, 
   update (data) {
       return Api().put('matiere', data)
       },
   getAll () {
       return Api().get('matiere')
       }
    
     }