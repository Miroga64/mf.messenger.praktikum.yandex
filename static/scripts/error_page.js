"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById('main');
    let source = document.getElementById('entry-template');
    if (source) {
        source = source.innerHTML;
    }
    let template = Handlebars.compile(source);
    let context = {
        page_404: {
            error: "404",
            text: "Упс, такой страницы не существует",
            link: "../main_chat/chat_with_controls.html",
            link_text: "Назад к чатам",
        },
        page_500: {
            error: "500",
            text: "Мы уже это фиксим)",
            link: "../main_chat/chat_with_controls.html",
            link_text: "Назад к чатам",
        }
    };
    let html = template(context);
    if (container) {
        container.innerHTML = html;
    }
});
