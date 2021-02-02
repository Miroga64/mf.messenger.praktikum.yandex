document.addEventListener("DOMContentLoaded", function(){
    setTimeout(()=>{
        const inputs = document.querySelectorAll('input:not([type="submit"])')
        const submit = document.querySelector('.form__submit')
        const pattern_email = "^[A-Za-z0-9][A-Za-z0-9\.-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]*$";
        const pattern_mobile = "(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?"
    
        if(inputs){
            inputs.forEach(function(element){
                element.addEventListener('blur', function(this: any){
                    let val = this.value;
                    const form__placeholder = this.closest('.form__label').querySelector('.form__placeholder')
    
                    if(form__placeholder){
                        if(val.trim() !== ''){
                            form__placeholder.classList.add('active')
                        }else{
                            form__placeholder.classList.remove('active')
                        }
                    }
    
                    if(this.classList.contains('check_empty')){
                        const form_label = element.closest('.form__label')
                        const form_label_error = element.closest('.form__label.error') ;
    
                        if(this.value.trim() == ''){
                            if(form_label){
                                form_label.classList.add('error')
                            }
                        }else{
                            if(form_label_error){
                                form_label_error.classList.remove('error')
                            }
                        }
                    }
    
                    if(this.classList.contains('check_email')){
                        const form_label = element.closest('.form__label')
                        const form_label_error = element.closest('.form__label.error') ;
    
                        if(this.value.match(RegExp(pattern_email)) == null){
                            if(form_label){
                                form_label.classList.add('error')
                            }
                        }else{
                            if(form_label_error){
                                form_label_error.classList.remove('error')
                            }
                        }
                    }
    
                    if(this.classList.contains('check_tel')){
                        const form_label = element.closest('.form__label')
                        const form_label_error = element.closest('.form__label.error') ;
    
                        if(this.value.match(/^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/) == null){
                            if(form_label){
                                form_label.classList.add('error')
                            }
                        }else{
                            if(form_label_error){
                                form_label_error.classList.remove('error')
                            }
                        }
                    }
                })
            })     
        }
    
        if(submit){
            submit.addEventListener('click', function(this:any, event){
    
                event.preventDefault();
                const obj: any = {};
                const form: any = this.closest('form');
                
                form.querySelectorAll('input:not([type="submit"])').forEach((element: any, index:number) => {
                    obj[index] = element.value.trim()
    
    
                    if(element.classList.contains('check_empty')){
                        const form_label = element.closest('.form__label')
                        const form_label_error = element.closest('.form__label.error') ;
    
                        if(element.value.trim() == ''){
                            if(form_label){
                                form_label.classList.add('error')
                            }
                        }else{
                            if(form_label_error){
                                form_label_error.classList.remove('error')
                            }
                        }
                    }
    
                    if(element.classList.contains('check_email')){
                        const form_label = element.closest('.form__label')
                        const form_label_error = element.closest('.form__label.error') ;
    
                        if(element.value.match(RegExp(pattern_email)) == null){
                            if(form_label){
                                form_label.classList.add('error')
                            }
                        }else{
                            if(form_label_error){
                                form_label_error.classList.remove('error')
                            }
                        }
                    }
    
                    if(element.classList.contains('check_tel')){
                        const form_label = element.closest('.form__label')
                        const form_label_error = element.closest('.form__label.error') ;
    
                        if(element.value.match(/^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/) == null){
                            if(form_label){
                                form_label.classList.add('error')
                            }
                        }else{
                            if(form_label_error){
                                form_label_error.classList.remove('error')
                            }
                        }
                    }
                })
        
                let pass_check: NodeListOf<HTMLInputElement> = form.querySelectorAll('.check_pass')
    
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
            textarea.addEventListener('keyup', function(this: any){
                if(this.scrollTop > 0){
                    this.style.height = this.scrollHeight + "px";
                }
            });
        }
    }, 1000)
   
})

function class_act(selector_name: any, act_name: string, class_name: string){
    selector_name.forEach((element: any) => {
        element.classList[act_name](class_name)
    })
}

