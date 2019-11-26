const validate_email = document.getElementById('validate_email');
const validate_phone = document.getElementById('validate_phone');
const validate_password = document.getElementById('validate_password');
const validate_firstname = document.getElementById('validate_firstname');
const validate_lastname = document.getElementById('validate_lastname');
const validate_college = document.getElementById('validate_college');
const validate_city = document.getElementById('validate_city');


function validate(){

    const password = document.getElementById('password');
    const email = document.getElementById('email');


    if(password.value.length < 6){
        validate_password.innerHTML = "Password must be greater than 6 characters";
        return false;
    }
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) return true
    else{
        validate_email.innerHTML = "Enter correct email address";
        return false;
    }
}