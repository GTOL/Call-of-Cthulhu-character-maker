//案例学习 绝对有bug

$(function(){  
			  //判断浏览器是否支持placeholder属性
			  supportPlaceholder='placeholder'in document.createElement('input'), //新建全局变量supportPlaceholder
			  placeholder=function(input){	//新建全局函数表达式placeholder
			    var text = input.attr('placeholder'),	//定义局部变量text默认值为对象的placeholder值(text)
			    defaultValue = input.defaultValue;	//定义局部变量defaultValue等于对象的初始内容
			    if(!defaultValue){	//如果初始内容为空
			      input.val(text).addClass("phcolor");	//将对象的value修改为text并添加类phcolor
			    }
			    input.focus(function(){	//当元素获得焦点时，执行函数
			      if(input.val() == text){ 	//如果元素的value与text相同
			        $(this).val("");	//则将value清空
			      }
			    }); 
			    input.blur(function(){ //当元素失去焦点时，
			      if(input.val() == ""){	//如果元素的value为空
			        $(this).val(text).addClass("phcolor");  //则将对象的value修改为text并添加类phholder
			      }
			    });
			    //输入的字符不为灰色
			    input.keydown(function(){ //当按下键盘时，
			      $(this).removeClass("phcolor"); //删除类
			    });
			  };
			  //当浏览器不支持placeholder属性时，调用placeholder函数
			  if(!supportPlaceholder){	//如果不支持placeholder
			    $('input').each(function(){ //为每个input添加函数
			      text = $(this).attr("placeholder");	//全局变量text等于对象的placeholder值
			      if($(this).attr("type") == "text"){	//如果这是一个文本输入框
			        placeholder($(this));	//执行placeholder()
			      }
			    });
			  }
			});