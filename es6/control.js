class Control {
    constructor(gamersNames) {

        this.gameType = 0;

        this.gamersNames = gamersNames;

        this._startRGB = 0;
        this._endRGB = 0;

        this._startingPixelRGB = 0;
        this._endingPixelRGB = 0;

        this.countX = 0;
        this.countY = 0;
        this.countX1 = 0;
        this.countY1 = 0;
        this.carpetsCounter = 0;

        this.assan = new AssanES6();
        this.gamersQueue();

        this.carpets = [];

        this.carpetsID = [];

        for (let i = 0; i < 7; i++) {
            this.carpetsID[i] = [];
            for (let j = 0; j < 7; j++) {
                this.carpetsID[i][j] = {};
                this.carpetsID[i][j].id = -1;
                this.carpetsID[i][j].carpet = '';
                this.carpetsID[i][j].gamerID = -1;
            }
        }
    }

    //метод инициализирует игроков, учитывая режим, выбранный пользователем(пользователями)
    //TODO дописать для 3-х и 4-х игроков
    gamersQueue() {

        let color1 = '#8bf788';
        let color2 = '#264cc5';
        let color3 = '#8d7cc2';
        let color4 = '#e06665';

        this.carpet_1 = 'sprites/carpet_1_';
        this.carpet_2 = 'sprites/carpet_2_';
        this.carpet_3 = 'sprites/carpet_3_';
        this.carpet_4 = 'sprites/carpet_4_';

        this.gamers = [];

        if (this.gamersNames.length === 1) {
            this.gamer1 = new Gamer(1, this.gamersNames[0], 20, 30, 0, this.carpet_1, color1);
            this.gamer2 = new Computer(2, "Computer", 20, 30, 0, this.carpet_2, color2);
            this.gamer1.naming();
            this.gamer2.naming();
            this.assan.currentGamerObj = this.gamer1;
            // this.assan.gamersQue(this.gamer2.id, this.gamer1.id);
            this.gamersQueueHTML(this.assan.currentGamerObj);
            this.gameType = 1;

            this.gamers[1] = this.gamer1;
            this.gamers[2] = this.gamer2;
        }
        if (this.gamersNames.length === 2) {
            this.gamer1 = new Gamer(1, this.gamersNames[0], 20, 30, 0, this.carpet_1, color1);
            this.gamer2 = new Gamer(2, this.gamersNames[1], 20, 30, 0, this.carpet_2, color2);
            this.gamer1.naming();
            this.gamer2.naming();
            this.assan.currentGamerObj = this.gamer1;
            // this.assan.gamersQue(this.gamer2.id, this.gamer1.id);
            this.gamersQueueHTML(this.assan.currentGamerObj);
            this.gameType = 2;

            this.assan.currentGamerObj = this.gamer1;

            this.gamers[1] = this.gamer1;
            this.gamers[2] = this.gamer2;
            // this.colorYellow = 'yellow';
            // this.colorBlue = 'blue';
        }
        if (this.gamersNames.length === 3) {
            this.addThirdGamerHTML();
            this.gamer1 = new Gamer(1, this.gamersNames[0], 20, 30, 0, this.carpet_1, color1);
            this.gamer2 = new Gamer(2, this.gamersNames[1], 20, 30, 0, this.carpet_2, color2);
            this.gamer3 = new Gamer(3, this.gamersNames[2], 20, 30, 0, this.carpet_3, color3);
            this.gamer1.naming();
            this.gamer2.naming();
            this.gamer3.naming();
            this.assan.currentGamerObj = this.gamer1;
            // this.assan.gamersQue(this.gamer2.id, this.gamer1.id);
            this.gameType = 3;
            this.gamersQueueHTML(this.gamer1);

            this.gamers[1] = this.gamer1;
            this.gamers[2] = this.gamer2;
            this.gamers[3] = this.gamer3;
        }
        if (this.gamersNames.length === 4) {
            this.addThirdGamerHTML();
            this.addFourthGamerHTML();
            this.gamer1 = new Gamer(1, this.gamersNames[0], 20, 30, 0, this.carpet_1, color1);
            this.gamer2 = new Gamer(2, this.gamersNames[1], 20, 30, 0, this.carpet_2, color2);
            this.gamer3 = new Gamer(3, this.gamersNames[2], 20, 30, 0, this.carpet_3, color3);
            this.gamer4 = new Gamer(4, this.gamersNames[3], 20, 30, 0, this.carpet_4, color4);
            this.gamer1.naming();
            this.gamer2.naming();
            this.gamer3.naming();
            this.gamer4.naming();
            this.assan.currentGamerObj = this.gamer1;
            // this.assan.gamersQue(this.gamer2.id, this.gamer1.id);
            this.gamersQueueHTML(this.assan.currentGamerObj);
            this.gameType = 4;

            this.gamers[1] = this.gamer1;
            this.gamers[2] = this.gamer2;
            this.gamers[3] = this.gamer3;
            this.gamers[4] = this.gamer4;
        }
    }

    //разрабатываемый метод для обновления информации и передачи очереди
    carpetLayGC(countX, countY, countX1, countY1) {
        if (this.gameType === 1) {
            if (this.assan.currentGamerObj.id === this.gamer1.id) {
                //TODO
                this.gamer1PutsCarpet(countX, countY, countX1, countY1);
            }
            if (this.assan.currentGamerObj.id === this.gamer2.id) {
                //TODO
            }
        }
        if (this.gameType === 2) {
            this.realTwoPlayersMode(countX, countY, countX1, countY1);

            // if (this.gamer1.final && this.gamer2.final) {
            //     if (this.gamer1.determineWinner() > this.gamer2.determineWinner()) {
            //         this.gamer1.infoWin('You won!');
            //         this.gamer2.infoWin('You lose');
            //     } else if (this.gamer1.determineWinner() < this.gamer2.determineWinner()) {
            //         this.gamer2.infoWin('You won!');
            //         this.gamer1.infoWin('You lose');
            //     } else {
            //         this.gamer1.infoWin('Dead heat');
            //         this.gamer2.infoWin('Dead heat');
            //     }
            // }
        }
        if (this.gameType === 3 || this.gameType === 4) {
            this.realTwoPlayersMode(countX, countY, countX1, countY1);
        }
    }

    //метод, с помощью которого реализовуются действия реального игрока в режиме "с компом"
    gamer1PutsCarpet(countX, countY, countX1, countY1) {
        this.countX = countX;
        this.countY = countY;
        this.countX1 = countX1;
        this.countY1 = countY1;

        // let colorFill = 0;
        // let colorStroke = 0;
        let countCarpet = 0;
        let countCarpOnField = 0;
        let countMoney = 0;

        let gamerCarpet = this.gamer1.carpet;

        // colorFill = this.gamer1.color;
        // colorStroke = this.gamer1.colorS;
        countCarpet = document.getElementById("carpet_" + this.gamer1.id);

        if (countCarpet.innerHTML > 0) {

            let carpet = new CarpetES6(this.countX, this.countY, this.countX1, this.countY1, gamerCarpet, this.assan.countX, this.assan.countY);
            if (carpet.isNearTheFigure()) {
                this.carpets.push(carpet);

                if (this.carpetsID[this.countX][this.countY].carpet === '' && this.carpetsID[this.countX1][this.countY1].carpet === '') {
                    this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                }
                if (this.carpetsID[this.countX][this.countY].carpet === this.assan.currentGamerObj.carpet || this.carpetsID[this.countX1][this.countY1].carpet === this.assan.currentGamerObj.carpet) {
                    if (this.carpetsID[this.countX][this.countY].carpet === this.assan.currentGamerObj.carpet && this.carpetsID[this.countX1][this.countY1].carpet === this.assan.currentGamerObj.carpet) {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 0, countMoney);
                    } else {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 1, countMoney);
                    } //TODO
                }

                if (this.carpetsID[this.countX][this.countY].carpet !== this.assan.currentGamerObj.carpet ||
                    this.carpetsID[this.countX1][this.countY1].carpet !== this.assan.currentGamerObj.carpet) {
                    if (this.carpetsID[this.countX][this.countY].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[this.countX][this.countY].carpet !== '' &&
                        this.carpetsID[this.countX1][this.countY1].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[this.countX1][this.countY1].carpet !== '') {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                        this.gamers[this.carpetsID[this.countX][this.countY].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                        this.gamers[this.carpetsID[this.countX1][this.countY1].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                    }
                    if (this.carpetsID[this.countX][this.countY].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[this.countX][this.countY].carpet !== '' &&
                        this.carpetsID[this.countX1][this.countY1].carpet === '') {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                        this.gamers[this.carpetsID[this.countX][this.countY].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                    }
                    if (this.carpetsID[this.countX][this.countY].carpet === '' &&
                        this.carpetsID[this.countX1][this.countY1].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[this.countX1][this.countY1].carpet !== '') {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                        this.gamers[this.carpetsID[this.countX1][this.countY1].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                    }
                }

                this.carpetsID[this.countX][this.countY].id = this.carpetsCounter;
                this.carpetsID[this.countX1][this.countY1].id = this.carpetsCounter++;
                this.carpetsID[this.countX][this.countY].carpet = this.assan.currentGamerObj.carpet;
                this.carpetsID[this.countX1][this.countY1].carpet = this.assan.currentGamerObj.carpet;
                this.carpetsID[this.countX][this.countY].gamerID = this.assan.currentGamerObj.id;
                this.carpetsID[this.countX1][this.countY1].gamerID = this.assan.currentGamerObj.id;

                this.assan.diceRolled = false;
                this.assan.isCarpetLaid = true;

                this.assan.currentGamerObj = this.gamers[2];
                this.gamersQueueHTML(this.assan.currentGamerObj);

                this.computerPutsCarpet();
            }
        }
    }

    //метод, конролирующий действия виртуального игрока - компа
    computerPutsCarpet() {
        let colorFill = 0;
        let colorStroke = 0;
        let countCarpet = 0;
        let countCarpOnField = 0;
        let countMoney = 0;
        let assanCountX = 0;
        let assanCountY = 0;
        let diceNumb = [1, 2, 2, 3, 3, 4];

        let gamerCarpet = this.gamer2.carpet;
        countCarpet = document.getElementById("carpet_" + this.gamer2.id);

        if (countCarpet.innerHTML > 0) {

            let ii = this.gamer2.myMethod();
            let yy = diceNumb[Math.floor(Math.random()*(diceNumb.length))];
//             alert(yy);
            this.assan.SidePressed = ii;
            this.assan._stepCount = yy;

            //как сделать, чтобы тормозило?
            // setTimeout(this.pause(), 5000);
            // this.pause();

            this.assan.drawImgES6();

            assanCountX = this.assan.countX;
            assanCountY = this.assan.countY;

            let carpetData = this.gamer2.putCarpet();

            let xLs = assanCountX - 1;
            let yLs = assanCountY;
            let xRs = assanCountX + 1;
            let yRs = assanCountY;
            let xUs = assanCountX;
            let yUs = assanCountY - 1;
            let xDs = assanCountX;
            let yDs = assanCountY + 1;

            let carpet = new CarpetES6(carpetData.x, carpetData.y, carpetData.x1, carpetData.y1, gamerCarpet, this.assan.countX, this.assan.countY);
            // let carpet = new CarpetES6(this.countX, this.countY, this.countX1, this.countY1, colorFill, colorStroke, this.assan.countX, this.assan.countY);
            carpet.isNearTheFigure();
            this.carpets.push(carpet);

            if (this.carpetsID[carpetData.x][carpetData.y].carpet === '' && this.carpetsID[carpetData.x1][carpetData.y1].carpet === '') {
                this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
            }
            if (this.carpetsID[carpetData.x][carpetData.y].carpet === this.assan.currentGamerObj.carpet || this.carpetsID[carpetData.x1][carpetData.y1].carpet === this.assan.currentGamerObj.carpet) {
                if (this.carpetsID[carpetData.x][carpetData.y].carpet === this.assan.currentGamerObj.carpet && this.carpetsID[carpetData.x1][carpetData.y1].carpet === this.assan.currentGamerObj.carpet) {
                    this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 0, countMoney);
                } else {
                    this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 1, countMoney);
                } //TODO
            }

            if (this.carpetsID[carpetData.x][carpetData.y].carpet !== this.assan.currentGamerObj.carpet ||
                this.carpetsID[carpetData.x1][carpetData.y1].carpet !== this.assan.currentGamerObj.carpet) {
                if (this.carpetsID[carpetData.x][carpetData.y].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[carpetData.x][carpetData.y].carpet !== '' &&
                    this.carpetsID[carpetData.x1][carpetData.y1].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[carpetData.x1][carpetData.y1].carpet !== '') {
                    this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                    this.gamers[this.carpetsID[carpetData.x][carpetData.y].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                    this.gamers[this.carpetsID[carpetData.x1][carpetData.y1].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                }
                if (this.carpetsID[carpetData.x][carpetData.y].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[carpetData.x][carpetData.y].carpet !== '' &&
                    this.carpetsID[carpetData.x1][carpetData.y1].carpet === '') {
                    this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                    this.gamers[this.carpetsID[carpetData.x][carpetData.y].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                }
                if (this.carpetsID[carpetData.x][carpetData.y].carpet === '' &&
                    this.carpetsID[carpetData.x1][carpetData.y1].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[carpetData.x1][carpetData.y1].carpet !== '') {
                    this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                    this.gamers[this.carpetsID[carpetData.x1][carpetData.y1].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                }
            }

            this.carpetsID[carpetData.x][carpetData.y].id = this.carpetsCounter;
            this.carpetsID[carpetData.x1][carpetData.y1].id = this.carpetsCounter++;
            this.carpetsID[carpetData.x][carpetData.y].carpet = this.assan.currentGamerObj.carpet;
            this.carpetsID[carpetData.x1][carpetData.y1].carpet = this.assan.currentGamerObj.carpet;
            this.carpetsID[carpetData.x][carpetData.y].gamerID = this.assan.currentGamerObj.id;
            this.carpetsID[carpetData.x1][carpetData.y1].gamerID = this.assan.currentGamerObj.id;

            this.assan.diceRolled = false;
            this.assan.isCarpetLaid = true;

            this.assan.currentGamerObj = this.gamers[1];
            this.gamersQueueHTML(this.assan.currentGamerObj);
        }
    }

    //метод для реализации игры с реальными игроками
    realTwoPlayersMode(countX, countY, countX1, countY1) {
        this.countX = countX;
        this.countY = countY;
        this.countX1 = countX1;
        this.countY1 = countY1;

        let countCarpet = 0;
        let countCarpOnField = 0;
        let countMoney = 0;

        countCarpet = document.getElementById("carpet_" + this.assan.currentGamerObj.id);

        if (countCarpet.innerHTML > 0) {

            let carpet = new CarpetES6(this.countX, this.countY, this.countX1, this.countY1, this.assan.currentGamerObj.carpet, this.assan.countX, this.assan.countY);
            if (carpet.isNearTheFigure()) {
                this.carpets.push(carpet);

                //TODO
                if (this.carpetsID[this.countX][this.countY].carpet === '' && this.carpetsID[this.countX1][this.countY1].carpet === '') {
                    this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                }
                if (this.carpetsID[this.countX][this.countY].carpet === this.assan.currentGamerObj.carpet || this.carpetsID[this.countX1][this.countY1].carpet === this.assan.currentGamerObj.carpet) {
                    if (this.carpetsID[this.countX][this.countY].carpet === this.assan.currentGamerObj.carpet && this.carpetsID[this.countX1][this.countY1].carpet === this.assan.currentGamerObj.carpet) {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 0, countMoney);
                    } else {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 1, countMoney);
                    } //TODO
                }

                if (this.carpetsID[this.countX][this.countY].carpet !== this.assan.currentGamerObj.carpet ||
                    this.carpetsID[this.countX1][this.countY1].carpet !== this.assan.currentGamerObj.carpet) {
                    if (this.carpetsID[this.countX][this.countY].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[this.countX][this.countY].carpet !== '' &&
                        this.carpetsID[this.countX1][this.countY1].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[this.countX1][this.countY1].carpet !== '') {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                        this.gamers[this.carpetsID[this.countX][this.countY].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                        this.gamers[this.carpetsID[this.countX1][this.countY1].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                    }
                    if (this.carpetsID[this.countX][this.countY].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[this.countX][this.countY].carpet !== '' &&
                        this.carpetsID[this.countX1][this.countY1].carpet === '') {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                        this.gamers[this.carpetsID[this.countX][this.countY].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                    }
                    if (this.carpetsID[this.countX][this.countY].carpet === '' &&
                        this.carpetsID[this.countX1][this.countY1].carpet !== this.assan.currentGamerObj.carpet && this.carpetsID[this.countX1][this.countY1].carpet !== '') {
                        this.assan.currentGamerObj.displayInfo(countCarpet = 1, countCarpOnField = 2, countMoney);
                        this.gamers[this.carpetsID[this.countX1][this.countY1].gamerID].displayInfo(countCarpet = 0, countCarpOnField = -1, countMoney);
                    }
                }

                this.carpetsID[this.countX][this.countY].id = this.carpetsCounter;
                this.carpetsID[this.countX1][this.countY1].id = this.carpetsCounter++;
                this.carpetsID[this.countX][this.countY].carpet = this.assan.currentGamerObj.carpet;
                this.carpetsID[this.countX1][this.countY1].carpet = this.assan.currentGamerObj.carpet;
                this.carpetsID[this.countX][this.countY].gamerID = this.assan.currentGamerObj.id;
                this.carpetsID[this.countX1][this.countY1].gamerID = this.assan.currentGamerObj.id;


                this.assan.diceRolled = false;
                this.assan.isCarpetLaid = true;

                let curGamerId = this.assan.currentGamerObj.id;
                if (curGamerId < this.gameType)
                    curGamerId++;
                else
                    curGamerId = 1;
                this.assan.currentGamerObj = this.gamers[curGamerId];
                this.gamersQueueHTML(this.assan.currentGamerObj);
            }
        }
        else{
            alert("end")
        }
    }

    addThirdGamerHTML() {
        let info_block_left = document.getElementById('info-block-left');
        let before_el = document.getElementById('dice-roll-id');
        let div = document.createElement('div');
        div.className = 'gamer_name';
        div.id = 'gamer_name_block_3';
        div.innerHTML = '<h3 id="gamer_name_3">Игрок 3</h3>';
        div.style.marginTop = '10%';

        info_block_left.insertBefore(div, before_el);

        div = document.createElement('div');
        div.className = 'gamer-info';

        info_block_left.insertBefore(div, before_el);

        let gamer_info = div;

        div = document.createElement('div');
        div.className = 'carpets';
        div.id = 'carpet_3';
        div.innerText = '24';
        div.style.backgroundImage = 'url(sprites/carpet_3_g.png)';
        div.style.backgroundSize = 'cover';

        gamer_info.appendChild(div);

        div = document.createElement('div');
        div.className = 'money';
        div.id = 'money_3';
        div.innerText = '30';

        gamer_info.appendChild(div);
    }

    addFourthGamerHTML() {
        let info_block_left = document.getElementById('info-block-right');
        let div = document.createElement('div');
        div.className = 'gamer_name';
        div.id = 'gamer_name_block_4';
        div.innerHTML = '<h3 id="gamer_name_4">Игрок 4</h3>';
        div.style.marginTop = '45px';

        info_block_left.appendChild(div);

        div = document.createElement('div');
        div.className = 'gamer-info';

        info_block_left.appendChild(div);

        let gamer_info = div;

        div = document.createElement('div');
        div.className = 'carpets';
        div.id = 'carpet_4';
        div.innerText = '24';
        div.style.backgroundImage = 'url(sprites/carpet_4_g.png)';
        div.style.backgroundSize = 'cover';

        gamer_info.appendChild(div);

        div = document.createElement('div');
        div.className = 'money';
        div.id = 'money_4';
        div.innerText = '30';

        gamer_info.appendChild(div);
    }

    gamersQueueHTML(gamer) {
        // let currentGamer = gamer;

        let allGamers = document.getElementsByClassName('gamer_name');
        for (let i = 0; i < allGamers.length; i++) {
            allGamers[i].style.opacity = '0.3';
            allGamers[i].style.textShadow = "0 0";
            allGamers[i].style.color = "#0097A7";
        }

        let t = '#c00';
        if (gamer.id === 1) t = "#19aa16";
        if (gamer.id === 2) t = "#1c36bc";
        if (gamer.id === 3) t = "#9196fe";
        if (gamer.id === 4) t = "#fb9294";

        let currentGamerName = document.getElementById('gamer_name_block_' + gamer.id);
        currentGamerName.style.opacity = '1';
        currentGamerName.style.textShadow = "0 0 20px " + t;
        currentGamerName.style.color = gamer.gamerNameColor;
    }

    pause() {return true}

    get startRGB() {
        return this._startRGB;
    }

    set startRGB(value) {
        this._startRGB = value;
    }

    get endRGB() {
        return this._endRGB;
    }

    set endRGB(value) {
        this._endRGB = value;
    }

    get startingPixelRGB() {
        return this._startingPixelRGB;
    }

    set startingPixelRGB(value) {
        this._startingPixelRGB = value;
    }

    get endingPixelRGB() {
        return this._endingPixelRGB;
    }

    set endingPixelRGB(value) {
        this._endingPixelRGB = value;
    }

    decToHex(n) {
        return Number(n).toString(16);
    }
}
