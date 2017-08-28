function Support(){
	/**
	 * 属性 
	 */
	//设置布局、方块宽度
	this.documentWidth = window.screen.availWidth;
	this.gridContainerWidth = 0.92 * this.documentWidth;
	this.cellSingleWidth = 0.18 * this.documentWidth;
	this.cellSpace = 0.04 * this.documentWidth;

}


/**
 * [prototype 方法]
 * @type {Object}
 */
Support.prototype = {
	/**
	 *
	 *获取每个小格子的top left 
	 * 
	 */
	getPosTop: function(x){
		return this.cellSpace + (this.cellSpace + this.cellSingleWidth) * x;
	},
	getPosLeft: function(y){
		return this.cellSpace + (this.cellSpace + this.cellSingleWidth) * y; 
	},
	/**
	 * 
	 * 设置number背景色
	 * 
	 */
	getNumberBackgroundColor: function(num){
		switch(num){
			case 2:
				return '#eee4da';
				break;
			case 4:
				return '#ede0c8';
				break;
			case 8:
				return '#f2b179';
				break;
			case 16:
				return '#f59563';
				break;
			case 32:
				return '#f67c5f';
				break;
			case 64:
				return '#f65e3b';
				break;
			case 128:
				return '#edcf72';
				break;
			case 256:
				return '#edcc61';
				break;
			case 512:
				return '#a6c';
				break;
			case 1024:
				return '#33b5e5';
				break;
			case 2048:
				return '#09c';
				break;
			case 4096:
				return '#a6c';
				break;
			case 8192:
				return '#93c';
				break;
			default:
				break;
		}

	},
	/**
	 * 
	 * 设置number前景色
	 * 
	 */
	getNumberColor: function(num){
		if(num <= 4){
			return '#776e65';
		}
		return 'white';
	},
	/**
	 *
	 * 是否能左移 i 行 j 列
	 */
	canMoveLeft: function(board){
		for(var i = 0; i < 4; i++){
			for(var j = 1; j < 4; j++){
				if(board[i][j] != 0){
					if(board[i][j-1] == 0 || board[i][j] == board[i][j-1]){
						return true
					}
				}
			}
		}
		return false;
	},
	/**
	 *
	 * 是否能右移 i 行 j 列
	 */
	canMoveRight: function(board){
		for(var i = 0; i < 4; i++){
			for(var j = 2; j >= 0; j--){
				if(board[i][j] != 0){
					if(board[i][j+1] == 0 || board[i][j] == board[i][j+1]){
						return true
					}
				}
			}
		}
		return false;
	},
	/**
	 *
	 * 是否能上移 j 行 i 列
	 */
	canMoveUp: function(board){
		for(var i = 0; i < 4; i++){
			for(var j = 1; j < 4; j++){
				if(board[j][i] != 0){
					if(board[j-1][i] == 0 || board[j][i] == board[j-1][i]){
						return true
					}
				}
			}
		}
		return false;
	},
	/**
	 *
	 * 是否能上移 j 行 i 列
	 */
	canMoveDown: function(board){
		for(var i = 0; i < 4; i++){
			for(var j = 2; j >= 0; j--){
				if(board[j][i] != 0){
					if(board[j+1][i] == 0 || board[j][i] == board[j+1][i]){
						return true
					}
				}
			}
		}
		return false;
	},
	/**
	 *
	 *同一行没有障碍物
	 *
	 * 
	 */
	noBlockHorizontal: function(row,col1,col2,board){
		for(var i = col1 + 1; i < col2; i++){
			if(board[row][i] != 0){
				return false;
			}
		}
		return true;
	},
	/**
	 *
	 *同一列没有障碍物
	 *
	 * 
	 */
	noBlockVertical: function(col,row1,row2,board){
		for(var i = row1 + 1; i < row2; i++){
			if(board[i][col] != 0){
				return false;
			}
		}
		return true;
	},
	/**
	 * 
	 * 判断有没有空格
	 * 
	 */
	noSpace: function(board){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(board[i][j] == 0){
					return false;
				}
			}
		}
		return true;
	},
	/**
	 *
	 *能不能移动
	 *
	 * 
	 */
	noMove:function(board){
		if(this.canMoveDown(board) || this.canMoveUp(board) || this.canMoveRight(board) || this.canMoveLeft(board)){
			return false;
		}
		return true;
	}
}

// export {Support}







































