/* DOKUWIKI:include vendor/esprima.js */
/* DOKUWIKI:include vendor/jquery.textcomplete.js */




jQuery(function() {

	//globals
	var githubSuggestions, wikiPageSuggestions ,words = [];

	function insertGitHubButtonButton() {

    	// create ToolBar Button with git_autocomplete id and add it to the toolbar
    	var toolbarObj = document.getElementById('tool__bar');
    	if (toolbarObj == null)
    		return;

    	this.buttonObj = createToolButton('../../plugins/contentassist/github.png','Setup Github Autocomplete','g','git_autocomplete');
    	createModalInputs();
    	this.buttonObj.onclick = function(){clickToggle();};
    	toolbarObj.appendChild(this.buttonObj);
    }

    function insertLinkButtonButton() {

    	// create ToolBar Button with git_autocomplete id and add it to the toolbar
    	var toolbarObj = document.getElementById('tool__bar');
    	if (toolbarObj == null)
    		return;

    	this.buttonObj = createToolButton('../../plugins/contentassist/link.png','Setup Dokuwiki Autocomplete','l','doku_autocomplete');
    	createModalInputsDoku();
    	this.buttonObj.onclick = function(){clickToggleDoku();};
    	toolbarObj.appendChild(this.buttonObj);
    }

    //click toggle for form-dialog
    function clickToggle() {
    	if(jQuery("#dialog-form").dialog('isOpen'))
    		jQuery("#dialog-form").dialog("close");
    	else jQuery("#dialog-form").dialog("open");
    }

     function clickToggleDoku() {
    	if(jQuery("#doku-form").dialog('isOpen'))
    		jQuery("#doku-form").dialog("close");
    	else jQuery("#doku-form").dialog("open");

    	makeDokuAjaxCall();
    }

    function makeDokuAjaxCall(){
		
		link = jQuery("#link");
		link.removeClass( "ui-state-error" );


    	jQuery.ajax({url: "lib/exe/ajax.php",type: "POST", data: {call: 'linkwiz', q: link.val()} , 
    		success: function(result){
		        console.log(result);
		        var divs = '<div id="results"></div>';
		      	jQuery("#results").remove();
		        jQuery("#doku-form").append(divs);
		        jQuery("#results").html(result);
		    	}, 
		    error: function(){
		    		updateTip("Error getting content, check if your git fields are valid.");
		    	}});
    }


    function addDokuSuggestionsAjaxCall(link){

    	
		link.removeClass( "ui-state-error" );

		console.log("link.val() = "+ link.val());
    	jQuery.ajax({url: "lib/exe/ajax.php",type: "POST", data: {call: 'linkwiz', q: link.val()} , 
    		success: function(result){
		        console.log(result);
		        wikiPageSuggestions = getSuggestions(parsePageContentBox(result));
		    	}, 
		    error: function(){
		    		updateTip("Error getting content, check if your git fields are valid.");
		    	}});

    }

    function onResultClick(e){
        if(!jQuery(this).is('a')) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        resultClick(this);
        return false;
    };
    /**
     * Handles the "click" on a given result anchor
     */
    function resultClick(a){
        if(a.title == '' || a.title.substr(a.title.length-1) == ':'){
            console.log("mudar valor em cima e chamar auto-complete");
            jQuery("#link").val(a.title);


        }else{
            console.log("mudar valor em cima para o selecionado");
            jQuery("#link").val(a.title);

        }
        makeDokuAjaxCall();
    };


    //makes github ajax call to get contents
    function makeGitAjaxCall(owner, repos, branch, path) {

    	owner.removeClass( "ui-state-error" );
    	repos.removeClass( "ui-state-error" );
    	branch.removeClass( "ui-state-error" );
    	path.removeClass( "ui-state-error" );

    	if (owner.val().length < 1) {
        	owner.addClass( "ui-state-error" );
        	updateTip('Owner cannot be empty. </br>Ex: Orpheuz');
        	return;
    	}
    	if (repos.val().length < 1) {
        	repos.addClass( "ui-state-error" );
        	updateTip('Owner cannot be empty.</br>Ex: Solar-System-Motion-Simulator');
        	return;
    	}
    	if (branch.val().length < 1) {
        	branch.addClass( "ui-state-error" );
        	updateTip('Owner cannot be empty. </br>Ex: master');
        	return;
    	}
    	if (path.val().length < 1) {
        	path.addClass( "ui-state-error" );
        	updateTip('Owner cannot be empty. </br>Ex: js/RingGeometryUV.js');
        	return;
    	}

    	jQuery.ajax({
    		url: 'https://raw.githubusercontent.com/' + owner.val() + '/' + repos.val() + '/' + branch.val() + '/' + path.val(),
    		success: function(results)
    		{
    			githubSuggestions = getSuggestions(results);
    			updateTip('Auto-complete updated!');
    			jQuery('#dialog-form').dialog('close');

    		},
    		error: function()
    		{
    			updateTip("Error getting content, check if your git fields are valid.");
    		}
    	});
    }

    //updates the validation tips
    function updateTip(t) {
      jQuery('.update-tip')
        .html(t)
        .addClass("ui-state-highlight");
      setTimeout(function() {
        jQuery('.update-tip').removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }

    //creates the modal input window
    function createModalInputs() {
    	var dialog, owner, repos, branch, path, formDiv = document.createElement('div');
    	formDiv.innerHTML = '<div id="dialog-form" title="Setup Github page"><p class="update-tip">All form fields are required.</p><form><fieldset><input type="text" name="owner" placeholder=" Owner" id="owner" class="text ui-widget-content ui-corner-all"><input type="text" name="repos" placeholder=" Repository" id="repos" class="text ui-widget-content ui-corner-all"><input type="text" name="branch" placeholder=" Branch" id="branch" class="text ui-widget-content ui-corner-all"><input type="text" name="path" placeholder=" Path" id="path" class="text ui-widget-content ui-corner-all"><input type="submit" tabindex="-1" style="position:absolute; top:-1000px"></fieldset></form></div>';
    	document.body.appendChild(formDiv);
    	dialog = jQuery('#dialog-form');
    	form =  dialog.find("form");
    	owner = jQuery("#owner");
    	repos = jQuery("#repos");
    	branch = jQuery("#branch");
    	path = jQuery("#path");
    	form = dialog.find("form").on("submit", function(event) {
    		event.preventDefault();
    		makeGitAjaxCall(owner, repos, branch, path);
    	});
    	dialog.dialog({
    		autoOpen: false,
    		height: 320,
    		width: 350,
    		modal: true,
    		open: function(event, ui) {
      			jQuery(this).dialog('widget').position({ my: "center", at: "center", of: window });
    		},
    		buttons: {
    			"Update": function() {makeGitAjaxCall(owner, repos, branch, path);},
    			Cancel: function() {
    				dialog.dialog("close");
    			}
    		},
    		close: function() {
    			form[0].reset();
    			owner.removeClass( "ui-state-error" );
    			repos.removeClass( "ui-state-error" );
    			branch.removeClass( "ui-state-error" );
    			path.removeClass( "ui-state-error" );
    		}
    	});
    	return;
    }

    function createModalInputsDoku() {
    	var dialog, link,form, formDiv = document.createElement('div');
    	formDiv.innerHTML = '<div id="doku-form" title="Setup Dokuwiki page"><p class="update-tip">All form fields are required.</p><form><fieldset><input type="text" name="link" placeholder=" Link" id="link" class="text ui-widget-content ui-corner-all" ><input type="submit" tabindex="-1" style="position:absolute; top:-1000px"></fieldset></form></div> <div id="doku-results" title="Results"> </div>';
    	document.body.appendChild(formDiv);
    	dialog = jQuery('#doku-form');
    	form =  dialog.find("form");
    	link = jQuery("#link");
    	form = dialog.find("form").on("submit", function(event) {
    		event.preventDefault();
    		addDokuSuggestionsAjaxCall(link);
    	});
    	dialog.dialog({
    		autoOpen: false,
    		height: 320,
    		width: 350,
    		modal: true,
    		open: function(event, ui) {
      			jQuery(this).dialog('widget').position({ my: "center", at: "center", of: window });
    		},
    		buttons: {
    			"Add Page to Autocomplete": function() {addDokuSuggestionsAjaxCall(link)},
    			Cancel: function() {
    				dialog.dialog("close");
    			}
    		},
    		close: function() {
    			form[0].reset();
    			link.removeClass( "ui-state-error" );
    		}
    	});
    	return;
    }


    //parse code from editBox
    function parseEditBox() {
    	var code = jQuery("#wiki__text").val();
    	var codeStr = code.match(/(<code>(.|\n)*?<\/code>)+/g);
    	if(codeStr != null) {
    		for(i = 0; i < codeStr.length; i++) {
    			codeStr[i] = codeStr[i].replace('<code>', '');
    			codeStr[i] = codeStr[i].replace('</code>', '');
    			codeStr[i] = codeStr[i].replace('\n', '');
    		}
    		return codeStr;
    	}	
    	return '';
    }

  

    //parse code from other dokuwiki pages
    function parsePageContentBox(code) {
    	var codeStr = code.match(/(<pre class="code">(.|\n)*?<\/pre>)+/g);
    	if(codeStr != null) {
    		for(i = 0; i < codeStr.length; i++) {
    			codeStr[i] = codeStr[i].replace('<pre class="code">', '');
    			codeStr[i] = codeStr[i].replace('</pre>', '');
    			codeStr[i] = codeStr[i].replace('\n', '');
    		}
    		return codeStr;
    	}	
    	return '';
    }

    //parse tokens from code and extract it's identifiers
    function getSuggestions(code) {
    	var jsonObj = [];
    	var options = {
    		tokens: true,
    	};
    	if(code != null) {
    		for(i = 0; i < code.length; i++) {
    			try {
    				var parse = esprima.parse(code, options).tokens;
    				jsonObj.push(parse);
    			}
    			catch(e) {
    				console.log(e.name + ': ' + e.message);
    			}
    		}
    	}
    	code = [];
    	if(jsonObj[0] != null) {
    		for(var i = 0; i < jsonObj[0].length; i++) {
    			if(jsonObj[0][i].type == 'Identifier')
    				code.push(jsonObj[0][i].value);
    		}
    		return code;
    	}
    	return [];
    }

    //make ajax call to get page content TODO: implement and possibly add more pages
    function getAjaxData(page) {
    	jQuery.post( 
    		DOKU_BASE + 'lib/exe/ajax.php',
    		{call:'autocomplete_pageCnt',
    		pageid: 'test'
    	},
    	function (data) {
    		console.log(data);
    	});
    }

    //reserved words to add to auto complete 
    function reservedWords() {
    	words.push('function');
    	words.push('console');
    	words.push('length');
    	words.push('value');
    	words.push('document');
    	words.push('for');
    	words.push('while');
    }

    //auto-complete listener
    jQuery('#wiki__text').textcomplete([{
    	match: /(^|\b)(\w{1,})$/,
    	search: function (term, callback) {
    		var suggestions = getSuggestions(parseEditBox());
    		suggestions.push.apply(suggestions, words);
    		suggestions.push.apply(suggestions, githubSuggestions);
    		callback(jQuery.map(suggestions, function (word) {
    			return word.indexOf(term) === 0 ? word : null;
    		}));
    	},
    	template: function (value) {
    		return value;
    	},

    	replace: function (word) {
    		if(word == 'function')
    			return ['function','() {\n\n}'];
    		if(word == 'for') {
    			return ['var i;\nfor (i = 0; i < ','.length; i++) {\n\n}'];
    		}
    		if(word == 'while'){
    		return ['while','(i == 0) {\n\n}'];
    		}
    		return word + ' ';
    	}
    }]);

     function startLinkListener() {
	    jQuery("#doku-form").delegate('a', 'click', onResultClick);
	    jQuery("#link").keyup(makeDokuAjaxCall);
    }

    function init() {
    	reservedWords();
    	insertGitHubButtonButton();
    	insertLinkButtonButton();
    	startLinkListener();
    }

    init();
});


