function updateStat(stat)
{
	var sum = 0;
	$("." + stat).each(function() {
		val = parseInt($(this).val(),10);
		if(!isNaN(val))
			sum += val;	
		
	});
	mod=Math.floor((sum-10)/2);
	$('#' + stat + '-tot').html(sum);
	$('#' + stat + '-mod').html((mod>=0 ? "+" : "") + mod);

	$("#skls .abl." + stat).each(function() {
		$(this).html(mod);
		$(this).trigger('change');
	});
}

function updateClass(cls)
{
	var sum = 0;
	$(".cls-" + cls).each(function() {
		val = parseInt($(this).val(),10);
		if(!isNaN(val))
			sum += val;
	});
	$("#cls-tot-" + cls).html(sum);
}

function updateSkill(skill)
{
	var rank = parseInt($("div#skls tr#" + skill + " .rank").val(), 10);
	if(isNaN(rank))
		rank = 0;

	var abl =  parseInt($("div#skls tr#" + skill + " .abl").html(), 10);
	var msc = 0;
	$("div#skls #" + skill + " .msc").each(function() {
		val = parseInt($(this).val(),10);
		if(!isNaN(val))
			msc += val;	
	});

	var trained = $("div#skls tr#" + skill + " .tick").is(':checked') && rank>0 ? 3 : 0;

	$("div#skls tr#" + skill + " td.trn").html(trained);

	var pen = $("div#skls tr#" + skill).hasClass("pen") ? parseInt($("div#skills span#pen").html(), 10) : 0;

	var tot = !($("div#skls tr#" + skill).hasClass("trn") && rank == 0) ? rank + abl + trained + msc + pen : "---";

	$("div#skls #" + skill + " .tot").html(tot);

	var ranks = 0;
	var skills = 0;

	var test = $("div#skls tr").each(function() {
		var id = $(this).attr("id");

		if(id == undefined)
			return;

		rank = parseInt($("div#skls tr#" + id + " input.rank").val(), 10);

		ranks += !isNaN(rank) ? rank : 0;

		skills += !isNaN(rank) && rank>0 ? 1 : 0;

	});

	$("div#skls-title span#ranks").html(ranks);
	$("div#skls-title span#skills").html(skills);


}

function updateCustSkill(skill)
{
	var stat = $("div#skls tr#" + skill + " .stat select").val();
	var mod = parseInt($('#' + stat + '-mod').html(), 10);
	$("div#skls tr#" + skill + " .abl").html(mod);
	$("div#skls tr#" + skill + " .abl").attr('class', "abl " + stat);
	updateSkill(skill);
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
	} else if(cur > 0-parseInt($("#con-tot").html(),10)){
		level = "crit";
	} else {
		level = "dead";
	}

	$("#cur-hp").attr("class",level);

	//prevent browser from completing form
	return false;
}

function resethealth() {
	$("#offset-hp").val(0);
	health();
}

function setup()
{
	var stats = ["str", "dex", "con", "int", "wis", "cha"];
	$.each(stats, function(key, val) {
		$("." + val).each(function() {
			$(this).on('blur', function() {
				updateStat(val);
			});
		});	
		updateStat(val);
	});
	$('.con').on('change', function() {
		health();
	});
	health();
	var classes = ["bab", "skls", "fort", "ref", "will", "lvls"];
	$.each(classes, function(key, val) {
		$(".cls-" + val).each(function() {
			$(this).on('change', function() {
				updateClass(val);
			});
			updateClass(val);
		});
	});

	var cus = ['cus1', 'cus2', 'cus3', 'cus4'];
	$.each(cus, function(key, val) {
		$("div#skls tr#" + val + " .stat").on('change', function() {
			updateCustSkill(val);
		});
		updateCustSkill(val);
	});

	var skills = ["acro", "aprs", "bluf", "clmb", 'crf1', 'crf2', 'dipl', 'ddev', 'disg', 'esca', 'fly', 'han', 'heal', 'itmd', 'kn1', 'kn2', 'kn3', 'kn4', 'kn5', 'kn6', 'ling', 'perc', 'perf', 'prof', 'ride', 'sens', 'slig', 'spel', 'slth', 'slig', 'surv', 'swim', 'magd', 'cus1', 'cus2', 'cus3', 'cus4'];
	$.each(skills, function(key, val) {
		$("div#skls tr#" + val + " input").each(function() {
			$(this).on('change', function() {
				updateSkill(val);
			});
		});

		$("div#skls tr#" + val + " td.abl").on('change', function() {
			updateSkill(val);
		})

		updateSkill(val);
	});
}