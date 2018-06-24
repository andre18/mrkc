let selectOption = 0;
let gameType = 1;
let inputCount = 0;
let form = 0;
let addedInputs = [];
addedInputs.push('name_1');

function addDynamicInput() {

    if (inputCount > 1) {
        for (let i = addedInputs.length; i > 1; i--) {
            form.removeChild(document.getElementById(addedInputs.pop()));
        }
    }
    if (gameType > 1) {
        let x = 2;
        for (let i = gameType; i > 1; i--) {
            let input = document.createElement('input');
            input.className = 'input';
            input.type = 'text';
            input.placeholder = '' + x + '-й игрок';
            input.id = 'name_' + x;
            addedInputs.push('name_' + x);
            form.insertBefore(input, document.getElementById('button'));
            x++;
        }
    }
    // input.placeholder = '';
}

function choseOption() {
    let select = document.getElementById('select');
    form = document.getElementById('form');
    inputCount = form.getElementsByClassName('input').length;
    // alert(form.getElementsByClassName('input').length);
    // alert(select.options[select.selectedIndex].value);
    gameType = +select.options[select.selectedIndex].value;
    addDynamicInput();
}

document.getElementById("button").onclick = function(){

    let str = '';

    for (let i = 0; i < gameType; i++) {
        let el = document.getElementById(addedInputs.shift());
        if (el.value === '') {
            str += 'Игрок ' + (i + 1);
        } else {
            str += el.value;
        }

        if (i+1 !== gameType) str += '/';
    }

    // document.cookie = '';
    document.cookie = "gamerName=" + str;
};