
//
//  数据模型
// 
var board = [];
var score = 0;

$(document).ready(function(){
	
	newgame();

});


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
		for(var j = 0; j < 4; j++){
			board[i][j] = 0
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
				theNumberCell.css('top',getPosTop(i) + 50);
				theNumberCell.css('left',getPosLeft(j) + 50);
			}else{
				theNumberCell.css('width',100);
				theNumberCell.css('height',100);
				theNumberCell.css('top',getPosTop(i));
				theNumberCell.css('left',getPosLeft(j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
	}
}

function generateOneNumber(){
	if(noSpace(board)){
		return false;
	}

	// 
	// 随机一个位置
	var randomx = parseInt(Math.floor(Math.random() * 4));
	var randomy = parseInt(Math.floor(Math.random() * 4));
	while(true){
		if(board[randomx][randomy] == 0){
			break;
		}
		randomx = parseInt(Math.floor(Math.random() * 4));
		randomy = parseInt(Math.floor(Math.random() * 4));
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
		// left
		if(moveLeft()){
			generateOneNumber();
			isGameOver()
		}
		
	}else if(e.keyCode == 38){
		// up
		if(moveUp()){
			generateOneNumber();
			isGameOver()
		}
	}else if(e.keyCode == 39){
		// right
		if(moveRight()){
			generateOneNumber();
			isGameOver()
		}
	}else if(e.keyCode == 40){
		// down
		if(moveDown()){
			generateOneNumber();
			isGameOver()
		}
	}



})


function moveLeft(){
	if(!canMoveLeft()){
		return false
	}

	// moveLeft 逻辑
	
}
















