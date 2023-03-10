import { io } from 'socket.io-client';

class SocketioService {
  socket;
  messages=[];
  constructor() {}

  setupSocketConnection() {
    this.socket = io("http://localhost:3030",{
      auth:{ 
            token:{id:1,nom:"Avotra",prenom:"Randriah",photo_Profil:"admin.jpg"}
       }
    });
   
    this.socket.on('message', (data) => {
      console.log(data)
    })
  }
  disconnect() {
      if (this.socket) {
          this.socket.disconnect();
      }
  }

 sendMessage(message) {
    this.socket.emit('message',message)
  }
  getMessage(){
    var msg = this.socket.on('message')
    return msg
  }
}

export default new SocketioService();