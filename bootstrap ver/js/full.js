$(document).ready(function() {
	//
	// basic
	//

	// lock
	$("#lock-basic").change(function() {
		var checked = $(this).prop("checked");
		$("#name,#player,#occupation,#age,#sex,#residence,#birthplace,#lck-max").prop("disabled", checked);
	});
	//
	// characteristic
	//

	//lock
	$("#lock-charc").change(function() {
		var checked = $(this).prop("checked");
		$("#str,#dex,#int,#con,#app,#pow,#siz,#edu").prop("disabled", checked);
		$("#str-adj,#dex-adj,#int-adj,#con-adj,#app-adj,#pow-adj,#siz-adj,#edu-adj").prop("disabled", checked);
		$("#random-charc-btn,#update-san-button").prop("disabled", checked);
	});
	// auto calc table
	$("#str,#dex,#int,#con,#app,#pow,#siz,#edu,#str-adj,#dex-adj,#int-adj,#con-adj,#app-adj,#pow-adj,#siz-adj,#edu-adj").on("input", function() {
		var charc = "#" + $(this).prop("id").substring(0,3);
		var adj = charc + "-adj";
		var fin = charc + "-fin";
		var hard = charc + "-hard";
		var vhard = charc + "-vhard";
		var sum = Number($(charc).val()) + Number($(adj).val());
		$(fin).text(sum).trigger("change");
		$(hard).text(parseInt(sum/2)).trigger("change");
		$(vhard).text(parseInt(sum/5)).trigger("change");
		if (sum <= 0) {
			$(fin).add(hard).add(vhard).addClass("bg-warning")
		} else {
			$(fin).add(hard).add(vhard).removeClass("bg-warning")
		}
	});
	// db & build
	$("#str-fin,#siz-fin").change(calcDbAndBuild);
	// hp
	$("#con-fin,#siz-fin").change(calcHp);
	// mp
	$("#pow-fin").change(calcMp);
	// mov
	$("#str-fin,#dex-fin,#siz-fin").change(calcMov);
});


function pad(number) {
  if (number<=99) { number = ("0"+number).slice(-2); }
  return number;
}

function calcDbAndBuild() {
	var str = Number($("#str-fin").text());
	var siz = Number($("#siz-fin").text());
	if (str+siz<65) {
		var db = -2, build = -2;
	} else if (str+siz<85) {
		var db = -1, build = -1;
	} else if (str+siz<125) {
		var db = 0, build = 0;
	} else if (str+siz<165) {
		var db = "+1d4", build = 1;
	} else if (str+siz<205) {
		var db = "+1d6", build = 2;
	} else {
		var db = "+"+parseInt((str+siz-44)/80)+"d6";
		var build = parseInt((str+siz+35)/80);
	}
	$("#db").text(db).trigger("change");
	$("#build").text(build).trigger("change");
}

function calcHp() {
	var hpMaxRaw = Number($("#con-fin").text()) + Number($("#siz-fin").text());
	$("#hp-max").text("/ " + pad(parseInt(hpMaxRaw / 10))).trigger("change");
}

function calcMp() {
	$("#mp-max").text("/ " + pad(parseInt(Number($("#pow-fin").text()) / 5))).trigger("change");
}

function calcMov() {
	var dex = Number($("#dex-fin").text());
	var str = Number($("#str-fin").text());
	var siz = Number($("#siz-fin").text());
	var age = Number($("#age").val());
	var mov;
	if (dex<siz && str<siz) {
		mov = 7
	} else if(dex>siz && str>siz){
		mov = 9
	} else{
		mov = 8
	}
	var adj = age < 40 ? "" : " - " + parseInt((age - 30) / 10);
	$("#mov").text(mov + adj);
}