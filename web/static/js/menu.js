
newEndEffector = deleteCurrentDocument = newProject = saveProject = openProject = deleteProject = function(){

	alert('action');

}

modal = function( title , inputs, defaults, action ) {

	$('#modalForm').empty();
	$('#modal').show();
	$('#modalTitle').text(title);
	for (var i = (inputs.length - 1); i > (-1); i--){
		$('#modalForm').append( $('<label>').text( inputs[i].text + ": " ));
		$('#modalForm').append( $('<input>').attr('type', inputs[i].type).attr('name', inputs[i].inputName));
		$('#modalForm').append( $('<br>'));
	};
	$('#modalForm').append( "<button id=modalButton>Okay</button");
	$('#modalForm').append( "<button id=modalCancel>Cancel</button");

	$('#modalButton').click( function(){
		formdata = {};
		$('#modalForm input').each(function(i,val) { formdata[$(val).attr('name')] = $(val).val() });
		action( formdata );
		$('#modalForm').empty();
		$('#modal').hide();
	});
	$('#modalCancel').click( function(){
		$('#modalForm').empty();
		$('#modal').hide();
	});

}


//////////////////////////////
////Project Functions
//////////////////////////////

currentLoadedProject = {"subroutines":{}};
savedProject = currentLoadedProject

notSaved = true;

loadProjectFromServer = function ( name ) {

	name = window.prompt("project name", "frank");
	$.get('/project', {"name": name}, function(data){
		if(notSaved){
			alert('loading over not saved stuff. sorry');
		}
		currentLoadedProject = data;
		console.log(currentLoadedProject);
		updateProject();
	
	});

}

saveProjectToServer = function ( name ) {

	if(notSaved){
		$.post('/project', currentLoadedProject);
	}

}


updateSubsList = function() {
	
	sortedSubs = Object.keys(currentLoadedProject.subroutines).sort(function(a, b){
	    if(a < b) return 1;
	    if(a > b) return -1;
	    return 0;
	});

	$('#subsNavList').empty();

	for (var sub in sortedSubs) {

		addNavItem('#subsNavList',sortedSubs[sub],sortedSubs[sub]);
	}

	$('#subsNavList').append( 
		$("<li>").append(
			$("<a>").text('add new...').addClass( "inverseHover" ).click(newSubroutine).attr("href", "#")
		) 
	);


}

loadfile = function( loadingDocName ){

	if (typeof loadingDocName !== 'string') {
		loadingDocName = $(this).text();
	}
	currentDocName = $('#file-name').text();
	if(currentDocName !== ""){
		currentLoadedProject.subroutines[ currentDocName ] = $('#code-area').val();
	}
	$('#code-area').val(currentLoadedProject.subroutines[loadingDocName]);
	$('#file-name').text(loadingDocName);

}

updateProject = function () {

	//update project subroutines based on currentLoadedProject
	alert('throwing it up on the screen, yo');

}


newProject = function() {

	inputs = [{"text":"Project Type", "type":"text", "inputName":"projectType"}, 
		{"text":"Project Name", "type":"text", "inputName":"projectName"}];

	modal( 'New Project' , inputs , "", function(args) {

		$.post('/newproject', args, function(data){ alert(JSON.stringify(data)); });
		
	});

}

newSubroutine = function() {

	inputs = [{"text":"Subroutine Name", "type":"text", "inputName":"subroutineName"}];

	modal( 'New Subroutine' , inputs , "", function(args) {
		if(!(args['subroutineName'] in Object.keys(currentLoadedProject.subroutines))){
			currentLoadedProject.subroutines[args['subroutineName']] = "";
			updateSubsList();
			loadfile(args['subroutineName']);
		} else {
			alert('name already exists, dude');
		}
	
	});

}


addMenuItem = function( menuID , itemText , itemAction ) {

	if (typeof itemAction === 'undefined') {
		$(menuID).append( $("<span>").text(itemText));
	} else {
		$(menuID).append( $("<a>").text(itemText).addClass( "inverseHover" ).click(itemAction).attr("href", "#"));
	}

};


addNavItem = function( navID , itemText , filename ) {

	if (typeof filename === 'undefined') {
		$(navID).append( $("<span>").text(itemText));
	} else {
		navLink = $("<a>").text(itemText).addClass( "inverseHover" ).click(loadfile).attr("href", "#");
		$(navID).prepend( $("<li>").append(navLink) );
	}



};

addMenuItems = function() {
	addMenuItem('#file-menu','Document');
	addMenuItem('#file-menu','New Subroutine..',newSubroutine);
	addMenuItem('#file-menu','New End Effector..',newEndEffector);
	addMenuItem('#file-menu','Delete Document',deleteCurrentDocument); //change this to deleteDocument( thisLodadedDoc ); openNextDoc();
	addMenuItem('#file-menu','Project');
	addMenuItem('#file-menu','New Project..', newProject);
	addMenuItem('#file-menu','Save Project..', saveProjectToServer);
	addMenuItem('#file-menu','Open Project..', loadProjectFromServer);
	addMenuItem('#file-menu','Delete Project..', deleteProject);
}

loadAnimations = function() {
	$('.dropdown > a').on( "click", function(e){ 
		if(!$('.dropdown div').is(':visible')) {

		$('.dropdown > a').css('background-color', '#000');
		$('.dropdown > a').css('color', '#0F0');
		$('.dropdown div').show();

		} else {
		//alert('yo');
		$('.dropdown > a').css('background-color', '#0F0');
		$('.dropdown > a').css('color', '#000');
		$('.dropdown div').hide();

		}

	});

	$('.dropdown').on( "mouseleave", function(e) {
		$('.dropdown > a').css('background-color', '#0F0');
		$('.dropdown > a').css('color', '#000');
		$('.dropdown div').hide();

	});


	$('.inverseHover').on( "mouseover", function(e) {
		$(this).css('background-color', '#0F0');
		$(this).css('color', '#000');

	});

	

	$('.inverseHover').on( "mouseout", function(e) {

		$(this).css('background-color', '#000');
		$(this).css('color', '#0F0');

	});
}


$(document).ready( function() {


	//on document load, load all of the menu items
	addMenuItems();
	updateSubsList();
	loadAnimations();


});

