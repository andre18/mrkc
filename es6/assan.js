class AssanES6 {
    constructor() {
        this.x = window.storage.assan.x;
        this.y = window.storage.assan.y;
        this.countX = 0;
        this.countY = 0;
        this.width = window.storage.fieldDimension.tile.width;
        this.height = window.storage.fieldDimension.tile.width;
        this.sprite = "sprites/figure_up.png";
        this.pic = new Image();
        this.currentGamerObj = 0;
        this.colorArray = [];
        this.tileRGB = 0;

        this._diceRolled = false;
        this._isCarpetLaid = true;
        this._stepCount = 0;

        this.sidePressed = 0;
        this.prevPressed = 0;
    }

    //отрисовывает шаги, куда идет и насколько должен продвинуться Асам
    drawImgES6() {
        this.tileRGB = 0;
        let countCarpet = document.getElementById("carpet_" + this.currentGamerObj.id);
        if (Number(countCarpet.innerHTML) === 0) {
            this._isCarpetLaid = false;
            let max = 0;
            let maxArr = [];
            let winner;
            document.getElementById('num_points').innerHTML='<ul>';
            for (let i = 1; i < main.control.gamers.length; i++) {
                let tmp = main.control.gamers[i];
                document.getElementById('num_points').innerHTML+='<li>'+tmp.gamerName+": "+tmp.determineWinner()+'</li>';
                if (tmp.determineWinner() === max) {
                    maxArr.push(tmp);
                }
                if (tmp.determineWinner() > max) {
                    max = tmp.determineWinner();
                    maxArr = [];
                    maxArr.push(tmp);
                }
            }

            if (main.control.gameType === 1 || main.control.gameType === 2) {
                if (maxArr.length === 1) {
                    winner = maxArr[0].gamerName;
                } else {
                    winner = 'Ничья!';
                }
            }

            if (main.control.gameType === 3 || main.control.gameType === 4) {
                if (maxArr.length === 1) {
                    winner = maxArr[0].gamerName;
                } else {
                    // winner = maxArr[Math.floor(Math.random()*(maxArr.length))].gamerName;
                    // max = maxArr[Math.floor(Math.random()*(maxArr.length))];
                    // winner = max.gamerName;
                    winner = 'Победителей несколько!'
                }
            }
            document.getElementById('num_points').innerHTML+='</ul>';
            // document.getElementById('win_gamer_name').innerHTML = winner.gamerName;
            document.getElementById('win_gamer_name').innerHTML = winner;

            document.getElementById('win').classList.remove('hidden');

        }
        if (this._isCarpetLaid) {
            // this.arrowsHTML();
            this.showArrows();
            if (this.sidePressed === 39) {
                this.turnRight();
            } else if (this.sidePressed === 37) {
                this.turnLeft();
            } else if (this.sidePressed === 38) {
                this.turnUp();
            } else if (this.sidePressed === 40) {
                this.turnDown();
            }
        } else {
            this.sidePressed = 0;
        }
        this.pic.src = this.sprite;
        ctx.drawImage(this.pic, this.x, this.y, this.width, this.height);

        if (this._diceRolled) {
            this.hideArrows();
            // this.arrow.style.visibility = "hidden";
            // this.arrowLeft.style.visibility = "hidden";
            // this.arrowUp.style.visibility = "hidden";
            // this.arrowDown.style.visibility = "hidden";
        } else {
        }
    }

    //отрисовка в право
    turnRight() {
        this.sprite = "sprites/figure_right.png";
        if (this._stepCount !== 0) {
            this.countX += this._stepCount;
            if (this.countX <= 6) {
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 39;
                this.sidePressed = 39;
            } else if (this.countY === 0 && this.countX > 6) {
                this.sprite = "sprites/figure_down.png";
                this.countY = this.countX - 7;
                this.countX = 6;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 38;
                this.sidePressed = 40;
            } else if (this.countY%2 !== 0) {
                this.sprite = "sprites/figure_left.png";
                this.countY += 1;
                this.countX = 6 - (this.countX - 7);
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 37;
                this.sidePressed = 37;
            } else if (this.countY%2 === 0) {
                this.sprite = "sprites/figure_left.png";
                this.countY -= 1;
                this.countX = 6 - (this.countX - 7);
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 37;
                this.sidePressed = 37;
            }

            this.tileRGB = ctx.getImageData(this.x+30, this.y+30, 1, 1).data;
            this.isNeedToPay(this.tileRGB);

            window.storage.rightPressed = false;
            this._isCarpetLaid = false;
            this._stepCount = 0;
        }
    }

    //отрисовка в лево
    turnLeft() {
        this.sprite = "sprites/figure_left.png";
        if (this._stepCount !== 0) {
            this.countX -= this._stepCount;
            if (this.countX >= 0) {
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 37;
                this.sidePressed = 37;
            } else if (this.countY === 6 && this.countX < 0) {
                this.sprite = "sprites/figure_up.png";
                this.countY = 7 + this.countX;
                this.countX = 0;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 40;
                this.sidePressed = 38;
            } else if (this.countY%2 !== 0) {
                this.sprite = "sprites/figure_right.png";
                this.countY -= 1;
                this.countX = Math.abs(this.countX) - 1;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 39;
                this.sidePressed = 39;
            } else if (this.countY%2 === 0) {
                this.sprite = "sprites/figure_right.png";
                this.countY += 1;
                this.countX = Math.abs(this.countX) - 1;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 39;
                this.sidePressed = 39;
            }

            this.tileRGB = ctx.getImageData(this.x+30, this.y+30, 1, 1).data;
            this.isNeedToPay(this.tileRGB);

            window.storage.leftPressed = false;
            this._isCarpetLaid = false;
            this._stepCount = 0;
        }
    }

    //отрисовка вверх
    turnUp() {
        this.sprite = "sprites/figure_up.png";
        if (this._stepCount !== 0) {
            this.countY -= this._stepCount;
            if (this.countY >= 0) {
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                // this.prevPressed = 40;
                this.sidePressed = 38;
            } else if (this.countX === 6 && this.countY < 0) {
                this.sprite = "sprites/figure_left.png";
                this.countX = 7 + this.countY;
                this.countY = 0;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 39;
                this.sidePressed = 37;
            } else if (this.countX%2 !== 0) {
                this.sprite = "sprites/figure_down.png";
                this.countY = Math.abs(this.countY) - 1;
                this.countX -= 1;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 38;
                this.sidePressed = 40;
            } else if (this.countX%2 === 0) {
                this.sprite = "sprites/figure_down.png";
                this.countY = Math.abs(this.countY) - 1;
                this.countX += 1;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 38;
                this.sidePressed = 40;
            }

            this.tileRGB = ctx.getImageData(this.x+30, this.y+30, 1, 1).data;
            this.isNeedToPay(this.tileRGB);

            window.storage.upPressed = false;
            this._isCarpetLaid = false;
            this._stepCount = 0;
        }
    }

    //отрисовка вниз
    turnDown() {
        this.sprite = "sprites/figure_down.png";
        if (this._stepCount !== 0) {
            this.countY += this._stepCount;
            if (this.countY <= 6) {
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                // this.prevPressed = 38;
                this.sidePressed = 40;
            } else if (this.countX === 0 && this.countY > 6) {
                this.sprite = "sprites/figure_right.png";
                this.countX = this.countY - 7;
                this.countY = 6;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 37;
                this.sidePressed = 39;
            } else if (this.countX%2 !== 0) {
                this.sprite = "sprites/figure_up.png";
                this.countY = 6 - (this.countY - 7);
                this.countX += 1;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 40;
                this.sidePressed = 38;
            } else if (this.countX%2 === 0) {
                this.sprite = "sprites/figure_up.png";
                this.countY = 6 - (this.countY - 7);
                this.countX -= 1;
                this.y = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y;
                this.x = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x;
                // this.prevPressed = 40;
                this.sidePressed = 38;
            }

            this.tileRGB = ctx.getImageData(this.x+30, this.y+30, 1, 1).data;
            this.isNeedToPay(this.tileRGB);

            window.storage.downPressed = false;
            this._isCarpetLaid = false;
            this._stepCount = 0;
        }
    }


    get diceRolled() {
        return this._diceRolled;
    }

    set diceRolled(value) {
        this._diceRolled = value;
    }

    get isCarpetLaid() {
        return this._isCarpetLaid;
    }

    set isCarpetLaid(value) {
        this._isCarpetLaid = value;
    }

    get stepCount() {
        return this._stepCount;
    }

    set stepCount(value) {
        this._stepCount = value;
    }

    set SidePressed(value) {
        this.sidePressed = value;
    }



    //проверяет, нужно ли платить после перемещения на определенное кол-во шагов
    //теперь цвет достаю из массива, строки с RGB пока еще не все удалил
    isNeedToPay(tileRGB) {
        let color = '#' + this.decToHex(tileRGB[0]) + this.decToHex(tileRGB[1]) + this.decToHex(tileRGB[2]);

        if (main.control.carpetsID[this.countX][this.countY].carpet !== '' && main.control.carpetsID[this.countX][this.countY].carpet !== this.currentGamerObj.carpet) {
            this.colorArray=[];
           // console.log( this.moneyCounter(this.countX, this.countY, color));
            let i = this.moneyCounter(this.countX, this.countY, main.control.carpetsID[this.countX][this.countY].carpet);
            console.log(i);
            this.currentGamerObj.displayInfo(0,0,-i);
            main.control.gamers[main.control.carpetsID[this.countX][this.countY].gamerID].displayInfo(0,0,i);
        }
    }

  isInAr(el){
        for (let i of this.colorArray){
            if ((i[0]===el[0])&&(i[1]===el[1]))
                return true;
        }
        return false;
    }
    decToHex(n) {
        return Number(n).toString(16);
    }


    //подсчет суммы, которую нужно заплатить
    moneyCounter (x, y, color) {

        if (!this.isInAr([x, y])) {
            this.colorArray.push([x, y]);
        }

        let yLc = y;
        let xLc = x-1;
        let yRc = y;
        let xRc = x+1;
        let yUc = y-1;
        let xUc = x;
        let yDc = y+1;
        let xDc = x;

        //TODO
        let tileRGBleft  = '';
        let tileRGBright = '';
        let tileRGBup    = '';
        let tileRGBdown  = '';

        if (xLc >= 0 && xLc <= 6 && yLc >= 0 && yLc <= 6) tileRGBleft  = main.control.carpetsID[xLc][yLc].carpet;
        if (xRc >= 0 && xRc <= 6 && yRc >= 0 && yRc <= 6) tileRGBright = main.control.carpetsID[xRc][yRc].carpet;
        if (xUc >= 0 && xUc <= 6 && yUc >= 0 && yUc <= 6) tileRGBup    = main.control.carpetsID[xUc][yUc].carpet;
        if (xDc >= 0 && xDc <= 6 && yDc >= 0 && yDc <= 6) tileRGBdown  = main.control.carpetsID[xDc][yDc].carpet;

        if (xLc >= 0 && yLc >= 0 && tileRGBleft !== '' && color === tileRGBleft && !this.isInAr([xLc,yLc])) {
            this.colorArray.push([xLc,yLc]);
            this.moneyCounter(xLc,yLc,color);
        }
        if (xRc >= 0 && yRc >= 0 && tileRGBright !== '' && color === tileRGBright && !this.isInAr([xRc,yRc])) {
            this.colorArray.push([xRc,yRc]);
            this.moneyCounter(xRc,yRc,color);
        }
        if (xUc >= 0 && yUc >= 0 && tileRGBup !== '' && color === tileRGBup && !this.isInAr([xUc,yUc])) {
            this.colorArray.push([xUc,yUc]);
            this.moneyCounter(xUc,yUc,color);
        }
        if (xDc >= 0 && yDc >= 0 && tileRGBdown !== '' && color === tileRGBdown && !this.isInAr([xDc,yDc])) {
            this.colorArray.push([xDc,yDc]);
            this.moneyCounter(xDc,yDc,color);
        }

        return this.colorArray.length;
    }

    //показ стрелочек для поворота
    showArrows() {
        let element = document.getElementById('arrows_block_toggle');
        element.classList.remove('hidden');
    }
    //скрытие стрелочек для поворота
    hideArrows() {
        let element = document.getElementById('arrows_block_toggle');
        element.classList.add('hidden');
    }

    //Очередь подсветки игроков
    gamersQue(currentGamerId, nextGamerId) {
        let gamer_current_css = 0;
        let gamer_next_css = 0;

        let gamer_name_block_current = document.getElementById('gamer_name_block_' + currentGamerId);
        let gamer_name_block_next    = document.getElementById('gamer_name_block_' + nextGamerId);

        gamer_current_css = document.getElementById('gamer_name_' + currentGamerId);
        gamer_next_css = document.getElementById('gamer_name_' + nextGamerId);

        gamer_current_css.style.textShadow = "0 0";
        gamer_current_css.style.color = "#0097A7";
        gamer_next_css.style.textShadow = "0 0 20px #c00";
        gamer_next_css.style.color = "#000000";

        gamer_name_block_current.style.opacity = '1';
        gamer_name_block_next.style.opacity = '0.3';
        // gamer_next_css.style.opacity = '0.3';
    }
}