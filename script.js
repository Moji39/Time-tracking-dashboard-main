let get_onload = function(url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        callback(xhr.response);
    };
    xhr.send();
};

let get = function(url, callback){
    let x = setInterval(function(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        callback(xhr.response);
    };
    xhr.send();
}, 5000);
}
let update = function(y, a){
    if(y == 'daily'){
        previous = 'day';
        btn[0].classList.add('this');
        btn[1].classList.remove('this');
        btn[2].classList.remove('this');
    }
    if(y == 'weekly'){
        previous = 'week';
        btn[1].classList.add('this');
        btn[0].classList.remove('this');
        btn[2].classList.remove('this');
    }
    if(y == 'monthly'){
        previous = 'month';
        btn[2].classList.add('this');
        btn[0].classList.remove('this');
        btn[1].classList.remove('this');
    }
    for(j = 0; j < current.length; j++){
        current[j].innerHTML = a[j].timeframes[y].current + 'hrs';
        last[j].innerHTML = 'Last ' + previous + ' - <span class="prv">' + a[j].timeframes[y].previous + 'hrs</span>'
    }
}

const btn = document.getElementsByTagName('button');
const current = document.getElementsByClassName('current');
const last = document.getElementsByClassName('previous');
const last_btn = document.getElementsByClassName('this');

get_onload('./data.json', function(a){
    update('daily', a);
    for(i = 0; i < 3; i++){
        btn[i].addEventListener('click', function(i){
            let y = btn[i].innerText.toLowerCase();
            update(y, a);
        }.bind(null, i))
    }
})
get('./data.json', function(a){
    update(last_btn[0].innerText.toLowerCase(), a);
    for(i = 0; i < 3; i++){
        btn[i].addEventListener('click', function(i){
            let y = btn[i].innerText.toLowerCase();
            update(y, a);
        }.bind(null, i))
    }
})