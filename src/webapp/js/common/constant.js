/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: js常量定义，如公用的按钮名称等</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司 </p>
 */
Ext.namespace("gdc.constant");
//系统级js常量区域
/**
 * 是否为Window.open打开功能模式，这只用于开发模式，利于Firefox调试
 * (脚本调式中只显示本页面的脚本，若在统一框架中，统一框架的js也在其中，不利于调试)。
 * @type {Number}
 */
gdc.constant.winOpenMode=0;
/**
 * 购电侧系统的Grid是否需要StripeRow，奇偶行颜色不同
 * @type boolean
 */
gdc.constant.gridNeedStripe=true;
/**
 * 分页常量
 * @type {Number}
 */
gdc.constant.pageSize = 30;
/**
 * 用于小页面
 * @type Number
 */
gdc.constant.shortPageSize = 15;
/**
 * SmallInt最大值
 * @type {Number}
 */
gdc.constant.maxSmallInt = 32767;
/**
 * Int最大值
 * @type {Number}
 */
gdc.constant.maxInt = 2147483647;
/**
 * 默认模式名
 * @type {String}
 */
gdc.constant.DFT_SCHEMA = "USERID";
/**
 * 日期格式:Y-m-d
 * @type {String}
 */
gdc.constant.dataFormateYMD="Y-m-d";
/**
 * 日期格式:Y-m-d H:i
 * @type {String}
 */
gdc.constant.dataFormateYMDHI="Y-m-d H:i";
/**
 * 日期格式:Y-m-d H:i:s
 * @type {String}
 */
gdc.constant.dataFormateYMDHIS="Y-m-d H:i:s";

/**
 * 统一框架登录地址
 * @type String
 */
gdc.constant.SSOURL = "http://appframe-test.jsepc.com.cn:8080/appframe-web/login.jsp"


//树图Title常量区
/**
 * 单位树
 * @type String
 */
gdc.constant.treeTitle_CORP="单位树";
/**
 * 组织树
 * @type String
 */
gdc.constant.treeTitle_ORG="组织树";
/**
 * 人员树
 * @type String
 */
gdc.constant.treeTitle_USER="人员树";
/**
 * 变电站树
 * @type String
 */
gdc.constant.treeTitle_BDZ="变电站树";
/**
 * 线路树
 * @type String
 */
gdc.constant.treeTitle_XL="线路树";
/**
 * 单元树
 * @type String
 */
gdc.constant.treeTitle_DY="单元树";
/**
 * 设备树
 * @type String
 */
gdc.constant.treeTitle_SB="设备树";
/**
 * 地区树
 * @type String
 */
gdc.constant.treeTitle_DQ="地区树";
/**
 * 验收规范树
 * @type String
 */
gdc.constant.treeTitle_YSGF="验收规范树";
/**
 * 设备类型树
 * @type String
 */
gdc.constant.treeTitle_SBLX="设备类型树";
/**
* 巡视内容树
* @type String
*/
gdc.constant.treeTitle_XSNR="巡视内容树"; 
//下面是按钮的文本定义区域，变量模式为：***BtnText
/**
 * 新增按钮文本
 * @type {String}
 */
gdc.constant.addBtnText="新增";
/**
 * 编辑按钮文本
 * @type {String}
 */
gdc.constant.editBtnText="编辑";
/**
 * 删除按钮文本
 * @type {String}
 */
gdc.constant.delBtnText="删除";
/**
 * 查看按钮文本
 * @type {String}
 */
gdc.constant.viewBtnText="查看";
/**
 * 附件按钮文本
 * @type {String}
 */
gdc.constant.accBtnText="附件";
/**
 * 刷新按钮文本
 * @type {String}
 */
gdc.constant.refreshBtnText="刷新";
/**
 * 查询按钮文本
 * @type {String}
 */
gdc.constant.queryBtnText="查询";
/**
 * 保存按钮文本
 * @type {String}
 */
gdc.constant.saveBtnText="保存";
/**
 * 保存并提交按钮文本
 * @type {String}
 */
gdc.constant.saveAndSubmitBtnText="保存并提交";
/**
 * 保存并继续按钮文本
 * @type {String}
 */
gdc.constant.saveGoOnBtnText="保存并继续";
/**
 * 确定按钮文本
 * @type {String}
 */
gdc.constant.yesBtnText="确定";
/**
 * 关闭按钮文本(主页面不要有此按钮，弹出框才有可能需要)
 * @type {String}
 */
gdc.constant.closeBtnText="关闭";
/**
 * 拷贝按钮文本
 * @type {String}
 */
gdc.constant.copyBtnText="拷贝";
/**
 * 剪切按钮文本
 * @type {String}
 */
gdc.constant.cutBtnText="剪切";
/**
 * 粘贴按钮文本
 * @type {String}
 */
gdc.constant.pasteBtnText="粘贴";
/**
 * 打印按钮文本
 * @type {String}
 */
gdc.constant.printBtnText="打印";
/**
 * 导出按钮文本
 * @type {String}
 */
gdc.constant.exportBtnText="导出";
/**
 * 导入按钮文本
 * @type {String}
 */
gdc.constant.importBtnText="导入";
/**
 * 排序按钮文本
 * @type {String}
 */
gdc.constant.sortBtnText="排序";
/**
 * 清空按钮文本
 * @type {String}
 */
