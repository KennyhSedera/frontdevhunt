import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('action', data)
    },
    delete (data) {
        return Api().delete('action/'+data)
    }, 
    update (data, idaction) {
        return Api().put('action/'+idaction, data)
    },
    getAll () {
        return Api().get('action')
    },
    getOne (idaction) {
        return Api().get('action/'+idaction)
    }
    
}