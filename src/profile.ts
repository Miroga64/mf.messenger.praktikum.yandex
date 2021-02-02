document.addEventListener("DOMContentLoaded", function(){
    let container = document.getElementById('main')
    let source: any = document.getElementById('entry-template');
    if(source){
        source = source.innerHTML;
    }
    let template = Handlebars.compile(source);
    let context = { 
        edit_pass:{
            profile_back: '../main_chat/chat_with_dialog.html',
            avatar_edit_content: 'Поменять аватар',
            avatar: '../images/avatar.jpg',
            old_pass:{
                name: 'Старый пароль',
                value: '1234123',
            },
            new_pass:{
                name: 'Новый пароль',
                value: '123123',
            },
            repeat_pass:{
                name: 'Повторите новый пароль',
                value: '123123', 
            }
        },

        profile_edit:{
            profile_back: '../main_chat/chat_with_dialog.html',
            avatar_edit_content: 'Поменять аватар',
            avatar: '../images/avatar.jpg',
            mail:{
                name: 'Почта',
                value: 'pochta@yandex.ru',
            },
            login:{
                name: 'Логин',
                value: 'ivanivanov',
            },
            name:{
                name: 'Имя',
                value: 'Иван', 
            },
            second_name:{
                name: 'Фамилия',
                value: 'Иванов', 
            },
            name_in_chat:{
                name: 'Имя в чате',
                value: 'Иван', 
            },
            phone:{
                name: 'Телефон',
                value: '+7 (909) 967 30 30', 
            },  
        }
    };
    let html = template(context);
    if(container){
        container.innerHTML = html
    }
})