import "../scss/chat.scss"
import "../scss/empty_page.scss"
import "../scss/form.scss"
import "../scss/main.scss"
import "../scss/popup.scss"
import "../scss/profile.scss"
import { goto } from "./route/router.ts"
import { store, update, pushStore, clearMessage, shiftStore } from './helpers/store.ts'
import { start_update, update_data, update_pass, getToken, system_out, create_chat, delete_chat, add_personal_avatar, detail_chat, add_user_to_chat, delete_users_from_chat} from "./helpers/api.ts"
export default function scripts(){

    setTimeout(() => {
        const inputs = document.querySelectorAll('input:not([type="submit"])');
        const submits = document.querySelectorAll('.form__submit');
        const links = document.querySelectorAll('a:not(.away)')
        const pattern_email = "^[A-Za-z0-9][A-Za-z0-9\.-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]*$";
        const pattern_mobile = "(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?";
        const system_out_btn = document.querySelector('.system_out')
        const popup_close = document.querySelectorAll('.popup__close')
        const popup_call = document.querySelectorAll('[data-popup]')
        const chat_delete = document.querySelectorAll('.chat__left__dialog__delete')
        const chat_dialog = document.querySelectorAll('.chat__left__dialog')
        const chat_action = document.querySelectorAll('.chat__right__header__right')
        const add_user = document.querySelector('.chat__right__header__action.add')
        const remove_user = document.querySelector('.chat__right__header__action.rotate')
        let chat_id = 0;
        let chat_token = 0;
        let isMsg = false;
        const socket_host = "wss://ya-praktikum.tech/ws/chats/";
        let socketActive = new WebSocket(socket_host);


        if (inputs) {
            inputs.forEach(function (element) {
                element.addEventListener('blur', function (this: any) {
                    let val = this.value;
                    if(this.closest('.form__label')){
                        const form__placeholder = this.closest('.form__label').querySelector('.form__placeholder');
                        if (val.trim() !== '') {
                            form__placeholder.classList.add('active');
                        }
                        else {
                            form__placeholder.classList.remove('active');
                        }
                    }
                    if (this.classList.contains('check_empty')) {
                        const form_label = element.closest('.form__label');
                        const form_label_error = element.closest('.form__label.error');
                        if (this.value.trim() == '') {
                            if (form_label) {
                                form_label.classList.add('error');
                            }
                        }
                        else {
                            if (form_label_error) {
                                form_label_error.classList.remove('error');
                            }
                        }
                    }
                    if (this.classList.contains('check_email')) {
                        const form_label = element.closest('.form__label');
                        const form_label_error = element.closest('.form__label.error');
                        if (this.value.match(RegExp(pattern_email)) == null) {
                            if (form_label) {
                                form_label.classList.add('error');
                            }
                        }
                        else {
                            if (form_label_error) {
                                form_label_error.classList.remove('error');
                            }
                        }
                    }
                    if (this.classList.contains('check_tel')) {
                        const form_label = element.closest('.form__label');
                        const form_label_error = element.closest('.form__label.error');
                        if (this.value.match(/^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/) == null) {
                            if (form_label) {
                                form_label.classList.add('error');
                            }
                        }
                        else {
                            if (form_label_error) {
                                form_label_error.classList.remove('error');
                            }
                        }
                    }
                });
            });
        }

        if (submits) {
            submits.forEach(submit => {
                submit.addEventListener('click', function (this: any, event) {
                    console.log('submit')
                    event.preventDefault();
                    const obj: any = {};
                    const form = this.closest('form');
                    form.querySelectorAll('input:not([type="submit"]):not([name="second_pass"]):not([name="repeatPassword"])').forEach((element, index) => {
                        obj[element.getAttribute('name')] = element.value.trim();
                        if (element.classList.contains('check_empty')) {
                            const form_label = element.closest('.form__label');
                            const form_label_error = element.closest('.form__label.error');
                            if (element.value.trim() == '') {
                                if (form_label) {
                                    form_label.classList.add('error');
                                }
                            }
                            else {
                                if (form_label_error) {
                                    form_label_error.classList.remove('error');
                                }
                            }
                        }
                        if (element.classList.contains('check_email')) {
                            const form_label = element.closest('.form__label');
                            const form_label_error = element.closest('.form__label.error');
                            if (element.value.match(RegExp(pattern_email)) == null) {
                                if (form_label) {
                                    form_label.classList.add('error');
                                }
                            }
                            else {
                                if (form_label_error) {
                                    form_label_error.classList.remove('error');
                                }
                            }
                        }
                        if (element.classList.contains('check_tel')) {
                            const form_label = element.closest('.form__label');
                            const form_label_error = element.closest('.form__label.error');
                            if (element.value.match(/^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/) == null) {
                                if (form_label) {
                                    form_label.classList.add('error');
                                }
                            }
                            else {
                                if (form_label_error) {
                                    form_label_error.classList.remove('error');
                                }
                            }
                        }
                    });
                    let pass_check = form.querySelectorAll('.check_pass');
                    if (pass_check.length > 0) {
                        if (pass_check[0].value.trim() !== pass_check[1].value.trim()) {
                            class_act(form.querySelectorAll('.error_pass'), 'add', 'error');
                        }
                        else {
                            class_act(form.querySelectorAll('.error_pass.error'), 'remove', 'error');
                        }
                    }
                    let flag = true
                    console.log(obj)
                    for (let key in obj){
                        if(obj.hasOwnProperty(key)){
                            if(obj[key] == ""){
                                flag = false
                                break
                            }
                        }
                    }
                    if(flag && this.closest('form.auth')){
                        start_update('auth', obj)
                        .then( data => {
                            goto('/build/route/chat.html')
                        })
                    }
    
                    if(flag && this.closest('form.sign')){
                        start_update('sign', obj)
                        .then( data => {
                            goto('/build/route/chat.html')
                        })
                    }
    
                    if(this.closest('form.change_data')){
                        update_data(obj).catch(error => {
                            alert(error);
                        })
                        .then( (response: any) => {
                            return update('profile.context.profile_edit', JSON.parse(response.response), '/build/route/profile.html', 'profile')
                        }).then(response => {
                            return update('profile_edit.context.profile_edit', response, '/build/route/profile_edit.html', 'profile_edit')
                        }).then(response => {
                            alert('Данные успешно изменены')
                            goto('/build/route/profile.html')
                        })
                    }
    
                    if(flag && this.closest('form.update_password')){
                        update_pass(obj).catch(error => {
                            alert(error);
                        })
                        .then(response => {
                            localStorage.setItem('password', obj.newPassword)
                            alert('Пароль успешно изменен')
                            goto('/build/route/profile.html')
                        })
                    }
    
                    if(this.closest('form.create_chat')){
                        let doc: any = document.querySelector('form.create_chat input[type="file"]')
                        if(doc){
                            if(doc.files[0]){
                                obj.file = doc.files[0]
                                console.log(obj)
                            }
                        }
                        create_chat(obj)
                        .then( response => {
                            // let users = obj.users.split(',')
                            // console.log(response)
                            // console.log(users)
                            // let needUser;
                            // users.forEach(element => {
                            //     element = element.trim();
                            //     if(element == localStorage.getItem('user_id')){
                            //         needUser = element;
                            //     }
                            // })
                            // console.log(needUser)
                            goto('/build/route/chat.html')
                        })
                    }
    
    
                    if(this.closest('form.add_personall_avatar')){
                        let doc: any = document.querySelector('form.add_personall_avatar input[type="file"]')
                        if(doc){
                            if(doc.files){
                                obj.file = doc.files[0]
                                add_personal_avatar(obj).then( response => {
                                    goto('/build/route/profile.html')
                                })
                            }
                        }
                    }

                    if(this.closest('form.add_person')){
                        let names = obj.users.replaceAll(' ', '').split(',')
                        add_user_to_chat({'chatId': store.chat.context.chat_detail.user.id, 'users': names}) 
                        .then( resp => {
                            return detail_chat({'id': store.chat.context.chat_detail.user.id})
                        })
                        .then((response: any) => {
                            console.log(response)
                            let users =  JSON.parse(response.response)
                            return update('chat.context.chat_detail.user.name', users.map(element => element.display_name), '/build/route/chat.html', 'chat')
                        })
                        .then( resp => {
                            console.log(store.chat.context.chat_detail.user)
                            goto('/build/route/chat.html')
                        })
                    }

                    if(this.closest('form.remove_users_from_chat')){
                        let names = obj.users.replaceAll(' ', '').split(',')
                        delete_users_from_chat({'chatId': store.chat.context.chat_detail.user.id, 'users': names}) 
                        .then( resp => {
                            return detail_chat({'id': store.chat.context.chat_detail.user.id})
                        })
                        .then((response: any) => {
                            console.log(response)
                            let users =  JSON.parse(response.response)
                            return update('chat.context.chat_detail.user.name', users.map(element => element.display_name), '/build/route/chat.html', 'chat')
                        })
                        .then( resp => {
                            console.log(store.chat.context.chat_detail.user)
                            goto('/build/route/chat.html')
                        })
                    }
                });
            })
           
        }

        if(links){
            links.forEach(function(this: any, element){
                element.addEventListener('click', function(e){ 
                    e.preventDefault()
                    goto(`/build/route/${element.getAttribute('href')}`)
                })
            })
        }

        if(system_out_btn){
            system_out_btn.addEventListener('click', function(e){
                e.preventDefault();
                system_out().then( response => {
                    delete localStorage.login;
                    delete localStorage.password;
                    delete localStorage.user_id;
                })
            })
        }

        const textarea = document.querySelector('.chat__right__bottom__message');

        if (textarea) {
            textarea.addEventListener('keyup', function (this: any, ) {
                if (this.scrollTop > 0) {
                    this.style.height = this.scrollHeight + "px";
                }
            });
        }

        if(popup_close){
            popup_close.forEach(function (element) {
                element.addEventListener('click', function(this: any, ){
                    console.log('ops')
                    let popup = this.closest('.popup.active')
                    if(popup){
                        popup.classList.remove("active");
                    }
                })
            }) 
        }

        if(popup_call){
            popup_call.forEach(function(element){
                element.addEventListener('click', function(this: any){
                    let doc = document.querySelector(`.${this.getAttribute('data-popup')}`)
                    if(doc){
                        if(doc.classList){
                            doc.classList.add('active')
                        }
                    }
                })
            })
        }

        if(chat_delete){
            chat_delete.forEach(function(element){
                element.addEventListener('click', function(this: any, event){
                    event.stopPropagation();
                    console.log(this.getAttribute('data-id'))
                    let attr = parseInt(this.closest('.chat__left__dialog').getAttribute('data-id'))
                    console.log(attr)
                    delete_chat({'chatId': attr}).then(response => {
                        goto('/build/route/chat.html')
                    })
                })
            })
        }

        if(chat_dialog){
            chat_dialog.forEach(function(element){
                element.addEventListener('click', function(this: any, ){
                    chat_id = parseInt(this.getAttribute('data-id'));
                    
                    detail_chat({'id': parseInt(this.getAttribute('data-id'))})
                    .then((response: any) => {
                        let users =  JSON.parse(response.response)
                        return update('chat.context.chat_detail.user.name', users.map(element => element.display_name), '/build/route/chat.html', 'chat')
                    })
                    .then( response => {
                        let avatar = this.querySelector('.chat__left__dialog__avatar').style.backgroundImage;
                        update('chat.context.chat_detail.user.avatar', avatar, '/build/route/chat.html', 'chat')
                    }).then( resp => {
                        let id = this.getAttribute('data-id');
                        update('chat.context.chat_detail.user.id', id, '/build/route/chat.html', 'chat')
                    })
                    .then( response => {
                        goto('/build/route/chat.html')
                    })
                    .then( response => {
                        return getToken(chat_id)
                    })
                    .then((response: any) => {
                        chat_token = JSON.parse(response.response).token
                        if(typeof socketActive == 'object'){
                            console.log('change_chat')
                            socketActive.close()
                            clearMessage('/build/route/chat.html', 'chat')
                            goto('/build/route/chat.html')
                        }
                        socketActive = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${localStorage.getItem('user_id')}/${chat_id}/${chat_token}`); 
                       
                        socketActive.addEventListener('open', () => {
                            console.log('Соединение установлено');

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
                                console.log('reconnect')
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
                                            console.log(element)
                                            shiftStore('chat.context.chat_detail.messages_block.messages', obj, '/build/route/chat.html', 'chat')
                                        }else{
                                            let obj = {
                                                type: 'incoming', 
                                                content: element['content'],
                                                time: element['time'],
                                                read: element['is_read']
                                            }
                                            console.log(element)
                                            shiftStore('chat.context.chat_detail.messages_block.messages', obj, '/build/route/chat.html', 'chat')
                                        } 
                                    }
                                });
                                goto('/build/route/chat.html')
                                console.log('Получены данные', event.data);
                            }else{
                                if(JSON.parse(event.data)['content'] && JSON.parse(event.data)['content'] != "Something's wrong. Try again"){
                                    
                                    if(JSON.parse(event.data)['user_id'] == localStorage.getItem('user_id')){
                                        let obj = {
                                            type: 'outcoming', 
                                            content: JSON.parse(event.data)['content'],
                                            time: JSON.parse(event.data)['time'],
                                            read: JSON.parse(event.data)['is_read']
                                        }
                                        console.log(JSON.parse(event.data))
                                        pushStore('chat.context.chat_detail.messages_block.messages', obj, '/build/route/chat.html', 'chat')
                                    }else{
                                        let obj = {
                                            type: 'incoming', 
                                            content: JSON.parse(event.data)['content'],
                                            time: JSON.parse(event.data)['time'],
                                            read: JSON.parse(event.data)['is_reads']
                                        }
                                        console.log(JSON.parse(event.data))
                                        pushStore('chat.context.chat_detail.messages_block.messages', obj, '/build/route/chat.html', 'chat')
                                    }  
                                    goto('/build/route/chat.html')
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
                        const send_msg = document.getElementById('chat__right__bottom__send')
                        console.log(send_msg)
                        if(send_msg && !isMsg){
                            document.removeEventListener('click', (<any>document).funcForTarget, false);
                            document.addEventListener('click', (<any>document).funcForTarget = function targetCheck(e){
                                let target_now: any = e.target
                                if(target_now){
                                    if(target_now.id == 'chat__right__bottom__send'){
                                        console.log('message')
                                        let text = ''
                                        let elem = (<HTMLInputElement>document.getElementById('chat__right__bottom__message'))
                                        if(elem){
                                            text = elem.value;
                                        }
                                        console.log(text)
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
            })
        }

        if(chat_action){
            chat_action.forEach(element => {
                element.addEventListener('click', function(){
                    let doc = document.querySelector('.chat__right__header__actions')
                    if(doc){
                        if(doc.classList){
                            doc.classList.toggle('disabled')
                        }
                    }
                })
            })
        }


    }, 10);
    
}

function class_act(selector_name, act_name, class_name) {
    selector_name.forEach((element) => {
        element.classList[act_name](class_name);
    })
}
