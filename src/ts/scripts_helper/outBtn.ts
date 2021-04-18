
import { goto } from "../route/router"
import { system_out } from "../helpers/api"


export default function outBtnScript(){
    const system_out_btn = document.querySelector('.system_out')
    if(system_out_btn){
        system_out_btn.addEventListener('click', function(e){
            e.preventDefault();
            system_out().then( () => {
                delete localStorage.user_id;
                goto("/")
            })
        })
    }
}