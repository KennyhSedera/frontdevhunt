import Api from '@/services/Api'

export default { 
upload(file,onUploadProgress){
    return Api().post('/upload',file,{
    headers:{
        'Content-Type':'multipart/form-data'
    },
    onUploadProgress
    })
},
getFiles(){
    return Api().get('/files')
} 
}