const menu_content = document.querySelector(".menu-content")
const menu_button = document.querySelector(".menu")



menu_button.addEventListener('click',function(){
    menu_content.classList.toggle('show');
    console.log('hi')
})

