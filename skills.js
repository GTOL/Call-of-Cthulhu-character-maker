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

function skillsMain(data, location) {
	var datacutter = skillsDataCutter(data);
	var xSelect = skillsSelectCreater(datacutter[0]);
	document.getElementById(location).appendChild(xSelect); //在网页中创建select
	for (var i=0, ii=datacutter[0].length; i<ii; i++) {
		var xDiv = document.createElement("div");
		xDiv.setAttribute("class", "skilldivs");
		xDiv.setAttribute("id", "skill-div"+i);
		xDiv.setAttribute("style", "display: none;");
		var xTable = skillsTableCreater(datacutter[1][i]);
		xDiv.appendChild(xTable);
		document.getElementById(location).appendChild(xDiv);
	}
	skillsInitialize();
}

function skillsInitialize() {
	document.getElementById("skill-div0").setAttribute("style", "display: inline-block;");
}

function skillsSwitcher(value) {
	var skilldivs = document.getElementsByClassName("skilldivs");
	for (var i=0, ii=skilldivs.length; i<ii; i++) {
		skilldivs[i].setAttribute("style", "display: none;");
	}
	skilldivs[value].setAttribute("style", "display: inline-block;");
}

function skillsSelectCreater(labels) {
	var xSelect = document.createElement("select");
	xSelect.setAttribute("id", "skill-selector");
	xSelect.setAttribute("onchange", "skillsSwitcher(this.value);");
	for (var i=0, ii=labels.length; i<ii; i++) {
		var xOption = document.createElement("option");
		xOption.setAttribute("value", i);
		xOption.appendChild(document.createTextNode(labels[i]));
		xSelect.appendChild(xOption);
	}
	return xSelect;
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

function skillsTableCreater(data) {
	// var xP = document.createElement("p");
	// xP.appendChild(document.createTextNode(data));
	// document.body.appendChild(xP);
	var xTable = document.createElement("table");
	xTable.setAttribute("id", "skill-table");
	skillTableHeading(xTable);
	for (var i=0, ii=data.length; i < ii; i++) {
		var xTR = document.createElement("tr");
		xTable.appendChild(xTR);
		xTR.setAttribute("id", "skill-r"+[i]);
		var normal = ("0" + data[i][2]).slice(-2);
		var	hard = ("0" + parseInt(data[i][2]/2)).slice(-2);
		var crit = ("0" + parseInt(data[i][2]/4)).slice(-2);
		var skillArray = [data[i][1], normal+"%", "occu", "inte", "modi", normal, hard, crit];
		for (var j=0, jj=skillArray.length; j < jj; j++) {
			var xTD = document.createElement("td");
			xTD.setAttribute("id", "skill-r"+[i]+"d"+[j]);
			xTD.setAttribute("rowspan", 2);
			xTR.appendChild(xTD);
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
					// xTD.setAttribute("class", "skill-hard");
				case 7:
					// xTD.setAttribute("class", "skill-crit");
					xTD.setAttribute("rowspan", 1);
					xTD.appendChild(document.createTextNode(skillArray[j]));
					var xTR = document.createElement("tr");
					xTable.appendChild(xTR);
					break;
				default:
					xInput = document.createElement("input");
					xInput.setAttribute("type", "text");
					xTD.appendChild(xInput);
			}
		}
	}
	return xTable;
}

function skillTableHeading(xTable) {
	var xTR = document.createElement("tr");
	xTable.appendChild(xTR);
	var heading = ["技能名称", "初始", "职业", "兴趣", "调整", "最终值"];
	for (var i=0, ii=heading.length; i<ii; i++) {
		var xTD = document.createElement("th");
		xTD.appendChild(document.createTextNode(heading[i]));
		if (i==5) {
			xTD.setAttribute("colspan", 2);
		}
		xTR.appendChild(xTD);
	}
}


//	1. 应该做一个单独于表格的按钮 还是为每一个表格做一个按钮
//		单独一个按钮的优势：html更加整洁，位置更加灵活
// 		在表格内做的优势：js更简单（倒数第二行添需要考虑行的命名
//	
function buttonAddRow() {
	
}