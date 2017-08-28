// import Game from "./game1.js";
// import Support from "./support";


var support = new Support();
var game = new Game();

$(document).ready(function(){
	// 大屏适配
	prepareForMobile();
	// 初始化
	newGame()

	$(document).keydown(function(e){
		if(e.keyCode == 37){
			e.preventDefault();
			e.stopPropagation();	
			// left
			if(game.moveLeft()){
				window.setTimeout(function(){
					game.generateOneNumber();
				},210)
				window.setTimeout(function(){
					isGameOver();
				},300)			
			}
			
		}else if(e.keyCode == 38){
			// up
			e.preventDefault();
			e.stopPropagation();
			if(game.moveUp()){
				window.setTimeout(function(){
					game.generateOneNumber();
				},210)
				window.setTimeout(function(){
					isGameOver();
				},300)
			}
		}else if(e.keyCode == 39){
			e.preventDefault();
			e.stopPropagation();
			// right
			if(game.moveRight()){
				setTimeout(function(){
					game.generateOneNumber();
				},210)
				setTimeout(function(){
					isGameOver();
				},300)
			}
		}else if(e.keyCode == 40){
			e.preventDefault();
			e.stopPropagation();
			// down
			if(game.moveDown()){
				setTimeout(function(){
					game.generateOneNumber();
				},210)
				setTimeout(function(){
					isGameOver();
				},300)
			}
		}
	});
	document.addEventListener('touchstart',function(e){
		game.startX = e.touches[0].pageX;
		game.startY = e.touches[0].pageY;

	});

	document.addEventListener('touchmove',function(e){
		e.preventDefault();
	},{passive: false})
	document.addEventListener('touchend',function(e){
		
		game.endX = e.changedTouches[0].pageX;
		game.endY = e.changedTouches[0].pageY;

		var deltaX = game.endX - game.startX;
		var deltaY = game.endY - game.startY;

		if(Math.abs(deltaX) < 0.1*support.documentWidth && Math.abs(deltaY) < 0.1*support.documentWidth){
			return;
		}
		if(Math.abs(deltaX) > Math.abs(deltaY)){
			if(deltaX > 0){
				// Right
				if(game.moveRight()){
					window.setTimeout(function(){
						game.generateOneNumber();
					},210)
					window.setTimeout(function(){
						isGameOver();
					},300)
				}
			}else if(deltaX < 0){
				// left
				if(game.moveLeft()){
					window.setTimeout(function(){
						game.generateOneNumber();
					},210)
					window.setTimeout(function(){
						isGameOver();
					},300)			
				}
			}
		}else if(Math.abs(deltaX) < Math.abs(deltaY)){
			if(deltaY >= 0){
				// down

				if(game.moveDown()){
					window.setTimeout(function(){
						game.generateOneNumber();
					},210)
					window.setTimeout(function(){
						isGameOver();
					},300)
				}
				
			}else if(deltaY < 0){
				// up
				if(game.moveUp()){
					window.setTimeout(function(){
						game.generateOneNumber();
					},210)
					window.setTimeout(function(){
						isGameOver();
					},300)
				}
			}
		}
	});
})

function newGame(){
	/**
	 * 初始化棋盘
	 * 
	 */
	 game.init()

	 /**
	  *
	  * 在随机的两个格子中生成数字
	  * 
	  */
	 game.generateOneNumber();
	 game.generateOneNumber();

	 /**
	  * 分数设为0
	  */
	 $('#score').text("0");
}

/**
 * 大屏适配
 * 
 */
function prepareForMobile(){

	if(support.documentWidth > 500){
		support.gridContainerWidth = 500;
		support.cellSingleWidth = 100;
		support.cellSpace =20;
	}
	$('#_2048_grid_container').css('width',support.gridContainerWidth - 2*support.cellSpace);
	$('#_2048_grid_container').css('height',support.gridContainerWidth - 2*support.cellSpace);
	$('#_2048_grid_container').css('padding',support.cellSpace);
	$('#_2048_grid_container').css('border-radius',0,02*support.gridContainerWidth);

	$('._2048_grid_cell').css('height',support.cellSingleWidth);
	$('._2048_grid_cell').css('width',support.cellSingleWidth);
	$('._2048_grid_cell').css('border-radius',0.02*support.cellSingleWidth);

}
/**
 * 判断游戏是否结束
 * @return {[type]} [description]
 */
 
function isGameOver(){
	// 
	if(support.noSpace(game.board) && support.noMove(game.board)){
		gameOver();
	}
}
/**
 * [gameOver 游戏]
 * @return {[type]} [description]
 */
function gameOver(){
	alert("game over")
}
