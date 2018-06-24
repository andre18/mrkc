class Computer {
    constructor(id, name, carpetsCount, gamerMoney, carpetsOnField, carpet) {
        this.id = id;
        this.gamerName = name;
        this.carpetsCount = carpetsCount;
        this.gamerMoney = gamerMoney;
        this.carpetsOnField = carpetsOnField;
        // this.color = color;
        // this.colorS = colorS;
        this.carpet = carpet;
        this.gamerNameHTMLid = "gamer_name_" + id;
        this.carpetsCountHTMLid = "carpet_" + id;
        this.gamerMoneyHTMLid = "money_" + id;
        this.carpetsOnFieldHTMLid = "carpet_on_field_" + id;

        this.assanCountX = 0;
        this.assanCountY = 0;

        this.chance = 0;
        this.moneyWeight = 0;

        this.sides = [37, 38, 39, 40];
        this.possibleSides = [];
    }

    naming() {
        document.getElementById(this.gamerNameHTMLid).innerHTML = this.gamerName;
    }

    myMethod () {
        let way = {side: 0, chance: 5};
        let ways = [];
        let horizontal = 0;
        let vertical = 0;
        this.assanCountX = main.control.assan.countX;
        this.assanCountY = main.control.assan.countY;

        this.checkLeftSide();
        this.checkRightSide();
        this.checkUpSide();
        this.checkDownSide();

        for (let i = 0; i < 4; i++) {
            if (this.possibleSides[i].chance === way.chance) {
                ways.push({side: this.possibleSides[i].side, chance: this.possibleSides[i].chance});
            }
            if (this.possibleSides[i].chance < way.chance) {
                way.side = this.possibleSides[i].side;
                way.chance = this.possibleSides[i].chance;
                ways = [];
                ways.push({side: way.side, chance: way.chance});
            }
        }

        if (ways.length > 1) {
            way = ways[Math.floor(Math.random()*ways.length)];
        }

        // if (way.chance === 5) way.side = this.sides[Math.floor(Math.random()*(this.sides.length))];


        this.possibleSides = [];
        //передача выбранной стороны в ассама
        return way.side;
    }

    checkLeftSide() {
        let arr = [];
        let chance = 0;
        for (let j = 1; j <= 4; j++) {
            let x = this.assanCountX - j;
            let y = this.assanCountY;
            if (x >= 0) {
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (y === 6 && x < 0) {
                y = 7 + x;
                x = 0;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (y % 2 !== 0) {
                y -= 1;
                x = Math.abs(x) - 1;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (y % 2 === 0) {
                y += 1;
                x = Math.abs(x) - 1;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            }

            if (main.control.carpetsID[x][y].id !== -1 && main.control.carpetsID[x][y].carpet !== this.carpet) {
                if (j === 1 || j === 4) chance += 1;
                else chance += 2;
            }
        }
        this.possibleSides.push({side: 37, chance: chance});

        return chance;
    }

    checkRightSide() {
        let arr = [];
        let chance = 0;
        for (let j = 1; j <= 4; j++) {
            let x = this.assanCountX + j;
            let y = this.assanCountY;
            if (x <= 6) {
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (y === 0 && x > 6) {
                y = x - 7;
                x = 6;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (y % 2 !== 0) {
                y += 1;
                x = 6 - (x - 7);
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (y % 2 === 0) {
                y -= 1;
                x = 6 - (x - 7);
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            }

            if (main.control.carpetsID[x][y].id !== -1 && main.control.carpetsID[x][y].carpet !== this.carpet) {
                if (j === 1 || j === 4) chance += 1;
                else chance += 2;
            }
        }
        this.possibleSides.push({side: 39, chance: chance});

        return chance;
    }

    checkUpSide() {
        let arr = [];
        let chance = 0;
        for (let j = 1; j <= 4; j++) {
            let x = this.assanCountX;
            let y = this.assanCountY - j;
            if (y >= 0) {
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (x === 6 && y < 0) {
                x = 7 + y;
                y = 0;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (x % 2 !== 0) {
                y = Math.abs(y) - 1;
                x -= 1;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (x % 2 === 0) {
                y = Math.abs(y) - 1;
                x += 1;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            }

            if (main.control.carpetsID[x][y].id !== -1 && main.control.carpetsID[x][y].carpet !== this.carpet) {
                if (j === 1 || j === 4) chance += 1;
                else chance += 2;
            }
        }
        this.possibleSides.push({side: 38, chance: chance});

        return chance;
    }

    checkDownSide() {
        let arr = [];
        let chance = 0;
        for (let j = 1; j <= 4; j++) {
            let x = this.assanCountX;
            let y = this.assanCountY + j;
            if (y <= 6) {
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (x === 0 && y > 6) {
                x = y - 7;
                y = 6;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (x % 2 !== 0) {
                y = 6 - (y - 7);
                x += 1;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            } else if (x % 2 === 0) {
                y = 6 - (y - 7);
                x -= 1;
                arr.push([main.control.carpetsID[x][y].id, main.control.carpetsID[x][y].carpet]);
            }

            if (main.control.carpetsID[x][y].id !== -1 && main.control.carpetsID[x][y].carpet !== this.carpet) {
                if (j === 1 || j === 4) chance += 1;
                else chance += 2;
            }
        }
        this.possibleSides.push({side: 40, chance: chance});

        return chance;
    }

    putCarpet() {
        let bestCarpetVariants = [];
        this.assanCountX = main.control.assan.countX;
        this.assanCountY = main.control.assan.countY;

        let xLs = this.assanCountX - 1;
        let yLs = this.assanCountY;
        let xRs = this.assanCountX + 1;
        let yRs = this.assanCountY;
        let xUs = this.assanCountX;
        let yUs = this.assanCountY - 1;
        let xDs = this.assanCountX;
        let yDs = this.assanCountY + 1;

        bestCarpetVariants.push(this.checkLeftCell());
        bestCarpetVariants.push(this.checkRightCell());
        bestCarpetVariants.push(this.checkUpCell());
        bestCarpetVariants.push(this.checkDownCell());

        let max = {id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: -1};
        let maxArr = [];
        for (let i = 0; i < bestCarpetVariants.length; i++) {
            if (bestCarpetVariants[i].weight === max.weight) {
                maxArr.push(bestCarpetVariants[i]);
            }
            if (bestCarpetVariants[i].weight > max.weight) {
                max = bestCarpetVariants[i];
                maxArr = [];
                maxArr.push(max);
            }
        }

        if (maxArr.length > 1) {
            //TODO выбор должен быть из индексов!!!
            max = maxArr[Math.floor(Math.random()*(maxArr.length))];
        }

        // for (let i = 0; i < bestCarpetVariants.length; i++) {
        //     if (max === bestCarpetVariants[i].weight) {
        //         return bestCarpetVariants[i];
        //     }
        // }

        return max;
    }

    checkLeftCell () {
        let besideCellWeight = 0;
        let nextWeight = 0;
        // let carpetVariants = [{id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: 0}];
        let carpetVariants = [];

        let tmpX = this.assanCountX - 1;
        let tmpY = this.assanCountY;
        if (tmpX >= 0) {

            //левая клетка
            if (main.control.carpetsID[tmpX][tmpY].carpet === '') {
                besideCellWeight += 1;
            }
            if (main.control.carpetsID[tmpX][tmpY].carpet !== '' && main.control.carpetsID[tmpX][tmpY].carpet !== this.carpet) {
                besideCellWeight += 2;
            }

            //горизонтальный ковер
            if (tmpX >= 1) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX-1][tmpY].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX-1][tmpY].carpet !== '' && main.control.carpetsID[tmpX-1][tmpY].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 1, x: tmpX, y: tmpY, x1: tmpX-1, y1: tmpY, weight: nextWeight});
            }
            //вертикальный ковер вверх
            if (tmpY >= 1) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX][tmpY-1].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX][tmpY-1].carpet !== '' && main.control.carpetsID[tmpX][tmpY-1].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 2, x: tmpX, y: tmpY, x1: tmpX, y1: tmpY-1, weight: nextWeight});
            }
            //вертикальный ковер вниз
            if (tmpY <= 5) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX][tmpY+1].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX][tmpY+1].carpet !== '' && main.control.carpetsID[tmpX][tmpY+1].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 3, x: tmpX, y: tmpY, x1: tmpX, y1: tmpY+1, weight: nextWeight});
            }

            let max = {id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: -1};
            let maxArr = [];
            for (let i = 0; i < carpetVariants.length; i++) {
                let cv = carpetVariants[i];
                if (main.control.carpetsID[cv.x][cv.y].id !== -1 && main.control.carpetsID[cv.x][cv.y].id === main.control.carpetsID[cv.x1][cv.y1].id) {
                    console.log('Один на один');
                } else {
                    if (cv.weight === max.weight) {
                        // maxArr.push(max);
                        maxArr.push(cv);
                    }
                    if (cv.weight > max.weight) {
                        max = cv;
                        maxArr = [];
                        maxArr.push(max);
                    }
                }

            }

            if (maxArr.length > 1) {
                max = maxArr[Math.floor(Math.random()*(maxArr.length))];
            }

            // for (let i = 0; i < carpetVariants.length; i++) {
            //     if (max === carpetVariants[i].weight) {
            //         return carpetVariants[i];
            //     }
            // }

            return max;
        } else {
            return {id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: -1};
        }


        //TODO выкладка ковров рядом со своими стараясь перекрывать чужие
    }

    checkRightCell () {
        let besideCellWeight = 0;
        let nextWeight = 0;
        // let carpetVariants = [{id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: 0}];
        let carpetVariants = [];

        let tmpX = this.assanCountX + 1;
        let tmpY = this.assanCountY;
        if (tmpX <= 6) {

            //правая клетка
            if (main.control.carpetsID[tmpX][tmpY].carpet === '') {
                besideCellWeight += 1;
            }
            if (main.control.carpetsID[tmpX][tmpY].carpet !== '' && main.control.carpetsID[tmpX][tmpY].carpet !== this.carpet) {
                besideCellWeight += 2;
            }

            //горизонтальный ковер
            if (tmpX <= 5) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX+1][tmpY].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX+1][tmpY].carpet !== '' && main.control.carpetsID[tmpX+1][tmpY].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 1, x: tmpX, y: tmpY, x1: tmpX+1, y1: tmpY, weight: nextWeight});
            }
            //вертикальный ковер вверх
            if (tmpY >= 1) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX][tmpY-1].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX][tmpY-1].carpet !== '' && main.control.carpetsID[tmpX][tmpY-1].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 2, x: tmpX, y: tmpY, x1: tmpX, y1: tmpY-1, weight: nextWeight});
            }
            //вертикальный ковер вниз
            if (tmpY <= 5) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX][tmpY+1].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX][tmpY+1].carpet !== '' && main.control.carpetsID[tmpX][tmpY+1].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 3, x: tmpX, y: tmpY, x1: tmpX, y1: tmpY+1, weight: nextWeight});
            }

            let max = {id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: -1};
            let maxArr = [];
            // for (let i = 0; i < carpetVariants.length; i++) {
            //     if (carpetVariants[i].weight === max.weight) {
            //         // maxArr.push(max);
            //         maxArr.push(carpetVariants[i]);
            //     }
            //     if (carpetVariants[i].weight > max.weight) {
            //         max = carpetVariants[i];
            //         maxArr = [];
            //         maxArr.push(max);
            //     }
            // }
            for (let i = 0; i < carpetVariants.length; i++) {
                let cv = carpetVariants[i];
                if (main.control.carpetsID[cv.x][cv.y].id !== -1 && main.control.carpetsID[cv.x][cv.y].id === main.control.carpetsID[cv.x1][cv.y1].id) {
                    console.log('Один на один');
                } else {
                    if (cv.weight === max.weight) {
                        // maxArr.push(max);
                        maxArr.push(cv);
                    }
                    if (cv.weight > max.weight) {
                        max = cv;
                        maxArr = [];
                        maxArr.push(max);
                    }
                }

            }

            if (maxArr.length > 1) {
                max = maxArr[Math.floor(Math.random()*(maxArr.length))];
            }

            // for (let i = 0; i < carpetVariants.length; i++) {
            //     if (max === carpetVariants[i].weight) {
            //         return carpetVariants[i];
            //     }
            // }

            return max;
        } else {
            return {id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: -1};
        }
    }

    checkUpCell () {
        let besideCellWeight = 0;
        let nextWeight = 0;
        // let carpetVariants = [{id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: 0}];
        let carpetVariants = [];

        let tmpX = this.assanCountX;
        let tmpY = this.assanCountY-1;
        if (tmpY >= 0) {

            //верхняя клетка
            if (main.control.carpetsID[tmpX][tmpY].carpet === '') {
                besideCellWeight += 1;
            }
            if (main.control.carpetsID[tmpX][tmpY].carpet !== '' && main.control.carpetsID[tmpX][tmpY].carpet !== this.carpet) {
                besideCellWeight += 2;
            }

            //вертикальный ковер
            if (tmpY >= 1) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX][tmpY-1].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX][tmpY-1].carpet !== '' && main.control.carpetsID[tmpX][tmpY-1].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 1, x: tmpX, y: tmpY, x1: tmpX, y1: tmpY-1, weight: nextWeight});
            }
            //горизонтальный ковер влево
            if (tmpX >= 1) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX-1][tmpY].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX-1][tmpY].carpet !== '' && main.control.carpetsID[tmpX-1][tmpY].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 2, x: tmpX, y: tmpY, x1: tmpX-1, y1: tmpY, weight: nextWeight});
            }
            //горизонтальный ковер вправо
            if (tmpX <= 5) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX+1][tmpY].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX+1][tmpY].carpet !== '' && main.control.carpetsID[tmpX+1][tmpY].color !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 3, x: tmpX, y: tmpY, x1: tmpX+1, y1: tmpY, weight: nextWeight});
            }

            let max = {id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: -1};
            let maxArr = [];
            // for (let i = 0; i < carpetVariants.length; i++) {
            //     if (carpetVariants[i].weight === max.weight) {
            //         // maxArr.push(max);
            //         maxArr.push(carpetVariants[i]);
            //     }
            //     if (carpetVariants[i].weight > max.weight) {
            //         max = carpetVariants[i];
            //         maxArr = [];
            //         maxArr.push(max);
            //     }
            // }

            for (let i = 0; i < carpetVariants.length; i++) {
                let cv = carpetVariants[i];
                if (main.control.carpetsID[cv.x][cv.y].id !== -1 && main.control.carpetsID[cv.x][cv.y].id === main.control.carpetsID[cv.x1][cv.y1].id) {
                    console.log('Один на один');
                } else {
                    if (cv.weight === max.weight) {
                        // maxArr.push(max);
                        maxArr.push(cv);
                    }
                    if (cv.weight > max.weight) {
                        max = cv;
                        maxArr = [];
                        maxArr.push(max);
                    }
                }

            }

            if (maxArr.length > 1) {
                max = maxArr[Math.floor(Math.random()*(maxArr.length))];
            }

            // for (let i = 0; i < carpetVariants.length; i++) {
            //     if (max === carpetVariants[i].weight) {
            //         return carpetVariants[i];
            //     }
            // }

            return max;
        } else {
            return {id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: -1};
        }
    }

    checkDownCell () {
        let besideCellWeight = 0;
        let nextWeight = 0;
        // let carpetVariants = [{id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: 0}];
        let carpetVariants = [];

        let tmpX = this.assanCountX;
        let tmpY = this.assanCountY+1;
        if (tmpY <= 6) {

            //нижняя клетка
            if (main.control.carpetsID[tmpX][tmpY].carpet === '') {
                besideCellWeight += 1;
            }
            if (main.control.carpetsID[tmpX][tmpY].carpet !== '' && main.control.carpetsID[tmpX][tmpY].carpet !== this.carpet) {
                besideCellWeight += 2;
            }

            //вертикальный ковер
            if (tmpY <= 5) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX][tmpY+1].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX][tmpY+1].carpet !== '' && main.control.carpetsID[tmpX][tmpY+1].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 1, x: tmpX, y: tmpY, x1: tmpX, y1: tmpY+1, weight: nextWeight});
            }
            //горизонтальный ковер влево
            if (tmpX >= 1) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX-1][tmpY].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX-1][tmpY].carpet !== '' && main.control.carpetsID[tmpX-1][tmpY].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 2, x: tmpX, y: tmpY, x1: tmpX-1, y1: tmpY, weight: nextWeight});
            }
            //горизонтальный ковер вправо
            if (tmpX <= 5) {
                nextWeight = besideCellWeight;
                // nextWeight = 0;
                if (main.control.carpetsID[tmpX+1][tmpY].carpet === '') {
                    nextWeight += 1;
                }
                if (main.control.carpetsID[tmpX+1][tmpY].carpet !== '' && main.control.carpetsID[tmpX+1][tmpY].carpet !== this.carpet) {
                    nextWeight += 2;
                }
                carpetVariants.push({id: 3, x: tmpX, y: tmpY, x1: tmpX+1, y1: tmpY, weight: nextWeight});
            }

            let max = {id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: -1};
            let maxArr = [];
            // for (let i = 0; i < carpetVariants.length; i++) {
            //     if (carpetVariants[i].weight === max.weight) {
            //         // maxArr.push(max);
            //         maxArr.push(carpetVariants[i]);
            //     }
            //     if (carpetVariants[i].weight > max.weight) {
            //         max = carpetVariants[i];
            //         maxArr = [];
            //         maxArr.push(max);
            //     }
            // }

            for (let i = 0; i < carpetVariants.length; i++) {
                let cv = carpetVariants[i];
                if (main.control.carpetsID[cv.x][cv.y].id !== -1 && main.control.carpetsID[cv.x][cv.y].id === main.control.carpetsID[cv.x1][cv.y1].id) {
                    console.log('Один на один');
                } else {
                    if (cv.weight === max.weight) {
                        // maxArr.push(max);
                        maxArr.push(cv);
                    }
                    if (cv.weight > max.weight) {
                        max = cv;
                        maxArr = [];
                        maxArr.push(max);
                    }
                }

            }

            if (maxArr.length > 1) {
                max = maxArr[Math.floor(Math.random()*(maxArr.length))];
            }

            // for (let i = 0; i < carpetVariants.length; i++) {
            //     if (max === carpetVariants[i].weight) {
            //         return carpetVariants[i];
            //     }
            // }

            return max;
        } else {
            return {id: -1, x: -1, y: -1, x1: -1, y1: -1, weight: -1};
        }
    }

    displayInfo(receivedCountCarpet, receivedCountCarpetOnField, recievedMoney) {
        let countCarpet = 0;
        let countCarpOnFieldFirst = 0;
        let countCarpOnFieldSecond = 0;
        let countCarpetOnField = 0;
        let countMoney = 0;

        countCarpet = document.getElementById(this.carpetsCountHTMLid);
        // countCarpetOnField = document.getElementById(this.carpetsOnFieldHTMLid);
        countMoney = document.getElementById(this.gamerMoneyHTMLid);

        if (countCarpet.innerHTML > 0) {
            if (+countCarpet.innerHTML === 1) this.final = true;
            let tmp = 0;

            tmp = Number(countCarpet.innerHTML);
            countCarpet.innerHTML = tmp - receivedCountCarpet;
            // tmp = Number(countCarpetOnField.innerHTML);
            // countCarpetOnField.innerHTML = tmp + receivedCountCarpetOnField;
            tmp = Number(countMoney.innerHTML);
            countMoney.innerHTML = tmp + recievedMoney;
        }
    }

    determineWinner() {

        //TODO как определить конец игры и как вывести результат

        let countMoney = document.getElementById(this.gamerMoneyHTMLid);
        let money = Number(countMoney.innerHTML);


        let arr = main.control.carpetsID;

        let carpCount = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[i][j].gamerID === this.id) {
                    carpCount++;
                }
            }
        }

        return carpCount + money;
    }
}