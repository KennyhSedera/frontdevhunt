import Api from '@/services/Api'

export default { 
    getDeclaration (data) {
        return Api().post('/chart/declaration',data)
   },
   //  getBtwnDeclaration (data) {
   //      return Api().post('/chart-btwn/declaration',data)
   // },
   getPerformence (data) {
        return Api().post('/chart/perf-user',data)
   },
//    getPerformenceBtwn(data) {
//       return Api().post('/chart-btwn/perf-user',data)
// },
   getSecteur (data) {
       return Api().post('/chart/secteur',data)
       },
   //  getSecteurBtwn (data) {
   //  return Api().post('/chart-btwn/secteur',data)
   //  },
    getDtc (data) {
        return Api().post('/chart/dtc',data)
        },
   //   getDtcBtwn (data) {
   //   return Api().post('/chart-btwn/dtc',data)
   //   },
     getRapport (data) {
        return Api().post('/chart/rapport',data)
        },
   //   getRapportBtwn (data) {
   //   return Api().post('/chart-btwn/rapport',data)
   //   },
     getPvs (data) {
        return Api().post('/chart/pvs',data)
        },
   //   getPvsBtwn (data) {
   //   return Api().post('/chart-btwn/pvs',data)
   //   }, 
    getDocument(data) {
        return Api().post('/chart/document',data)
    },
   //   getDocumentBtwn(data) {
   //      return Api().post('/chart-btwn/document',data)
   //  }  
    
     }