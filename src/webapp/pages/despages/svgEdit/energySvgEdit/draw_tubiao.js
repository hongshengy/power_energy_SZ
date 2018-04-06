
/**
 * 串烧
 * @param x
 * @param y
 * @returns {String}
 */
function chuanshao(x,y){
	var code ='<circle fill="#000000" stroke-dasharray="null" stroke-width="2"  cx="'+(x)+'" cy="'+(y)+'" r="5" id="'+getID()+'" stroke="#ffffff"/>'+
			'<line fill="none" stroke="#ffffff" stroke-dasharray="null" stroke-width="2" x1="'+(x)+'" y1="'+(y-10)+'" x2="'+(x)+'" y2="'+(y+10)+'" id="'+getID()+'"/>';
	return code;
}

/**
 * 3个串烧
 * @param x
 * @param y
 * @returns {String}
 */
function chuanshao3(x,y){
	return chuanshao(x,y)+chuanshao(x-15,y)+chuanshao(x+15,y);
}

/**
 * 6个串烧
 * @param x
 * @param y
 * @returns {String}
 */
function chuanshao6(x,y){
	return chuanshao(x,y)+chuanshao(x-15,y)+chuanshao(x+15,y)
			+chuanshao(x,y-12)+chuanshao(x-15,y-12)+chuanshao(x+15,y-12);
}

/**
 * 9个串烧
 * @param x
 * @param y
 * @returns {String}
 */
function chuanshao9(x,y){
	return chuanshao3(x,y)+chuanshao3(x,y+12)+chuanshao3(x,y+24);
}
/**
 * 12个串烧
 * @param x
 * @param y
 * @returns {String}
 */
function chuanshao12(x,y){
	return chuanshao6(x,y)+chuanshao6(x,y+24);
}
/**
 * 电阻
 * @param x
 * @param y
 * @returns {String}
 */
function dianzu(x,y){
	return '<rect fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="'+(x-5)+'" y="'+(y)+'" width="10" height="20" id="'+getID()+'"/>'+
	'<line id="'+getID()+'" y2="'+(y-10)+'" x2="'+(x)+'" y1="'+(y)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	'<line id="'+getID()+'" y2="'+(y+30)+'" x2="'+(x)+'" y1="'+(y+20)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>';
}
/**
 * 上双箭头
 * @param x
 * @param y
 * @returns {String}
 */
function up2JT(x,y){
	return '<line id="'+getID()+'" y2="'+(y+15)+'" x2="'+(x)+'" y1="'+(y)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y+10)+'" x2="'+(x-10)+'" y1="'+(y)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y+10)+'" x2="'+(x+10)+'" y1="'+(y)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y+5)+'" x2="'+(x-10)+'" y1="'+(y-5)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y+5)+'" x2="'+(x+10)+'" y1="'+(y-5)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>';
}
 /**
  * 下双箭头
  * @param x
  * @param y
  * @returns {String}
  */
function down2JT(x,y){
	return '<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x)+'" y1="'+(y-15)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x)+'" y1="'+(y-10)+'" x1="'+(x-10)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x)+'" y1="'+(y-10)+'" x1="'+(x+10)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
  	  '<line id="'+getID()+'" y2="'+(y+5)+'" x2="'+(x)+'" y1="'+(y-5)+'" x1="'+(x-10)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
  	  '<line id="'+getID()+'" y2="'+(y+5)+'" x2="'+(x)+'" y1="'+(y-5)+'" x1="'+(x+10)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>';
}
  /**
   * 开关
   * @param x
   * @param y
   * @returns {String}
   */
function on_off(x,y){
	return '<circle fill="#000000" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" cx="'+(x)+'" cy="'+(y-25)+'" r="2" id="'+getID()+'"/>'+
	  '<circle fill="#000000" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" cx="'+(x)+'" cy="'+(y)+'" r="2" id="'+getID()+'"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-2)+'" y1="'+(y)+'" x2="'+(x-15)+'" y2="'+(y-25)+'" id="'+getID()+'"/>';
}
/**
 * 接地
 * @param x
 * @param y
 * @returns {String}
 */
function jiedi(x,y){
	return ' <line id="'+getID()+'" y2="'+(y)+'" x2="'+(x)+'" y1="'+(y-15)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x-10)+'" y1="'+(y)+'" x1="'+(x+10)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y+3)+'" x2="'+(x-5)+'" y1="'+(y+3)+'" x1="'+(x+5)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y+6)+'" x2="'+(x-2)+'" y1="'+(y+6)+'" x1="'+(x+2)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>';
}
/**
 * 下单箭头
 * @param x
 * @param y
 * @returns {String}
 */
function downJT(x,y){
	return '<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x)+'" y1="'+(y-20)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x)+'" y1="'+(y-10)+'" x1="'+(x-5)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x)+'" y1="'+(y-10)+'" x1="'+(x+5)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>';
}
 /**
  * 矩形里下箭头
  * @param x
  * @param y
  * @returns {String}
  */
function JTinRect(x,y){
	return '<rect id="'+getID()+'" height="25" width="10" y="'+(y)+'" x="'+(x-5)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y+18)+'" x2="'+(x)+'" y2="'+(y-20)+'" id="'+getID()+'"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y+18)+'" x2="'+(x+5)+'" y2="'+(y+8)+'" id="'+getID()+'"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y+18)+'" x2="'+(x-5)+'" y2="'+(y+8)+'" id="'+getID()+'"/>';
}
/**
 * 信号灯
 * @param x
 * @param y
 * @returns {String}
 */
function light(x,y){
	return '<circle fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" cx="'+x+'" cy="'+y+'" r="12" id="'+getID()+'"/>'+
	'<line stroke="#ffffff" id="'+getID()+'" y2="'+(y+8)+'" x2="'+(x+8)+'" y1="'+(y-8)+'" x1="'+(x-8)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>'+
	'<line stroke="#ffffff" id="'+getID()+'" y2="'+(y+8)+'" x2="'+(x-8)+'" y1="'+(y-8)+'" x1="'+(x+8)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>';
}
 /**
  * 电容
  * @param x
  * @param y
  * @returns {String}
  */
function dianrong(x,y){
	return '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-15)+'" y1="'+(y-10)+'" x2="'+(x+15)+'" y2="'+(y-10)+'" id="'+getID()+'"/>'+
	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-15)+'" y1="'+(y)+'" x2="'+(x+15)+'" y2="'+(y)+'" id="'+getID()+'"/>'+
  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y-10)+'" x2="'+(x)+'" y2="'+(y-20)+'" id="'+getID()+'"/>'+
  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y)+'" x2="'+(x)+'" y2="'+(y+10)+'" id="'+getID()+'"/>';
}
  /**
   * 圆里三菱
   * @param x
   * @param y
   * @returns {String}
   */
function sanInCircle(x,y){
	return '<circle fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" cx="'+(x)+'" cy="'+(y)+'" r="13" id="'+getID()+'"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y)+'" x2="'+(x+8)+'" y2="'+(y+8)+'" id="'+getID()+'"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y)+'" x2="'+(x-8)+'" y2="'+(y+8)+'" id="'+getID()+'"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y)+'" x2="'+(x)+'" y2="'+(y-10)+'" id="'+getID()+'"/>';
}
/**
 * 圆里V
 * @param x
 * @param y
 * @returns {String}
 */
function VInCircle(x,y){
	return '<circle id="'+getID()+'" r="10" cy="'+(y)+'" cx="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-5)+'" y1="'+(y-5)+'" x2="'+(x)+'" y2="'+(y+5)+'" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x+5)+'" y1="'+(y-5)+'" x2="'+(x)+'" y2="'+(y+5)+'" id="'+getID()+'"/>';
}
/**
 * 圆里三角
 * @param x
 * @param y
 * @returns {String}
 */
function sjInCircle(x,y){
	return '<circle fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" cx="'+(x)+'" cy="'+(y)+'" r="13" id="'+getID()+'"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-8)+'" y1="'+(y+5)+'" x2="'+(x+8)+'" y2="'+(y+5)+'" id="'+getID()+'"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-8)+'" y1="'+(y+5)+'" x2="'+(x)+'" y2="'+(y-8)+'" id="'+getID()+'"/>'+
	  '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y-8)+'" x2="'+(x+8)+'" y2="'+(y+5)+'" id="'+getID()+'"/>';
};

