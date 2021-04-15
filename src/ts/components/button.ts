import Block from './block.ts'

export class Button extends Block {
    constructor(props) {
          // Создаём враппер дом-элемент button
      super("div", props);
    }
  
    render() {
      return `<input type="submit" value="${this.props.value}" class="${this.props.class}">`;
    }
  }
  
  export function render_btn(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

  
  