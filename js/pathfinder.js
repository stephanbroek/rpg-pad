function recalcstat(stat)
{
	var sum=0;
	$("."+ stat).each(function(){
		val = parseInt($(this).val(),10);
		if(!isNaN(val))
			sum+=val;	
		
	})
	mod=Math.floor((sum-10)/2)
	$('input[name=' + stat + '-tot]').val(sum);
	$('input[name=' + stat + '-mod]').val((mod>=0 ? "+" : "") + mod);
}