/**
 * 套餐1
 * @param x
 * @param y
 * @returns {String}
 */
function taocan1(x,y){
	return taocan1_1(x-50,y+20)+taocan1_2(x-25,y+20)+taocan1_3(x+25,y+45)+
		'<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x+25)+'" y1="'+(y)+'" x1="'+(x-50)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
		'<line id="'+getID()+'" y2="'+(y-20)+'" x2="'+(x)+'" y1="'+(y+20)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
		'<line id="'+getID()+'" y2="'+(y+18)+'" x2="'+(x+25)+'" y1="'+(y)+'" x1="'+(x+25)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>';
	
	function taocan1_1(x,y){
		return JTinRect(x,y)+jiedi(x,y+40);
	}
	function taocan1_2(x,y){
		return dianrong(x,y)+light(x,y+22)+jiedi(x,y+50);
	}
	function taocan1_3(x,y){
		return on_off(x,y)+jiedi(x,y+17);
	}
}

/**
 * 电抗器 电抗器需要通过svg-edit来移动确定位置
 * @returns {String}
 */
function diankang(){
	return '<path fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" id="'+getID()+'" d="m99.900002,285.200012c0,0 0.099998,0 0.099998,0.099976c0,0.100006 -0.099998,0.200012 -0.099998,0.300018c0,0.100006 0.038269,0.207581 0,0.299988c-0.054115,0.130646 -0.099998,0.200012 -0.099998,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0.045876,0.169342 0.099998,0.299988c0.038277,0.092377 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0.038269,0.207581 0,0.299988c-0.054115,0.130646 -0.029305,0.229309 -0.099998,0.299988c-0.070717,0.070709 -0.100006,0.100006 -0.100006,0.200012c0,0.100006 0.038254,0.207611 0,0.299988c-0.054115,0.130646 -0.099998,0.200012 -0.099998,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0.099998,0.100006 0.099998,0.200012c0,0.100006 0.029289,0.129303 0.100006,0.200012c0.070694,0.070679 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0.02298,0.202698 0,0.300018c-0.051376,0.217621 -0.100006,0.299988 -0.100006,0.399994c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0.100006,0.099976 0.100006,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0.045883,0.169342 0.099998,0.299988c0.038269,0.092407 0.099998,0.100006 0.099998,0.200012c0,0.100006 -0.099998,0.100006 -0.199997,0.100006c-0.100006,0 -0.200005,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.300003,0c-0.099998,0 -0.16935,0.045868 -0.299995,0.099976c-0.092392,0.038269 -0.200005,0 -0.300003,0c-0.099998,0 -0.207611,-0.038269 -0.299995,0c-0.130661,0.054108 -0.200005,0.100006 -0.300003,0.100006c-0.099998,0 -0.199997,0 -0.300003,0c-0.099998,0 -0.169334,0.045868 -0.299995,0.100006c-0.092384,0.038269 -0.200005,0.100006 -0.300003,0.100006c-0.099998,0 -0.199997,0 -0.299995,0c-0.100006,0 -0.169342,0.045868 -0.300003,0.100006c-0.092384,0.038269 -0.169357,0.045868 -0.300003,0.099976c-0.092392,0.038269 -0.269333,0.145874 -0.399994,0.200012c-0.092392,0.038269 -0.200005,0.100006 -0.300003,0.100006c-0.099998,0 -0.229286,-0.070709 -0.300003,0c-0.070717,0.070709 -0.069351,0.145874 -0.199997,0.199982c-0.092392,0.038269 -0.229286,-0.070709 -0.300003,0c-0.070717,0.070709 -0.069336,0.145874 -0.199997,0.200012c-0.092384,0.038269 -0.099998,0.100006 -0.199997,0.100006c-0.100006,0 -0.069359,0.145874 -0.200005,0.199982c-0.092392,0.038269 -0.169334,0.145874 -0.299995,'+
	'0.200012c-0.092392,0.038269 -0.229294,-0.070709 -0.300003,0c-0.070717,0.070709 -0.029282,0.129303 -0.099998,0.200012c-0.070709,0.070709 -0.329292,0.029266 -0.400002,0.099976c-0.070717,0.070709 -0.099998,0.100006 -0.199997,0.200012c-0.100006,0.100006 -0.169357,0.24588 -0.300003,0.299988c-0.092392,0.038269 -0.029282,0.129303 -0.099998,0.200012c-0.070709,0.070709 -0.099998,0.100006 -0.099998,0.200012c0,0.099976 -0.029289,0.129272 -0.100006,0.199982c-0.070717,0.070709 -0.129288,0.129303 -0.199997,0.200012c-0.070717,0.070709 -0.029282,0.229279 -0.099998,0.299988c-0.070709,0.070709 -0.107613,0.061737 -0.200005,0.100006c-0.130661,0.054138 -0.129288,0.129303 -0.199997,0.200012c-0.070694,0.070679 -0.145882,0.169342 -0.199997,0.299988c-0.038269,0.092407 -0.029289,0.129303 -0.100006,0.200012c-0.070694,0.070679 -0.029289,0.129272 -0.099998,0.199982c-0.070717,0.070709 -0.099998,0.200012 -0.099998,0.300018c0,0.099976 -0.145882,0.169342 -0.199997,0.299988c-0.038269,0.092407 -0.100006,0.299988 -0.100006,0.399994c0,0.100006 -0.099998,0.100006 -0.099998,0.200012c0,0.100006 -0.045883,0.169342 -0.099991,0.299988c-0.038269,0.092407 0,0.200012 0,0.300018c0,0.099976 -0.099998,0.199982 -0.099998,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0.070717,0.229279 0,0.299988c-0.070709,0.070709 -0.099998,0.100006 -0.099998,0.200012c0,0.099976 -0.045883,0.169312 -0.100006,0.299988c-0.038269,0.092407 0.070694,0.229309 0,0.299988c-0.070709,0.070709 -0.029282,0.129303 -0.099998,0.200012c-0.070709,0.070709 -0.099998,0.100006 -0.099998,0.200012c0,0.099976 0,0.199982 0,0.299988c0,0.200012 0,0.299988 0,0.399994c0,0.100006 0,0.300018 0,0.399994c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0.045883,0.169373 0.099998,0.300018c0.076523,0.184753 -0.038269,0.307587 0,0.399994c0.054115,0.130646 0.200005,0.199982 0.200005,0.299988c0,0.100006 0.099998,0.100006 0.099998,0.200012c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0.145882,0.169342 0.199997,0.299988c0.038269,0.092407 0.000008,0.200012 0.099998,0.299988c0.100014,0.100006 0.029289,0.229309 0.100006,0.300018c0.070709,0.070709 0.145874,0.069336 0.199997,0.199982c0.038277,0.092377 0,0.200012 0,0.300018c0,0.100006 0.061729,0.207581 0.099998,0.299988c0.054115,0.130646 0.199997,0.200012 0.300003,0.300018c0.099991,0.099976 0.177025,0.102661 0.199997,0.199982c0.051376,0.217621 0.200005,0.200012 0.200005,0.300018c0,0.099976 0.029282,0.129272 0.099998,0.199982c0.070709,0.070709 0.129288,0.029297 0.199997,0.100006c0.070717,0.070709 0.061722,0.107635 0.099998,0.200012c0.054123,0.130646 0.129288,0.129272 0.200005,0.199982c0.070709,0.070709 0.029282,0.129303 0.099998,0.200012c0.070702,0.070709 0.129303,0.129303 0.199997,0.199982c0.070717,0.070709 0.10762,0.061737 0.200005,0.100006c0.130661,0.054138 0.12928,0.129303 0.199997,0.200012c0.070709,0.070709 0.207619,-0.038269 0.300003,0c0.130661,0.054138 0.129303,0.129303 0.199997,0.199982c0.070709,0.070709 0.245888,-0.03064 0.300003,0.100006c0.038269,0.092407 0.099998,0.100006 0.199997,0.200012c0.099998,0.100006 0.129288,0.229279 0.200005,0.299988c0.070709,0.070709 0.107613,0.061737 0.199997,0.100006c0.130661,0.054138 0.099998,0.200012 0.199997,0.200012c0.100006,0 0.129295,0.029266 0.200005,0.099976c0.070717,0.070709 0.129288,0.029297 0.199997,0.100006c0.070717,0.070709 0.129288,0.029297 0.200005,0.100006c0.070717,0.070709 0.107613,0.061737 0.199997,0.100006c0.130661,0.054138 0.207611,0.061737 0.300003,0.100006c0.130646,0.054108 0.199997,0.199982 0.299995,0.199982c0.099998,0 0.229294,0.029297 0.300003,0.100006c0.070717,0.070709 0.129288,0.029297 0.199997,0.100006c0.070717,'+
	'0.070709 0.099998,0.100006 0.200005,0.100006c0.099998,0 0.107613,0.061707 0.199997,0.099976c0.130661,0.054138 0.199997,0.100006 0.300003,0.100006c0.099998,0 0.169334,0.045868 0.299995,0.100006c0.092384,0.038269 0.169342,0.045868 0.300003,0.100006c0.092384,0.038269 0.199997,0 0.299995,0c0.100006,'+
	'0 0.200005,0 0.300003,0c0.099998,0 0.099998,0.100006 0.199997,0.100006c0.100006,0 0.129311,0.029297 0.200005,0.099976c0.070709,0.070709 0.207611,-0.038269 0.299995,0c0.130661,0.054108 0.207619,0.061737 0.300003,0.100006c0.130661,0.054138 0.199997,0.200012 0.300003,0.200012c0.099998,0 0.24588,-0.03064 0.299995,0.100006c0.038254,0.092377 0.099998,0.099976 0.200005,0.099976c0.099998,0 0.199997,0 0.299995,0c0.099998,0 0.200005,0 0.300003,0c0.099998,0 0.199997,0 0.299995,0c0.100006,0 0.300003,0 0.400002,0c0.099998,0 0.200005,0 0.300003,0c0.099998,0 0.16935,-0.045868 0.299995,-0.099976c0.092392,-0.038269 0.200005,0 0.300003,0c0.099998,0 0.300003,-0.100006 0.400002,-0.100006c0.099998,0 0.207611,0.038269 0.299995,0c0.130661,-0.054108 0.200005,-0.100006 0.300003,-0.100006c0.099998,0 0.207611,0.038269 0.300003,0c0.130661,-0.054138 0.207611,-0.061737 0.299995,-0.100006c0.130661,-0.054138 0.207611,-0.061737 0.300003,-0.100006c0.130646,-0.054108 0.12928,-0.129272 0.199997,-0.199982c0.070709,-0.070709 0.169342,-0.045868 0.300003,-0.100006c0.092384,-0.038269 0.169334,-0.045868 0.299995,-0.100006c0.092392,-0.038269 0.100006,-0.100006 0.200005,-0.100006c0.099998,0 0.16935,-0.045868 0.299995,-0.099976c0.092392,-0.038269 0.100006,-0.100006 0.200005,-0.200012c0.099998,-0.100006 0.169258,-0.218597 0.299995,-0.399994c0.082695,-0.114746 0.099991,-0.200012 0.200005,-0.300018c0.099991,-0.099976 0.029282,-0.229279 0.099998,-0.299988c0.070702,-0.070709 0.061722,-0.107635 0.099991,-0.200012c0.054123,-0.130646 0.161743,-0.207581 0.200012,-0.299988c0.054108,-0.130646 0.129288,-0.129303 0.199997,-0.200012c0.070694,-0.070679 0.029282,-0.129272 0.099991,-0.199982c0.070709,-0.070709 0.129295,-0.029297 0.200012,-0.100006c0.070717,-0.070709 0.100006,-0.200012 0.199997,-0.299988c0.100006,-0.100006 0.029282,-0.229309 0.099991,-0.300018c0.070709,-0.070709 0.129288,-0.029297 0.200012,-0.100006c0.070694,-0.070679 0.129288,-0.129272 0.199997,-0.199982c0.070717,-0.070709 0.045883,-0.169373 0.099991,-0.300018c0.038254,-0.092377 0.145889,-0.169312 0.200012,-0.299988c0.038269,-0.092407 0.029305,-0.229309 0.099991,-0.299988c0.070709,-0.070709 0.061729,-0.107605 0.099998,-0.200012c0.054115,-0.130646 0.145882,-0.269348 0.199997,-0.399994c0.038269,-0.092407 0.029289,-0.129303 0.100006,-0.200012c0.070717,-0.070709 0.045883,-0.169342 0.099998,-0.299988c0.038269,-0.092407 0.099998,-0.200012 0.099998,-0.300018c0,-0.099976 0,-0.199982 0,-0.299988c0,-0.100006 0.045876,-0.169342 0.099998,-0.299988c0.038277,-0.092377 0.145882,-0.169342 0.200005,-0.300018c0.07653,-0.184753 0.029282,-0.229279 0.099998,-0.299988c0.070709,-0.070709 0.061729,-0.107605 0.099998,-0.200012c0.054115,-0.130646 0.099998,-0.199982 0.099998,-0.299988c0,-0.100006 0,-0.200012 0,-0.300018c0,-0.099976 0,-0.199982 0,-0.299988c0,-0.100006 -0.099998,-0.200012 -0.099998,-0.299988c0,-0.100006 0,-0.200012 0,-0.300018c0,-0.100006 0,-0.199982 0,-0.299988c0,-0.100006 0,-0.200012 0,-0.300018c0,-0.099976 0.038269,-0.207581 0,-0.299988c-0.054115,-0.130646 -0.199997,-0.100006 -0.300003,-0.100006c-0.099998,0 -0.199997,0 -0.299995,0c-0.099998,0 -0.207619,0.038269 -0.300003,0c-0.130661,-0.054138 -0.199997,-0.100006 -0.299995,-0.100006c-0.100006,0 -0.200005,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.299995,0c-0.099998,0 -0.200005,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.299995,0c-0.100006,0 -0.200005,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.299995,0c-0.099991,0 -0.200005,0 -0.300003,0c-0.099991,0 -0.199997,0 -0.299988,0c-0.100006,0 -0.200012,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.299995,0c-0.099998,0 -0.300003,0 -0.400002,0c-0.099998,0 -0.199997,0 -0.300003,0c-0.099998,0 -0.199997,'+
	'0 -0.299995,0c-0.099998,0 -0.200005,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.299995,0c-0.100006,0 -0.200005,0 -0.300003,0c-0.099998,0 -0.169357,-0.045868 -0.300003,-0.099976c-0.092392,-0.038269 -0.199997,0 -0.299995,0c-0.099998,0 -0.200005,0 -0.300003,0c-0.099998,0 -0.199997,0 -0.299995,0c-0.100006,0 -0.200005,0 -0.300003,0c-0.099998,0 -0.169342,-0.045898 -0.300003,-0.100006c-0.092384,-0.038269 -0.199997,0 -0.299995,0c-0.099998,0 -0.200005,0 -0.300003,0c-0.099998,0 -0.229286,-0.070709 -0.299995,0c-0.070717,0.070709 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 -0.038254,0.207611 0,0.299988c0.054115,0.130646 0.061729,0.207611 0.099998,0.300018c0.054115,0.130646 0.199997,0.199982 0.199997,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 -0.029289,0.129303 -0.099998,0.200012c-0.070717,0.070709 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 -0.045883,0.169342 -0.099998,0.299988c-0.038269,0.092407 -0.029289,0.229279 -0.099998,0.299988c-0.070717,0.070709 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 -0.070717,0.229309 0,0.300018c0.070709,0.070709 0.099998,0.100006 0.099998,0.199982c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 -0.099998,0.200012 -0.099998,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0.029289,0.129303 0.099998,0.200012c0.070717,0.070709 0.045876,0.169342 0.099998,0.299988c0.038277,0.092377 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 -0.038277,0.207642 0,0.300018c0.054123,0.130646 0.148621,0.182373 0.199997,0.399994c0.022972,0.097321 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.200012 0,0.299988 0,0.399994c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 -0.099998,0.099976 -0.099998,0.199982c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0.038269,0.207581 0,0.299988c-0.054115,0.130646 -0.099998,0.200012 -0.099998,0.299988c0,0.100006 -0.199997,0.300018 -0.199997,0.400024c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 -0.100006,0.100006 -0.100006,0.200012c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.299988 0,0.399994c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.100006 0.100006,0.199982 0.100006,'+
	'0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0.099998,0.199982 0.099998,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0.099998,0.200012 0.099998,0.300018c0,0.100006 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.299988c0,0.100006 0.029289,0.229309 0.099998,0.300018c0.070717,0.070709 0,0.199982 0,0.299988c0,0.100006 0,0.200012 0,0.300018c0,0.099976 0,0.199982 0,0.299988l0,0.100006"/>';
}

