
import { start_update, update_data, update_pass, create_chat, add_personal_avatar, detail_chat, add_user_to_chat, delete_users_from_chat} from "../helpers/api"
import { store, update } from '../helpers/store'
import { goto } from "../route/router"

export default function submitsScript(){
    const submits = document.querySelectorAll('.form__submit');
    const pattern_email = "^[A-Za-z0-9][A-Za-z0-9\.-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]*$";
    if (submits) {
        submits.forEach(submit => {
            submit.addEventListener('click', function (this: any, event) {
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
                        goto('/chat.html')
                    })
                }
    
                if(flag && this.closest('form.sign')){
                    start_update('sign', obj)
                    .then( data => {
                        goto('/chat.html')
                    })
                }
    
                if(this.closest('form.change_data')){
                    update_data(obj).catch(error => {
                        alert(error);
                    })
                    .then( (response: any) => {
                        return update('profile.context.profile_edit', JSON.parse(response.response), '/profile.html', 'profile')
                    }).then(response => {
                        return update('profile_edit.context.profile_edit', response, '/profile_edit.html', 'profile_edit')
                    }).then(() => {
                        alert('Данные успешно изменены')
                        goto('/profile.html')
                    })
                }
    
                if(flag && this.closest('form.update_password')){
                    update_pass(obj).catch(error => {
                        alert(error);
                    })
                    .then(() => {
                        alert('Пароль успешно изменен')
                        goto('/profile.html')
                    })
                }
    
                if(this.closest('form.create_chat')){
                    let doc: any = document.querySelector('form.create_chat input[type="file"]')
                    if(doc){
                        if(doc.files[0]){
                            obj.file = doc.files[0]
                        }
                    }
                    create_chat(obj)
                    .then( () => {
                        goto('/chat.html')
                    })
                }
    
    
                if(this.closest('form.add_personall_avatar')){
                    let doc: any = document.querySelector('form.add_personall_avatar input[type="file"]')
                    if(doc){
                        if(doc.files){
                            obj.file = doc.files[0]
                            add_personal_avatar(obj).then(() => {
                                goto('/profile.html')
                            })
                        }
                    }
                }
    
                if(this.closest('form.add_person')){
                    let names = obj.users.replaceAll(' ', '').split(',')
                    add_user_to_chat({'chatId': store.chat.context.chat_detail.user.id, 'users': names}) 
                    .then( () => {
                        return detail_chat({'id': store.chat.context.chat_detail.user.id})
                    })
                    .then((response: any) => {
                        let users =  JSON.parse(response.response)
                        return update('chat.context.chat_detail.user.name', users.map(element => element.display_name), '/chat.html', 'chat')
                    })
                    .then(() => {
                        goto('/chat.html')
                    })
                }
    
                if(this.closest('form.remove_users_from_chat')){
                    let names = obj.users.replaceAll(' ', '').split(',')
                    delete_users_from_chat({'chatId': store.chat.context.chat_detail.user.id, 'users': names}) 
                    .then( resp => {
                        return detail_chat({'id': store.chat.context.chat_detail.user.id})
                    })
                    .then((response: any) => {
                        let users =  JSON.parse(response.response)
                        return update('chat.context.chat_detail.user.name', users.map(element => element.display_name), '/chat.html', 'chat')
                    })
                    .then( resp => {
                        goto('/chat.html')
                    })
                }
            });
        })
       
    }
}

function class_act(selector_name, act_name, class_name) {
    selector_name.forEach((element) => {
        element.classList[act_name](class_name);
    })
}