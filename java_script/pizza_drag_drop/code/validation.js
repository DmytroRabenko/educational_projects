const form = document.querySelector('#info'),
userName = document.querySelector(`#info input[name='name']`),
userPhone = document.querySelector(`#info input[name='phone']`),
userMail = document.querySelector(`#info input[name='email']`),
resetForm = document.querySelector(`#info input[name='cancel']`),
submitForm = document.querySelector(`#btnSubmit`),
patterns = [/^[а-яіґєї]{2,}$/i, /^\+380\d{9}$/, /^[a-z0-9_.]{3,}@[a-z.0-9]{2,}\.[a-z.]{2,10}$/i];

const userData = {
}

// Validation
function validate (pattern, input) {
    if( pattern.test(input.value)){
        if(input.name == 'name'){
            userData.name = input.value;
        }
        else if(input.name == 'phone'){
            userData.phone = input.value;
        }
        else if(input.name == 'email'){
            userData.email = input.value;
        }
        if(input.classList.contains("error")){
            input.classList.remove("error");
        }
    }else{
        input.classList.add("error");
    }
    
}
// reset form
const resetF = (input) => {
    input.value = '';
    if(input.classList.contains("error")){
        input.classList.remove("error");
    }
}

userName.addEventListener('change', () => {
   validate(patterns[0], userName);
})
userPhone.addEventListener('change', () => {
    validate(patterns[1], userPhone);
})
userMail.addEventListener('change', () => {
   validate(patterns[2], userMail);
})
resetForm.addEventListener('click', (e) =>{
    e.preventDefault();
    if(confirm('Скинути дані форми')){
        resetF(userName);
        resetF(userPhone);
        resetF(userMail); 
    }
    else{
        return
    }
});

submitForm.addEventListener('click', () => {
    if(!userName.classList.contains('error') && !userPhone.classList.contains('error') && !userMail.classList.contains('error') && userName.value !== '' && userPhone !== '' && userMail !== ''){
        window.location.href="./thank-you/index.html"
    }
    else{   
        alert('Заповніть форму');
    }
})
