import { HTTPTransport } from './fetch.js';
import { update } from './store.js';
const host = "https://ya-praktikum.tech/api/v2";
let aut = new HTTPTransport;
export function auth(obj) {

        return aut.post_cookie(`${host}/auth/signup`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: obj,
        });

}
export function sign(obj) {

        return aut.post_cookie(`${host}/auth/signin`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: obj
        });

}
export function user_info() {

        return aut.get_cookie(`${host}/auth/user`);

}
export function chats(obj) {

        if (obj) {
            return aut.get_cookie(`${host}/chats`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: obj
            });
        }
        else {
            return aut.get_cookie(`${host}/chats`);
        }

}
export function add_user_to_chat(obj) {

        return aut.put_cookie(`${host}/chats/users`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: obj
        });

}
export function delete_users_from_chat(obj) {

        return aut.delete_cookie(`${host}/chats/users`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: obj
        });

}
export function detail_chat(obj) {

        return aut.get_cookie(`${host}/chats/${obj.id}/users`);

}
export function delete_chat(obj) {

        return aut.delete_cookie(`${host}/chats`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: obj
        }).then(data => {
            return chats({ 'limit': 100 });
        }).catch(e => {
            alert(e);
        })
            .then((response: any) => {
            return update('chat.context.chat_list', JSON.parse(response.response), '/build/route/chat.html', 'chat');
        }).catch(e => {
            alert(e);
        });

}
export function system_out() {

        return aut.post_cookie(`${host}/auth/logout`);

}
export function create_chat(obj) {

        let names = obj.users.replaceAll(' ', '').split(',');
        if (!names) {
            alert('Поле приглашенных людей пустое');
            throw new Error('Поле приглашенных людей пустое');
        }
        else {
            if (!obj.title) {
                obj.title = names[0];
            }
            let chat_id;
            if (!obj.file) {
                return aut.post_cookie(`${host}/chats`, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    data: { 'title': obj.title.toString() }
                }).then(response => {
                    return chats({ 'title': obj.title.toString() });
                }).then((response: any) => {
                    let chat_mass = JSON.parse(response.response);
                    chat_id = chat_mass[0].id;
                    return add_user_to_chat({ 'users': names, "chatId": chat_id });
                }).then(response => {
                    return chats({ 'limit': 100 });
                }).then((response: any) => {
                    return update('chat.context.chat_list', JSON.parse(response.response), '/build/route/chat.html', 'chat');
                });
            }
            else {
                return aut.post_cookie(`${host}/chats`, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    data: { 'title': obj.title.toString() }
                }).then(response => {
                    return chats({ 'title': obj.title.toString() });
                }).then((response: any) => {
                    let chat_mass = JSON.parse(response.response);
                    chat_id = chat_mass[0].id;
                    return add_user_to_chat({ 'users': names, "chatId": chat_id });
                })
                    .then(() => {
                    let formData = new FormData();
                    formData.append('chatId', chat_id);
                    formData.append('avatar', obj.file, obj.avatar);
                    for (let [name, value] of formData) {
                        console.log(`${name} = ${value}`);
                    }
                    return add_picture(formData);
                }).then(response => {
                    return chats({ 'limit': 100 });
                }).then((response: any) => {
                    return update('chat.context.chat_list', JSON.parse(response.response), '/build/route/chat.html', 'chat');
                });
            }
        }

}
export function update_pass(obj) {

        return aut.put_cookie(`${host}/user/password`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: obj
        });

}
export function update_data(obj) {

        return aut.put_cookie(`${host}/user/profile`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: obj
        });

}
export function add_picture(obj) {
        console.log(obj+'--------------------------')
        return aut.put_formdata(`${host}/chats/avatar`, {
            data: obj
        })

}
export function add_personal_avatar(obj) {

        let dataForm = new FormData();
        dataForm.append('avatar', obj.file, obj.avatar);
        return aut.put_formdata(`${host}/user/profile/avatar`, {
            
            data: dataForm
        }).then(data => {
            return user_info();
        }).then((response: any) => {
            return update('profile.context.profile_edit', JSON.parse(response.response), '/build/route/profile.html', 'profile');
        }).then(response => {
            return update('profile_edit.context.profile_edit', response, '/build/route/profile_edit.html', 'profile_edit');
        });

}
export function start_update(name, obj) {

        if (name == 'auth') {
            return auth(obj)
                .then((response: any) => {
                if (response.status == 409 || response.status == 401 || response.status == 400 || response.status == 404) {
                    console.log('Login already exists');
                    throw new Error('Login already exists');
                }
                localStorage.setItem('login', obj.login);
                localStorage.setItem('password', obj.password);
                return sign({ 'login': localStorage.getItem('login'), 'password': localStorage.getItem('password') });
            }).catch(e => {
                alert(e);
            })
                .then((data: any) => {
                if (data.status == 409 || data.status == 401 || data.status == 400 || data.status == 404) {
                    console.log('Login already exists');
                    throw new Error('Login already exists');
                }
                return user_info();
            }).catch(e => {
                alert(e);
            })
                .then((response: any) => {
                return update('profile.context.profile_edit', JSON.parse(response.response), '/build/route/profile.html', 'profile');
            })
                .then(response => {
                return update('profile_edit.context.profile_edit', response, '/build/route/profile_edit.html', 'profile_edit');
            })
                .then(data => {
                return chats({ 'limit': 100 });
            })
                .then((response: any) => {
                return update('chat.context.chat_list', JSON.parse(response.response), '/build/route/chat.html', 'chat');
            });
        }
        else {
            return sign(obj)
                .then((data: any) => {
                console.log(data.status);
                if (data.status == 401) {
                    console.log('Логин или пароль неверные');
                    throw new Error('Логин или пароль неверные');
                }
                return user_info();
            }).catch(e => {
                alert(e);
            })
                .then((response: any) => {
                return update('profile.context.profile_edit', JSON.parse(response.response), '/build/route/profile.html', 'profile');
            })
                .then(response => {
                return update('profile_edit.context.profile_edit', response, '/build/route/profile_edit.html', 'profile_edit');
            })
                .then(response => {
                localStorage.setItem('login', obj.login);
                localStorage.setItem('password', obj.password);
                return chats({ 'limit': 100 });
            })
                .then((response: any) => {
                return update('chat.context.chat_list', JSON.parse(response.response), '/build/route/chat.html', 'chat');
            });
        }
}
