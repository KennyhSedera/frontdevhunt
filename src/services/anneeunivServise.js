import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('anneeuniv', data)
   },
   delete (data) {
       return Api().delete('anneeuniv/'+data)
       }, 
   update (data, id_annee) {
       return Api().put('anneeuniv/'+id_annee, data)
       },
   getAll () {
       return Api().get('anneeuniv')
       },
   getOne (data) {
       return Api().get('anneeuniv/'+data)
       },
    
     }