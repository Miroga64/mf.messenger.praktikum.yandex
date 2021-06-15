import { getToken, detail_chat} from "../helpers/api"
import {  update, pushStore, clearMessage, shiftStore } from '../helpers/store'
import { goto } from "../route/router"




export default function chatScript(){
    const chat_dialog = document.querySelectorAll('.chat__left__dialog')
    let chat_id = 0;
    let chat_token = 0;
    const socket_host = "wss://ya-praktikum.tech/ws/chats/";
    let socketActive = new WebSocket(socket_host);
    let isMsg = false;

    if(chat_dialog){
        chat_dialog.forEach(function(element){
            element.addEventListener('click', function(this: any, ){
                chat_id = parseInt(this.getAttribute('data-id'));
                
                detail_chat({'id': parseInt(this.getAttribute('data-id'))})
                .then((response: any) => {
                    let users =  JSON.parse(response.response)
                    return update('chat.context.chat_detail.user.name', users.map(element => element.display_name), '/chat.html', 'chat')
                })
                .then( () => {
                    let avatar = this.querySelector('.chat__left__dialog__avatar').style.backgroundImage;
                    update('chat.context.chat_detail.user.avatar', avatar, '/chat.html', 'chat')
                }).then( () => {
                    let id = this.getAttribute('data-id');
                    update('chat.context.chat_detail.user.id', id, '/chat.html', 'chat')
                })
                .then( () => {
                    goto('/chat.html')
                })
                .then( () => {
                    return getToken(chat_id)
                })
                .then((response: any) => {
                    chat_token = JSON.parse(response.response).token
                    if(typeof socketActive == 'object'){
                        socketActive.close()
                        clearMessage('/chat.html', 'chat')
                        goto('/chat.html')
                    }
                    socketActive = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${localStorage.getItem('user_id')}/${chat_id}/${chat_token}`); 
                   
                    socketActive.addEventListener('open', () => {
                        socketActive.send(JSON.stringify({
                            content: '0',
                            type: 'get old',
                        }));
                    });
                    
                    socketActive.addEventListener('close', event => {
                        if (event.wasClean) {
                            console.log('Соединение закрыто чисто');
                        } else {
                            console.log('Обрыв соединения');
                        }
                    
                        console.log(`Код: ${event.code} | Причина: ${event.reason}`);

                        if(event.code == 1006){
                            socketActive = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${localStorage.getItem('user_id')}/${chat_id}/${chat_token}`); 
                        }
                    });

                    
                    socketActive.addEventListener('message', event => {
                        if(Array.isArray(JSON.parse(event.data))){
                            JSON.parse(event.data).forEach(element => {
                                if(element['content']){
                                    if(element['user_id'] == localStorage.getItem('user_id')){
                                        let obj = {
                                            type: 'outcoming', 
                                            content: element['content'],
                                            time: element['time'],
                                            read: element['is_read']
                                        }
                                        shiftStore('chat.context.chat_detail.messages_block.messages', obj, '/chat.html', 'chat')
                                    }else{
                                        let obj = {
                                            type: 'incoming', 
                                            content: element['content'],
                                            time: element['time'],
                                            read: element['is_read']
                                        }
                                        shiftStore('chat.context.chat_detail.messages_block.messages', obj, '/chat.html', 'chat')
                                    } 
                                }
                            });
                            goto('/chat.html')
                        }else{
                            if(JSON.parse(event.data)['content'] && JSON.parse(event.data)['content'] != "Something's wrong. Try again"){
                                
                                if(JSON.parse(event.data)['user_id'] == localStorage.getItem('user_id')){
                                    let obj = {
                                        type: 'outcoming', 
                                        content: JSON.parse(event.data)['content'],
                                        time: JSON.parse(event.data)['time'],
                                        read: JSON.parse(event.data)['is_read']
                                    }
                                    pushStore('chat.context.chat_detail.messages_block.messages', obj, '/chat.html', 'chat')
                                }else{
                                    let obj = {
                                        type: 'incoming', 
                                        content: JSON.parse(event.data)['content'],
                                        time: JSON.parse(event.data)['time'],
                                        read: JSON.parse(event.data)['is_reads']
                                    }
                                    pushStore('chat.context.chat_detail.messages_block.messages', obj, '/chat.html', 'chat')
                                }  
                                goto('/chat.html')
                                console.log('Получены данные', event.data);    
                            }
                        }
                       
                    });
                    
                    socketActive.addEventListener('error', (event: any) => {
                        console.log('Ошибка', event.message);
                    });
                    
                    setInterval(()=>{
                        socketActive.send(JSON.stringify({
                            type: 'message',
                        }));
                    }, 10000)
                  
                })

                if(!isMsg){
                    document.removeEventListener('click', (<any>document).funcForTarget, false);
                    document.addEventListener('click', (<any>document).funcForTarget = function targetCheck(e){
                        let target_now: any = e.target
                        if(target_now){
                            if(target_now.id == 'chat__right__bottom__send'){
                                let text = ''
                                let elem = (<HTMLInputElement>document.getElementById('chat__right__bottom__message'))
                                if(elem){
                                    text = elem.value;
                                }
                                socketActive.send(JSON.stringify({
                                    content: text,
                                    type: 'message',
                                }));
                            }
                        }
                    }, false)
                }
            })
        })
    }

}