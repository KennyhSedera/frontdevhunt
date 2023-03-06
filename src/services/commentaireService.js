import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('commentaire', data)
   },
   delete (data) {
       return Api().delete('commentaire/'+data)
       }, 
   update (data, id) {
       return Api().put('commentaire/'+id, data)
       },
   getAll (id) {
       return Api().get('commentaire/'+id)
       },
   getOne (id) {
       return Api().get('commentaire/'+id)
       },
   countCommentaire (id) {
       return Api().get('countCommentaire/'+id)
       },
    
     }