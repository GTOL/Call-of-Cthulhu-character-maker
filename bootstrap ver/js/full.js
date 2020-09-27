$(document).ready(function() {
	//
	// basic
	//

	// lock
	$("#lock-basic").change(function() {
		var checked = $(this).prop("checked");
		$("#name,#player,#occupation,#age,#sex,#residence,#birthplace,#lck-max").prop("disabled", checked);
	});

	// image
	$("#upload-img").change(function() {
		var file = $(this).prop("files")[0];
		var fr = new FileReader();
		fr.onload = function() {
			$("#img").prop("src", fr.result);
		}
		//fr.readAsBinaryString(file);
		fr.readAsDataURL(file);
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
	// occupation skill points
	$("#str-fin,#dex-fin,#pow-fin,#app-fin,#edu-fin").change(calcOsp);
	// interest skill points
	$("#int-fin").change(calcIsp);

	//
	// skill
	//

	// formula selection
	$("#osp-formula").change(selectOspFormula);
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
		mov = 7;
	} else if(dex>siz && str>siz){
		mov = 9;
	} else{
		mov = 8;
	}
	var adj = age < 40 ? "" : " - " + parseInt((age - 30) / 10);
	$("#mov").text(mov + adj);
}

function selectOspFormula() {
	var val = $("#osp-formula").val();
	if (val == -1) {
		$("#osp-max").prop("disabled", false);
		$("#osp-max").removeClass("form-control-plaintext");
		$("#osp-max").addClass("form-control");
	} else {
		$("#osp-max").prop("disabled", true);
		$("#osp-max").removeClass("form-control");
		$("#osp-max").addClass("form-control-plaintext");
	}
	calcOsp();
}

function calcOsp() {
	var val = $("#osp-formula").val();
	var edu = Number($("#edu-fin").text());
	var str = Number($("#str-fin").text());
	var dex = Number($("#dex-fin").text());
	var pow = Number($("#pow-fin").text());
	var app = Number($("#app-fin").text());
	switch (val) {
		case "1":
			$("#osp-max").val(edu * 4).trigger("change");
			break;
		case "2":
			$("#osp-max").val(edu * 2 + str * 2).trigger("change");
			break;
		case "3":
			$("#osp-max").val(edu * 2 + dex * 2).trigger("change");
			break;
		case "4":
			$("#osp-max").val(edu * 2 + pow * 2).trigger("change");
			break;
		case "5":
			$("#osp-max").val(edu * 2 + app * 2).trigger("change");
			break;
		default:
			break;
	}
}

function calcIsp() {
	var int = Number($("#int-fin").text());
	$("#isp-max").text(int * 2).trigger("change");
}

function loadSkills(json) {

}