document.addEventListener("DOMContentLoaded", function(){
    const inputs = document.querySelectorAll('.form__input')
    const submit = document.querySelector('.form__submit')
    if(inputs){
        inputs.forEach(function(element){
            element.addEventListener('blur', function(){
                let val = typeof(this.value) === "string" ? this.value : this.value.toString();
                const form__placeholder = this.closest('.form__label').querySelector('.form__placeholder')

                if(val.trim() !== ''){
                    form__placeholder.classList.add('active')
                }else{
                    form__placeholder.classList.remove('active')
                }
            })
        })     
    }


    if(submit){
        submit.addEventListener('click', function(event){

            event.preventDefault();
            const obj = {};
            const form = this.closest('form');
            
            form.querySelectorAll('input:not([type="submit"])').forEach((element, index) => {
                obj[index] = element.value.trim()
            })
    
            form.querySelectorAll('.check_empty').forEach(element => {
                const form_label = element.closest('.form__label')
                const form_label_error = element.closest('.form__label.error')

                if(element.value.trim() == ''){
                    if(form_label){
                        form_label.classList.add('error')
                    }
                }else{
                    if(form_label_error){
                        form_label_error.classList.remove('error')
                    }

                }
            })
            
            let pass_check = form.querySelectorAll('.check_pass')

            if(pass_check.length > 0){
               
                if(pass_check[0].value.trim() !== pass_check[1].value.trim()){
                    class_act(form.querySelectorAll('.error_pass'), 'add', 'error')
                }else{
                    class_act(form.querySelectorAll('.error_pass.error'), 'remove', 'error')
                }
            }
            
            console.log(obj)
        })
    }

    const textarea = document.querySelector('.chat__right__bottom__message');

    if(textarea){
        textarea.addEventListener('keyup', function(){
            if(this.scrollTop > 0){
                this.style.height = this.scrollHeight + "px";
            }
        });
    }
})

function class_act(selector_name, act_name, class_name){
    selector_name.forEach(element => {
        element.classList[act_name](class_name)
    })
}