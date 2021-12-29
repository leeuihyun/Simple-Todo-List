const greet = document.querySelector('h1');
const username = localStorage.getItem("userName");

const oneContainer = document.querySelector('#oneContainer');
const inputForm = oneContainer.querySelector('#inputForm');
const todoInput = inputForm.querySelector('input');

const twoContainer = document.querySelector('#twoContainer');
const todoForm = twoContainer.querySelector('#todoForm');
const todoUl = todoForm.querySelector('ul');

const TODOS = "todos";

let array = [];

function delButtonListener(event){
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode;
    todoUl.removeChild(li);
    array = array.filter((item)=>item.id!==Number(li.id));
    saveTodoData();
}

function loadYourName(){
    greet.innerText = `${username}'s Todo-List`;    
}

function saveTodoData(){
    localStorage.setItem(TODOS, JSON.stringify(array));
}

function submitListener(event){
    event.preventDefault();
    const value = todoInput.value;
    todoInput.value = "";
    const obj = {
        text : value,
        id : Date.now()
    };
    array.push(obj);
    saveTodoData();
    writeTodo(obj);
}

function writeTodo(value){
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.addEventListener("click", delButtonListener);
    const span = document.createElement('span');
    span.innerText = ` ${value.text}`;
    btn.innerText = `❌`;
    li.appendChild(btn);
    li.appendChild(span);
    li.id = value.id;
    todoUl.appendChild(li);
}

function judge(){
    const todoValue = localStorage.getItem(TODOS);
    if(todoValue!==null){
        const parseTodos = JSON.parse(todoValue);
        array = parseTodos;
        parseTodos.forEach(writeTodo);
    }
}

function init(){
    judge();
    loadYourName();
    inputForm.addEventListener("submit", submitListener);
}

init();