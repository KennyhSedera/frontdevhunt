import Api from '@/services/Api'

export default { 
    countEtudParcours (id) {
        return Api().get('countEtudiantParcour/'+id)
   },
   getEtudiantPublication (id) {
       return Api().get('getEtudiantPublication/'+id)
       },
   getPays () {
       return Api().get('dashboard/pays')
       },
   getPersonnel () {
       return Api().get('dashboard/personnel')
       },
   getMarchandise () {
    return Api().get('dashboard/marchandise')
    },
    getPvs () {
        return Api().get('dashboard/pvs')
        }, 
    getAllProfil(){

        return Api().get('/societes/profil')
    },
    getRapport() {
        return Api().get('/dashboard/rapport')
    } , 
    getDocument() {
        return Api().get('/dashboard/document')
    }, 
    getDtcDocument(data) {
        return Api().get('/dashboard/document/'+data)
    }  
    
     }