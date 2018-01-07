function skillsTableCreater(data,t) {
	var xTable = $("<table></table>")
		.attr("id", "skill-table"+t);
	xTable.append(skillTableHeading());
	var fragTr = document.createDocumentFragment();
	for (var i=0, ii=data.length; i < ii; i++) {
		var xTr = $("<tr></tr>")
			.attr("id", "skill-t"+t+"r"+i);
		var normal	= ("0" + data[i][2]).slice(-2);
		var	hard	= ("0" + parseInt(data[i][2]/2)).slice(-2);
		var crit	= ("0" + parseInt(data[i][2]/4)).slice(-2);
		var skillArray = [data[i][1], normal+"%", "occu", "inte", "modi", normal, hard, crit];
		var fragTd = document.createDocumentFragment()
		for (var j=0, jj=skillArray.length; j < jj; j++) {
			var xTD = $("<td></td>").attr({
				"id"		: "skill-t"+t+"r"+i+"d"+j,
				"rowspan"	: 2
			});
			switch (j) {
			case 0:
				xTD.addClass("skill-name")
				xInput = $("<input></input>").attr({
					"type"			: "text",
					"name"			: "skill-name"+[i],
					"placeholder"	: skillArray[j]
				});
				if (data[i][0]==1) {
					xInput.attr("value", skillArray[j]);
				}
				xTD.append(xInput[0]);
				fragTd.appendChild(xTD[0]);
				break;
			case 1:
				xInput = $("<input></input>").attr({
					"type"			: "text",
					"placeholder"	: skillArray[j],
					"value"			: skillArray[j]
				})
				xTD.append(xInput[0]);
				fragTd.appendChild(xTD[0]);
				break;
			case 5:
				xTD.text(skillArray[j]);
				fragTd.appendChild(xTD[0]);
				break;
			case 6:
				xTD.attr("rowspan", 1).text(skillArray[j]);
				fragTd.appendChild(xTD[0]);
				xTr.append(fragTd);
				fragTr.appendChild(xTr[0]);
				var xTrS = $("<tr></tr>");
				break;
			case 7:
				xTD.attr("rowspan", 1).text(skillArray[j]);
				xTrS.append(xTD);
				fragTr.appendChild(xTrS[0]);
				break;
			default:
				xInput = $("<input></input>").attr("type", "text");
				xTD.append(xInput[0]);
				fragTd.appendChild(xTD[0]);
			}
			
		}
		// var xTrS = document.createElement("tr");
		// var xTdS = fragTd.getElementById("skill-t"+t+"r"+i+"d"+7);
		// $("<p#test><p>").text(xTrS).appendTo($("#skill-holder"));
		// fragTd.insertBefore(xTrS, xTdS);

	}

	xTable.append(fragTr).attr("title", xTable.length);	//xTable的最终行数
	return xTable[0];
}


//	(jQ)xTD[0] == (js)xTD
function skillTableHeading() {
	// $("<p><p>").addClass("test").text(table).appendTo($("#skill-holder"));
	var frag = document.createDocumentFragment();
	var xTr = $("<tr></tr>");
	var headingList = ["技能名称", "初始", "职业", "兴趣", "调整", "最终值"];
	for (var i=0, ii=headingList.length; i<ii; i++) {
		var xTD = $("<th></th>").text(headingList[i]);
		if (i==5) {
			xTD.attr("colspan", 2);
		}
		frag.appendChild(xTD[0]);
	}
	xTr.append(frag);
	return xTr[0];
}