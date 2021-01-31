"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById('main');
    let source: any = document.getElementById('entry-template');
    if (source) {
        source = source.innerHTML;
    }
    let template = Handlebars.compile(source);
    Handlebars.registerHelper('isIncoming', function (value) {
        return value == 'incoming' ? true : false;
    });
    let context = {
        link_array:[
            {
                link: './static/registration_and_sign_in/index.html',
                name: 'Вход',
            },
            {
                link: './static/registration_and_sign_in/reg.html',
                name: 'Регистрация',
            },
            {
                link: './static/profile/profile.html',
                name: 'Профиль',
            },
            {
                link: './static/profile/profile_edit.html',
                name: 'Изменить данные в профиле',
            },
            {
                link: './static/profile/edit_pass.html',
                name: 'Изменить пароль',
            },
            {
                link: './static/main_chat/chat_empty.html',
                name: 'Чат без детаального диалога',
            },
            {
                link: './static/main_chat/chat_with_dialog.html',
                name: 'Чат c детальным диалогом',
            },
            {
                link: './static/main_chat/chat_with_controls.html',
                name: 'Чат c элементами управления',
            },
            {
                link: './static/error_page/page_404.html',
                name: 'Ошибка 404',
            },
            {
                link: './static/error_page/page_500.html',
                name: 'Ошибка 500',
            },
        ]
    };
    let html = template(context);
    if (container) {
        container.innerHTML = html;
    }
});