/**
 * 电容组
 * @param x
 * @param y
 * @returns {String}
 */
function dianrongzu(x,y){
	return '<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y)+'" x2="'+(x+5.9)+'" y2="'+(y+11.8)+'" id="'+getID()+'" stroke="#ffffff"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x)+'" y1="'+(y)+'" x2="'+(x-6)+'" y2="'+(y+12)+'" id="'+getID()+'" stroke="#ffffff"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-15)+'" y1="'+(y+30)+'" x2="'+(x-3.2)+'" y2="'+(y+30)+'" id="'+getID()+'" stroke="#ffffff"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x+10.4)+'" y1="'+(y+9.5)+'" x2="'+(x+1.4)+'" y2="'+(y+14.1)+'" id="'+getID()+'" stroke="#ffffff"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-9.1)+'" y1="'+(y+18.7)+'" x2="'+(x-15.1)+'" y2="'+(y+30.7)+'" stroke="#ffffff" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x+9)+'" y1="'+(y+19.1)+'" x2="'+(x+14.9)+'" y2="'+(y+30.9)+'" stroke="#ffffff" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x+13.3)+'" y1="'+(y+15.9)+'" x2="'+(x+4.3)+'" y2="'+(y+20.5)+'" stroke="#ffffff" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-2.2)+'" y1="'+(y+13.8)+'" x2="'+(x-10.5)+'" y2="'+(y+9.2)+'" id="'+getID()+'" stroke="#ffffff"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-4.7)+'" y1="'+(y+20.1)+'" x2="'+(x-13)+'" y2="'+(y+15.5)+'" stroke="#ffffff" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x+3.1)+'" y1="'+(y+30)+'" x2="'+(x+15)+'" y2="'+(y+30)+'" stroke="#ffffff" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x+2.7)+'" y1="'+(y+35.2)+'" x2="'+(x+2.7)+'" y2="'+(y+24.9)+'" id="'+getID()+'" stroke="#ffffff"/>'+
	  	'<line fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-2.4)+'" y1="'+(y+35.2)+'" x2="'+(x-2.4)+'" y2="'+(y+24.9)+'" stroke="#ffffff" id="'+getID()+'"/>';
}