gdc.constant.clearTextBtnText="清空";
/**
 * 作废按钮文本
 * @type {String}
 */
gdc.constant.cancelBtnText="作废";
/**
 * 新任务按钮文本
 * @type {String}
 */
gdc.constant.newTaskBtnText="新任务";
/**
 * 处理按钮文本
 * @type {String}
 */
gdc.constant.handleBtnText="处理";
/**
 * 接收按钮文本
 * @type {String}
 */
gdc.constant.receiveBtnText="接收";
/**
 * 提交按钮文本
 * @type {String}
 */
gdc.constant.submitBtnText="提交";
/**
 * 审批按钮文本
 * @type {String}
 */
gdc.constant.checkBtnText="审批";
/**
 * 通过按钮文本
 * @type {String}
 */
gdc.constant.passBtnText="通过";
/**
 * 驳回按钮文本
 * @type {String}
 */
gdc.constant.rejectBtnText="驳回";
/**
 * 统计按钮文本
 * @type {String}
 */
gdc.constant.statBtnText="统计";
/**
 * 统计分析按钮文本
 * @type {String}
 */
gdc.constant.statAnalyseBtnText="统计分析";
/**
 * 综合查询
 * @type String
 */
gdc.constant.colligateQueryBtnText="综合查询";
/**
 * 汇总按钮文本
 * @type {String}
 */
gdc.constant.gatherBtnText="汇总";
/**
 * 合并按钮文本
 * @type {String}
 */
gdc.constant.joinBtnText="合并";
/**
 * 拆分按钮文本
 * @type {String}
 */
gdc.constant.divideBtnText="拆分";
/**
 * 交换按钮文本
 * @type {String}
 */
gdc.constant.switchBtnText="交换";
/**
 * 清空
 * @type{string}
 */
gdc.constant.clearBtnText = "清空"
/**
 * 超期按钮文本
 * @type {String}
 */
gdc.constant.outDateBtnText="超期";
/**
 * 初始化按钮文本
 * @type {String}
 */
gdc.constant.initBtnText="初始化";
/**
 * 批量操作按钮文本
 * @type {String}
 */
gdc.constant.plczBtnText="批量操作";
/**
 * 自动生成按钮文本
 * @type {String}
 */
gdc.constant.autoCreateBtnText = "自动生成";
/**
 * 最近数据按钮文本
 * @type {String}
 */
gdc.constant.latestBtnText="最近数据";
/**
 * 填报按钮文本
 * @type {String}
 */
gdc.constant.addInBtnText="填报";
/**
 * 转入缺陷按钮文本
 * @type {String}
 */
gdc.constant.intoBugBtnText="转入缺陷";
/**
 * 投运文本
 * @type {String}
 */
gdc.constant.linePloughBtnText="投运";
/**
 * 转入资产文本
 * @type {String}
 */
gdc.constant.assetIncomeBtnText="转入资产";
/**
 * 计算文本
 * @type {String}
 */
gdc.constant.calcBtnText="计算";
/**
 * 重置文本
 * @type {String}
 */
gdc.constant.resetBtnText="重置";
//下面是正则表达式定义区域，变量模式为：regex***，和regexDesp***
/**
 * 不允许出现特殊字符Reg,一般用于名称		
 * $结束符	+一次或多次	^开始符	()定义匹配模式		\w包括下划线的任何单词字符	|或者	[^]负值字符范围。
 * @type {RegExp}
 */
gdc.constant.regexNoSpecChar=/^(\w|[^ -~])+$/;
gdc.constant.regexDespNoSpecChar='不允许出现特殊字符！';
/**
 * 只能由字母数字及下划线组成Reg,一般用于编码
 * @type {RegExp}
 */
gdc.constant.regexCode=/^\w+$/;
gdc.constant.regexDespCode='只能由字母数字及下划线组成！';
/**
 * 只能由字母数字组成Reg
 * @type {RegExp}
 */
gdc.constant.regexLetterNum=/^[A-Za-z0-9]+$/;
gdc.constant.regexDespLetterNum="只能由字母数字组成";
/**
 * 整数的Reg
 * @type {RegExp}
 */
gdc.constant.regexInt=/^[-\+]?\d+$/;
gdc.constant.regexDespInt="只能是整数";
/**
 * 正整数的Reg
 * @type {RegExp}
 */
gdc.constant.regexPositiveInt=/^([1-9]\d*)$/;
gdc.constant.regexDespPositiveInt="只能是正整数";
/**
 * 非负整数的Reg
 * @type {RegExp}
 */
gdc.constant.regexPositiveIntAndZero=/^([0-9]\d*)$/;
gdc.constant.regexDespPositiveIntAndZero="只能是非负整数";
/**
 * 非负整数的Reg
 * @type {RegExp}
 */
gdc.constant.regexNotMinusInt=/^\d+$/;
gdc.constant.regexDespNotMinusInt="只能是正整数或零";
/**
 * 非负数的Reg
 * @type RegExp
 */
gdc.constant.regexNotMinusFloat=/^\d+(\.\d+)?$/;
gdc.constant.regexDespNotMinusFloat="只能是非负数";
/**
 * 正数的Reg 
 * @type RegExp
 */
gdc.constant.regexPositiveFloat=/^[1-9]\d*(\.\d+)?$|^0\.\d*[1-9]\d*$/;
gdc.constant.regexDespPositiveFloat="只能是正数";
/**
 * 浮点数的Reg
 * @type {RegExp}
 */
