

function showNumberWithAnimate(i,j,number){
	var theNumberCell = $('#_2048_number_cell_'+i+'_'+j);
	theNumberCell.css('background-color',getNumberBackgroundColor(number));
	theNumberCell.css('color',getNumberColor(number));
	theNumberCell.text(number);

	theNumberCell.animate({
		width:'100px',
		height:'100px',
		top: getPosTop(i),
		left: getPosLeft(j)
	},50)
}


function showMoveAnimation(fromx,fromy,tox,toy){
	var theNumberCell = $('#_2048_number_cell_'+fromx+'_'+fromy);
	theNumberCell.animate({
		top: getPosTop(tox),
		left: getPosLeft(toy)
	},200)
}