/**
 * 门禁
 * @param x
 * @param y
 * @returns {String}
 */
function menjin(x,y){
	return '<rect fill-opacity="0" id="'+getID()+'" height="40" width="30" y="'+(y)+'" x="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="#000000"/>'+
	  	'<circle fill="#000000" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0" cx="'+(x+27)+'" cy="'+(y+20)+'" r="3" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x+6)+'" y1="'+(y+12)+'" x2="'+(x+20)+'" y2="'+(y+12)+'" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x+6)+'" y1="'+(y+18)+'" x2="'+(x+20)+'" y2="'+(y+18)+'" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0" x1="'+(x+8)+'" y1="'+(y+6)+'" x2="'+(x+11)+'" y2="'+(y+11)+'" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0" x1="'+(x+18)+'" y1="'+(y+6)+'" x2="'+(x+15)+'" y2="'+(y+11)+'" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0" x1="'+(x+11)+'" y1="'+(y+18)+'" x2="'+(x+8)+'" y2="'+(y+23)+'" id="'+getID()+'"/>'+
	  	'<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0" x1="'+(x+15)+'" y1="'+(y+18)+'" x2="'+(x+18)+'" y2="'+(y+23)+'" id="'+getID()+'"/>';
}

/**
 * 灯控
 * @param x
 * @param y
 * @returns {String}
 */
function lightControl(x,y){
	return '<circle id="'+getID()+'" r="15" cy="'+(y)+'" cx="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="#000000"/>'+
	  	'<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x+22)+'" y1="'+(y)+'" x1="'+(x+17)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  	'<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x-17)+'" y1="'+(y)+'" x1="'+(x-22)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  	'<line id="'+getID()+'" y2="'+(y-17)+'" x2="'+(x)+'" y1="'+(y-22)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  	'<line id="'+getID()+'" y2="'+(y+22)+'" x2="'+(x)+'" y1="'+(y+17)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  	'<line stroke="#ffffff" id="'+getID()+'" y2="'+(y-11.48)+'" x2="'+(x-12.1)+'" y1="'+(y-19)+'" x1="'+(x-20.75)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>'+
	  	'<line id="'+getID()+'" stroke="#ffffff" y2="'+(y+19.13)+'" x2="'+(x+20.825)+'" y1="'+(y+11.6)+'" x1="'+(x+12.175)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>'+
	  	'<line id="'+getID()+'" y2="'+(y-19.5)+'" x2="'+(x+20.25)+'" y1="'+(y-11.25)+'" x1="'+(x+12)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  	'<line id="'+getID()+'" y2="'+(y+11.1)+'" x2="'+(x-12.2)+'" y1="'+(y+19.25)+'" x1="'+(x-20.4)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>';
}

/**
 * 上单箭头
 * @param x
 * @param y
 * @returns {String}
 */
function upJT(x,y){
	return '<line id="'+getID()+'" y2="'+(y+20)+'" x2="'+(x)+'" y1="'+(y)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  	'<line id="'+getID()+'" y2="'+(y+10)+'" x2="'+(x-5)+'" y1="'+(y)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  	'<line id="'+getID()+'" y2="'+(y+10)+'" x2="'+(x+5)+'" y1="'+(y)+'" x1="'+(x)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>';
}

/**
 * 右箭头
 * @param x
 * @param y
 * @returns {String}
 */
function rightJT(x,y){
	return '<line fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="'+(x-15)+'" y1="'+(y)+'" x2="'+(x)+'" y2="'+(y)+'" id="'+getID()+'"/>'+
	  	'<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x)+'" y1="'+(y-5)+'" x1="'+(x-5)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>'+
	  	'<line id="'+getID()+'" y2="'+(y)+'" x2="'+(x)+'" y1="'+(y+5)+'" x1="'+(x-5)+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#ffffff" fill="none"/>';
}

/**
 * 门禁-开
 * @returns {String}
 */
function dooropen(){
	return '<g stroke="null" id="'+getID()+'">'+
    '<line stroke="red" y2="56.62501" x2="85.23537" y1="56.62501" x1="60.06655" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" id="'+getID()+'"/>'+
    '<line stroke="red" y2="97.78362" x2="60.92369" y1="56.33929" x1="60.92369" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" id="'+getID()+'"/>'+
    '<line stroke="red" y2="98.05454" x2="84.92369" y1="55.76786" x1="84.92369" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" id="'+getID()+'"/>'+
    '<line stroke="red" y2="97.80358" x2="86.03733" y1="97.80358" x1="73.92369" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" id="'+getID()+'"/>'+
    '<line stroke="red" y2="105.66072" x2="72.63798" y1="97.16072" x1="59.88798" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" id="'+getID()+'"/>'+
    '<line stroke="red" y2="65.78572" x2="73.76298" y1="57.28572" x1="61.01298" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" id="'+getID()+'"/>'+
    '<line stroke="red" y2="106.41072" x2="73.13798" y1="64.16072" x1="72.88798" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" id="'+getID()+'"/>'+
    '<ellipse stroke="red" fill="none" stroke-width="2" cx="67.78083" cy="87.05357" rx="1.5" ry="3" id="'+getID()+'"/>'+
    '<text stroke="white" fill="red" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="-56.22884" y="111.31485" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(0.4166666567325592,0,0,0.5344444317287866,90.0630231618261,23.522222900390602) " id="'+getID()+'">开</text>'+
   '</g>';
}

