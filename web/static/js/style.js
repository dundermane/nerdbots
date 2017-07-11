$('.dropdown > a').click( function(){ 

	$('.dropdown > a').css('background-color', '#000');
	$('.dropdown > a').css('color', '#0F0');

});

$('.dropdown').mouseleave( function() {

	$('.dropdown > a').css('background-color', '#0F0');
	$('.dropdown > a').css('color', '#000');
	$('.dropdown div').hide();

});

$('.inverseHover').mouseover( function() {

	$(this).css('background-color', '#0F0');
	$(this).css('color', '#000');

});

$('.inverseHover').mouseout( function() {

	$(this).css('background-color', '#000');
	$(this).css('color', '#0F0');

});

