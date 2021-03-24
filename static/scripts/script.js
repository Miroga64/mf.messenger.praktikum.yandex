import { goto } from "./router.js";
import { store, update } from './store.js';
import { start_update, update_data, update_pass, system_out, create_chat, delete_chat, add_personal_avatar, detail_chat, add_user_to_chat, delete_users_from_chat } from "./api.js";
export default function scripts() {
    setTimeout(() => {
        const inputs = document.querySelectorAll('input:not([type="submit"])');
        const submits = document.querySelectorAll('.form__submit');
        const links = document.querySelectorAll('a:not(.away)');
        const pattern_email = "^[A-Za-z0-9][A-Za-z0-9\.-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]*$";
        const pattern_mobile = "(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?";
        const system_out_btn = document.querySelector('.system_out');
        const popup_close = document.querySelectorAll('.popup__close');
        const popup_call = document.querySelectorAll('[data-popup]');
        const chat_delete = document.querySelectorAll('.chat__left__dialog__delete');
        const chat_dialog = document.querySelectorAll('.chat__left__dialog');
        const chat_action = document.querySelectorAll('.chat__right__header__right');
        const add_user = document.querySelector('.chat__right__header__action.add');
        const remove_user = document.querySelector('.chat__right__header__action.rotate');
        if (inputs) {
            inputs.forEach(function (element) {
                element.addEventListener('blur', function () {
                    let val = this.value;
                    if (this.closest('.form__label')) {
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
                submit.addEventListener('click', function (event) {
                    console.log('submit');
                    event.preventDefault();
                    const obj = {};
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
                    let flag = true;
                    console.log(obj);
                    for (let key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (obj[key] == "") {
                                flag = false;
                                break;
                            }
                        }
                    }
                    if (flag && this.closest('form.auth')) {
                        start_update('auth', obj)
                            .then(data => {
                            goto('/static/route/chat.html');
                        });
                    }
                    if (flag && this.closest('form.sign')) {
                        start_update('sign', obj)
                            .then(data => {
                            goto('/static/route/chat.html');
                        });
                    }
                    if (this.closest('form.change_data')) {
                        update_data(obj).catch(error => {
                            alert(error);
                        })
                            .then((response) => {
                            return update('profile.context.profile_edit', JSON.parse(response.response), '/static/route/profile.html', 'profile');
                        }).then(response => {
                            return update('profile_edit.context.profile_edit', response, '/static/route/profile_edit.html', 'profile_edit');
                        }).then(response => {
                            alert('Данные успешно изменены');
                            goto('/static/route/profile.html');
                        });
                    }
                    if (flag && this.closest('form.update_password')) {
                        update_pass(obj).catch(error => {
                            alert(error);
                        })
                            .then(response => {
                            localStorage.setItem('password', obj.newPassword);
                            alert('Пароль успешно изменен');
                            goto('/static/route/profile.html');
                        });
                    }
                    if (this.closest('form.create_chat')) {
                        let doc = document.querySelector('form.create_chat input[type="file"]');
                        if (doc) {
                            if (doc.files[0]) {
                                obj.file = doc.files[0];
                                console.log(obj);
                                create_chat(obj).then(response => {
                                    goto('/static/route/chat.html');
                                });
                            }
                        }
                    }
                    if (this.closest('form.add_personall_avatar')) {
                        let doc = document.querySelector('form.add_personall_avatar input[type="file"]');
                        if (doc) {
                            if (doc.files) {
                                obj.file = doc.files[0];
                                add_personal_avatar(obj).then(response => {
                                    goto('/static/route/profile.html');
                                });
                            }
                        }
                    }
                    if (this.closest('form.add_person')) {
                        let names = obj.users.replaceAll(' ', '').split(',');
                        add_user_to_chat({ 'chatId': store.chat.context.chat_detail.user.id, 'users': names })
                            .then(resp => {
                            return detail_chat({ 'id': store.chat.context.chat_detail.user.id });
                        })
                            .then((response) => {
                            console.log(response);
                            let users = JSON.parse(response.response);
                            return update('chat.context.chat_detail.user.name', users.map(element => element.display_name), '/static/route/chat.html', 'chat');
                        })
                            .then(resp => {
                            console.log(store.chat.context.chat_detail.user);
                            goto('/static/route/chat.html');
                        });
                    }
                    if (this.closest('form.remove_users_from_chat')) {
                        let names = obj.users.replaceAll(' ', '').split(',');
                        delete_users_from_chat({ 'chatId': store.chat.context.chat_detail.user.id, 'users': names })
                            .then(resp => {
                            return detail_chat({ 'id': store.chat.context.chat_detail.user.id });
                        })
                            .then((response) => {
                            console.log(response);
                            let users = JSON.parse(response.response);
                            return update('chat.context.chat_detail.user.name', users.map(element => element.display_name), '/static/route/chat.html', 'chat');
                        })
                            .then(resp => {
                            console.log(store.chat.context.chat_detail.user);
                            goto('/static/route/chat.html');
                        });
                    }
                });
            });
        }
        if (links) {
            links.forEach(function (element) {
                element.addEventListener('click', function (e) {
                    e.preventDefault();
                    goto(`/static/route/${element.getAttribute('href')}`);
                });
            });
        }
        if (system_out_btn) {
            system_out_btn.addEventListener('click', function (e) {
                e.preventDefault();
                system_out().then(response => {
                    delete localStorage.login;
                    delete localStorage.password;
                });
            });
        }
        const textarea = document.querySelector('.chat__right__bottom__message');
        if (textarea) {
            textarea.addEventListener('keyup', function () {
                if (this.scrollTop > 0) {
                    this.style.height = this.scrollHeight + "px";
                }
            });
        }
        if (popup_close) {
            popup_close.forEach(function (element) {
                element.addEventListener('click', function () {
                    console.log('ops');
                    let popup = this.closest('.popup.active');
                    if (popup) {
                        popup.classList.remove("active");
                    }
                });
            });
        }
        if (popup_call) {
            popup_call.forEach(function (element) {
                element.addEventListener('click', function () {
                    let doc = document.querySelector(`.${this.getAttribute('data-popup')}`);
                    if (doc) {
                        if (doc.classList) {
                            doc.classList.add('active');
                        }
                    }
                });
            });
        }
        if (chat_delete) {
            chat_delete.forEach(function (element) {
                element.addEventListener('click', function (event) {
                    event.stopPropagation();
                    console.log(this.getAttribute('data-id'));
                    let attr = parseInt(this.closest('.chat__left__dialog').getAttribute('data-id'));
                    console.log(attr);
                    delete_chat({ 'chatId': attr }).then(response => {
                        goto('/static/route/chat.html');
                    });
                });
            });
        }
        if (chat_dialog) {
            chat_dialog.forEach(function (element) {
                element.addEventListener('click', function () {
                    detail_chat({ 'id': parseInt(this.getAttribute('data-id')) })
                        .then((response) => {
                        let users = JSON.parse(response.response);
                        return update('chat.context.chat_detail.user.name', users.map(element => element.display_name), '/static/route/chat.html', 'chat');
                    })
                        .then(response => {
                        let avatar = this.querySelector('.chat__left__dialog__avatar').style.backgroundImage;
                        update('chat.context.chat_detail.user.avatar', avatar, '/static/route/chat.html', 'chat');
                    }).then(resp => {
                        let id = this.getAttribute('data-id');
                        update('chat.context.chat_detail.user.id', id, '/static/route/chat.html', 'chat');
                    })
                        .then(response => {
                        goto('/static/route/chat.html');
                    });
                });
            });
        }
        if (chat_action) {
            chat_action.forEach(element => {
                element.addEventListener('click', function () {
                    let doc = document.querySelector('.chat__right__header__actions');
                    if (doc) {
                        if (doc.classList) {
                            doc.classList.toggle('disabled');
                        }
                    }
                });
            });
        }
    }, 10);
}
function class_act(selector_name, act_name, class_name) {
    selector_name.forEach((element) => {
        element.classList[act_name](class_name);
    });
}
