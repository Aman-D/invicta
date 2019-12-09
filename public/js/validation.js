const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const college = document.getElementById("college");
const city = document.getElementById("city");

function phonenumber(inputtxt) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputtxt.value.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    return true;
  }

  return false;
}
function validate(event) {
  var form = document.getElementById("register_form");

  console.log(form);
  event.preventDefault();
  var flag = 0;
  console.log(firstname.value.length);
  // check for empty fields
  if (firstname.value.length === 0) {
    firstname.style.border = "1px solid red";
    flag = 0;
  } else {
    firstname.style.border = "none";
    flag = 1;
  }
  if (lastname.value.length === 0) {
    lastname.style.border = "1px solid red";
    flag = 0;
  } else {
    lastname.style.border = "none";
    flag = 1;
  }
  if (email.value.length === 0) {
    email.style.border = "1px solid red";
    flag = 0;
  } else {
    email.style.border = "none";
    flag = 1;
  }
  if (phone.value.length === 0) {
    phone.style.border = "1px solid red";
    flag = 0;
  } else {
    phone.style.border = "none";
    flag = 1;
  }
  if (password.value.length === 0) {
    password.style.border = "1px solid red";
    flag = 0;
  } else {
    password.style.border = "none";
    flag = 1;
  }
  if (city.value.length === 0) {
    city.style.border = "1px solid red";
    flag = 0;
  } else {
    city.style.border = "none";
    flag = 1;
  }
  if (college.value.length === 0) {
    college.style.border = "1px solid red";
    flag = 0;
  } else {
    college.style.border = "none";
    flag = 1;
  }

  // check phone number
  if (!phonenumber(phone)) {
    phone.style.border = "1px solid red";

    flag = 0;
  } else {
    phone.style.border = "none";
    flag = 1;
  }

  // check phone email
  if (!ValidateEmail(email)) {
    email.style.border = "1px solid red";
    flag = 0;
  } else {
    email.style.border = "none";
    flag = 1;
  }

  //check password
  if (password.value.length < 5) {
    alert("Error: password must be atleast 5 characters long!");
    password.style.border = "1px solid red";
    flag = 0;
  } else {
    password.style.border = "none";
    flag = 1;
  }

  if (flag === 1) {
    var form = document.getElementById("register_form");
    form.method = "post";
    form.action = "/register";
    document.getElementById("register_form").submit();
  }
}
