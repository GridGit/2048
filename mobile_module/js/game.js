// import Support from "./support.js";
// import ShowSupport from "./showSupport.js";

var support = new Support();
var showSupport = new ShowSupport();

if(support.documentWidth > 500){
	support.gridContainerWidth = 500;
	support.cellSingleWidth = 100;
	support.cellSpace =20;
}


function Game(){
	/**
	 * 属性定义
	 * 
	 */
	// 数据 二维数组
	this.board = [];
	// 分数
	this.score = 0;
	// 判断是否可以相加 二维数组
	this.hasConfilcted = [];
	// 计算滑动方向
	this.startX = 0;
	this.startY = 0;
	this.endX = 0;
	this.endY = 0;

}

Game.prototype = {
	/**
	 * [init 初始化]
	 * @return {[type]} [description]
	 */
	init: function(){
		// 设置小格子位置
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				var gird_cell = $('#_2048_grid_cell_' + i +"_"+j);
				gird_cell.css('top',support.getPosTop(i));
				gird_cell.css('left',support.getPosLeft(j));

			}
		}
		// 初始化数据
		for(var i = 0; i < 4; i++){
			this.board[i] =[];
			this.hasConfilcted[i]= []
			for(var j = 0; j < 4; j++){
				this.board[i][j] = 0;
				this.hasConfilcted[i][j] = false;
			}
		}
		this.updateBoardView();

	},
	updateBoardView: function(){
		$('._2048_number_cell').remove();
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				$('#_2048_grid_container').append('<div class = "_2048_number_cell" id = "_2048_number_cell_'+ i +'_'+ j + '"></div>');
				var theNumberCell = $('#_2048_number_cell_'+i+'_'+j);
				

				if(this.board[i][j] == 0){
					theNumberCell.css('width',0);
					theNumberCell.css('height',0);
					theNumberCell.css('top',support.getPosTop(i) + support.cellSingleWidth/2);
					theNumberCell.css('left',support.getPosLeft(j) + support.cellSingleWidth/2);
					theNumberCell.css('font-size',0.6*support.cellSingleWidth + "px");
				}else{
					theNumberCell.css('width',support.cellSingleWidth);
					theNumberCell.css('height',support.cellSingleWidth);
					theNumberCell.css('top',support.getPosTop(i));
					theNumberCell.css('left',support.getPosLeft(j));
					theNumberCell.css('background-color',support.getNumberBackgroundColor(this.board[i][j]));
					theNumberCell.css('color',support.getNumberColor(this.board[i][j]));
					theNumberCell.text(this.board[i][j]);
					// theNumberCell.text("1024");
					theNumberCell.css('font-size',0.6*support.cellSingleWidth + "px");
					if(this.board[i][j] > 512){
						theNumberCell.css('font-size',0.4*support.cellSingleWidth + "px");
					}
				}

				this.hasConfilcted[i][j] = false;
			}
		}		
		$("._2048_number_cell").css("line-height",support.cellSingleWidth + "px");
	},
	/**
	 * [generateOneNumber 生成一个随机数]
	 * @return {[type]} [true]
	 */
	generateOneNumber: function(){
		if(support.noSpace(this.board)){
			return false;
		}

		// 
		// 随机一个位置
		var randomx = parseInt(Math.floor(Math.random() * 4));
		var randomy = parseInt(Math.floor(Math.random() * 4));
		var times = 0
		while(times < 50){
			if(this.board[randomx][randomy] == 0){
				break;
			}
			randomx = parseInt(Math.floor(Math.random() * 4));
			randomy = parseInt(Math.floor(Math.random() * 4));

			times++;
		}
		if(times == 50){
			for(var i = 0; i < 4; i++){
				for(var j = 0; j < 4; j++){
					if(this.board[i][j] == 0){
						randomx = i;
						randomy = j;
					}
				}
			}
		}
		// 随机一个数字 
		var randomNumber = Math.random() < 0.5 ? 2 : 4;

		// 在随机位置显示随机数字
		this.board[randomx][randomy] = randomNumber
		showSupport.showNumberWithAnimate(randomx,randomy,randomNumber);

		return true;
	},
	/**
	 * [moveLeft 向左移动逻辑]
	 * @return {[type]} [description]
	 */
	moveLeft: function(){
		if(!support.canMoveLeft(this.board)){
			return false
		}
		// moveLeft 逻辑 i 行 j 列
		// 
		for(var i = 0; i < 4; i++){
			for(var j = 1; j < 4; j++){
				if(this.board[i][j] != 0){
					for(var k = 0; k < j; k++){
						if(this.board[i][k] == 0 && support.noBlockHorizontal(i,k,j,this.board)){
							// move
							showSupport.showMoveAnimation(i,j,i,k);
							// 赋值
							this.board[i][k] = this.board[i][j];
							this.board[i][j] = 0;
							continue;
						}else if(this.board[i][k] == this.board[i][j] && support.noBlockHorizontal(i,k,j,this.board) && !this.hasConfilcted[i][k]){
							
							// move
							showSupport.showMoveAnimation(i,j,i,k);
							// add
							this.board[i][k] = this.board[i][k] + this.board[i][j];
							
							// add score
							this.score = this.score + this.board[i][k];
							showSupport.updateScore(this.score);

							this.board[i][j] = 0;

							this.hasConfilcted[i][k] = true;
							continue;
						}
					}
				}
			}
		}
		var that = this;
		window.setTimeout(function(){
			that.updateBoardView();
		},200);
		return true;	
	},
	/**
	 * [moveLeft 向右移动逻辑]
	 * @return {[type]} [description]
	 */
	moveRight: function(){
		if(!support.canMoveRight(this.board)){
			return false
		}
		
		// moveRight 逻辑 i 行 j 列
		// 
		for(var i = 0; i < 4; i++){
			for(var j = 2; j >= 0; j--){
				if(this.board[i][j] != 0){
					for(var k = 3; k > j; k--){
						if(this.board[i][k] == 0 && support.noBlockHorizontal(i,j,k,this.board)){
							// move
							showSupport.showMoveAnimation(i,j,i,k);
							// 赋值
							this.board[i][k] = this.board[i][j];
							this.board[i][j] = 0;
							continue;
						}else if(this.board[i][k] == this.board[i][j] && support.noBlockHorizontal(i,j,k,this.board) && !this.hasConfilcted[i][k]){
							// move
							showSupport.showMoveAnimation(i,j,i,k);
							// add
							this.board[i][k] = this.board[i][k] + this.board[i][j];
							
							// add score
							this.score = this.score + this.board[i][k];
							showSupport.updateScore(this.score);

							this.board[i][j] = 0;

							this.hasConfilcted[i][k] = true;
							continue;
						}
					}
				}
			}
		}
		var that = this;
		window.setTimeout(function(){
			that.updateBoardView();
		},200);
		return true;	
	},
	/**
	 * [moveLeft 向上移动逻辑]
	 * @return {[type]} [description]
	 */
	moveUp: function(){
		if(!support.canMoveUp(this.board)){
			return false
		}
		
		// moveUp 逻辑  j 行 i 列
		// 
		for(var i = 0; i < 4; i++){
			for(var j = 1; j < 4; j++){
				if(this.board[j][i] != 0){
					for(var k = 0; k < j; k++){
						if(this.board[k][i] == 0 && support.noBlockVertical(i,k,j,this.board)){
							// move
							showSupport.showMoveAnimation(j,i,k,i);
							// 赋值
							this.board[k][i] = this.board[j][i];
							this.board[j][i] = 0;
							continue;
						}else if(this.board[k][i] == this.board[j][i] && support.noBlockVertical(i,k,j,this.board) && !this.hasConfilcted[k][i]){
							// move
							showSupport.showMoveAnimation(j,i,k,i);
							// add
							this.board[k][i] = this.board[k][i] + this.board[j][i];
							this.board[j][i] = 0;

							// add score
							this.score = this.score + this.board[k][i];
							showSupport.updateScore(this.score);

							this.hasConfilcted[k][i] = true;
							continue;
						}
					}
				}
			}
		}
		var that = this;
		window.setTimeout(function(){
			that.updateBoardView();
		},200);
		return true;	
	},

	/**
	 * [moveLeft 向下移动逻辑]
	 * @return {[type]} [description]
	 */
	moveDown: function(){
		if(!support.canMoveDown(this.board)){
			return false
		}	
		// moveDown 逻辑 j 行 i 列
		// 
		for(var i = 0; i < 4; i++){
			for(var j = 2; j >= 0; j--){
				if(this.board[j][i] != 0){
					for(var k = 3; k > j; k--){
						if(this.board[k][i] == 0 && support.noBlockVertical(i,j,k,this.board)){
							// move
							showSupport.showMoveAnimation(j,i,k,i);
							// 赋值
							this.board[k][i] = this.board[j][i];
							this.board[j][i] = 0;
							continue;
						}else if(this.board[k][i] == this.board[j][i] && support.noBlockVertical(i,j,k,this.board) && !this.hasConfilcted[k][i]){
							// move
							showSupport.showMoveAnimation(j,i,k,i);
							// add
							this.board[k][i] = this.board[k][i] + this.board[j][i];
							this.board[j][i] = 0;

							// add score
							this.score = this.score + this.board[k][i];
							showSupport.updateScore(this.score);

							this.hasConfilcted[k][i] = true;
							continue;
						}
					}
				}
			}
		}
		var that = this;
		window.setTimeout(function(){
			that.updateBoardView();
		},200);
		return true;	
	}


}

// export {Game}
