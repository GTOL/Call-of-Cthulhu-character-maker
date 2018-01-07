// data结构：类型 名称 初始值
// 实现左右分栏 对半分
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

function geneTable(data, location) {
	var datacutter = dataCutter(data);
	document.getElementById(location).appendChild(skillTable(datacutter[0]));
	document.getElementById(location).appendChild(skillTable(datacutter[1]));
	document.getElementById(location).appendChild(skillTable(datacutter[2]));
}

function dataCutter(data) {
	var cutPoint = Math.ceil(data.length/3);
	var data1 = [], data2 = [], data3 = [];
	data1 = data.slice(0,cutPoint);
	data2 = data.slice(cutPoint, 2*cutPoint);
	data3 = data.slice(2*cutPoint);
	return [data1, data2, data3];
}
function skillTable(data) {
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
		if (data[i][0]==0) {
			var xTD = document.createElement("th");
			xTD.setAttribute("colspan", 7);
			xTD.appendChild(document.createTextNode(data[i][1]));
			xTR.appendChild(xTD);
		} else {
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