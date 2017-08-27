

function showNumberWithAnimate(i,j,number){
	var theNumberCell = $('#_2048_number_cell_'+i+'_'+j);
	theNumberCell.css('background-color',getNumberBackgroundColor(number));
	theNumberCell.css('color',getNumberColor(number));
	theNumberCell.text(number);

	theNumberCell.animate({
		width:cellSingleWidth,
		height:cellSingleWidth,
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


function updateScore(score){
	$('#score').text(score);

}