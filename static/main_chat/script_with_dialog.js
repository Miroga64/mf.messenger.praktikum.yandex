"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById('main');
    let source = document.getElementById('entry-template');
    if (source) {
        source = source.innerHTML;
    }
    let template = Handlebars.compile(source);
    Handlebars.registerHelper('isIncoming', function (value) {
        return value == 'incoming' ? true : false;
    });
    let context = {
        profile: {
            link: '../profile/profile.html',
            text: 'Профиль'
        },
        chat_list: [
            {
                avatar: '../images/avatar.jpg',
                name: 'Михаил',
                text: {
                    who: '',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '10:49',
                unread: 2,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Вася',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '1 апреля 21:00',
                unread: 2,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Вася',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '10:49',
                unread: 0,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Михаил',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '10:49',
                unread: 2,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Вася',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '1 апреля 21:00',
                unread: 2,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Вася',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '10:49',
                unread: 0,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Михаил',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '10:49',
                unread: 2,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Вася',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '1 апреля 21:00',
                unread: 2,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Вася',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '10:49',
                unread: 0,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Михаил',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '10:49',
                unread: 2,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Вася',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '1 апреля 21:00',
                unread: 2,
            },
            {
                avatar: '../images/avatar.jpg',
                name: 'Вася',
                text: {
                    who: 'Вы',
                    text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                },
                time: '10:49',
                unread: 0,
            },
        ],
        chat_detail: {
            user: {
                name: 'Вадим',
                avatar: '../images/avatar.jpg'
            },
            messages_block: [
                {
                    data: '19 июня',
                    messages: [
                        {
                            type: 'incoming',
                            content: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
        
                            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                            `,
                            time: '11:56'
                        },
                        {
                            type: 'incoming',
                            image: '../images/dialog_image.png',
                            time: '12:02'
                        },
                        {
                            type: 'outcoming',
                            content: `Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! `,
                            time: '12:04',
                            read: true,
                        },
                        {
                            type: 'outcoming',
                            image: `../images/dialog_image.png`,
                            time: '12:04',
                            read: false,
                        },
                    ]
                },
                {
                    data: '19 июня',
                    messages: [
                        {
                            type: 'incoming',
                            content: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
        
                            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                            `,
                            time: '11:56'
                        },
                        {
                            type: 'incoming',
                            image: '../images/dialog_image.png',
                            time: '12:02'
                        },
                        {
                            type: 'outcoming',
                            content: `Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! Круто! `,
                            time: '12:04',
                            read: true,
                        },
                        {
                            type: 'outcoming',
                            image: `../images/dialog_image.png`,
                            time: '12:04',
                            read: false,
                        },
                    ]
                },
            ]
        }
    };
    let html = template(context);
    if (container) {
        container.innerHTML = html;
    }
});