gdc.constant.regexFloat=/^[-\+]?\d+(\.\d+)?$/;
gdc.constant.regexDespFloat="只能是浮点数";
/**
 * 1位小数浮点数的Reg
 * @type {RegExp}
 */
gdc.constant.regexFloatOne=/^[-\+]?\d+(\.\d)?$/;
gdc.constant.regexDespFloatOne="只能是1位小数浮点数";
/**
 * 2位小数浮点数的Reg
 * @type {RegExp}
 */
gdc.constant.regexFloatTwo=/^[-\+]?\d+(\.\d(\d)?)?$/;
gdc.constant.regexDespFloatTwo="只能是2位小数浮点数";
/**
 * 3位小数浮点数的Reg
 * @type {RegExp}
 */
gdc.constant.regexFloatThree=/^[-\+]?\d+(\.\d(\d)?(\d)?)?$/;
gdc.constant.regexDespFloatThree="只能是3位小数浮点数";
/**
 * 正3位小数浮点数的Reg
 * @type {RegExp}
 */
gdc.constant.regexPlusFloatThree=/^\d+(\.\d(\d)?(\d)?)?$/;
gdc.constant.regexDespPlusFloatThree="只能是正3位小数浮点数";
/**
 * 日期的Reg，格式：YYYY-MM-DD
 * @type {RegExp}
 */
gdc.constant.regexDate=/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/;
gdc.constant.regexDespDate="日期格式不合法，格式：YYYY-MM-DD";
/**
 * 时间的Reg，格式：HH:MM:SS
 * @type {RegExp}
 */
gdc.constant.regexTime=/^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
gdc.constant.regexDespTime="时间格式不合法，格式：HH:MM:SS";
/**
 * 日期时间的Reg，格式：YYYY-MM-DD HH:MM:SS
 * @type {RegExp}
 */
