
newSubRoutine = newEndEffector = deleteCurrentDocument = newProject = saveProject = openProject = deleteProject = function(){

	alert('action');

}

modal = function( title , inputs, defaults, action ) {

	$('#modal').show();
	$('#modalTitle').text(title);
	for (var i = (inputs.length - 1); i > (-1); i--){
		$('#modalForm').append( $('<label>').text( inputs[i].text + ": " ));
		$('#modalForm').append( $('<input>').attr('type', inputs[i].type).attr('name', inputs[i].inputName));
		$('#modalForm').append( $('<br>'));
	};
	$('#modalForm').append( "<button id=modalButton>Okay</button");

	$('#modalButton').click( function(){
		action();
		$('#modal').empty();
		$('#modal').hide();
	});

}

newProject = function() {

	inputs = [{'text':'Project Type', 'type':'text', 'inputName':'projectType'}, 
		{'text':'Project Name', 'type':'text', 'inputName':'projectName'}];

	modal( 'New Project' , inputs , "", function(args) {

		$.post('/newproject', args);

	});

}

addMenuItem = function( menuID , itemText , itemAction ) {

	if (typeof itemAction === 'undefined') {
		$(menuID).append( $("<span>").text(itemText));
	} else {
		$(menuID).append( $("<a>").text(itemText).addClass( "inverseHover" ).click(itemAction).attr("href", "#"));
	}

};


addMenuItems = function() {
	addMenuItem('#file-menu','Document');
	addMenuItem('#file-menu','New Subroutine..',newSubRoutine);
	addMenuItem('#file-menu','New End Effector..',newEndEffector);
	addMenuItem('#file-menu','Delete Document',deleteCurrentDocument); //change this to deleteDocument( thisLodadedDoc ); openNextDoc();
	addMenuItem('#file-menu','Project');
	addMenuItem('#file-menu','New Project..', newProject);
	addMenuItem('#file-menu','Save Project..', saveProject);
	addMenuItem('#file-menu','Open Project..', openProject);
	addMenuItem('#file-menu','Delete Project..', deleteProject);
}

$(document).ready( function() {


	//on document load, load all of the menu items
	addMenuItems();

	$('.dropdown > a').click( function(){ 

		if(!$('.dropdown div').is(':visible')) {

		$('.dropdown > a').css('background-color', '#000');
		$('.dropdown > a').css('color', '#0F0');
		$('.dropdown div').show();

		} else {

		$('.dropdown > a').css('background-color', '#0F0');
		$('.dropdown > a').css('color', '#000');
		$('.dropdown div').hide();

		}

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


});

