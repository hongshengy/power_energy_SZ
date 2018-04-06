/*
* 初始化Config
*/
function initConf()
{
 	require.config({
	        paths: {
	            echarts: './echarts/js'
	        }
	    });
    require(
        [
			'echarts'	
        ]);
}

/**
 * 实例化一般echarts 包括线图和柱状图
 * @param option echart的相关属性设置
 * @param id echart创建的目标区域
 */
function initComchart(option,id)
{
	  require.config({
	        paths: {
	            echarts: '../echarts/js'
	        }
	    });
	    require(
	        [
	            'echarts',
	            'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	            'echarts/chart/bar',
	            'echarts/chart/aueicTheme'
	        ],
	        function (ec) {
	        	var theme  = require('echarts/chart/aueicTheme');
	            var myChart = ec.init(document.getElementById(id),theme);
	            myChart.setOption(option);
	        }
	        );
}

/**
 * 实例化一般echarts 包括线图和柱状图
 * @param option echart的相关属性设置
 * @param id echart创建的目标区域
 */
function initComchart2(option,id)
{
	    require(
	        [
				'echarts',
				'echarts/chart/line',
				'echarts/chart/bar',
				'echarts/chart/k',
				'echarts/chart/pie',
				'echarts/chart/map',
	            'echarts/chart/aueicTheme'
	        ],
	        function (ec) {
	        	var theme  = require('echarts/chart/aueicTheme');
	            var myChart = ec.init(document.getElementById(id),theme);
	            myChart.setOption(option);
	        }
	        );
}

/*
* 判断是不是IE6或者IE7
*
*/
function isIE6Or7()
{
	var b_name = navigator.appName;
	if(b_name == 'Microsoft Internet Explorer')
	{
		var b_version = navigator.appVersion;
		var version = b_version.split(';');
		var trim_verison = version[1].replace(/\W/,'');
		/**IE6或者IE7*/
		if(trim_verison =='MSIE 7.0' || trim_verison =='MSIE 6.0')
		{
			return true;
		}
		return false;
	}
	return false;
}

/**
 * 初始化不同的echart
 * @param req 注册所需要的模块require['echarts','echarts/chart/line', 'echarts/chart/bar','echarts/chart/aueicTheme']
 * @param option echart的相关属性设置
 * @param id echart创建的目标区域
 * @param theme 主体名称,默认是aueicTheme主体
 */
function initEchart(req,option,id,theme)
{
	  //添加自定义的主题元素
	  req.push('echarts');
	  req.push('echarts/chart/aueicTheme');
	    require(req,
	        function (ec) {
			     if(theme == null || '' == theme)
			  	  {
			  		  theme = require('echarts/chart/aueicTheme');
			  	  }
	        	 myChart = ec.init(document.getElementById(id),theme);
	             myChart.setOption(option);
	        }
	        );
}


/**
 * 初始化不同的echart
 * @param req 注册所需要的模块require['echarts','echarts/chart/line', 'echarts/chart/bar','echarts/chart/aueicTheme']
 * @param option echart的相关属性设置
 * @param id echart创建的目标区域
 * @param theme 主体名称,默认是aueicTheme主体
 */
function createComOption(title)
{
	 var option = {
	   		 title : {
	   		        text: title
	   		  },
	   		 tooltip: {
	   			 trigger: 'axis',
	                show: true
	            },
	            toolbox: {
	                show : true,
	                feature : {
	                    mark : {show: true},
	                    dataView : {show: true, readOnly: false},
	                    magicType : {show: true, type: ['line', 'bar','stack','tiled']},
	                    restore : {show: true},
	                    saveAsImage : {show: true}
	                }
	            }
	   };
	 return option;
}


/**
 * @param value 传入的目标值
 * @param maxlength 最大长度
 * @param interval 间隔最小1
**/
function intervalxAxis(value,maxlength,interval)
{
  if(interval<=0) interval = 1;
  var last = parseInt((maxlength-1)/interval)*interval;
  if(value%interval == 0){
  	if(value == maxlength-1)
  		{ 
  		return true;}
    else if(last != maxlength-1 && value == last){
    	
  		return false;
  	}
  	else{
  		return true;
  	}
  }
  if(value == maxlength-1)
  		{ return true;}
  return false;
}



