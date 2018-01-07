 // data结构：类型 名称 初始值
var dataSample = [
	[0,	"艺术与手艺(05%)", 	00],
	[1,	"表演", 			05],
	[1,	"美术", 			05],
	[1,	"伪造", 			05],
	[1,	"摄影",				05],
	[0,	"语言(01%)",		00],
	[2,	"母语",				01],
	[2,	"其他", 			01],
	[2,	"其他",				01],
	[2,	"其他",				01],
];

//	ver 1.1 改用jQuery+DocumentFragment
//	debug用代码
//	$("<p#test><p>").text(string).appendTo($("#skill-holder"));
//	console.debug("不知道写啥");
//	辣鸡ver 1.1 跑的比原来还慢
function skillsMain(data) {
	var datacutter = skillsDataCutter(data);
	var xSelect = skillsSelectCreater(datacutter[0]);
	var frag = document.createDocumentFragment();
	frag.appendChild(xSelect);
	for (var i=0, ii=datacutter[0].length; i<ii; i++) {
		$("<div></div>").attr({"class":"skilldivs", "id":"skill-div"+i})
						.css("display","inline-block")
						.hide()
						.append(skillsTableCreater(datacutter[1][i],i))
						.appendTo(frag);
	}
	$("#skill-holder").append(frag);
	skillsInitialize();
}

function skillsInitialize() {
	$("#skill-div0").show();
}

function skillsSwitcher(value) {
	var skilldivs = $(".skilldivs");
	skilldivs.hide();
	skilldivs.eq(value).show();
}

function skillsSelectCreater(labels) {
	var xSelect = $("<select></select>").attr({
		"id"		: "skill-selector",
		"onchange"	: "skillsSwitcher(this.value);"
	})										
	for (var i=0, ii=labels.length; i<ii; i++) {
		var xOption = $("<option></option>")
			.attr("value", i)
			.text(labels[i])
			.appendTo(xSelect);
	}
	return xSelect[0];
}

function skillsDataCutter(data) {
	var cutPoint = 1; //切割点
	var labels = [data[0][1]]; //标签输出
	var cutData = []; //data输出
	for (var i=1, ii=data.length; i<ii; i++) {
		if (data[i][0]==0) {
			labels.push(data[i][1]); //加入新标签
			var cutoff = data.slice(cutPoint, i);
			cutData.push(cutoff); //加入新data
			cutPoint = i+1; //更新切割点
		}
	}
	var cutoff = data.slice(cutPoint);
	cutData.push(cutoff); //加入最后一个data
	return [labels, cutData];
}

function skillsTableCreater(data,t) {
	// var xP = document.createElement("p");
	// xP.appendChild(document.createTextNode(data));
	// document.body.appendChild(xP);
	var xTable = document.createElement("table");
	xTable.setAttribute("id", "skill-table"+t);
	skillTableHeading(xTable);
	for (var i=0, ii=data.length; i < ii; i++) {
		var xTr = document.createElement("tr");
		xTable.appendChild(xTr);
		xTr.setAttribute("id", "skill-r"+[i]);
		var normal	= ("0" + data[i][2]).slice(-2);
		var	hard	= ("0" + parseInt(data[i][2]/2)).slice(-2);
		var crit	= ("0" + parseInt(data[i][2]/4)).slice(-2);
		var skillArray = [data[i][1], normal+"%", "occu", "inte", "modi", normal, hard, crit];
		for (var j=0, jj=skillArray.length; j < jj; j++) {
			var xTD = document.createElement("td");
			xTD.setAttribute("id", "skill-r"+[i]+"d"+[j]);
			xTD.setAttribute("rowspan", 2);
			xTr.appendChild(xTD);
			switch (j) {
				case 0:
					xTD.setAttribute("class", "skill-name");
					xInput = document.createElement("input");
					xInput.setAttribute("type", "text");
					xInput.setAttribute("name", "skill-name"+[i]);
					xInput.setAttribute("placeholder", skillArray[j]);
					if (data[i][0]==1) {
						xInput.setAttribute("value", skillArray[j]);
					}
					xTD.appendChild(xInput);
					break;
				case 1:
					xInput = document.createElement("input");
					xInput.setAttribute("type", "text");
					xTD.appendChild(xInput);
					xInput.setAttribute("placeholder", skillArray[j]);
					xInput.setAttribute("value", skillArray[j]);
					break;
				case 5:
					xTD.appendChild(document.createTextNode(skillArray[j]));
					break;
				case 6:
					xTD.setAttribute("rowspan", 1);
					xTD.appendChild(document.createTextNode(skillArray[j]));
					var xTr = document.createElement("tr");
					xTable.appendChild(xTr);
					break;
				case 7:
					xTD.setAttribute("rowspan", 1);
					xTD.appendChild(document.createTextNode(skillArray[j]));
					break;
				default:
					xInput = document.createElement("input");
					xInput.setAttribute("type", "text");
					xTD.appendChild(xInput);
			}
		}
	}
	xTable.setAttribute("title", xTable.rows.length);	//xTable的最终行数
	return xTable;
}

