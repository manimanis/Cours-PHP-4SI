var position = 1, 
	maxposition;
$(function() {
	maxposition = $('.cadre').length;
	$('.cadre').each(function (n) {
		$(this)
			.attr('id', 'step' + (n + 1))
			.hide();
		var h2 = $(this).find('h2').text();
		var li = $('<li>');
		var lien = $('<a>').attr('href', '#step' + (n + 1)).text(h2);
		lien.appendTo(li);
		li.appendTo('#sommaire');
		//li.text(h2).appendTo('#sommaire');
	});
	
	$('#step' + position).show();
	
	$('#sommaire a').click(function(e) {
		e.preventDefault();
		var newPosition = parseInt($(this).attr('href').substr(5));
		gotoStep(newPosition);
	});
	
	$('#next').click(function () {
		if (position < maxposition) {
			gotoStep(position + 1);
		} 
	});
	
	$('#prev').click(function () {
		if (position > 1) {
			gotoStep(position - 1);
		}
	});
	
	var offsetX = 10, offsetY = 10, added = false;
	$('a.hover')
		.click(function (e) {
			e.preventDefault();
			var href = $(this).attr('href'),
			    img = $(this).find('img'),
				src = img.attr('src');
			if (src != href) {
				img.attr('src', href);
				$(this).attr('href', src);
			}
		});
	
	buttonsUpdate();
	
	$('#entete h2').click(function() {
		var visible = $(this).data('visible');
		if (visible != true) {
			$('#sommaire').show("slide", { direction: 'up' });
			$(this)
				.data('visible', true)
				.attr('title', 'Cliquer pour cacher le sommaire');
		} else {
			$('#sommaire').hide("slide", { direction: 'up' });
			$(this)
				.data('visible', false)
				.attr('title', 'Cliquer pour afficher le sommaire');
		}
	});
	
	$('#entete h2')
		.attr('title', 'Cliquer pour afficher le sommaire');
});

function gotoStep(newStep) {
	if (newStep > position) {
		$('#step' + position).hide();
		position = newStep;
		$('#step' + position).show("slide", { direction: 'right' });
	} else  {
		$('#step' + position).hide();
		position = newStep;
		$('#step' + position).show("slide");
	}
	buttonsUpdate();
}

function disableNext(value) {
	$('#next').prop('disabled', value);
}

function disablePrevious(value) {
	$('#prev').prop('disabled', value);
}

function buttonsUpdate() {
	disableNext(position >= maxposition);
	disablePrevious(position <= 1);
	$('#lblPage').text('Page ' + position + '/' + maxposition);
}