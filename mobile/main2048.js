

// var documentWidth = window.screen.availWidth;
// var gridContainerWidth = 0.92 * documentWidth;
// var cellSingleWidth = 0.18 * documentWidth;
// var cellSpace = 0.04 * documentWidth;

//
//  数据模型
// 
var board = [];
var score = 0;
var hasConfilcted = [];


var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0; 

$(document).ready(function(){
	prepareForMobile();
	newgame();

});
/**
 * 移动化
 * 
 */
function prepareForMobile(){

	if(documentWidth > 500){
		gridContainerWidth = 500;
		cellSingleWidth = 100;
		cellSpace =20;
	}
	$('#_2048_grid_container').css('width',gridContainerWidth - 2*cellSpace);
	$('#_2048_grid_container').css('height',gridContainerWidth - 2*cellSpace);
	$('#_2048_grid_container').css('padding',cellSpace);
	$('#_2048_grid_container').css('border-radius',0,02*gridContainerWidth);

	$('._2048_grid_cell').css('height',cellSingleWidth);
	$('._2048_grid_cell').css('width',cellSingleWidth);
	$('._2048_grid_cell').css('border-radius',0.02*cellSingleWidth);

}

function newgame(){
	/**
	 * 初始化棋盘
	 * 
	 */
	 init()

	 /**
	  *
	  * 在随机的两个格子中生成数字
	  * 
	  */
	 generateOneNumber();
	 generateOneNumber();
	 /**
	  * 分数设为0
	  */
	 $('#score').text("0");
	 
}

function init(){
	// 设置小格子位置
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var gird_cell = $('#_2048_grid_cell_' + i +"_"+j);
			gird_cell.css('top',getPosTop(i));
			gird_cell.css('left',getPosLeft(j));

		}
	}
	// 初始化数据
	for(var i = 0; i < 4; i++){
		board[i] =[];
		hasConfilcted[i]= []
		for(var j = 0; j < 4; j++){
			board[i][j] = 0;
			hasConfilcted[i][j] = false;
		}
	}
	// 更新视图
	updateBoardView();


}

function updateBoardView(){
	$('._2048_number_cell').remove();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			$('#_2048_grid_container').append('<div class = "_2048_number_cell" id = "_2048_number_cell_'+ i +'_'+ j + '"></div>');
			var theNumberCell = $('#_2048_number_cell_'+i+'_'+j);
			

			if(board[i][j] == 0){
				theNumberCell.css('width',0);
				theNumberCell.css('height',0);
				theNumberCell.css('top',getPosTop(i) + cellSingleWidth/2);
				theNumberCell.css('left',getPosLeft(j) + cellSingleWidth/2);
				theNumberCell.css('font-size',0.6*cellSingleWidth + "px");
			}else{
				theNumberCell.css('width',cellSingleWidth);
				theNumberCell.css('height',cellSingleWidth);
				theNumberCell.css('top',getPosTop(i));
				theNumberCell.css('left',getPosLeft(j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
				// theNumberCell.text("1024");
				theNumberCell.css('font-size',0.6*cellSingleWidth + "px");
				if(board[i][j] > 512){
					theNumberCell.css('font-size',0.4*cellSingleWidth + "px");
				}
			}

			hasConfilcted[i][j] = false;
		}
	}
	
	$("._2048_number_cell").css("line-height",cellSingleWidth + "px");
	// $("._2048_number_cell").css("font-size",0.6*cellSingleWidth + "px");
}

function generateOneNumber(){
	if(noSpace(board)){
		return false;
	}

	// 
	// 随机一个位置
	var randomx = parseInt(Math.floor(Math.random() * 4));
	var randomy = parseInt(Math.floor(Math.random() * 4));
	var times = 0
	while(times < 50){
		if(board[randomx][randomy] == 0){
			break;
		}
		randomx = parseInt(Math.floor(Math.random() * 4));
		randomy = parseInt(Math.floor(Math.random() * 4));

		times++;
	}
	if(times == 50){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(board[i][j] == 0){
					randomx = i;
					randomy = j;
				}
			}
		}
	}
	// 随机一个数字 
	var randomNumber = Math.random() < 0.5 ? 2 : 4;

	// 在随机位置显示随机数字
	board[randomx][randomy] = randomNumber
	showNumberWithAnimate(randomx,randomy,randomNumber);

	return true;
}



$(document).keydown(function(e){

	if(e.keyCode == 37){
		e.preventDefault();
		e.stopPropagation();	
		// left
		if(moveLeft()){
			setTimeout(function(){
				generateOneNumber();
			},210)
			setTimeout(function(){
				isGameOver();
			},300)			
		}
		
	}else if(e.keyCode == 38){
		// up
		e.preventDefault();
		e.stopPropagation();
		if(moveUp()){
			setTimeout(function(){
				generateOneNumber();
			},210)
			setTimeout(function(){
				isGameOver();
			},300)
		}
	}else if(e.keyCode == 39){
		e.preventDefault();
		e.stopPropagation();
		// right
		if(moveRight()){
			setTimeout(function(){
				generateOneNumber();
			},210)
			setTimeout(function(){
				isGameOver();
			},300)
		}
	}else if(e.keyCode == 40){
		e.preventDefault();
		e.stopPropagation();
		// down
		if(moveDown()){
			setTimeout(function(){
				generateOneNumber();
			},210)
			setTimeout(function(){
				isGameOver();
			},300)
		}
	}
})

