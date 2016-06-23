/* DOKUWIKI:include vendor/esprima.js */
/* DOKUWIKI:include vendor/textarea-caret-position.js */
/* DOKUWIKI:include vendor/jquery.textcomplete.js */


jQuery(document).ready(function () {

	function parseEditBox() {
		var code = jQuery("#wiki__text").text();
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

	function getSuggestions() {
		var code = parseEditBox();
		var jsonObj = [];
		var options = {
			tokens: true,
		};
		if(code != null) {
			for(i = 0; i < code.length; i++) {
				jsonObj.push(esprima.parse(code, options).tokens);
			}
		}
		code = [];
		if(jsonObj != null) {
			for(var i = 0; i < jsonObj[0].length; i++) {
				if(jsonObj[0][i].type == 'Identifier')
					code.push(jsonObj[0][i].value);
			}
			return code;
		}
		return [];
	}

	jQuery(function(){
		jQuery('#wiki__text').textcomplete([ 
    	{ //page search
    		match: /(^|\b)(\w{1,})$/,
    		search: function (term, callback) {
    			var words = getSuggestions();
    			words.push('function');
    			callback(jQuery.map(words, function (word) {
    				return word.indexOf(term) === 0 ? word : null;
    			}));
    		},
    		template: function (value) {
    			return value;
    		},
    		replace: function (word) {
    			if(word == 'function')
    				return 'function() {\n\n}';
    			return word + ' ';
    		}
    	}
    	])
	});
});