/**
 * 门禁-关-绿
 * @returns {String}
 */
function doorcloseg(){
	return '<g stroke="null" id="'+getID()+'">'+
    '<rect stroke="Green" fill="none" stroke-width="2" x="60.96266" y="55.76786" width="24" height="41" id="'+getID()+'"/>'+
    '<ellipse stroke="Green" fill="none" stroke-width="2" cx="81.46288" cy="76.76786" id="'+getID()+'" rx="2.5" ry="3"/>'+
    '<text stroke="white" fill="Green" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="74.03548" y="83.36442" id="'+getID()+'" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(0.4031726994157906,0,0,0.5347947010209947,39.09694730766583,35.33974340462244) ">关</text>'+
   '</g>';
}

/**
 * 门禁-关
 * @returns {String}
 */
function doorclose(){
	return '<g id="'+getID()+'" stroke="null">'+
    '<rect id="'+getID()+'" stroke="#cccccc" fill="none" stroke-width="2" x="60.96266" y="55.76786" width="24" height="41"/>'+
    '<ellipse id="'+getID()+'" stroke="#cccccc" fill="none" stroke-width="2" cx="81.46288" cy="76.76786" rx="2.5" ry="3"/>'+
    '<text id="'+getID()+'" stroke="#cccccc" fill="#cccccc" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="-1258.10674" y="-359.32882" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(0.4031726994157906,0,0,0.5347947010209947,576.1803213311032,272.0897434046225) ">关</text>'+
   '</g>';
}

/**
 * 无线
 * @returns {String}
 */
function wifi(){
	return '<ellipse stroke="#ff0000" ry="3.09297" rx="8.37966" cy="83.34711" cx="80.98551" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" fill="none" id="'+getID()+'"/>'+
   '<rect stroke="#000000" height="4.60349" width="18.67879" y="82.26817" x="71.70672" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" fill="#000000" id="'+getID()+'"/>'+
   '<ellipse stroke="#ff0000" transform="matrix(0.914049489020618,0.01264953000779393,-0.012890190510488854,0.8969841392620753,3.061924612783433,7.512118800034074) " ry="3.36766" rx="7.24884" cy="86.65283" cx="86.47295" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" fill="none" id="'+getID()+'"/>'+
   '<rect stroke="#000000" height="4.60349" width="15.20966" y="85.32517" x="73.78972" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" fill="#000000" id="'+getID()+'"/>'+
   '<path d="m76.30138,88.99356c0,-1.5896 2.09622,-2.87717 4.68414,-2.87717c2.58786,0 4.68407,1.28757 4.68407,2.87717c0,1.5896 -2.09621,2.87717 -4.68407,2.87717c-2.58791,0 -4.68414,-1.28757 -4.68414,-2.87717z" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" stroke="#ff0000" fill="none" id="'+getID()+'"/>'+
   '<rect stroke="#000000" height="4.45963" width="12.94299" y="87.98656" x="75.32932" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" fill="#000000" id="'+getID()+'"/>'+
   '<g stroke="null" id="'+getID()+'">'+
    '<circle stroke="#ff0000" fill-opacity="0" r="1.97253" cy="90.51903" cx="80.98551" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#000000" id="'+getID()+'"/>'+
    '<line stroke="#ff0000" y2="92.1502" x2="79.27149" y1="88.82512" x1="82.9231" fill-opacity="0" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none" id="'+getID()+'"/>'+
   '</g>'+
   '<text stroke="#ff0000" transform="matrix(0.3153333454132081,0,0,0.17499999701976776,18.261187342464915,59.23242208897136) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" y="184.86523" x="172.48331" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill="#ff0000" id="'+getID()+'">NS</text>';
}

/**
 * 烟感-红
 * @returns {String}
 */
function yanganr(){
	return '<g stroke="null" id="'+getID()+'">'+
   '<ellipse stroke="red" ry="4.82209" rx="10.8513" cy="113.48365" cx="70.81359" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="red" id="'+getID()+'"/>'+
   '<rect stroke="#ff0000" height="8.3047" width="21.70259" y="114.01944" x="59.96229" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="red" id="'+getID()+'"/>'+
   '<ellipse stroke="#7f0000" ry="6.69734" rx="10.8513" cy="123.79756" cx="70.68286" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="red" id="'+getID()+'"/>'+
   '<ellipse stroke="#7f0000" ry="3.14775" rx="6.24276" cy="127.34715" cx="71.04238" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="red" id="'+getID()+'"/>'+
   '<rect stroke="#686868" transform="matrix(0.6635703112860131,-0.428603873878983,0.41833778092058177,0.6798544596722922,-65.70053954865496,81.12506927345913) " height="2.5" width="3.25" y="130.44761" x="110.68199" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#999999" id="'+getID()+'"/>'+
   '<rect stroke="#686868" height="2.81288" width="3.02006" y="119.95329" x="68.46683" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#999999" id="'+getID()+'"/>'+
   '<rect stroke="#686868" transform="matrix(0.6202685898629119,0.49199155792367516,-0.48020717757572895,0.6354901053299025,108.85164599078443,41.48400788685893) " height="2.5" width="3.25" y="103.37802" x="27.70565" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#999999" id="'+getID()+'"/>'+
  '</g>';
}

/**
 * 烟感-绿
 * @returns {String}
 */
function yangang(){
	return '<g stroke="null" id="'+getID()+'">'+
   '<ellipse stroke="#00ff00" ry="4.82209" rx="10.8513" id="'+getID()+'" cy="113.48365" cx="70.81359" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="#00ff00"/>'+
   '<rect stroke="#00ff00" id="'+getID()+'" height="8.3047" width="21.70259" y="114.01944" x="59.96229" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="#00ff00"/>'+
   '<ellipse stroke="#50ba50" id="'+getID()+'" ry="6.69734" rx="10.8513" cy="123.79756" cx="70.68286" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="#56ff56"/>'+
   '<ellipse stroke="#50ba50" id="'+getID()+'" ry="3.14775" rx="6.24276" cy="127.34715" cx="71.04238" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#56ff56"/>'+
   '<rect stroke="#686868" transform="matrix(0.6635703112860131,-0.428603873878983,0.41833778092058177,0.6798544596722922,-65.70053954865496,81.12506927345913) " id="'+getID()+'" height="2.5" width="3.25" y="130.44761" x="110.68199" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#999999"/>'+
   '<rect stroke="#686868" id="'+getID()+'" height="2.81288" width="3.02006" y="119.95329" x="68.46683" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#999999"/>'+
   '<rect stroke="#686868" transform="matrix(0.6202685898629119,0.49199155792367516,-0.48020717757572895,0.6354901053299025,108.85164599078443,41.48400788685893) " id="'+getID()+'" height="2.5" width="3.25" y="103.378" x="27.70567" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#999999"/>'+
  '</g>';
}

/**
 * 烟感-灰
 * @returns {String}
 */
function yanganh(){
	return '<g stroke="null" id="'+getID()+'">'+
   '<ellipse stroke="#cccccc" ry="4.82209" rx="10.8513" cy="113.48365" cx="70.81359" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="#cccccc" id="'+getID()+'"/>'+
   '<rect stroke="#cccccc" height="8.3047" width="21.70259" y="114.01944" x="59.96229" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="#cccccc" id="'+getID()+'"/>'+
   '<ellipse stroke="#7f7f7f" ry="6.69734" rx="10.8513" cy="123.79756" cx="70.68286" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="#cccccc" id="'+getID()+'"/>'+
   '<ellipse stroke="#7f7f7f" ry="3.14775" rx="6.24276" cy="127.34715" cx="71.04238" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#cccccc" id="'+getID()+'"/>'+
   '<rect stroke="#666666" transform="matrix(0.6635703112860131,-0.428603873878983,0.41833778092058177,0.6798544596722922,-65.70053954865496,81.12506927345913) " height="2.5" width="3.25" y="130.44762" x="110.682" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#9e9e9e" id="'+getID()+'"/>'+
   '<rect stroke="#666666" height="2.81288" width="3.02006" y="119.95329" x="68.46683" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#9e9e9e" id="'+getID()+'"/>'+
   '<rect stroke="#666666" transform="matrix(0.6202685898629119,0.49199155792367516,-0.48020717757572895,0.6354901053299025,108.85164599078443,41.48400788685893) " height="2.5" width="3.25" y="103.37803" x="27.70566" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#9e9e9e" id="'+getID()+'"/>'+
  '</g>';
}

