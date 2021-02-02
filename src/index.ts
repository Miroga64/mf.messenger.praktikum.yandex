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
                link: './static/pages/index.html',
                name: 'Вход',
            },
            {
                link: './static/pages/reg.html',
                name: 'Регистрация',
            },
            {
                link: './static/pages/profile.html',
                name: 'Профиль',
            },
            {
                link: './static/pages/profile_edit.html',
                name: 'Изменить данные в профиле',
            },
            {
                link: './static/pages/edit_pass.html',
                name: 'Изменить пароль',
            },
            {
                link: './static/pages/chat_empty.html',
                name: 'Чат без детаального диалога',
            },
            {
                link: './static/pages/chat_with_dialog.html',
                name: 'Чат c детальным диалогом',
            },
            {
                link: './static/pages/chat_with_controls.html',
                name: 'Чат c элементами управления',
            },
            {
                link: './static/pages/page_404.html',
                name: 'Ошибка 404',
            },
            {
                link: './static/pages/page_500.html',
                name: 'Ошибка 500',
            },
        ]
    };
    let html = template(context);
    if (container) {
        container.innerHTML = html;
    }
});
