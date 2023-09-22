const validator = {
    handlerSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');
        
        validator.cleanError();

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if(check !== true) {
                send = false;
                validator.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let inputType = input.getAttribute('data-type');

        if(input.value == '') {
            return 'Este campo não pode ficar vazio';
        }

        switch (inputType) {
            case 'name':
                if(input.value != '') {
                    const regexName = /([A-z]{2,})\s?([A-z]{2,})?/;
                    if(!regexName.test(input.value)) {
                        return 'Este nome foi escrito incorretamente';
                    }
                }
            break;
        
            case 'email':
                if(input.value != '') {
                    const regexEmail = /^([A-z0-9]{3,})\@(gmail|hotmail)(\.com)$/;
                    if(!regexEmail.test(input.value)) {
                        return 'E-mail digitado não é válido!';
                    }
                }
            break;
        }

        return true;
    },
    showError: (input, error) => {
        input.style.border = '2px solid #F00';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.elementSibling);
    },
    cleanError: () => {
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }


        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};


const form = document.querySelector('.area_form form');
form.addEventListener('submit', validator.handlerSubmit);