gdc.constant.regexDateTime=/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29)) ([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
gdc.constant.regexDespDateTime="日期时间格式不合法，格式：YYYY-MM-DD HH:MM:SS";
/**
 * 日期时间的Reg，格式：YYYY-MM-DD HH:MM
 * @type {RegExp}
 */
gdc.constant.regexDateTimeWithoutSec=/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29)) ([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
gdc.constant.regexDespDateTimeWithoutSec="日期时间格式不合法，格式：YYYY-MM-DD HH:MM";
/**
 * E-mail的Reg
 * @type {RegExp}
 */
gdc.constant.regexEmail=/^(.+)@(.+)$/;
gdc.constant.regexDespEmail="E-mail格式不合法";
/**
 * 手机号码Reg
 * @type {RegExp}
 */
gdc.constant.regexMobile=/^d{11}$/;
gdc.constant.regexDespMobile="手机号码格式不合法";
//下面是js中需要用到的公用代码定义区域，变量模式为：***ComCode
//定义公用代码ID开始
//通用Start
/**
 * 通用.是否
 */
gdc.constant.ComCode_YESNO=101;
/**
 * 公用代码：通用.是否_是
 * @type Number
 */
gdc.constant.ComCode_YESNO_YES=1;
/**
 * 公用代码：通用.是否_否
 * @type Number
 */
gdc.constant.ComCode_YESNO_NO=0;
/**
 * 通用.是否有效
 */
gdc.constant.ComCode_TY_SFTX=101231;
/**
 * 公用代码：通用.是否有效_有效
 * @type Number
 */
gdc.constant.ComCode_TY_SFTX_YX=1;
/**
 * 公用代码：通用.是否有效_无效
 * @type Number
 */
gdc.constant.ComCode_TY_SFTX_WX=0;
/**
 * 通用.审核状态(未提交)
 * @type {String}
 */
gdc.constant.ComCode_SHZT_WSH = '0';
/**
 * 通用.审核状态(已提交待审核)
 * @type {String}
 */
gdc.constant.ComCode_SHZT_YTJ = '1';
/**
 * 通用.审核状态(已审核)
 * @type {String}
 */
gdc.constant.ComCode_SHZT_YSH = '2';
/**
 * 公用代码：通用.是否合格_合格
 * @type {String}
 */
gdc.constant.ComCode_TY_SFHG_YES = '1';
/**
 * 公用代码：通用.修试项目
 * @type {Number}
 */
gdc.constant.ComCode_TY_XSXM=101225;
/**
 * 公用代码：通用.是否合格_不合格
 * @type {String}
 */
gdc.constant.ComCode_TY_SFHG_NO = '0';
/**
 * 通用.应用领域
 */
gdc.constant.ComCode_APPDOMAIN=117;
/**
 * 通用.应用领域----变电
 */
gdc.constant.ComCode_APPDOMAIN_TRANSFORMATION=1;
/**
 * 通用.应用领域----输电
 */
gdc.constant.ComCode_APPDOMAIN_TRANSMISSION=2;
/**
 * 通用.应用领域----配电
 */
gdc.constant.ComCode_APPDOMAIN_DISTRIBUTION=3;
/**
 * 通用.省市县.分组ID
 * @type {Number}
 */
gdc.constant.ComCode_TY_SSX = 101224;
/**
 * 通用.省市县.省
 * @type {Number}
 */
gdc.constant.ComCode_TY_SSX_PROVINCE = 1;
/**
 * 通用.省市县.市
 * @type {Number}
 */
gdc.constant.ComCode_TY_SSX_CITY = 2;
/**
 * 通用.省市县.县
 * @type {Number}
 */
gdc.constant.ComCode_TY_SSX_COUNTY = 3; 
/**
 * 通用.是否合格（遗留代码，变量命名方式不对）
 */
gdc.constant.ComCode_SFHG=103802;
/**
 * 通用.电压等级(全)（遗留代码，变量命名方式不对）
 */
gdc.constant.ComCode_DYDJ_ALL=101220;
//通用end
//标准字典Start
/**
 * 标准字典.危险点专业项目
 * @type {Number}
 */
gdc.constant.ComCode_STD_WXDZYXM=101316;
/**
 * 标准字典.危险点识别对象
 * @type {Number}
 */
gdc.constant.ComCode_STD_WXDSBDX=101317;
/**
 * 标准字典_记录状态
 * @type {Number}
 */
gdc.constant.ComCode_BZZD_JLZT = 101306
//标准字段End
//监理验收Start
/**
 * 监理验收.工程性质
 * @type Number
 */
gdc.constant.ComCode_JLYS_GCXZ = 101424;
/**
 * 监理验收.验收类型
 * @type Number
 */
gdc.constant.ComCode_JLYS_YSLX = 101430;
//监理验收End
//设备模型Start
/**
 * 设备模型.设备类型分类方式（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_TYPEASSETCLSSTYLE=103;
/**
 * 设备模型.参数类型（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_PARAMCLS=115;
/**
 * 设备模型.参数类型_基本（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_PARAMCLS_BASIC=1;
/**
 * 设备模型.参数类型_模板（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_PARAMCLS_MODEL=2;
/**
 * 设备模型.参数类型_运行（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_PARAMCLS_RUNNING=3;
/**
 * 设备模型.参数类型_逻辑（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_PARAMCLS_LOGIC=4;
/**
 * 设备模型.数据类型（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_DATATYPE=116;
/**
 * 设备模型.电压等级 等同于 通用.电压等级(全)（遗留代码，变量命名方式不对，而且重复）
 * @type {Number}
 */
gdc.constant.ComCode_VOLTAGELEVEL=gdc.constant.ComCode_DYDJ_ALL;
/**
 * 设备模型.变电站状态（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_SUBSTATIONSTATE=102152;
/**
 * 设备模型.资产属性（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_ASSETPROPERTY=102110;
/**
 * 设备模型.调度范围（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_DISPATCHSCOPE=102117;
/**
 * 设备模型.电缆终端类型（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_DLZDLX = 102618;
/**
 * 设备模型.电缆中间头类型（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_DLJTLX = 102636;
/**
 * 设备模型.制作工艺（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_ZZGY = 102637;
/**
 * 设备模型.应力锥材料（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_YLZCL = 102620;
/**
 * 设备模型.接地箱类型（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_JDXLX = 102638;
/**
 * 设备模型.接地方式（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_JDFS = 102617;
/**
 * 设备模型.相位（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_XW = 104239;
/**
 * 设备模型.金具安装位置（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_JJ_AZWZ = 102435;
/**
 * 设备模型.金具相别（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_JJ_XB = 102436;
/**
 * 设备模型.金具线别（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_JJ_XIB = 102438;
/**
 * 设备模型.金具侧别（遗留代码，变量命名方式不对，路径不全）
 * @type {Number}
 */
gdc.constant.ComCode_JJ_CEB = 102437;
/**
 * 金具类型
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_SDSBJSCS_JJ_LX=102434;
/**
 * 交叉跨越物属性
 * @type {String}
 */
gdc.constant.ComCode_SBGL_JCKY_JCKYWSX = 102539;
/**
 * 交叉跨越性质
 * @type {String}
 */
gdc.constant.ComCode_SBGL_JCKY_JCKYXZ = 102543;
/**
 * 交叉跨越物状态
 * @type {String}
 */
gdc.constant.ComCode_SBGL_JCKY_ZT = 102545;
/**
 * 附属设施相别
 * @type {Number}
 */
gdc.constant.ComCode_FSSS_XB=102500;
/**
 * 附属设施.安装位置
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_SDSBJSCS_FSSS_AZWZ=102499;
/**
 * 设备管理.设备台帐.导线分裂数
 * @type {String}
 */
gdc.constant.ComCode_SBGL_DX_FLS = 104160;
/**
 * 设备管理.变电站.值班方式
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_BDZ_ZBFS=102148;
/**
 * 设备管理.单元间隔.单元状态
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_DYJG_BAYSTATE=102122;
/**
 * 设备管理.设备台帐.组从设备
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_ZCSB = 102195;
/**
 * 设备管理.设备台帐.设备状态(包括逻辑节点状态)
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_SBZT = 102192;
/**
 * 设备模型：设备管理.设备台帐.设备状态----在役
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_SBZT_INUSE = '1';
/**
 * 设备模型：设备管理.设备台帐.设备状态----退役
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_SBZT_EXSERVICE = '2';
/**
 * 设备模型：设备管理.设备台帐.设备状态----报废(物理设备)
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_SBZT_SCRAP = '3';
/**
 * 设备模型：设备管理.设备台帐.设备状态----未投
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_SBZT_BEFOREUSE = '4';
/**
 * 设备模型：设备管理.设备台帐.设备状态----用户托管
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_SBZT_USERMANAGED = '5';
/**
 * 设备模型：设备管理.设备台帐.设备状态----逻辑删除
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_SBZT_LOGICDEL = '6';
/**
 * 设备模型：设备管理.设备台帐.设备状态----待用(物理设备)
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_SBZT_INACTIVE = '7';
/**
 * 设备模型：设备管理.设备台帐.设备状态----调度备用
 * @type {String}
 */
gdc.constant.ComCode_SBGL_SBTZ_SBZT_DISPATCH = '8';
/**
 * 设备管理.调度范围
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_DDFW = 102117;
/**
 * 设备模型.资产所属单位
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_ZCSSDW=102110;
/**
 * 设备管理.变电所.一次主接线方式
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_BDS_YCZJXFS = 102153;
/**
 * 设备管理.变电所.接线方式.布置方式
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_BDS_JXFS_BZFS = 103551;
/**
 * 设备管理.变电所.接线方式.设备类型
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_BDS_JXFS_SBLX = 103552;
/**
 * 设备管理.单元间隔.单元设备属性
 * @type {Number}
 */
gdc.constant.ComCode_SBGL_DYJG_DYSBSX = 104408;


//设备模型End
//运行管理Start
/**
 * 运行管理.周期单位.天
 * @type Number
 */
gdc.constant.ComCode_YXGL_ZQDW_T=1;
/**
 * 运行管理.周期单位.月
 * @type Number
 */
gdc.constant.ComCode_YXGL_ZQDW_Y=2;
/**
 * 运行管理.周期单位.年
 * @type Number
 */
gdc.constant.ComCode_YXGL_ZQDW_N=3;
//运行管理End
//缺陷Start
/**
 * 缺陷.输电隐患内容
 */
gdc.constant.ComCode_SDQX_YHNR=104176;
/**
 * 缺陷.输电树木改变原因
 */
gdc.constant.ComCode_SDQX_SMXGYY=103095;
/**
 * 缺陷.输电危险等级
 */
gdc.constant.ComCode_SDQX_WXDJ=103096;
/**
 * 缺陷.输电树木状态
 */
gdc.constant.ComCode_SDQX_SMZT=103858;
/**
 * 缺陷.输电警告牌状态
 */
gdc.constant.ComCode_SDQX_JGPZT=103098;
/**
 * 缺陷.输电警告牌类型
 */
gdc.constant.ComCode_SDQX_JGPLX=103097;
/**
 * 缺陷.输电隐患类别
 */
gdc.constant.ComCode_SDQX_YHLB=103093;
/**
 * 缺陷.输电危险点性质
 */
gdc.constant.ComCode_SDQX_WXDXZ=103092;
/**
 * 缺陷.输电危险源执行情况
 */
gdc.constant.ComCode_SDQX_WXDZXQK=103892;
/**
 * 缺陷.输电缺陷性质（遗留代码，变量命名方式不对）
 */
gdc.constant.ComCode_SDQXXZ=103089;
/**
 * 缺陷.输电消缺方式（遗留代码，变量命名方式不对）
 */
gdc.constant.ComCode_SDXQFS=101802;
/**
 * 缺陷.缺陷状态（遗留代码，变量命名方式不对）
 */
gdc.constant.ComCode_QXZT=101801;
/**
 * 缺陷.技术原因（遗留代码，变量命名方式不对）
 */
gdc.constant.ComCode_JSYY=104169;
/**
 * 缺陷.责任原因（遗留代码，变量命名方式不对）
 */
gdc.constant.ComCode_ZRYY=104170;
/**
 * 缺陷.变电缺陷性质（遗留代码，变量命名方式不对）
 */
gdc.constant.ComCode_BDQXXZ=101315;
/**
 * 缺陷.变电家族缺陷填报依据
 */
gdc.constant.ComCode_BDQX_TBYJ=103087;
//缺陷End
//检修试验Start
/**
 * 检修试验.工作方案审核状态
 */
gdc.constant.ComCode_JXSY_GZFA_SHZT=102523;
//检修试验End
//两票Start
/**
 * 两票----评议合格
 */
gdc.constant.ComCode_REVIEWELIGIBLE=103768;
//两票End
//评价评估Start
/**
 * 评估状态:未审核
 * @type {String}
 */
gdc.constant.ComCode_PGZT_WSH = '1';
/**
 * 评估状态:制定检修策略
 * @type {String}
 */
gdc.constant.ComCode_PGZT_ZDJXCL = '2';
/**
 * 评估状态:工区审核
 * @type {String}
 */
gdc.constant.ComCode_PGZT_GQSH = '3';
/**
 * 评估状态:县生计部审核
 * @type {String}
 */
gdc.constant.ComCode_PGZT_XSJBSH = '4';
/**
 * 评估状态:市生计部审核
 * @type {String}
 */
gdc.constant.ComCode_PGZT_SSJBSH = '5';
/**
 * 评估状态:省生计部审核
 * @type {String}
 */
gdc.constant.ComCode_PGZT_SGSJBSH = '6';
/**
 * 评估状态:已审核
 * @type {String}
 */
gdc.constant.ComCode_PGZT_YSH = '7';
//评价评估End
//修理技改Start
/**
 * 修理技改.项目状态.未审核
 * @type {String}
 */
gdc.constant.ComCode_XLJG_XMZT_WSH = '1';
/**
 * 修理技改.项目状态.同意
 * @type {String}
 */
gdc.constant.ComCode_XLJG_XMZT_TY = '2';
/**
 * 修理技改.项目状态.否决
 * @type {String}
 */
gdc.constant.ComCode_XLJG_XMZT_FJ = '4';
/**
 * 修理技改.项目状态.同意被平衡
 * @type {String}
 */
gdc.constant.ComCode_XLJG_XMZT_TY_BPH = '10';
/**
 * 修理技改.项目状态.否决被平衡
 * @type {String}
 */
gdc.constant.ComCode_XLJG_XMZT_FJ_BPH = '12';
/**
 * 修理技改.技改流程状态.建立
 * @type {String}
 */
gdc.constant.ComCode_JGLCZT_JL = '1';
/**
 * 修理技改.技改流程状态.合并
 */
gdc.constant.ComCode_JGLCZT_HB = '2';
/**
 * 修理技改.技改流程状态.上报
 * @type {String}
 */
gdc.constant.ComCode_JGLCZT_SB = '3';
/**
 * 修理技改.技改流程状态.汇总
 */
gdc.constant.ComCode_JGLCZT_HZ = '4';
/**
 * 修理技改.技改流程状态.审核
 * @type {String}
 */
gdc.constant.ComCode_JGLCZT_SH = '5';
/**
 * 修理技改.技改流程状态.平衡
 * @type {String}
 */
gdc.constant.ComCode_JGLCZT_PH = '6';
/**
 * 修理技改.技改流程状态.下达
 * @type {String}
 */
gdc.constant.ComCode_JGLCZT_XD = '7';
/**
 * 修理技改.技改流程状态.退回
 * @type {String}
 */
gdc.constant.ComCode_JGLCZT_TH = '8';
/**
 * 修理技改.技改流程状态.完成
 * @type {String}
 */
gdc.constant.ComCode_JGLCZT_WC = '9';
/**
 * 修理技改.修理流程状态.建立
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_JL = '1';
/**
 * 修理技改.修理流程状态.合并
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_HB = '2';
/**
 * 修理技改.修理流程状态.上报
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_SB = '3';
/**
 * 修理技改.修理流程状态.汇总
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_HZ = '4';
/**
 * 修理技改.修理流程状态.审核
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_SH = '5';
/**
 * 修理技改.修理流程状态.审核费用
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_SHFY = '6';
/**
 * 修理技改.修理流程状态.平衡
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_PH = '7';
/**
 * 修理技改.修理流程状态.下达
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_XD = '8';
/**
 * 修理技改.修理流程状态.退回
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_TH = '9';
/**
 * 修理技改.修理流程状态.完成
 * @type {String}
 */
gdc.constant.ComCode_XLLCZT_WC = '10';
/**
 * 修理技改.计划类型.年度
 * @type {String}
 */
gdc.constant.ComCode_XLJG_JHLX_ND = '1';
/**
 * 修理技改.计划类型.滚动
 * @type {String}
 */
gdc.constant.ComCode_XLJG_JHLX_GD = '2';
/**
 * 修理技改.计划类型.月度
 * @type {String}
 */
gdc.constant.ComCode_XLJG_JHLX_YD = '3';
//修改技改End
//专项管理Start
/**
 * 专项管理.班组管理.工器具.分类.车辆：0
 */ 
gdc.constant.ComCode_ZXGL_BZGL_GQJ_FL_CL = 0  
/**
 * 专项管理.班组管理.工器具.分类.工器具：1
 */
gdc.constant.ComCode_ZXGL_BZGL_GQJ_FL_GQJ = 1
//专项管理End
//定义公用代码ID结束

//下面定义两票代码
//定义两票代码开始
/**
 * 操作票
 * @type {String}
 */
gdc.constant.TicketCODE_CZP = 'C1';
/**
 * 检修操作票
 * @type {String}
 */
gdc.constant.TicketCODE_JXCZP = 'C2';
/**
 * 变电一种工作票
 * @type {String}
 */
gdc.constant.TicketCODE_BDGZP1 = 'B1';
/**
 * 变电二种工作票
 * @type {String}
 */
gdc.constant.TicketCODE_BDGZP2 = 'B2';
/**
 * 变电带电作业票
 * @type {String}
 */
gdc.constant.TicketCODE_BDDDZYP = 'D3';
/**
 * 输电带电作业票
 * @type {String}
 */
gdc.constant.TicketCODE_SDDDZYP = 'D4';
/**
 * 安措票
 * @type {String}
 */
gdc.constant.TicketCODE_ACP = 'A1';
/**
 * 检修安措票
 * @type {String}
 */
gdc.constant.TicketCODE_JXACP = 'A2';
/**
 * 变电检修一种票
 * @type {String}
 */
gdc.constant.TicketCODE_BDJXGZP1 = 'J1';
/**
 * 变电检修二种票
 * @type {String}
 */
gdc.constant.TicketCODE_BDJXGZP2 = 'J2';
/**
 * 事故抢修单
 * @type {String}
 */
gdc.constant.TicketCODE_SGQXD = 'Q2';
/**
 * 动火票
 * @type {String}
 */
gdc.constant.TicketCODE_DHP = 'D5';
/**
*两票_两票代码_输电_线路一种票
*@type {String}
*/
gdc.constant.TicketCODE_SDXLYZP = 'X1'
/**
*两票_两票代码_输电_线路二种票
*@type {String}
*/
gdc.constant.TicketCODE_SDXLEZP = 'X2'
/**
 * 两票代码_电缆一种票
 * @type {String}
 */
gdc.constant.TicketCODE_DLYZP = 'D1';
/**
 * 两票代码_电缆二种票
 * @type {String}
 */
gdc.constant.TicketCODE_DLEZP = 'D2';
/**
 * 变电事故抢修单
 * @type {String}
 */
gdc.constant.TicketCODE_BDSGQXD = 'Q1';
// 定义两票代码结束

//下面定义两票状态
//定义两票状态开始
/**
 * 操作票.查看操作票
 * @type {Number}
 */
gdc.constant.TicketState_CZP_VIEW = 0;
/**
 * 操作票.未提交任务票
 * @type {Number}
 */
gdc.constant.TicketState_CZP_WTJRWP = 1;
/**
 * 操作票.未提交操作票
 * @type {Number}
 */
gdc.constant.TicketState_CZP_WTJCZP = 2;
/**
 * 操作票.未正令操作
 * @type {Number}
 */
gdc.constant.TicketState_CZP_WZLCZ = 3;
/**
 * 操作票.未完成操作
 * @type {Number}
 */
gdc.constant.TicketState_CZP_WWCCZ = 4;
/**
 * 操作票.已完成操作
 * @type {Number}
 */
gdc.constant.TicketState_CZP_YWCCZ = 5;
/**
 * 操作票.已作废任务票
 * @type {Number}
 */
gdc.constant.TicketState_CZP_YZFRWP = 6;
/**
 * 操作票.已作废操作票
 * @type {Number}
 */
gdc.constant.TicketState_CZP_YZFCZP = 7;

/**
 * 填写工作票 变电一种票
 * @type {Number}
 */
gdc.constant.TicketState_BDGZP1_TX = 1;
/**
 * 签发 变电一种票
 * @type {Number}
 */
gdc.constant.TicketState_BDGZP1_QF = 2;
/**
 * 会签 变电一种票
 * @type {Number}
 */
gdc.constant.TicketState_BDGZP1_HQ = 3;
/**
 * 接受工作票 变电一种票
 * @type {Number}
 */
gdc.constant.TicketState_BDGZP1_JS = 4;
/**
 * 许可开工 变电一种票
 * @type {Number}
 */
gdc.constant.TicketState_BDGZP1_XK = 5;
/**
 * 实施操作 变电一种票
 * @type {Number}
 */
gdc.constant.TicketState_BDGZP1_SS = 6;
/**
 * 工作票终结 变电一种票
 * @type {Number}
 */
gdc.constant.TicketState_BDGZP1_GZPZJ = 7;
/**
 * 查看 变电一种票
 * @type {Number}
 */
gdc.constant.TicketState_BDGZP1_VIEW = 8;
/**
 * 特权  变电一种票
 * @type {Number}
 */
gdc.constant.TicketState_BDGZP1_TQ = 9;

/**
 * 查看 安措票
 * @type {Number}
 */
gdc.constant.TicketState_ACP_VIEW = 0;
/**
 * 填写中 安措票
 * @type {Number}
 */
gdc.constant.TicketState_ACP_TXZ = 1;
/**
 * 已填写 安措票
 * @type {Number}
 */
gdc.constant.TicketState_ACP_YTX = 2;
/**
 * 已审核 安措票
 * @type {Number}
 */
gdc.constant.TicketState_ACP_YSH = 3;
/**
 * 已执行 安措票
 * @type {Number}
 */
gdc.constant.TicketState_ACP_YZX = 4;
/**
 * 已作废 安措票
 * @type {Number}
 */
gdc.constant.TicketState_ACP_YZF = 5;

/**
 * 查看 动火票
 * @type {Number}
 */
gdc.constant.TicketState_DHP_VIEW = 0;
/**
 * 填写中 动火票
 * @type {Number}
 */
gdc.constant.TicketState_DHP_TXZ = 1;
/**
 * 已填写 动火票
 * @type {Number}
 */
gdc.constant.TicketState_DHP_YTX = 2;
/**
 * 已审核 动火票
 * @type {Number}
 */
gdc.constant.TicketState_DHP_YSH = 3;
/**
 * 已许可 动火票
 * @type {Number}
 */
gdc.constant.TicketState_DHP_YXK = 4;
/**
 * 已结束 动火票
 * @type {Number}
 */
gdc.constant.TicketState_DHP_YJS = 5;
//定义两票状态结束
//定义记录状态开始
/**
 * 设备模型：设备记录状态----已填写,未提交审核
 * @type {Number}
 */
gdc.constant.RecordState_FILLED = 0;
/**
 * 设备模型：设备记录状态----已提交审核,未最终通过
 * @type {Number}
 */
gdc.constant.RecordState_SUBMITED = 1;
/**
 * 设备模型：设备记录状态----已通过审核
 * @type {Number}
 */
gdc.constant.RecordState_PASSED = 2;
//定义两票状态结束

//下面定义需要引用的设备类型ID
//定义设备类型ID开始
/**
 * 变电站
 * @type {Number}
 */
gdc.constant.TypeAsset_SUBSTATION=2269;
/**
 * 线路
 * @type {Number}
 */
gdc.constant.TypeAsset_LINE=2447;
/**
 * 单元（间隔）
 * @type {Number}
 */
gdc.constant.TypeAsset_BAY=1033;
/**
 * 主变
 * @type {Number}
 */
gdc.constant.TypeAsset_MAINTRANSFORMER=1008;
/**
 * 杆塔
 * @type {Number}
 */
gdc.constant.TypeAsset_POLETOWER=1041;
/**
 * 架空导线
 * @type {Number}
 */
gdc.constant.TypeAsset_OVERHEADCONDUCTOR=2721;
/**
 * 电缆本体
 * @type {Number}
 */
gdc.constant.TypeAsset_CABLE=2722;
/**
 * 电缆段
 * @type {Number}
 */
gdc.constant.TypeAsset_CABLESEC=2901;
/**
 * 电缆中间接头
 * @type {Number}
 */
gdc.constant.TypeAsset_COMB=2883;
/**
 * 电缆终端头
 * @type {Number}
 */
gdc.constant.TypeAsset_TERM=2886;
/**
 * 避雷器
 * @type {Number}
 */
gdc.constant.TypeAsset_ARRESTER=2750;
/**
 * 蓄电池
 * @type {Number}
 */
gdc.constant.TypeAsset_BATTERY=2754;
/**
 * 断路器
 * @type {Number}
 */
gdc.constant.TypeAsset_BREAKER=2844;
/**
 * 开关
 * @type {Number}
 */
gdc.constant.TypeAsset_SWITCH=2840;
/**
 * 隔离开关
 * @type {Number}
 */
gdc.constant.TypeAsset_DISCONNECTOR=3067;
/**
 * 跳线开关
 * @type {Number}
 */
gdc.constant.TypeAsset_JUMPER=3071;
/**
 * 熔断器
 * @type {Number}
 */
gdc.constant.TypeAsset_FUSE=3059;
/**
 * 绝缘子
 * @type {Number}
 */
gdc.constant.TypeAsset_INSULATOR=2880;
/**
 * 金具
 * @type {Number}
 */
gdc.constant.TypeAsset_FITTING=2810;
/**
 * 接地装置
 * @type {Number}
 */
gdc.constant.TypeAsset_GROUNDINGDEVICE=2806;
/**
 * 支柱绝缘子
 * @type {Number}
 */
gdc.constant.TypeAsset_OPSTINSULATOR=2916;
/**
 * 电压互感器
 * @type {Number}
 */
gdc.constant.TypeAsset_PT=2918;
/**
 * 电流互感器
 * @type {Number}
 */
gdc.constant.TypeAsset_CT=2919;
/**
 * 消弧线圈
 * @type {Number}
 */
gdc.constant.TypeAsset_ARCSUPPRESSIONCOIL=2925;
/**
 * 电抗器
 * @type {Number}
 */
gdc.constant.TypeAsset_REACTOR=3047;
/**
 * 电容器
 * @type {Number}
 */
gdc.constant.TypeAsset_CAPACITOR=3055;
/**
 * 组合电器
 * @type {Number}
 */
gdc.constant.TypeAsset_COMPOSITEAPPARATUS=2927;
/**
 * 井
 * @type {Number}
 */
gdc.constant.TypeAsset_WELL=2783;
/**
 * 井盖
 * @type {Number}
 */
gdc.constant.TypeAsset_WELLCOVER=3576;
/**
 * 沟槽
 * @type {Number}
 */
gdc.constant.TypeAsset_CHANNEL=2786;
/**
 * 充电机
 * @type {Number}
 */
gdc.constant.TypeAsset_CHARGER=2921;
/**
 * （耐张）地线
 * @type {Number}
 */
gdc.constant.TypeAsset_EARTHWIRE=2794;
/**
 * 直流附属设备
 * @type {Number}
 */
gdc.constant.TypeAsset_DCAPPENDANT=2922;
/**
 * 光缆
 * @type {Number}
 */
gdc.constant.TypeAsset_OPTICAL=2860;
/**
 * 光缆段
 * @type {Number}
 */
gdc.constant.TypeAsset_OPTICALSEC=3950;
/**
 * 接头盒
 * @type {Number}
 */
gdc.constant.TypeAsset_JOINT=3967;
/**
 * 分支箱
 * @type {Number}
 */
gdc.constant.TypeAsset_SPLITTER=2889;
/**
 * 开关柜体
 * @type Number
 */
gdc.constant.TypeAsset_SWITCHGREARBOX=2914;
/**
 * 拉线
 * @type Number
 */
gdc.constant.TypeAsset_STAY=2808;
/**
 * 空挂绝缘子
 */
gdc.constant.TypeAsset_HANGINSULATOR=3504;
/**
 * 附属设施
 */
gdc.constant.TypeAsset_APPENDIX=2890;
/**
 * 基础
 * @type Number
 */
gdc.constant.TypeAsset_FOUNDATION=2804;
//定义设备类型ID结束
/**
 * 查询页面分页常量
 * @type {Number}
 */
gdc.constant.pageQuerySize = 10;

/**
 * 下网侧 绕组编号最大值
 * @type Number
 */
gdc.constant.sec_trwind_number_maxValue = 999999;