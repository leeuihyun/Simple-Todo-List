const greet = document.querySelector('h1');
const username = localStorage.getItem("userName");

const oneContainer = document.querySelector('#oneContainer');
const inputForm = oneContainer.querySelector('#inputForm');
const todoInput = inputForm.querySelector('input');

const twoContainer = document.querySelector('#twoContainer');
const todoForm = twoContainer.querySelector('#todoForm');
const todoUl = todoForm.querySelector('ul');

const checkOne = document.querySelector('#checkOne');
const checkClear = document.querySelector('#checkClear');
const TODOS = "todos";
const CHECK = "check";

let array = [];
let checkArray = [];

function delButtonListener(event){
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode;
    todoUl.removeChild(li);
    array = array.filter((item)=>item.id!==Number(li.id));
    saveTodoData();
}

function checkClearListener(event){
    event.preventDefault();
    checkArray = new Array();
    saveTodoData();
    window.location.reload();
}

function checkListener(event){
    event.preventDefault();
    const cb = event.target;
    const li = cb.parentNode;
    const txt = li.textContent;
    const obj = {
        text : txt,
        id : li.id,
    }
    checkArray.push(obj);
    todoUl.removeChild(li);
    array = array.filter((item)=>item.id!==Number(li.id));
    writeCheck(obj);
    saveTodoData();
}

function loadYourName(){
    greet.innerText = `${username}'s Todo-List`;    
}

function saveTodoData(){
    localStorage.setItem(TODOS, JSON.stringify(array));
    localStorage.setItem(CHECK, JSON.stringify(checkArray));
}

function submitListener(event){
    event.preventDefault();
    const value = todoInput.value;
    todoInput.value = "";
    const obj = {
        text : value,
        checked : false,
        id : Date.now()
    };
    array.push(obj);
    saveTodoData();
    writeTodo(obj);
}

function writeTodo(value){
    const li = document.createElement('li');
    const btn = document.createElement('button');
    const cb = document.createElement('input');
    cb.setAttribute("type", "checkbox");
    cb.addEventListener("click", checkListener);
    btn.addEventListener("click", delButtonListener);
    const span = document.createElement('span');
    span.innerText = ` ${value.text}`;
    btn.innerText = `❌`;
    li.appendChild(btn);
    li.appendChild(cb);
    li.appendChild(span);
    li.id = value.id;
    todoUl.appendChild(li);
}
function writeCheck(value){
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = `${value.text}`;
    li.appendChild(span);
    li.id = value.id;
    checkOne.appendChild(li);
}
function judge(){
    const todoValue = localStorage.getItem(TODOS);
    const checkValue = localStorage.getItem(CHECK);
    if(todoValue!==null){
        const parseTodos = JSON.parse(todoValue);
        array = parseTodos;
        parseTodos.forEach(writeTodo);
    }
    if(checkValue!==null){
        const parseCheck = JSON.parse(checkValue);
        checkArray = parseCheck;
        parseCheck.forEach(writeCheck);
    }
}

function init(){
    judge();
    loadYourName();
    inputForm.addEventListener("submit", submitListener);
    checkClear.addEventListener("click", checkClearListener);
}

init();