
/**
 *
 *获取每个小格子的top left 
 * 
 */

function getPosTop(x){
	return 20 + 120 * x;
}

function getPosLeft(y){
	return 20 + 120 * y; 
}

/**
 * 
 * 设置number背景色
 * 
 */
function getNumberBackgroundColor(num){
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
		case 521:
			return '#9c0';
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

}

/**
 * 
 * 设置number前景色
 * 
 */
function getNumberColor(num){
	if(num <= 4){
		return '#776e65';
	}
	return 'white';
}

/**
 * 
 * 判断有没有空格
 * 
 */
function noSpace(board){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}























