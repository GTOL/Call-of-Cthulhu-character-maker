$(document).ready(function(){
	//
	// basic
	//

	// lock
	$("#lock-basic").change(() => {
		var checked = $(this).prop("checked");
		$("#name,#player,#occupation,#age,#sex,#residence,#birthplace,#lck-max").prop("disabled", checked);
	});
	//
	// characteristic
	//

	//lock
	$("#lock-charc").change(() => {
		var checked = $(this).prop("checked");
		$("#str,#dex,#int,#con,#app,#pow,#siz,#edu").prop("disabled", checked);
		$("#str-adj,#dex-adj,#int-adj,#con-adj,#app-adj,#pow-adj,#siz-adj,#edu-adj").prop("disabled", checked);
		$("#random-charc-btn,#pow2san-btn").prop("disabled", checked);
	});
	// auto calc table
	$("#str,#dex,#int,#con,#app,#pow,#siz,#edu,#str-adj,#dex-adj,#int-adj,#con-adj,#app-adj,#pow-adj,#siz-adj,#edu-adj").on("input", () => {
		var charc = "#" + $(this.activeElement).prop("id").substring(0,3);
		var adj = charc + "-adj";
		var fin = charc + "-fin";
		var hard = charc + "-hard";
		var vhard = charc + "-vhard";
		var sum = Number($(charc).val()) + Number($(adj).val());
		$(fin).text(sum);
		$(hard).text(parseInt(sum/2))
		$(vhard).text(parseInt(sum/5))
		console.log(Number($(charc).val()) + Number($(adj).val()));
	});
	// hp
	$("#con-final,#siz-final").change(() => {
		var hpMaxRaw = Number($("#con").val()) + Number($("#siz").val());
		$("#hp-max").text("/ " + pad(parseInt(hpMaxRaw / 10)));
	});
});


function pad(number) {
  if (number<=99) { number = ("0"+number).slice(-2); }
  return number;
}