/**
 * 灯控
 * @returns {String}
 */
function dengkong(){
	return '<g id="'+getID()+'" stroke="null">'+
   '<ellipse ry="10" rx="10" id="'+getID()+'" cy="67.89286" cx="74.5952" stroke-width="2" fill="none" stroke="#56ff56"/>'+
   '<line id="'+getID()+'" y2="61.14286" x2="67.96429" y1="52.28571" x1="62.25" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" stroke="#00ff00"/>'+
   '<line id="'+getID()+'" y2="57.71429" x2="76.03571" y1="47.71429" x1="76.03571" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" stroke="#00ff00"/>'+
   '<line id="'+getID()+'" y2="54" x2="89.75" y1="61.14286" x1="83.17857" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" stroke="#00ff00"/>'+
   '<line id="'+getID()+'" y2="67.42857" x2="95.21745" y1="67.42857" x1="85.75" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" stroke="#00ff00"/>'+
   '<line id="'+getID()+'" y2="67.71429" x2="53.16314" y1="67.71429" x1="63.75" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" stroke="#00ff00"/>'+
   '<line id="'+getID()+'" y2="81.14286" x2="58.03571" y1="72.57143" x1="65.75" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" stroke="#00ff00"/>'+
   '<line id="'+getID()+'" y2="80.85714" x2="91.75" y1="73.71429" x1="84.03571" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" stroke="#00ff00"/>'+
   '<line id="'+getID()+'" y2="88" x2="74.89286" y1="77.71429" x1="74.32143" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" stroke="#00ff00"/>'+
  '</g>'
}

/**
 * 远方接地
 * @returns {String}
 */
function yuanfangjiedi(){
	return '<g id="'+getID()+'" stroke="null">'+
    '<ellipse id="'+getID()+'" stroke="#e5e5e5" ry="6.32778" rx="5.33333" cy="46.59999" cx="65.0762" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#00ff00"/>'+
    '<line id="'+getID()+'" stroke="#e5e5e5" y2="44.87053" x2="69.75626" y1="44.87053" x1="60.40954" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>'+
    '<line id="'+getID()+'" stroke="#e5e5e5" y2="48.93984" x2="69.75626" y1="48.93984" x1="60.40955" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>'+
    '<rect id="'+getID()+'" stroke="#c9c1c1" height="3.32327" width="12.08889" y="45.28085" x="58.89843" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill="#000000"/>'+
    '<circle id="'+getID()+'" stroke="#ffffff" r="1.66471" cy="46.9765" cx="68.32874" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill="#ff0026"/>'+
   '</g>'+
   '<g id="'+getID()+'" stroke="null" transform="rotate(-90 64.94299316406251,46.60000610351563) ">'+
    '<ellipse id="'+getID()+'" stroke="#e5e5e5" ry="6.32778" rx="5.33333" cy="46.6" cx="65.07618" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#00ff00"/>'+
    '<line id="'+getID()+'" stroke="#e5e5e5" y2="44.87054" x2="69.75624" y1="44.87054" x1="60.40952" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>'+
    '<line id="'+getID()+'" stroke="#e5e5e5" y2="48.93985" x2="69.75624" y1="48.93985" x1="60.40953" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>'+
    '<rect id="'+getID()+'" stroke="#c9c1c1" height="3.32327" width="12.08889" y="45.28086" x="58.89841" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill="#000000"/>'+
    '<circle id="'+getID()+'" stroke="#ffffff" r="1.66471" cy="46.9765" cx="68.32872" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill="#ff0026"/>'+
   '</g>';
}

/**
 * 两段线+ X
 * @returns {String}
 */
function lineX(){
	return '<line stroke="#ffffff" id="'+getID()+'" y2="70.66029" x2="64.5" y1="65.16029" x1="71.5" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>'+
   '<line stroke="#ffffff" id="'+getID()+'" y2="71.16029" x2="71.25" y1="64.91029" x1="64.5" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>'+
   '<line stroke="#ffffff" y2="110.77777" x2="68.4" y1="93.77777" x1="68.4" stroke-width="2" fill="none" id="'+getID()+'"/>'+
   '<line stroke="#ffffff" y2="67" x2="67.99997" y1="50" x1="67.99997" stroke-width="2" fill="none" id="'+getID()+'"/>';
}

/**
 * 斜线
 * @returns {String}
 */
function lineI(){
	return '<line stroke="#ffffff" id="'+getID()+'" y2="69.25" x2="55.50002" y1="94.25" x1="68.50002" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>';
}

/**
 * 开关
 * @returns {String}
 */
function lineOO(){
	return '<circle fill="#000000" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" cx="50" cy="25" r="2" id="'+getID()+'"/>'+
   '<circle fill="#000000" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" cx="50" cy="50" r="2" id="'+getID()+'"/>'+
   '<line id="'+getID()+'" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="50" y1="52" x2="50" y2="67"/>'+
   '<line id="'+getID()+'" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="50" y1="8" x2="50" y2="23"/>';
}

/**
 * 矩形
 * @returns {String}
 */
function rect(){
	return '<rect height="20" width="10" y="50" x="50" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none" id="'+getID()+'" stroke="#22b24c"/>';
}

/**
 * 变压器
 */
function EeBianYaQi(){
//	return '<image xlink:href="/des/pages/despages/common/images/ee/ee1.png" x="50" y="50" height="256" width="256" id="'+getID()+'"/>';
	return '<image x="97" y="16" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee1.png"/>';
}
/**
 * 电机
 * @returns {String}
 */
function EeDianJi(){
	return '<image x="444" y="16" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee2.png"/>';
}
/**
 * 烘干机
 * @returns {String}
 */
function EeHongganji(){
	return '<image x="826" y="16" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee6.png"/>';
}
/**
 * 机床
 * @returns {String}
 */
function EeJichuang(){
	return '<image x="97" y="268" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee3.png"/>';
}
/**
 * 空调
 * @returns {String}
 */
//function EeKongtiao(){
//	return '<image x="444" y="268" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee5.png"/>';
//}
/**
 * 水泵
 * @returns {String}
 */
function EeShuibeng(){
	return '<image x="826" y="268" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee4.png"/>';
}
/**
 * 照明
 * @returns {String}
 */
function EeZhaoming(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee7.png"/>';
}
/**
 * 锅炉
 * @returns {String}
 */
function EeGuolu(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee8.png"/>';
}
/**
 * 风机
 * @returns {String}
 */
function EeFengji(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee9.png"/>';
}
/**
 * 动力柜
 * @returns {String}
 */
function EeDongligui(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee10.png"/>';
}
/**
 * 办公楼
 * @returns {String}
 */
function EeBangonglou(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee11.png"/>';
}
/**
 * 消防设备
 * @returns {String}
 */
function EeXiaofangshebei(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee12.png"/>';
}
/**
 * 冷却塔
 * @returns {String}
 */
function EeLenqueta(){
	 return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee13.png"/>';
 }
/**
 * 中央空调主机
 * @returns {String}
 */
function EeZhongyangkongtiao(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee14.png"/>';
}
/**
 * 分水器
 * @returns {String}
 */
function EeFenshuiqi(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee15.png"/>';
}
/**
 * 空气处理机
 * @returns {String}
 */
function EeKongqichuliji(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee16.png"/>';
}
/**
 * 风机盘管
 * @returns {String}
 */
function EeFenjipanguan(){
	 return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee17.png"/>';
 }
