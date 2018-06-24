class GameFieldES6 {
    constructor(){
        window.storage = {};
        let size = window.innerWidth/2;
        if(size > window.innerHeight) size = window.innerHeight;

        window.storage.fieldDimension = {
            field: size,//-18
            tile: {width: Math.round((size-100)/7)},
            arrow: Math.round((size-100)/14)
        };

        let tx = Math.floor((window.innerWidth/2 - window.storage.fieldDimension.tile.width*7)/2);
        let ty = Math.floor((window.innerHeight - window.storage.fieldDimension.tile.width*7)/2);
        this.externalStartingPoint = {};
        this.externalStartingPoint.x = tx-3;
        this.externalStartingPoint.y = ty-3;
        this.internalStartingPoint = {};
        this.internalStartingPoint.x = tx;
        this.internalStartingPoint.y = ty;
        window.storage.assan = {
            x: this.internalStartingPoint.x,
            y: this.internalStartingPoint.y
        };
        this.outerSideLength = window.storage.fieldDimension.tile.width*7+6;//size-2*this.externalStartingPoint.x;
        this.innerSideLength = window.storage.fieldDimension.tile.width*7;//size-2*this.internalStartingPoint.x;
        //this.innerLines = {point1: this.internalStartingPoint.x, point2: window.storage.fieldDimension.tile.width, step: window.storage.fieldDimension.tile.width};
        // this.driveArrows = {point: window.storage.fieldDimension.arrow+15};
        this.driveArrows = {};
        this.driveArrows.x = window.storage.fieldDimension.arrow+this.externalStartingPoint.x;
        this.driveArrows.y = window.storage.fieldDimension.arrow+this.externalStartingPoint.y;
    };

    //динамическая отрисовка игрового поля
    drawES6() {
        ctx.strokeStyle = '#6A3808'; // меняем цвет рамки
        ctx.lineWidth = 2;
        ctx.strokeRect(this.externalStartingPoint.x, this.externalStartingPoint.y, this.outerSideLength, this.outerSideLength);
        ctx.strokeRect(this.internalStartingPoint.x, this.internalStartingPoint.y, this.innerSideLength, this.innerSideLength);
        ctx.beginPath();
        let count = 0;
        for (let y = window.storage.fieldDimension.tile.width + this.internalStartingPoint.y; y < this.innerSideLength+this.internalStartingPoint.y; y += window.storage.fieldDimension.tile.width) {
            ctx.moveTo(this.internalStartingPoint.x, y);
            ctx.lineTo(this.innerSideLength+this.internalStartingPoint.x, y);
            count++;
        }
        // alert( cellY );
        for (let x = window.storage.fieldDimension.tile.width + this.internalStartingPoint.x; x < this.innerSideLength+this.internalStartingPoint.x; x += window.storage.fieldDimension.tile.width) {
            ctx.moveTo(x, this.internalStartingPoint.y);
            ctx.lineTo(x, this.innerSideLength+this.internalStartingPoint.y);
        }

        let cp1yStep = this.internalStartingPoint.y+window.storage.fieldDimension.tile.width;
        count = 0;
        for (let y1 = this.driveArrows.y; count < 3; y1 += window.storage.fieldDimension.tile.width) {
            ctx.moveTo(this.externalStartingPoint.x, y1);
            ctx.quadraticCurveTo(this.externalStartingPoint.x-20, cp1yStep, this.externalStartingPoint.x, y1+=window.storage.fieldDimension.tile.width);
            cp1yStep += window.storage.fieldDimension.tile.width*2;
            count++;
        }
        cp1yStep = this.externalStartingPoint.y+window.storage.fieldDimension.tile.width*2;
        count = 0;
        for (let y1 = this.driveArrows.y+window.storage.fieldDimension.tile.width; count < 3; y1 += window.storage.fieldDimension.tile.width) {
            ctx.moveTo(window.innerWidth/2-this.externalStartingPoint.x, y1);
            ctx.quadraticCurveTo(window.innerWidth/2-this.externalStartingPoint.x+20, cp1yStep, window.innerWidth/2-this.externalStartingPoint.x, y1+=window.storage.fieldDimension.tile.width);
            cp1yStep += window.storage.fieldDimension.tile.width*2;
            count++;
        }

        let cp1xStep = this.externalStartingPoint.x+window.storage.fieldDimension.tile.width;
        count = 0;
        for (let x1 = this.driveArrows.x; count < 3; x1 += window.storage.fieldDimension.tile.width) {
            ctx.moveTo(x1, this.externalStartingPoint.y);
            ctx.quadraticCurveTo(cp1xStep, this.externalStartingPoint.y-20, x1+=window.storage.fieldDimension.tile.width, this.externalStartingPoint.y);
            cp1xStep += window.storage.fieldDimension.tile.width*2;
            count++;
        }
        cp1xStep = this.externalStartingPoint.x+window.storage.fieldDimension.tile.width*2;
        count = 0;
        for (let x1 = this.driveArrows.x+window.storage.fieldDimension.tile.width; count < 3; x1 += window.storage.fieldDimension.tile.width) {
            ctx.moveTo(x1, window.innerHeight-this.externalStartingPoint.y);
            ctx.quadraticCurveTo(cp1xStep, window.innerHeight-this.externalStartingPoint.y+20, x1+=window.storage.fieldDimension.tile.width, window.innerHeight-this.externalStartingPoint.y);
            cp1xStep += window.storage.fieldDimension.tile.width*2;
            count++;
        }

        ctx.stroke();
    }
}