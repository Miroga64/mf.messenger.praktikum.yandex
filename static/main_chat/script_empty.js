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
        chat_detail: {},
    };
    let html = template(context);
    if (container) {
        container.innerHTML = html;
    }
});