function skillTableHeading(xTable) {
	var xTr = document.createElement("tr");
	xTable.appendChild(xTr);
	var heading = ["技能名称", "初始", "职业", "兴趣", "调整", "最终值"];
	for (var i=0, ii=heading.length; i<ii; i++) {
		var xTD = document.createElement("th");
		xTD.appendChild(document.createTextNode(heading[i]));
		if (i==5) {
			xTD.setAttribute("colspan", 2);
		}
		xTr.appendChild(xTD);
	}
}

function buttonAddRow() {
	var t=document.getElementById("skill-selector").value;
	var xTable = document.getElementById("skill-table"+t);
	var xTr = document.createElement("tr");
	xTable.appendChild(xTr);
	var i = xTable.rows.length/2 - 1;
	xTr.setAttribute("id", "skill-r"+[i]);
	var skillArray = ["自定义", "00%", "occu", "inte", "modi", "00", "00", "00"];
	for (var j=0, jj=skillArray.length; j < jj; j++) {
		var xTD = document.createElement("td");
		xTD.setAttribute("id", "skill-r"+[i]+"d"+[j]);
		xTD.setAttribute("rowspan", 2);
		xTr.appendChild(xTD);
		switch (j) {
			case 0:
				xTD.setAttribute("class", "skill-name");
				xInput = document.createElement("input");
				xInput.setAttribute("type", "text");
				xInput.setAttribute("name", "skill-name"+[i]);
				xInput.setAttribute("placeholder", skillArray[j]);
				xTD.appendChild(xInput);
				xInput.focus();	//设置焦点使光标在此处
				break;
			case 1:
				xInput = document.createElement("input");
				xInput.setAttribute("type", "text");
				xTD.appendChild(xInput);
				xInput.setAttribute("placeholder", skillArray[j]);
				break;
			case 5:
				xTD.appendChild(document.createTextNode(skillArray[j]));
				break;
			case 6:
				xTD.setAttribute("rowspan", 1);
				xTD.appendChild(document.createTextNode(skillArray[j]));
				var xTr = document.createElement("tr");
				xTable.appendChild(xTr);
				break;
			case 7:
				xTD.setAttribute("rowspan", 1);
				xTD.appendChild(document.createTextNode(skillArray[j]));
				break;
			default:
				xInput = document.createElement("input");
				xInput.setAttribute("type", "text");
				xTD.appendChild(xInput);
		}
	}
}

function buttonRemoveRow() {
	var t = document.getElementById("skill-selector").value;
	var xTable = document.getElementById("skill-table"+t);
	var i = xTable.rows.length;
	// 通过if限制不允许删除原有行
	if (i > xTable.title) {
		var xTr0 = xTable.rows[i-1];
		var xTr1 = xTable.rows[i-2];
		xTable.removeChild(xTr0);
		xTable.removeChild(xTr1);
	}
}