function blur(){
   
    console.log("object");
}

var contact = document.getElementById('contact');
contact.addEventListener('click',()=>{
    const container = document.getElementById('container');
    container.style.filter = 'blur(8px)';
    contact.style.display = 'none';
})