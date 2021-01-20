document.addEventListener("DOMContentLoaded", function(){
    const inputs = document.querySelectorAll('.form__input')
    const submit = document.querySelector('.form__submit')
    if(inputs){
        inputs.forEach(element=>{
            element.addEventListener('blur', function(){
                if(this.value.trim() != ''){
                    this.closest('.form__label').querySelector('.form__placeholder').classList.add('active')
                }else{
                    this.closest('.form__label').querySelector('.form__placeholder').classList.remove('active')
                }
            })
        })     
    }


    if(submit){
        submit.addEventListener('click', function(event){

            event.preventDefault();
            let obj = {};
            let form = this.closest('form');
            
            form.querySelectorAll('input:not([type="submit"])').forEach((element, index) => {
                obj[index] = element.value.trim()
            })
    
            form.querySelectorAll('.check_empty').forEach(element => {
                if(element.value.trim() == ''){
                    if(element.closest('.form__label')){
                        element.closest('.form__label').classList.add('error')
                    }
                }else{
                    if(element.closest('.form__label.error')){
                        element.closest('.form__label.error').classList.remove('error')
                    }

                }
            })
            if(form.querySelectorAll('.check_pass').length > 0){
                let pass_check = form.querySelectorAll('.check_pass')[0].value.trim()
                
                if(pass_check != form.querySelectorAll('.check_pass')[1].value.trim()){
                    class_act(form.querySelectorAll('.error_pass'), 'add', 'error')
                }else{
                    class_act(form.querySelectorAll('.error_pass.error'), 'remove', 'error')
                }
            }
            
            console.log(obj)
        })
    }

 
})

function class_act(selector_name, act_name, class_name){
    selector_name.forEach(element => {
        element.classList[act_name](class_name)
    })
}