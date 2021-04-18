import { goto } from "../route/router"

export default function linksScript(){
    const links = document.querySelectorAll('a:not(.away)')
    if(links){
        links.forEach(function(this: any, element){
            element.addEventListener('click', function(e){ 
                e.preventDefault()
                goto(`/${element.getAttribute('href')}`)
            })
        })
    }
}