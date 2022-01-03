const firstContainer = document.querySelector('#first');
const firstForm = firstContainer.querySelector('form');
const firstInput = firstContainer.querySelector('input');

const helloForm = document.querySelector('#hello');
const helloH1 = helloForm.querySelector('h2');

const loginForm = document.querySelector('#login');
const loginButton = document.querySelector("#loginButton");

const USER_NAME = "userName";

function saveName(value){
    localStorage.setItem(USER_NAME, value);
}

function loginButtonListener(){
    window.location.href = "todo.html";
}

function submitListener(event){
    event.preventDefault();
    showName(firstInput.value);
    saveName(firstInput.value);
}

function showName(value){
    firstForm.classList.remove("show");
    firstForm.classList.add("hide");
    loginForm.classList.remove("hide");
    loginForm.classList.add("show");
    helloH1.innerText = `Hello ${value}`;
    helloForm.classList.remove("hide");
    helloForm.classList.add("show");
    loginButton.addEventListener("click", loginButtonListener);
}   

function naming(){
    firstForm.classList.remove("hide");
    firstForm.classList.add("show");
    firstForm.addEventListener("submit", submitListener);
}

function loadName(){
    const username = localStorage.getItem(USER_NAME);
    if(username===null){
        naming();
    }
    else{
        showName(username);
    }
}

function init(){
    loadName();
}

init();