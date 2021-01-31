import { Button, render } from '../components/button.js';
document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById('main');
    let source = document.getElementById('entry-template');
    if (source) {
        source = source.innerHTML;
    }
    let template = Handlebars.compile(source);
    let context = {
        edit_pass: {
            profile_back: '../main_chat/chat_with_dialog.html',
            avatar_edit_content: 'Поменять аватар',
            old_pass: {
                name: 'Старый пароль',
                value: '1234123',
            },
            new_pass: {
                name: 'Новый пароль',
                value: '123123',
            },
            repeat_pass: {
                name: 'Повторите новый пароль',
                value: '123123',
            }
        }
    };
    let html = template(context);
    if (container) {
        container.innerHTML = html;
    }
    const button = new Button({
        value: 'Сохранить',
        class: 'form__submit',
    });
    render(".profile__content__form", button);
});
