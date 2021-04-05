import EventBus from "../helpers/event-bus.js"
class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_RENDER: "flow:render",
      FLOW_CDU: "flow:component-did-update"
    };
    props: any;
    eventBus: any;
    _element: any = null;
    _meta: any = null;
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        props
      };
      this.props = this._makePropsProxy(props);
      this.eventBus = () => eventBus;
      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
    init() {
      this._createResources();
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
      this.componentDidMount();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
      // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps = null) {}
    _componentDidUpdate(oldProps, newProps) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if(response) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      }
    }
      // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
      if(oldProps == newProps) {
        return false;      
      } else {
        return true;
      }
    }
    setProps = nextProps => {
      if (!nextProps) {
        return;
      }
      Object.assign(this.props, nextProps);
    };
    get element() {
      return this._element;
    }
    _render() {
      const block = this.render();
  
      this._element.innerHTML = block;
    }
      // Может переопределять пользователь, необязательно трогать
    render() {
      return this._element;
    }
    getContent() {
      return this._element;
    }
    _makePropsProxy(props) {
      const self = this;
      props = new Proxy(props, {
  
        set(target, prop, newValue) {
          const oldValue = target[prop];
          target[prop] = newValue;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, newValue);
          return true;
        },
        deleteProperty(target, prop) {
          throw new Error(`нет доступа`);
        }
      });
      return props;
    }
    _createDocumentElement(tagName) {
      return document.createElement(tagName);
    }
    show() {
      this.getContent().style.display = 'block';
    }
    hide() {
      this.getContent().style.display = 'none';
    }
  }
  export default Block
  