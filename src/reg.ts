import { Button, render } from './button.js'
document.addEventListener("DOMContentLoaded", function(){

    let container = document.getElementById('main')
    let source: any = document.getElementById('entry-template');
    if(source){
        source = source.innerHTML;
    }
    let template = Handlebars.compile(source);
    const context = {
        reg_user:{
            form_title: "Регистрация",
            mail:{
                name: 'Почта',
                error: 'Неверный формат почты'
            },
            login:{
                name: 'Логин',
                error: 'Заполните это поле'
            },
            name:{
                name: 'Имя',
                error: 'Заполните это поле'
            },
            second_name:{
                name: 'Фамилия',
                error: 'Заполните это поле'
            },
            phone:{
                name: 'Телефон',
                error: 'Неверный формат телефона'
            },
            password:{
                name: 'Пароль',
                error: 'Пароли не совпадают'
            },
        },
        user_in:{
            form_title: "Вход",
            login:{
                name: 'Логин',
                error: 'Заполните это поле'
            },
            password:{
                name: 'Пароль',
                error: 'Пароли не совпадают'
            },
        }
       
    }
    let html = template(context);

    if(container){
        container.innerHTML = html
    }

    const button = new Button({
        value: 'Сохранить',
        class: 'form__submit',
    });
    
    render(".form__bottom__container", button);

  
})