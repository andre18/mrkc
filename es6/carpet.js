class CarpetES6 {
    constructor(countX, countY, countX1, countY1, carpet, assanCountX, assanCountY) {
        this.countX = countX;
        this.countY = countY;
        this.countX1 = countX1;
        this.countY1 = countY1;
        // this.colorFill = colorFill;
        // this.colorStroke = colorStroke;
        this.carpet = carpet;
        this.assanCountX = assanCountX;
        this.assanCountY = assanCountY;

        this.startPointX = 0;
        this.startPointY = 0;
        this.widthCarpet = 0;
        this.heightCarpet = 0;
    }

    //отрисовка ковра в заданых координатах
    drawCarpetES6 () {
        // ctx.fillStyle = this.colorFill;
        // ctx.strokeStyle = this.colorStroke;


        let img = new Image();
        // img.src = 'sprites/carpet_1.png';
        img.src = this.carpet;

        ctx.drawImage(img, this.startPointX, this.startPointY, this.widthCarpet, this.heightCarpet);

        // ctx.fillRect(this.startPointX, this.startPointY, this.widthCarpet, this.heightCarpet);
        // ctx.strokeRect(this.startPointX, this.startPointY, this.widthCarpet, this.heightCarpet);
    };

    //проверка, можно ли положить в заданых координатах ковер
    isNearTheFigure() {
        if (Math.abs(this.countX - this.countX1) === 1 && this.countY === this.countY1) {
            if ((this.countX < this.countX1 && (this.countX === this.assanCountX+1 || this.countX === this.assanCountX-2) && this.countY === this.assanCountY) ||
                (this.countX < this.countX1 && (this.countX1 === this.assanCountX+1 || this.countX === this.assanCountX-1) &&
                    (this.countY === this.assanCountY+1 || this.countY === this.assanCountY-1) &&
                    (this.countY1 === this.assanCountY+1 || this.countY1 === this.assanCountY-1))) {

                this.startPointX = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x+2;
                this.startPointY = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y+2;
                this.widthCarpet = window.storage.fieldDimension.tile.width*2-4;
                this.heightCarpet = window.storage.fieldDimension.tile.width-4;

                this.carpet = this.carpet + 'g.png';

                return true;
            } else if ((this.countX1 < this.countX && (this.countX1 === this.assanCountX+1 || this.countX1 === this.assanCountX-2) && this.countY === this.assanCountY) ||
                (this.countX1 < this.countX && (this.countX === this.assanCountX+1 || this.countX1 === this.assanCountX-1) &&
                    (this.countY === this.assanCountY+1 || this.countY === this.assanCountY-1) &&
                    (this.countY1 === this.assanCountY+1 || this.countY1 === this.assanCountY-1))) {

                this.startPointX = window.storage.fieldDimension.tile.width*this.countX1+window.storage.assan.x+2;
                this.startPointY = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y+2;
                this.widthCarpet = window.storage.fieldDimension.tile.width*2-4;
                this.heightCarpet = window.storage.fieldDimension.tile.width-4;

                this.carpet = this.carpet + 'g.png';

                return true;
            }
        } else if (Math.abs(this.countY - this.countY1) === 1 && this.countX === this.countX1) {
            if ((this.countY < this.countY1 && (this.countY === this.assanCountY+1 || this.countY === this.assanCountY-2) && this.countX === this.assanCountX) ||
                (this.countY < this.countY1 && (this.countY1 === this.assanCountY+1 || this.countY === this.assanCountY-1) &&
                    (this.countX === this.assanCountX+1 || this.countX === this.assanCountX-1) &&
                    (this.countX1 === this.assanCountX+1 || this.countX1 === this.assanCountX-1))) {

                this.startPointX = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x+2;
                this.startPointY = window.storage.fieldDimension.tile.width*this.countY+window.storage.assan.y+2;
                this.widthCarpet = window.storage.fieldDimension.tile.width-4;
                this.heightCarpet = window.storage.fieldDimension.tile.width*2-4;

                this.carpet = this.carpet + 'v.png';

                return true;
            } else if ((this.countY1 < this.countY && (this.countY1 === this.assanCountY+1 || this.countY1 === this.assanCountY-2) && this.countX === this.assanCountX) ||
                (this.countY1 < this.countY && (this.countY === this.assanCountY+1 || this.countY1 === this.assanCountY-1) &&
                    (this.countX === this.assanCountX+1 || this.countX === this.assanCountX-1) &&
                    (this.countX1 === this.assanCountX+1 || this.countX1 === this.assanCountX-1))) {

                this.startPointX = window.storage.fieldDimension.tile.width*this.countX+window.storage.assan.x+2;
                this.startPointY = window.storage.fieldDimension.tile.width*this.countY1+window.storage.assan.y+2;
                this.widthCarpet = window.storage.fieldDimension.tile.width-4;
                this.heightCarpet = window.storage.fieldDimension.tile.width*2-4;

                this.carpet = this.carpet + 'v.png';

                return true;
            }
        }

        return false;
    }

}