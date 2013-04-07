function stat(stat)
{
	var sum=0;
	$("."+ stat).each(function(){
		val = parseInt($(this).val(),10);
		if(!isNaN(val))
			sum+=val;	
		
	})
	mod=Math.floor((sum-10)/2);
	$('#' + stat + '-tot').html(sum);
	$('#' + stat + '-mod').html((mod>=0 ? "+" : "") + mod);
}

function health()
{
	var max = parseInt($("#max-hp").val(),10);
	var change = parseInt($("#change-hp").val(),10);
	var offset = parseInt($("#offset-hp").val(),10);
	max = !isNaN(max) ? max : 0;
	change = !isNaN(change) ? change : 0;
	offset = !isNaN(offset) ? offset : 0;
	offset = offset + change;
	var cur = max + offset;
	$("#cur-hp").html(cur);
	$("#offset-hp").val(offset);
	$("#change-hp").val("");

	var level;
	var ratio = cur / max;
	if(ratio>1)
	{
		level = "excelent";
	} else if(ratio>0.5) {
		level = "normal";
	} else if(ratio>0.2) {
		level = "medium";
	} else if(ratio>0) {
		level = "low";
	} else if(cur >= 0-parseInt($("#con-tot").html(),10)){
		level = "crit";
	} else {
		level = "dead";
	}

	$("#cur-hp").attr("class",level);

	//prevent browser from completing form
	return false;
}

function setup()
{
	stat("str");
	stat("dex");
	stat("con");
	stat("int");
	stat("wis");
	stat("cha");
	health();
}