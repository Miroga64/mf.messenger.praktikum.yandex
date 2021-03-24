var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Handlebars.registerHelper('isIncoming', function (value) {
    return value == 'incoming' ? true : false;
});
import set from './set.js';
import { updateRoute } from './router.js';
export let store = {
    sign: {
        context: {
            user_in: {
                form_title: "Вход",
                login: {
                    name: 'Логин',
                    error: 'Заполните это поле'
                },
                password: {
                    name: 'Пароль',
                    error: 'Пароли не совпадают'
                },
            }
        },
        button: {
            value: 'Войти',
            class: 'form__submit',
            container: '.form__bottom__container',
        },
        sources: `
        <form class="form sign">
            <div class="form__top">
                <div class="form__title">{{user_in.form_title}}</div>
                <label class="form__label">
                    <input name="login" type="text" class="form__input check_empty">
                    <div class="form__placeholder">{{user_in.login.name}}</div>
                    <div class="form__error">{{user_in.login.error}}</div>
                </label>
                <label class="form__label error_pass">
                    <input name="password" type="password" class="form__input check_empty">
                    <div class="form__placeholder">{{user_in.password.name}}</div>
                    <div class="form__error">{{user_in.password.error}}</div>
                </label>
            </div>
            <div class="form__bottom">
                <div class="form__bottom__container"></div>
                <a class="form__link" href="registration.html">Зарегистрироваться</a>
            </div>
        </form>`
    },
    registration: {
        context: {
            reg_user: {
                form_title: "Регистрация",
                mail: {
                    name: 'Почта',
                    error: 'Неверный формат почты'
                },
                login: {
                    name: 'Логин',
                    error: 'Заполните это поле'
                },
                name: {
                    name: 'Имя',
                    error: 'Заполните это поле'
                },
                second_name: {
                    name: 'Фамилия',
                    error: 'Заполните это поле'
                },
                phone: {
                    name: 'Телефон',
                    error: 'Неверный формат телефона'
                },
                password: {
                    name: 'Пароль',
                    error: 'Пароли не совпадают'
                },
            }
        },
        button: {
            value: 'Зарегистрироваться',
            class: 'form__submit',
            container: '.form__bottom__container',
        },
        sources: `
            <form class="form auth">
                <div class="form__top">
                    <div class="form__title">{{reg_user.form_title}}</div>
                    <label class="form__label">
                        <input name="email" type="email" class="form__input check_email">
                        <div class="form__placeholder">{{reg_user.mail.name}}</div>
                        <div class="form__error">{{reg_user.mail.error}}</div>
                    </label>
                    <label class="form__label">
                        <input name="login" type="text" class="form__input check_empty">
                        <div class="form__placeholder">{{reg_user.login.name}}</div>
                        <div class="form__error">{{reg_user.login.error}}</div>
                    </label>
                    <label class="form__label">
                        <input name="first_name" type="text" class="form__input check_empty">
                        <div class="form__placeholder">{{reg_user.name.name}}</div>
                        <div class="form__error">{{reg_user.name.error}}</div>
                    </label>
                    <label class="form__label">
                        <input name="second_name" type="text" class="form__input check_empty">
                        <div class="form__placeholder">{{reg_user.second_name.name}}</div>
                        <div class="form__error">{{reg_user.second_name.error}}</div>
                    </label>
                    <label class="form__label">
                        <input name="phone" type="tel" class="form__input check_tel">
                        <div class="form__placeholder">{{reg_user.phone.name}}</div>
                        <div class="form__error">{{reg_user.phone.error}}</div>
                    </label>
                    <label class="form__label error_pass">
                        <input name="password" type="password" class="form__input check_pass">
                        <div class="form__placeholder">{{reg_user.password.name}}</div>
                    </label>
                    <label class="form__label error_pass">
                        <input name="second_pass" type="password" class="form__input check_pass">
                        <div class="form__placeholder">{{reg_user.password.name}}</div>
                        <div class="form__error">{{reg_user.password.error}}</div>
                    </label>
                </div>
                <div class="form__bottom">
                    <div class="form__bottom__container"></div>
                    <a class="form__link" href="main.html">Войти</a>
                </div>
            </form>`
    },
    profile: {
        context: {
            profile_edit: {
                profile_back: 'chat.html',
                avatar_edit_content: 'Поменять аватар',
                avatar: '/static/images/avatar.jpg',
                email: 'pochta@yandex.ru',
                login: 'ivanivanov',
                first_name: 'Иван',
                second_name: 'Иванов',
                display_name: 'Иван',
                phone: '+7 (909) 967 30 30',
            }
        },
        sources: `
            <div class="profile__back">
                <a href="{{ profile_edit.profile_back }}" class="profile__back__link"></a>
            </div>
            <div class="profile__content">
                <div class="profile__content__form">
                    <div class="profile__content__header">
                        <div class="profile__content__avatar" style="background-image: url(https://ya-praktikum.tech{{profile_edit.avatar}})">
                            <div class="profile__content__avatar__edit">{{profile_edit.avatar_edit_content}}</div>
                        </div>
                        <div class="profile__content__name">{{profile_edit.first_name}}</div>
                    </div>
                    <ul class="profile__content__data">
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Почта</div>
                            <input name="email" type="email" value="{{profile_edit.email}}" class="profile__content__row__input disabled">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Id</div>
                            <input name="email" type="email" value="{{profile_edit.id}}" class="profile__content__row__input disabled">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Логин</div>
                            <input name="login" type="text" class="profile__content__row__input disabled" value="{{profile_edit.login}}">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Имя</div>
                            <input name="first_name" type="text" class="profile__content__row__input disabled" value="{{profile_edit.first_name}}">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Фамилия</div>
                            <input name="second_name" type="text" class="profile__content__row__input disabled" value="{{profile_edit.second_name}}">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Имя в чате</div>
                            <input name="display_name" type="text" class="profile__content__row__input disabled" value="{{profile_edit.display_name}}">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Телефон</div>
                            <input name="phone" type="tel" class="profile__content__row__input disabled" value="{{profile_edit.phone}}">
                        </li>
                    </ul>
                    <ul class="profile__content__data">
                        <li class="profile__content__row">
                            <a href="profile_edit.html" class="profile__content__row__control">Изменить данные</a>
                        </li>
                        <li class="profile__content__row">
                            <a href="pass_edit.html" class="profile__content__row__control">Изменить пароль</a>
                        </li>
                        <li class="profile__content__row">
                            <a href="main.html" class="profile__content__row__control red system_out">Выйти</a>
                        </li>
                    </ul>
                </div>
            </div>`
    },
    profile_edit: {
        context: {
            profile_edit: {
                profile_back: 'profile.html',
                avatar_edit_content: 'Поменять аватар',
                avatar: '/static/images/avatar.jpg',
                email: 'pochta@yandex.ru',
                login: 'ivanivanov',
                first_name: 'Иван',
                second_name: 'Иванов',
                display_name: 'Иван',
                phone: '+7 (909) 967 30 30',
            }
        },
        sources: ` 
            <div class="profile__back">
                <a href="{{ profile_edit.profile_back }}" class="profile__back__link"></a>
            </div>
            <div class="profile__content">
                <div class="profile__content__form">
                    <form class="profile__content__header">
                        <div class="profile__content__avatar editable" style="background-image: url(https://ya-praktikum.tech{{profile_edit.avatar}})">
                            <div data-popup="popup_add_avatar" class="profile__content__avatar__edit">{{ profile_edit.avatar_edit_content }}</div>
                        </div>
                    </form>
                    <form class="profile__content__data change_data">
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Почта</div>
                            <input name="email" type="email" value="{{profile_edit.email}}" class="profile__content__row__input">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Логин</div>
                            <input name="login" type="text" class="profile__content__row__input" value="{{profile_edit.login}}">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Имя</div>
                            <input name="first_name" type="text" class="profile__content__row__input" value="{{profile_edit.first_name}}">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Фамилия</div>
                            <input name="second_name" type="text" class="profile__content__row__input" value="{{profile_edit.second_name}}">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Имя в чате</div>
                            <input name="display_name" type="text" class="profile__content__row__input" value="{{profile_edit.display_name}}">
                        </li>
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Телефон</div>
                            <input name="phone" type="tel" class="profile__content__row__input" value="{{profile_edit.phone}}">
                        </li>
                        <input style="margin-top: 40px" type="submit" class="form__submit" value="Сохранить">
                    </form>
                </div>
            </div>
            <div class="popup popup_add_avatar">
                <div class="popup_container add_avatar">
                    <div class="popup__add_chat__title">Обновить аватар</div>
                    <div class="popup__close"></div>
                    <form class="popup__add_chat__form add_personall_avatar">
                        <label class="popup__add_chat__label">
                            <div class="popup__add_chat__file_name">Загрузите картинку для чата</div>
                            <input name="avatar" type="file" class="popup__add_chat__file">
                        </label>
                        <input type="submit" class="form__submit add_avatar" value="Обновить">
                    </form>
                </div>
            </div>`
    },
    pass_edit: {
        context: {
            edit_pass: {
                profile_back: 'profile.html',
                avatar_edit_content: 'Поменять аватар',
                oldPassword: '',
                newPassword: '',
                repeatPassword: '',
            }
        },
        sources: `
            <div class="profile__back">
                <a href="{{edit_pass.profile_back}}" class="profile__back__link"></a>
            </div>
            <div class="profile__content">
                <div class="profile__content__form">
                    <div class="profile__content__header">
                        <div class="profile__content__avatar" style="background-image:url({{profile_edit.avatar}})">
                            <div class="profile__content__avatar__edit">{{ edit_pass.avatar_edit_content }}</div>
                        </div>
                    </div>
                    <form class="profile__content__data update_password">
                        <li class="profile__content__row">
                            <div class="profile__content__row__name">Старый пароль</div>
                            <input name="oldPassword" type="password" class="profile__content__row__input check_empty" value="{{ edit_pass.oldPassword }}">
                            <div class="form__error">Заполните это поле</div>
                        </li>
                        <li class="profile__content__row error_pass">
                            <div class="profile__content__row__name">Новый пароль</div>
                            <input name="newPassword" type="password" class="profile__content__row__input check_pass" value="{{ edit_pass.newPassword }}">
                        </li>
                        <li class="profile__content__row error_pass">
                            <div class="profile__content__row__name">Повторите пароль</div>
                            <input name="repeatPassword" type="password" class="profile__content__row__input check_pass" value="{{ edit_pass.repeatPassword }}">
                            <div class="form__error">Пароли не совпадают</div>
                        </li>
                        <input style="margin-top: 40px" type="submit" class="form__submit" value="Сохранить">
                    </form>
                </form>
            </div>`
    },
    chat: {
        context: {
            profile: {
                link: 'profile.html',
                text: 'Профиль',
            },
            chat_list: [
                {
                    avatar: '/static/images/avatar.jpg',
                    name: ['Михаил', 'Слава'],
                    text: {
                        who: '',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '10:49',
                    unread: 2,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Вася',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '1 апреля 21:00',
                    unread: 2,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Вася',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '10:49',
                    unread: 0,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Михаил',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '10:49',
                    unread: 2,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Вася',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '1 апреля 21:00',
                    unread: 2,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Вася',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '10:49',
                    unread: 0,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Михаил',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '10:49',
                    unread: 2,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Вася',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '1 апреля 21:00',
                    unread: 2,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Вася',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '10:49',
                    unread: 0,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Михаил',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '10:49',
                    unread: 2,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Вася',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '1 апреля 21:00',
                    unread: 2,
                },
                {
                    avatar: '/static/images/avatar.jpg',
                    name: 'Вася',
                    text: {
                        who: 'Вы',
                        text: 'Друзья, у меня для вас особенный выпуск новостей! Мы приготовили для вас что-то',
                    },
                    time: '10:49',
                    unread: 0,
                },
            ],
        },
        sources: `
            <div class="chat__left">
                <div class="chat__left__header">
                    <div class="chat__left__header__top">
                        <div class="chat__left__header__add" data-popup="popup_add_chat" >Создать диалог</div>
                        <a href="{{profile.link}}" class="chat__left__header__profile">{{profile.text}}</a>
                    </div>
                    <form class="chat__left__header__form">
                        <label class="chat__left__header__label">
                            <input type="text" class="chat__left__header__input" placeholder="Поиск">
                        </label>
                    </form>
                </div>
                <ul class="chat__left__dialogs">
                    {{#each chat_list}}
                        <li class="chat__left__dialog" data-id = {{this.id}}>
                            {{#if this.avatar}}
                                <div class="chat__left__dialog__avatar" style="background-image: url(https://ya-praktikum.tech{{this.avatar}})"></div>
                            {{else}}
                                <div class="chat__left__dialog__avatar" ></div>
                            {{/if}}
                            <div class="chat__left__dialog__middle">
                                <div class="chat__left__dialog__name">
                                    {{this.title}}
                                </div>
                                <div class="chat__left__dialog__text">
                                  
                                </div>
                            </div>
                            <div class="chat__left__dialog__right">
                        
                                {{#if this.unread}}
                                    <div class="chat__left__dialog__unread">{{this.unread}}</div>
                                {{/if}}
                            </div>
                            <div class="chat__left__dialog__delete"></div>
                        </li>
                {{/each}}
                </ul>
            </div>
            <div class="chat__right">
                {{#if chat_detail.user}}
                    <div class="chat__right__opend">
                        <div class="chat__right__header">
                            <div class="chat__right__header__left">
                                <div class="chat__right__header__avatar" style="background-image: {{chat_detail.user.avatar}}"></div>
                                <div class="chat__right__header__name">
                                    {{#each chat_detail.user.name}}
                                        {{this}} ,
                                    {{/each}}
                                </div>
                            </div>
                            <div class="chat__right__header__right">
                                <button class="chat__right__header__user"></button>
                            </div>
                            <div class="chat__right__header__actions disabled">
                                <div class="chat__right__header__action add" data-popup="popup_add_to_chat">Добавить пользователя</div>
                                <div class="chat__right__header__action rotate" data-popup="popup_remove_users">Удалить пользователя</div>
                            </div>
                        </div>
                        <div class="chat__right__content">
                            {{#each chat_detail.messages_block}}
                                <div class="chat__right__content__row data">
                                    {{ this.data }}
                                </div>
                                {{#each this.messages}}
            
                                    <div class="chat__right__content__row">
                                        {{#if (isIncoming this.type)}}
                                            <div class="chat__right__content__incoming">
                                                {{#if this.content}}
                                                    <pre>{{this.content}}
                                                    </pre>
                                                    <div class="chat__right__content__time">{{this.time}}</div>
                                                {{else}}
                                                    <div class="chat__right__content__incoming image" style="background-image:url({{this.image}})">
                                                        <div class="chat__right__content__time">{{this.time}}</div>
                                                    </div>
                                                {{/if}} 
                                            </div>
                                        {{else}}
                                            <div class="chat__right__content__outcoming">
                                                {{#if this.content}}
                                                    <pre>{{this.content}}
                                                    </pre>
                                                    {{#if this.read}}
                                                        <div class="chat__right__content__time read">{{this.time}}</div>
                                                    {{else}}
                                                        <div class="chat__right__content__time">{{this.time}}</div>
                                                    {{/if}}
                                                {{else}}
                                                    <div class="chat__right__content__outcoming image" style="background-image:url({{this.image}})">
                                                        {{#if this.read}}
                                                            <div class="chat__right__content__time read">{{this.time}}</div>
                                                        {{else}}
                                                            <div class="chat__right__content__time">{{this.time}}</div>
                                                        {{/if}}
                                                    </div>
                                                {{/if}}
                                            </div>
                                        {{/if}}
                                    </div>
                                {{/each}}
                            {{/each}}
                        </div>
                        <div class="chat__right__bottom">
                            <div class="chat__right__bottom__type disabled">
                                <button class="chat__right__bottom__row">
                                    <div class="chat__right__bottom__icon" style="background-image: url(/static/images/type_photo.svg)"></div>
                                    <span>Фото или Видео</span>
                                </button>
                                <button class="chat__right__bottom__row">
                                    <div class="chat__right__bottom__icon" style="background-image: url(/static/images/type_file.svg)"></div>
                                    <span>Файл</span>
                                </button>
                                <button class="chat__right__bottom__row">
                                    <div class="chat__right__bottom__icon" style="background-image: url(/static/images/type_location.svg)"></div>
                                    <span>Локация</span>
                                </button>
                            </div>
                            <div class="chat__right__bottom__add">
                                <button class="chat__right__bottom__btn"></button>
                            </div>
                            <textarea name="message" class="chat__right__bottom__message"></textarea>
                            <button class="chat__right__bottom__send"></button>
                        </div>
                    </div>
                {{else}}
                    <div class="chat__right__empty">
                        <span>Выберите чат чтобы отправить сообщение</span>
                    </div>
                {{/if}}
            </div>
            <div class="popup popup_add_chat">
                <div class="popup_container add_chat">
                    <div class="popup__add_chat__title">Создание чата</div>
                    <div class="popup__close"></div>
                    <form class="popup__add_chat__form create_chat">
                        <label class="popup__add_chat__label">
                            <div class="popup__add_chat__file_name">Загрузите картинку для чата</div>
                            <input name="avatar" type="file" class="popup__add_chat__file">
                        </label>
                        <label class="form__label">
                            <input name="title" type="text" class="form__input">
                            <div class="form__placeholder">Название для чата</div>
                            <div class="form__error">Заполните это поле</div>
                        </label>
                        <label class="form__label">
                            <input name="users" type="text" class="form__input">
                            <div class="form__placeholder">Пригласите людей: 11111, 22222, 33333</div>
                            <div class="form__error">Заполните это поле</div>
                        </label>
                        <input type="submit" class="form__submit" value="Создать">
                    </form>
                </div>
            </div>
            <div class="popup popup_add_to_chat">
                <div class="popup_container add_to_chat">
                    <div class="popup__add_chat__title">Добавить в чат</div>
                    <div class="popup__close"></div>
                    <form class="popup__add_chat__form add_person">
                        <label class="form__label">
                            <input name="users" type="text" class="form__input">
                            <div class="form__placeholder">Пригласите людей: 11111, 22222, 33333</div>
                            <div class="form__error">Заполните это поле</div>
                        </label>
                        <input type="submit" class="form__submit" value="Добавить">
                    </form>
                </div>
            </div>
            <div class="popup popup_remove_users">
                <div class="popup_container add_to_chat">
                    <div class="popup__add_chat__title">Удалить из чата</div>
                    <div class="popup__close"></div>
                    <form class="popup__add_chat__form remove_users_from_chat">
                        <label class="form__label">
                            <input name="users" type="text" class="form__input">
                            <div class="form__placeholder">Удалите людей</div>
                            <div class="form__error">Заполните это поле</div>
                        </label>
                        <input type="submit" class="form__submit" value="Удалить">
                    </form>
                </div>
            </div>
        `
    },
    page_404: {
        context: {
            page_404: {
                error: "404",
                text: "Упс, такой страницы не существует",
                link: "../main_chat/chat_with_controls.html",
                link_text: "Назад к чатам",
            },
        },
        sources: `
            <div class="empty_page">
                <div class="empty_page__title">{{ page_404.error }}</div>
                <div class="empty_page__text">{{ page_404.text }}</div>
                <a href="{{ page_404.link }}" class="empty_page__link">{{ page_404.link_text }}</a>
            </div> 
        `
    },
    page_500: {
        context: {
            page_500: {
                error: "500",
                text: "Мы уже это фиксим)",
                link: "../main_chat/chat_with_controls.html",
                link_text: "Назад к чатам",
            }
        },
        sources: `
            <div class="empty_page">
                <div class="empty_page__title">{{ page_404.error }}</div>
                <div class="empty_page__text">{{ page_404.text }}</div>
                <a href="{{ page_404.link }}" class="empty_page__link">{{ page_404.link_text }}</a>
            </div> 
        `
    }
};
export function update(name, obj, pathname, template_path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            set(store, name, obj);
            updateRoute(pathname, store[template_path]);
            resolve(obj);
        });
    });
}
