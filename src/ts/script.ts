'use strict'
import "../scss/chat.scss"
import "../scss/empty_page.scss"
import "../scss/form.scss"
import "../scss/main.scss"
import "../scss/popup.scss"
import "../scss/profile.scss"
import { goto } from "./route/router"
import inputsScript from './scripts_helper/inputs'
import submitsScript from './scripts_helper/submits'
import linksScript from './scripts_helper/links'
import outBtnScript from './scripts_helper/outBtn'
import chatScript from './scripts_helper/chatDialog'


import { delete_chat } from "./helpers/api"
export default function scripts(){

    setTimeout(() => {
        const popup_close = document.querySelectorAll('.popup__close')
        const popup_call = document.querySelectorAll('[data-popup]')
        const chat_delete = document.querySelectorAll('.chat__left__dialog__delete')
        const chat_action = document.querySelectorAll('.chat__right__header__right')


        inputsScript()
        submitsScript();
        linksScript();
        outBtnScript();




        if(popup_close){
            popup_close.forEach(function (element) {
                element.addEventListener('click', function(this: any, ){
                    let popup = this.closest('.popup.active')
                    if(popup){
                        popup.classList.remove("active");
                    }
                })
            }) 
        }

        if(popup_call){
            popup_call.forEach(function(element){
                element.addEventListener('click', function(this: any){
                    let doc = document.querySelector(`.${this.getAttribute('data-popup')}`)
                    if(doc){
                        if(doc.classList){
                            doc.classList.add('active')
                        }
                    }
                })
            })
        }

        if(chat_delete){
            chat_delete.forEach(function(element){
                element.addEventListener('click', function(this: any, event){
                    event.stopPropagation();
                    let attr = parseInt(this.closest('.chat__left__dialog').getAttribute('data-id'))
                    delete_chat({'chatId': attr}).then(() => {
                        goto('/chat.html')
                    })
                })
            })
        }

        chatScript()

        if(chat_action){
            chat_action.forEach(element => {
                element.addEventListener('click', function(){
                    let doc = document.querySelector('.chat__right__header__actions')
                    if(doc){
                        if(doc.classList){
                            doc.classList.toggle('disabled')
                        }
                    }
                })
            })
        }


    }, 10);
    
}
