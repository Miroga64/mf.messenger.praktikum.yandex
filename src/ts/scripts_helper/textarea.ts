
export default function linksScript(){
    const textarea = document.querySelector('.chat__right__bottom__message');

    if (textarea) {
        textarea.addEventListener('keyup', function (this: any, ) {
            if (this.scrollTop > 0) {
                this.style.height = this.scrollHeight + "px";
            }
        });
    }
}