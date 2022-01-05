const clockForm = document.querySelector('.clock');
const clockFormH2 = clockForm.querySelector('h2');

function clkFunction(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockFormH2.innerText = `${hours <= 12 ? `AM ${hours}` : `PM ${hours-12}`}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

function init(){
    setInterval(clkFunction, 1000);
}

init();