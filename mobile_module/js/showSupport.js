
// import Support from "./support.js";

var support = new Support();

if(support.documentWidth > 500){
	support.gridContainerWidth = 500;
	support.cellSingleWidth = 100;
	support.cellSpace =20;
}


function ShowSupport(){

}
ShowSupport.prototype = {
	/**
	 * [showNumberWithAnimate 显示数字的动画]
	 * @param  {[type]} i      [行]
	 * @param  {[type]} j      [列]
	 * @param  {[type]} number [所在位置的数值]
	 * @return {[type]}        [null]
	 */
	showNumberWithAnimate: function(i,j,number){
		var theNumberCell = $('#_2048_number_cell_'+i+'_'+j);
		theNumberCell.css('background-color',support.getNumberBackgroundColor(number));
		theNumberCell.css('color',support.getNumberColor(number));
		theNumberCell.text(number);

		theNumberCell.animate({
			width:support.cellSingleWidth,
			height:support.cellSingleWidth,
			top: support.getPosTop(i),
			left: support.getPosLeft(j)
		},50)
	},
	/**
	 * [showMoveAnimation 移动时的动画]
	 * @param  {[type]} fromx [起点X]
	 * @param  {[type]} fromy [起点Y]
	 * @param  {[type]} tox   [终点X]
	 * @param  {[type]} toy   [终点Y]
	 * @return {[type]}       [null]
	 */
	showMoveAnimation: function(fromx,fromy,tox,toy){
		var theNumberCell = $('#_2048_number_cell_'+fromx+'_'+fromy);
		theNumberCell.animate({
			top: support.getPosTop(tox),
			left: support.getPosLeft(toy)
		},200)
	},
	/**
	 * [updateScore 更新分数]
	 * @param  {[type]} score [分数数值]
	 * @return {[type]}       [null]
	 */
	updateScore: function(score){
		$('#score').text(score);

	}
}


// export {ShowSupport}
