import { Tetromino } from "/scripts/tetromino.js";
export class Grid{
    constructor(canvas, rows, cols, cellSize, space){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.space = space
        this.matriz = [];
        this.restartMatriz();

        this.canvas.width = this.cols * this.cellSize + (this.space * this.cols);
        this.canvas.height = this.rows * this.cellSize + (this.space * this.rows);

        this.block = new Tetromino(this.canvas, this.cellSize);
}

    restartMatriz(){
        for(let r = 0; r < this.rows; r++){
            this.matriz[r] = [];
            for(let c = 0; c < this.cols; c++){
                this.matriz[r][c] = 0;
            }
        }
    }

    dibujarCuadro(x,y,side,color,borderColor, border){
        const borderSize = side / border;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, side, side);

        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = borderSize;
        this.ctx.strokeRect(x+borderSize/2, y+borderSize/2, side-borderSize, side-borderSize);
    }

getCoords(col, row){
    return {
        x: col * (this.cellSize + this.space),
        y: row * (this.cellSize + this.space)  
    }
}

    dibujar(){
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                const position = this.getCoords(c,r);
                if(this.matriz[r][c] !== 0){
                    this.block.drawBlock(position.x,position.y,this.matriz[r][c]);
                }
                else{
                    this.dibujarCuadro(position.x, position.y, this.cellSize, '#000', '#303030',10);
                }
            }
        }
        this.printMatriz();
    }

    
dibujar2(){
    this.drawBackground();
    for(let r = 0; r < this.rows; r++){
        for(let c = 0; c < this.cols; c++){
            const position = this.getCoords(c, r);
            if(this.matriz[r][c] !== 0){
                if(this.matriz[r][c] === 2){
                    this.block.drawBlock(position.x + this.cellSize, position.y, this.matriz[r][c]);
                } else if(this.matriz[r][c] === 3){
                    this.block.drawBlock(position.x, position.y, this.matriz[r][c]);
                } else {
                    this.block.drawBlock(position.x + this.cellSize/2, position.y, this.matriz[r][c]);
                }
            }
        }
    }
    this.printMatriz();
}
    drawBackground(){
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    printMatriz(){
        let text = '';
        this.matriz.forEach(row => {
            text += row.join(' ') + '\n';
        });
        console.log(text);
    }
}