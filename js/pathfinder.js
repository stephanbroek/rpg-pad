function recalcstat(stat)
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

function setup()
{
	recalcstat("str");
	recalcstat("dex");
	recalcstat("con");
	recalcstat("int");
	recalcstat("wis");
	recalcstat("cha");
}