/**
 * 壁挂式
 * @returns {String}
 */
function EeBiguashi(){
	 return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee5.png"/>';
 }
/**
 * 立柜
 * @returns {String}
 */
function EeLigui(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee18.png"/>';
}
/**
 * 中央末端设备
 * @returns {String}
 */
function EeZhongyangmoduanshebei(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee19.png"/>';
}
/**
 * 太阳能电池板
 * @returns {String}
 */
function EeTaiyangnengdianchiban(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee20.png"/>';
}
/**
 * 控制器
 * @returns {String}
 */
function EeKongzhiqi(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee21.png"/>';
}
/**
 * 逆变器
 * @returns {String}
 */
function EeNibianqi(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee22.png"/>';
}
/**
 * 蓄电池
 * @returns {String}
 */
function EeXudianchi(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee23.png"/>';
}
/**
 * 楼宇
 * @returns {String}
 */
function EeLouyu(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee24.png"/>';
}
/**
 * 水表
 * @returns {String}
 */
function EeShuibiao(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee25.png"/>';
}
/**
 * 逆变器
 * @returns {String}
 */
function EeLibianqi(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee26.png"/>';
}
/**
 * 汇流箱
 */
function EeHuiliuxiang(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee27.png"/>';
}
/**
 * 电磁锅炉
 * @returns {String}
 */
function EeDianciGuolu(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee28.png"/>';
}
/**
 * 蒸汽锅炉
 * @returns {String}
 */
function EeZhengqiGuolu(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee29.png"/>';
}
/**
 * 各种水泵
 * @returns {String}
 */
function EeGezhongShuiben(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee30.png"/>';
}
/**
 * 蓄热
 * @returns {String}
 */
function EeXure(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee31.png"/>';
}
/**
 * 软水
 * @returns {String}
 */
function EeRuanshui(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee32.png"/>';
}
/**
 * 水处理
 * @returns {String}
 */
function EeShuichuli(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee33.png"/>';
}
/**
 * 水表
 * @returns {String}
 */
function EeQiShuibiao(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee34.png"/>';
}
/**
 * 对流阀
 * @returns {String}
 */
function EeDuiLiuFa(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee35.png"/>';
}
/**
 * 对流阀和阀门
 * @returns {String}
 */
function EeDuiLiuFaMen(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee36.png"/>';
}
/**
 * 蒸汽表
 * @returns {String}
 */
function EeZhengQi(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee37.png"/>';
}
/**
 * 燃气表
 * @returns {String}
 */
function EeRanQi(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee38.png"/>';
}
/**
 * 厂房
 * @returns {String}
 */
function EeChangFang(){
	return '<image x="97" y="460" width="256" height="256" id="'+getID()+'" xlink:href="/des/pages/despages/common/images/ee/ee39.png"/>';
}

/**
 * 水禁
 * @returns {String}
 */
function EeShuijin(){
	return'<path fill="#00ff00" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" d="m105.59287,128.06821c-3.86547,-1.45357 -6.63611,-6.07223 -6.00645,-10.01278c0.39704,-2.48482 8.77362,-17.5694 9.50516,-17.11696c0.23877,0.14767 2.36348,3.66453 4.72157,7.81521c3.77744,6.64899 4.28747,7.88881 4.28747,10.42248c0,5.13563 -4.10708,9.3423 -9.03848,9.25765c-1.43905,-0.02471 -3.00022,-0.18923 -3.46927,-0.3656l0,0zm3.87276,-2.58304c0.12795,-0.66488 -0.17093,-0.98914 -0.91173,-0.98914c-1.68837,0 -4.0304,-2.13995 -4.55365,-4.16073c-0.55816,-2.15562 -2.0381,-2.41198 -2.2567,-0.39092c-0.42116,3.89387 7.01256,9.22775 7.72208,5.54079l0,0l0,-0.00001l0,0.00001z" id="'+getID()+'" stroke="#ffffff"/>'
}
/**
 * 生成ID
 * @returns {String}
 */
function getID(){
	//var date = new Date();
	//var num = Math.floor(Math.random()*10000);
	//return num+""+date.getTime().toString().substring(4);
	var array = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var length = array.length;
	var id='';
	for(var i = 0; i < 5 ; i++){
		var num = Math.floor(Math.random()*length);
		id+=array[num];
	}
	return id;
}