document.addEventListener('touchstart',function(e){
	startX = e.touches[0].pageX;
	startY = e.touches[0].pageY;

});

document.addEventListener('touchmove',function(e){
	e.preventDefault();
},{passive:false})
document.addEventListener('touchend',function(e){
	
	endX = e.changedTouches[0].pageX;
	endY = e.changedTouches[0].pageY;

	var deltaX = endX - startX;
	var deltaY = endY - startY;

	if(Math.abs(deltaX) < 0.15*documentWidth && Math.abs(deltaY) < 0.15*documentWidth){
		return;
	}
	if(Math.abs(deltaX) > Math.abs(deltaY)){
		if(deltaX > 0){
			// Right
			if(moveRight()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isGameOver();
				},300)
			}
		}else if(deltaX < 0){
			// left
			if(moveLeft()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isGameOver();
				},300)			
			}
		}
	}else if(Math.abs(deltaX) < Math.abs(deltaY)){
		if(deltaY >= 0){
			// down

			if(moveDown()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isGameOver();
				},300)
			}
			
		}else if(deltaY < 0){
			// up
			if(moveUp()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isGameOver();
				},300)
			}
		}
	}
});


/**
 * 游戏结束
 * @return {[type]} [description]
 */
 
function isGameOver(){
	// 
	if(noSpace(board) && noMove(board)){
		gameOver();
	}
}

function gameOver(){
	alert("game over")
}



/**
 * [moveLeft 向左移动逻辑]
 * @return {[type]} [description]
 */
function moveLeft(){
	if(!canMoveLeft(board)){
		return false
	}
	
	// moveLeft 逻辑 i 行 j 列
	// 
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j] != 0){
				for(var k = 0; k < j; k++){
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
						// move
						showMoveAnimation(i,j,i,k);
						// 赋值
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConfilcted[i][k]){
						
						// move
						showMoveAnimation(i,j,i,k);
						// add
						board[i][k] = board[i][k] + board[i][j];
						
						// add score
						score = score + board[i][k];
						updateScore(score);

						board[i][j] = 0;

						hasConfilcted[i][k] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout(function(){
		updateBoardView();
	},200);
	return true;	
}




/**
 * [moveLeft 向右移动逻辑]
 * @return {[type]} [description]
 */
function moveRight(){
	if(!canMoveRight(board)){
		return false
	}
	
	// moveRight 逻辑 i 行 j 列
	// 
	for(var i = 0; i < 4; i++){
		for(var j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				for(var k = 3; k > j; k--){
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						// move
						showMoveAnimation(i,j,i,k);
						// 赋值
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConfilcted[i][k]){
						// move
						showMoveAnimation(i,j,i,k);
						// add
						board[i][k] = board[i][k] + board[i][j];
						
						// add score
						score = score + board[i][k];
						updateScore(score);

						board[i][j] = 0;

						hasConfilcted[i][k] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout(function(){
		updateBoardView();
	},200);
	return true;	
}


/**
 * [moveLeft 向上移动逻辑]
 * @return {[type]} [description]
 */
function moveUp(){
	if(!canMoveUp(board)){
		return false
	}
	
	// moveUp 逻辑  j 行 i 列
	// 
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[j][i] != 0){
				for(var k = 0; k < j; k++){
					if(board[k][i] == 0 && noBlockVertical(i,k,j,board)){
						// move
						showMoveAnimation(j,i,k,i);
						// 赋值
						board[k][i] = board[j][i];
						board[j][i] = 0;
						continue;
					}else if(board[k][i] == board[j][i] && noBlockVertical(i,k,j,board) && !hasConfilcted[k][i]){
						// move
						showMoveAnimation(j,i,k,i);
						// add
						board[k][i] = board[k][i] + board[j][i];
						board[j][i] = 0;

						// add score
						score = score + board[k][i];
						updateScore(score);

						hasConfilcted[k][i] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout(function(){
		updateBoardView();
	},200);
	return true;	
}

/**
 * [moveLeft 向下移动逻辑]
 * @return {[type]} [description]
 */
function moveDown(){
	if(!canMoveDown(board)){
		return false
	}
	
	// moveDown 逻辑 j 行 i 列
	// 
	for(var i = 0; i < 4; i++){
		for(var j = 2; j >= 0; j--){
			if(board[j][i] != 0){
				for(var k = 3; k > j; k--){
					if(board[k][i] == 0 && noBlockVertical(i,j,k,board)){
						// move
						showMoveAnimation(j,i,k,i);
						// 赋值
						board[k][i] = board[j][i];
						board[j][i] = 0;
						continue;
					}else if(board[k][i] == board[j][i] && noBlockVertical(i,j,k,board) && !hasConfilcted[k][i]){
						// move
						showMoveAnimation(j,i,k,i);
						// add
						board[k][i] = board[k][i] + board[j][i];
						board[j][i] = 0;

						// add score
						score = score + board[k][i];
						updateScore(score);

						hasConfilcted[k][i] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout(function(){
		updateBoardView();
	},200);
	return true;	
}







