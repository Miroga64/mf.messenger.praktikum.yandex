import compileTemplate from '../compile_template';
import scripts from '../script'
import { Button, render_btn } from '../components/button';
import { store } from '../helpers/store'
import { page_update } from "../helpers/api"



interface btn {
    value: number;
    class: string;
    container: string;
}

class Block {
    _html: string;
    _btn:  btn;
    constructor( obj ){
        this._html = obj != '' ? compileTemplate(obj.sources, obj.context) : '';
        this._btn = obj.button
    }

    getContent() {

        return {
            html: this._html,
            button: this._btn,
        }
    }

    show(query) {
        const root = document.querySelector(query);
        root.innerHTML = this._html;
        if(this._btn){
            const button = new Button({
                value: this._btn.value,
                class: this._btn.class,
            });
            render_btn(this._btn.container, button);
        }
        return root;
    }

    hide() {
        console.log('hide');
    }
}

  
function isEqual(lhs, rhs) {
    return lhs === rhs;
}

function render(query, block) {

    const root = document.querySelector(query);
    let content = block.getContent()

    root.innerHTML = content.html;
    if(content.button){
        const button = new Button({
            value: content.button.value,
            class: content.button.class,
        });
        render_btn(content.button.container, button);
    }
    return root;
}
  
class Route {
    _pathname: string;
    _blockClass: any;
    _block: any;
    _props: any; 

    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
  
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    update(pathname, view, props){
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    leave() {
    }

    match(pathname) {

        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props.obj);
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show(this._props.rootQuery);
    }
}

class Router {

    routes: any;
    history: any;
    _currentRoute: any;
    _rootQuery: any;
    __instance: any;
    static __instance: any;

    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname, block, temp) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery, obj: temp});
        this.routes.push(route);
        return this
    }

    update(pathname, block, temp){
        let find = this.getRoute(pathname)
        if(find){
            find.update(pathname, block, {rootQuery: this._rootQuery, obj: temp})
        } 
    }

    start() {
        window.onpopstate = event => {
            if(localStorage.getItem('user_id') && (event.currentTarget.location.pathname.indexOf('main') || !event.currentTarget.location.pathname.indexOf('registration'))){
                this.go('/chat.html')
            }else{
                this._onRoute(event.currentTarget.location.pathname);
            }
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        scripts();
        const route = this.getRoute(pathname);
        if (!route) {
            goto('/page_404.html')
        }else{
            if (this._currentRoute) {
                this._currentRoute.leave();
            }
    
            this._currentRoute = route;
            route.render();
        }


    }

    go(pathname) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back()
    }

    forward() { 
        let forward = this.history.forward()
        this._onRoute(forward);
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

  
const router = new Router(".app");

if(localStorage.getItem('user_id')){
    page_update()
    .then( () => {
        router
            .use("/", Block, store.sign)
            .use("/index.html", Block, store.sign)
            .use("/registration.html", Block, store.registration)
            .use("/profile.html", Block, store.profile)
            .use("/profile_edit.html", Block, store.profile_edit)
            .use("/pass_edit.html", Block, store.pass_edit)
            .use("/chat.html", Block, store.chat)
            .use("/page_404.html", Block, store.page_404)
            .use("/page_500.html", Block, store.page_500)
            .start();
    }).catch(e => {
        goto("/index.html")
    })
} else{
    router
        .use("/", Block, store.sign)
        .use("/index.html", Block, store.sign)
        .use("/registration.html", Block, store.registration)
        .use("/profile.html", Block, store.profile)
        .use("/profile_edit.html", Block, store.profile_edit)
        .use("/pass_edit.html", Block, store.pass_edit)
        .use("/chat.html", Block, store.chat)
        .use("/page_404.html", Block, store.page_404)
        .use("/page_500.html", Block, store.page_500)
        .start();
}



export function startRoute(){
    router.start()
}

export function goto(pathname){
    router.go(pathname)
}
export function updateRoute(pathname, template){
    router.update(pathname, Block, template)
}
