export default function inputsScript(){
    const inputs = document.querySelectorAll('input:not([type="submit"])');
    const pattern_email = "^[A-Za-z0-9][A-Za-z0-9\.-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]*$";
    
    if (inputs) {
        inputs.forEach(function (element) {
            element.addEventListener('blur', function (this: any) {
                let val = this.value;
                if(this.closest('.form__label')){
                    const form__placeholder = this.closest('.form__label').querySelector('.form__placeholder');
                    if (val.trim() !== '') {
                        form__placeholder.classList.add('active');
                    }
                    else {
                        form__placeholder.classList.remove('active');
                    }
                }
                if (this.classList.contains('check_empty')) {
                    const form_label = element.closest('.form__label');
                    const form_label_error = element.closest('.form__label.error');
                    if (this.value.trim() == '') {
                        if (form_label) {
                            form_label.classList.add('error');
                        }
                    }
                    else {
                        if (form_label_error) {
                            form_label_error.classList.remove('error');
                        }
                    }
                }
                if (this.classList.contains('check_email')) {
                    const form_label = element.closest('.form__label');
                    const form_label_error = element.closest('.form__label.error');
                    if (this.value.match(RegExp(pattern_email)) == null) {
                        if (form_label) {
                            form_label.classList.add('error');
                        }
                    }
                    else {
                        if (form_label_error) {
                            form_label_error.classList.remove('error');
                        }
                    }
                }
                if (this.classList.contains('check_tel')) {
                    const form_label = element.closest('.form__label');
                    const form_label_error = element.closest('.form__label.error');
                    if (this.value.match(/^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/) == null) {
                        if (form_label) {
                            form_label.classList.add('error');
                        }
                    }
                    else {
                        if (form_label_error) {
                            form_label_error.classList.remove('error');
                        }
                    }
                }
            });
        });
    }
}