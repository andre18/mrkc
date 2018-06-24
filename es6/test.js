const example = document.getElementById("canvas"),
    ctx     = example.getContext('2d');

class Main {

    constructor() {

        this.gField = new GameFieldES6();
        let str = this.getCookie('gamerName');
        let gamersNames = this.splitString(str, '/');

        //созданный экземпляр класса контролирует действия игрока, организовывает игру
        //между игроками или игроком и компом
        this.control = new Control(gamersNames);

        //поля для выкладки ковров
        //цвета пикселей, где произошел клик мыши
        this.startingPixelRGB = 0;
        this.endingPixelRGB = 0;

        this.x = 0;
        this.y = 0;
        this.x1 = 0;
        this.y1 = 0;
        this.countX = 0;
        this.countY = 0;
        this.countX1 = 0;
        this.countY1 = 0;
    }

    splitString (stringToSplit, separator) {
        return stringToSplit.split(separator);
    }

    // возвращает cookie с именем name, если есть, если нет, то undefined
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    //отрисовка игрового поля, покладеных ковров, фигурки
    draw () {
        example.height = window.innerHeight;
        example.width  = window.innerWidth/2;

        this.gField.drawES6();

        for (let i = 0; i < this.control.carpets.length; i++)
            this.control.carpets[i].drawCarpetES6();

        this.control.assan.drawImgES6();
    }

    //метод обработки нажатия мыши, передает координаты нажатия и отпуска, если
    //они соответствуют условиям, описанным ниже
    clickHandler(e) {
        let rect = example.getBoundingClientRect();

        /*
        Отслеживание нажатия и отпускания кнопки мыши и высчет, какие это клеточки были
         */
        if (main.control.assan._diceRolled) {
            if (e.type === "mousedown") {
                this.x = (e.clientX - rect.left) / (rect.right - rect.left) * example.width;//e.screenX - rect.left;
                this.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * example.height;

                if (this.x >= this.gField.externalStartingPoint.x && this.x <= window.storage.fieldDimension.tile.width*7+this.gField.externalStartingPoint.x &&
                    this.y >= this.gField.externalStartingPoint.y && this.y <= window.storage.fieldDimension.tile.width*7+this.gField.externalStartingPoint.y) {
                    this.countX = Math.floor((this.x - window.storage.assan.x) / window.storage.fieldDimension.tile.width);
                    this.countY = Math.floor((this.y - window.storage.assan.y) / window.storage.fieldDimension.tile.width);
                    this.startingPixelRGB = ctx.getImageData(this.x, this.y, 1, 1).data;
                }
            }
            if (e.type === "mouseup") {
                this.x1 = (e.clientX - rect.left) / (rect.right - rect.left) * example.width;//e.screenX - rect.left;
                this.y1 = (e.clientY - rect.top) / (rect.bottom - rect.top) * example.height;

                if (this.x1 >= this.gField.externalStartingPoint.x && this.x1 <= window.storage.fieldDimension.tile.width*7+this.gField.externalStartingPoint.x &&
                    this.y1 >= this.gField.externalStartingPoint.y && this.y1 <= window.storage.fieldDimension.tile.width*7+this.gField.externalStartingPoint.y) {
                    this.countX1 = Math.floor((this.x1 - window.storage.assan.x) / window.storage.fieldDimension.tile.width);
                    this.countY1 = Math.floor((this.y1 - window.storage.assan.y) / window.storage.fieldDimension.tile.width);
                    // this.endingPixelRGB = ctx.getImageData(this.x1, this.y1, 1, 1).data;

                    if ((Math.abs(this.countX - this.countX1) === 1 && this.countY === this.countY1) || (Math.abs(this.countY - this.countY1) === 1 && this.countX === this.countX1)) {
                        if (this.control.carpetsID[this.countX][this.countY].id !== -1 && this.control.carpetsID[this.countX][this.countY].id === this.control.carpetsID[this.countX1][this.countY1].id) {
                            alert("Один на один класть нельзя!");
                        } else {
                            // this.control.carpetLay(this.startingPixelRGB, this.endingPixelRGB, this.countX, this.countY, this.countX1, this.countY1);
                            this.control.carpetLayGC(this.countX, this.countY, this.countX1, this.countY1);
                        }
                    }
                }
            }
        }
    }
}

let main = new Main();
setInterval(/*main.draw*/function(){
    main.draw();
}, 10);
//request animation frame - анимация

// слушатели событий курсора мыши для выкладки ковров
example.addEventListener("mousedown", (e) => (main.clickHandler(e)), false);
example.addEventListener("mousemove", (e) => (main.clickHandler(e)), false);
example.addEventListener("mouseup", (e) => (main.clickHandler(e)), false);

//TODO описать один экземпляр Vue
//слушатели событий кнопок на экране
let diceRoll = document.getElementsByClassName('dice-roll')[0];
//слушатель событий кнопки броска кубика и стрелок на экране
let diceNumb = [1, 2, 2, 3, 3, 4];
new Vue({
    el: '#arrows_block_toggle',
    methods: {
        arrows: function (keyCode) {
            // if (37 <= keyCode && keyCode <= 40) {
            //     diceRoll.disabled = false;
            // }
            if (keyCode === 38) {
                main.control.assan.SidePressed = 38;
            } else if (keyCode === 40) {
                main.control.assan.SidePressed = 40;
            } else if (keyCode === 37) {
                main.control.assan.SidePressed = 37;
            } else if (keyCode === 39) {
                main.control.assan.SidePressed = 39;
            }
        },
        dice: function () {
            if(main.control.assan.sidePressed === 37 || main.control.assan.sidePressed === 38 ||
                main.control.assan.sidePressed === 39 || main.control.assan.sidePressed === 40) {
                main.control.assan.hideArrows();
                let diceSide1 = document.getElementById('d');
                let i = diceNumb[Math.floor(Math.random()*(diceNumb.length))];

                diceSide1.innerHTML = i;

                //сообщаем ассаму, что кубик кинут (он скрывает стрелочки)
                main.control.assan._diceRolled = true;

                main.control.assan._stepCount = i;
                // diceRoll.disabled = true;
            }
        },
        keyHandler: function (event) {
            if (37 <= event.keyCode && event.keyCode <= 40)
                this.arrows(event.keyCode);
            if (event.keyCode === 32)
                this.dice();
        }
    },
    created: function () {
        document.addEventListener('keyup', this.keyHandler);
    },
    destroyed: function () {
        document.removeEventListener('keyup', this.keyHandler);
    }
});


// new Vue({
//     el: '.dice',
//     methods: {
//         dice: function () {
//             if(main.control.assan.sidePressed === 37 || main.control.assan.sidePressed === 38 ||
//                 main.control.assan.sidePressed === 39 || main.control.assan.sidePressed === 40) {
//                 main.control.assan.hideArrows();
//                 let diceSide1 = document.getElementById('dice-side-1');
//                 let i = diceNumb[Math.floor(Math.random()*(diceNumb.length))];
//
//                 diceSide1.innerHTML = i;
//
//                 //сообщаем ассаму, что кубик кинут (он скрывает стрелочки)
//                 main.control.assan._diceRolled = true;
//
//                 main.control.assan._stepCount = i;
//                 // diceRoll.disabled = true;
//             }
//         },
//         keyHandler: function (event) {
//             if (event.keyCode === 32)
//                 this.dice();
//         }
//     },
//     created: function () {
//         document.addEventListener('keyup', this.keyHandler);
//     },
//     destroyed: function () {
//         document.removeEventListener('keyup', this.keyHandler);
//     }
// });
