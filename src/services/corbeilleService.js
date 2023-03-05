import Api from '@/services/Api'

export default { 
   
    deleteDoc (data) {
       return Api().delete('corbeille/document',data)
       },
    deleteDec (data) {
    return Api().delete('corbeille/declaration',data)
    },
    deleteRapport (data) {
        return Api().delete('corbeille/rapport',data)
     },
    restaurerDoc (data) {
       return Api().post('restaurer-document', data)
    },
    restaurerDec (data) {
        return Api().post('restaurer-declaration', data)
     },
    restaurerRapport(data) {
        return Api().post('restaurer-rapport', data)
    },
   deleteAll (data) {
       return Api().delete('corbeille', data)
       },
   getAllDoc () {
       return Api().get('corbeille/document')
       },
    getAllDec(){
        return Api().get('corbeille/declaration')
    },
    getAllRapp(){
        return Api().get('corbeille/rapport')
    },
     findRapport (data) {
        return Api().get('corbeille/rapport/'+data)
    },
    
     }