$(function(){
	//获取id="tools_tubiao"的坐标，并将其坐标处理后，设置id="tools_tubiao_detail"的坐标
	var tubiao = document.getElementById("tools_tubiao");
	var left = tubiao.getBoundingClientRect().left+30;
	var top = tubiao.getBoundingClientRect().top;
	var tubiao_detail = document.getElementById("tools_tubiao_detail");
	tubiao_detail.style.position = "absolute";
	tubiao_detail.style.left = left+"px";
	tubiao_detail.style.top = top+"px";
	
	//设置自定义详细图标弹出框
	$("#tools_tubiao").click(function(){
		var state = $("#tools_tubiao_detail").css("display");
		//$(".tool_button_current").attr("class","tool_button");
		if(state=="none"){
			$("#tools_tubiao_detail").css("display","block");
			//$("#tools_tubiao").attr("class","tool_button_current");
		}else{
			$("#tools_tubiao_detail").css("display","none");
		}
	});
	
	//自定义详细图标  点击事件
	$(".my_tool_button").click(function(){
	//	var state = $(this).html();
	//	state += '<div class="flyout_arrow_horiz"><img class="svg_icon" src="svgEdit/images/flyouth.png" width="5" height="5" alt="icon"></div>';
	//	$("#tools_tubiao").html(state);
	//	$("#tools_tubiao_detail").css("display","none");

		var x = 50;
		var y = 50;
		var id = $(this).attr("id");	//获取id
		var code = '';	//存放图像的svg代码
		switch(id){
		case 'tool_dianzu':  //电阻
			code=dianzu(x,y);
			break;
		case 'tool_onoff':   //开关
			code=on_off(x,y);
			break;
		case 'tool_bianyaqi':   //变压器
			code=sjInCircle(x,y)+sanInCircle(x,y+22);
			break;
		case 'tool_xinhaodeng':   //信号灯
			code=light(x,y);
			break;
		case 'tool_dianrong':   //电容
			code=dianrong(x,y);
			break;
		case 'tool_jiedi':   //接地
			code=jiedi(x,y);
			break;
		case 'tool_upJT':   //上单箭头
			code=upJT(x,y);
			break;
		case 'tool_up2JT':   //上双箭头
			code=up2JT(x,y);
			break;
		case 'tool_downJT':   //下单箭头
			code=downJT(x,y);
			break;
		case 'tool_down2JT':   //下双箭头
			code=down2JT(x,y);
			break;
		case 'tool_JTinRect':   //矩形里下箭头
			code=JTinRect(x,y);
			break;
		case 'tool_rightJT':   //右箭头
			code=rightJT(x,y);
			break;
		case 'tool_VInCircle':   //圆里V
			code=VInCircle(x,y);
			break;
		case 'tool_3VInCircle':   //三个圆里V
			code=VInCircle(x,y)+VInCircle(x-9,y+15)+VInCircle(x+9,y+15);
			break;
		case 'tool_dianrongzu':   //电容组
			code=dianrongzu(x,y);
			break;
		case 'tool_A':   //上双箭头+电阻+下双箭头
			code=up2JT(x,y)+dianzu(x,y+20)+down2JT(x,y+60);
			break;
		case 'tool_B':   //开关+电阻+6个串烧+接地
			code=on_off(x,y)+dianzu(x,y+10)+chuanshao6(x,y+60)+jiedi(x,y+85);
			break;
		case 'tool_C':   //开关+接地
			code=on_off(x,y)+jiedi(x,y+17);
			break;
		case 'tool_D':   //矩形里下箭头+接地
			code=JTinRect(x,y)+jiedi(x,y+40);
			break;
		case 'tool_E':   //电容+信号灯+接地
			code=dianrong(x,y)+light(x,y+22)+jiedi(x,y+50);
			break;
		case 'tool_F':   //套餐1 1.矩形下箭头+接地 2.电容+灯泡+接地 3.开关+接地
			code=taocan1(x,y);
			break;
		case 'tool_door':   //门禁-开
			code=dooropen()+doorcloseg()+doorclose();
			break;
		case 'tool_yangan':   //烟感-红
			code=yanganh()+yangang()+yanganr();
			break;
		case 'tool_wifi':   //无线
			code=wifi();
			break;
		case 'tool_dengkong':   //灯控
			code=dengkong();
			break;
		case 'tool_lineOO':   //开关
			code=lineOO();
			break;
		case 'tool_lineX':   //两段线+ X
			code=lineX();
			break;
		case 'tool_lineI':   //斜线
			code=lineI();
			break;
		case 'tool_yuanfangjiedi':   //远方接地
			code=yuanfangjiedi();
			break;
		case 'selftool_rect':   //矩形
			code=rect();
			break;
		case 'tool_ee_bianyaqi': //变压器
			code = EeBianYaQi();
			break;
		case 'tool_ee_dianji': //变压器
			code = EeDianJi();
			break;
		case 'tool_ee_hongganji': //变压器
			code = EeHongganji();
			break;
		case 'tool_ee_jichuang': //变压器
			code = EeJichuang();
			break;
//		case 'tool_ee_kongtiao': //变压器
//			code = EeKongtiao();
//			break;
		case 'tool_ee_shuibeng': //变压器
			code = EeShuibeng();
			break;
		case 'tool_ee_zhaoming': //变压器
			code = EeZhaoming();
			break;
		case 'tool_ee_guolu': //锅炉
			code = EeGuolu();
			break;				
		case 'tool_ee_fengji': //风机
			code = EeFengji();
			break;
		case 'tool_ee_dongligui': //动力柜
			code = EeDongligui();
			break;
		case 'tool_ee_bangonglou': //办公楼
			code = EeBangonglou();
			break;
		case 'tool_ee_xiaofangsheshi': //消防设备
			code = EeXiaofangshebei();
			break;
		case 'tool_ee_lenqueta': //冷却塔
			code = EeLenqueta();
			break;
		case 'tool_ee_zhongyangkongtiao': //中央空调
			code = EeZhongyangkongtiao();
			break;
		case 'tool_ee_fenshuiqi': //分水器
			code = EeFenshuiqi();
			break;
		case 'tool_ee_kongqichuliji': //空气处理机
			code = EeKongqichuliji();
			break;
		case 'tool_ee_fengjipanguan': //风机盘管
			code = EeFenjipanguan();
			break;
		case 'tool_ee_biguashi': //壁挂式
			code = EeBiguashi();
			break;
		case 'tool_ee_ligui': //立柜
			code = EeLigui();
			break;
		case 'tool_ee_zhongyangmoduanshebei': //中央末端设备
			code = EeZhongyangmoduanshebei();
			break;
		case 'tool_ee_taiyangnengdianchiban': //太阳能电池板
			code = EeTaiyangnengdianchiban();
			break;
		case 'tool_ee_kongzhiqi': //控制器
			code = EeKongzhiqi();
			break;
		case 'tool_ee_nibianqi': //逆变器
			code = EeNibianqi();
			break;
		case 'tool_ee_xudianchi': //蓄电池
			code = EeXudianchi();
			break;
		case 'tool_ee_louyu': //楼宇
			code = EeLouyu();
			break;
		case 'tool_ee_shuibiao': //水表
			code = EeShuibiao();
			break;
		case 'tool_ee_libianqi': //逆变器
			code = EeLibianqi();
			break;
		case 'tool_ee_huiliuxiang': //汇流箱
			code = EeHuiliuxiang();
			break;
		case 'tool_ee_dianciGuolu': //电磁锅炉
			code = EeDianciGuolu();
			break;
		case 'tool_ee_zhengqiGuolu': //蒸汽锅炉
			code = EeZhengqiGuolu();
			break;
		case 'tool_ee_gezhongShuiben': //各种水泵
			code = EeGezhongShuiben();
			break;
		case 'tool_ee_xure': //蓄热水箱
			code = EeXure();
			break;
		case 'tool_ee_ruanshui': //软水水箱
			code = EeRuanshui();
			break;
		case 'tool_ee_shuichuli': //水处理装置
			code = EeShuichuli();
			break;	
		case 'tool_ee_qiShuibiao': //水表
			code = EeQiShuibiao();
			break;	
		case 'tool_ee_duiLiuFa': //对流阀
			code = EeDuiLiuFa();
			break;	
		case 'tool_ee_duiLiuFaMen': //对流阀和阀门
			code = EeDuiLiuFaMen();
			break;	
		case 'tool_ee_zhengQi': //蒸汽表
			code = EeZhengQi();
			break;	
		case 'tool_ee_ranQi': //燃气表
			code = EeRanQi();
			break;	
		case 'tool_ee_changFang': //厂房
			code = EeChangFang();
			break;	
		case 'tool_shuijin': //水浸
			code = EeShuijin();
			break;
		}
		
		var tubiao = '';
		if(id=='tool_door'||id=='tool_yangan'||id=='tool_yuanfangjiedi'||id=='tool_lineI'||id=='selftool_rect' ||id=='tool_ee_bianyaqi' ||id=='tool_ee_dianji' ||id=='tool_ee_hongganji' ||id=='tool_ee_jichuang' ||id=='tool_ee_shuibeng' ||id=='tool_ee_zhaoming'
			||id=='tool_ee_guolu'||id=='tool_ee_fengji'||id=='tool_ee_dongligui'||id=='tool_ee_bangonglou'||id=='tool_ee_xiaofangsheshi'||id=='tool_ee_lenqueta'||id=='tool_ee_zhongyangkongtiao'||id=='tool_ee_fenshuiqi'||id=='tool_ee_kongqichuliji'
			||id=='tool_ee_fengjipanguan'||id=='tool_ee_biguashi'||id=='tool_ee_ligui'||id=='tool_ee_zhongyangmoduanshebei'||id=='tool_ee_taiyangnengdianchiban'||id=='tool_ee_kongzhiqi'||id=='tool_ee_nibianqi'|| id=='tool_ee_xudianchi' || id=="tool_ee_louyu" 
			||id=="tool_ee_shuibiao" ||id=="tool_ee_libianqi" ||id=="tool_ee_huiliuxiang" ||id=="tool_ee_dianciGuolu" ||id=="tool_ee_zhengqiGuolu" ||id=="tool_ee_gezhongShuiben" ||id=="tool_ee_xure" ||id=="tool_ee_ruanshui" ||id=="tool_ee_shuichuli"
			||id=="tool_ee_qiShuibiao" ||id=="tool_ee_duiLiuFa" ||id=="tool_ee_duiLiuFaMen" ||id=="tool_ee_zhengQi" ||id=="tool_ee_ranQi" ||id=="tool_ee_changFang" ||id=="tool_shuijin"){
			tubiao = code;
		}else{
			tubiao = '<g id="g'+getID()+'">'+code+'</g>';
		}
		draw_tubiao(tubiao);
		
	});
});

/**
 * 将svg的标签画出
 */
function draw_tubiao(str) {
    var string = svgCanvas.getSvgString(str);
    if(string.indexOf("<defs>") != -1 && string.indexOf("<defs>") == 382){
    	string = '<svg width="1400" height="800" xmlns="http://www.w3.org/2000/svg" id="svg_Main" version="1.1" viewBox="0 0 1400 800" xmlns:xlink="http://www.w3.org/1999/xlink">\n'
    		+ '<!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->\n'
    		+ '<g>\n'
    		+  '<title>Layer 1</title>\n'
    		+'<image xlink:href="/des/pages/despages/svgEdit/svgEdit/images/logo.png" id="svg_4" height="48" width="48" y="217.41666" x="147.33331" class="hidden"/>'
    		+ '</g>\n'
    		+ '</svg>';
    }	
	var pos = string.lastIndexOf("</g>");
	var before = string.substr(0,pos);
	var after = string.substr(pos);
    string = before + str + after;
    svgCanvas.setSvgString(string);
    $("#svgcontent").bind("click",click);
};

