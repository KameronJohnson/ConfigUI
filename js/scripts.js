$(document).ready(function() {
	
	
    //access the CKEDITOR.editor object using the editor property
	var editor1 = $( 'textarea#editor1' ).ckeditor().editor;
    
	
    //sample json
	$('#json').jstree({
		'core' : {
		  'data' : [
			{"id" : 1, "text" : "Hello, Addama", "title" : "Hello, Kameron "},
			{"id" : 2, "text" : "Hello, David the Gnome", "title" : "Hello, Swift "},
		  ]
		},


		//load plugins
		"plugins" : [ "dnd", "search", "sort", "unique", "themes", "ui"],


		  //apple theme
		"themes" : {
			"theme" : "apple"
		}
	});
	
	var texty = {

	1 : "Hello, Kameron ",
	2 : "Hello, Swift "
	}
	
	//insert data to editor1 
	$("#json").on("select_node.jstree",
			function(evt, data) {
				editor1.insertText(texty[data.node.id]);
	});	
    
	//registers var editor1 as a listener to 'drop' event
    editor1.on('drop', onDrop);
	
	function onDrop(evt) {
		console.log("droppppp");
		console.log(evt);
	}

    
    //search function
    $("#s").submit(function(e) {
        e.preventDefault();
        $("#container").jstree(true).search($("#q").val());
    });
    
    
    //notification of changed event
	$('#json').on("changed.jstree", function (e, data) {
	//log out text of node
		console.log(data.instance.get_selected(true)[0].text);
		console.log(data.instance.get_node(data.selected[0]).text);
	});

    
//<!--    Sample JQuery drag / drop-->
    


    $(function () {
//        $('#tree').jstree({
//            'plugins': [ 'dnd' ]
//        });
//
//        $('.drag')
//            .on('mousedown', function (e) {
//                return $.vakata.dnd.start(e, { 'jstree' : true, 'obj' : $(this), 'nodes' : 
//											  [{ id : true, text: $(this).text() }] }, 
//				'<div id="jstree-dnd" class="jstree-default"><i class="jstree-icon jstree-er"></i>' + 
//										  $(this).text() + '</div>');
//            });
		
        $(document)
            .on('dnd_move.vakata', function (e, data) {
                var t = $(data.event.target);
                if(!t.closest('.jstree').length) {
                    if(t.closest('.drop').length) {
                        data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');
                    }
                    else {
                        data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
                    }
                }
            })
            .on('dnd_stop.vakata', function (e, data) {
                var t = $(data.event.target);
                if(!t.closest('.jstree').length) {
                    if(t.closest('.drop').length) {
                        $(data.element).clone().appendTo(t.closest('.drop'));
                        // node data: 
                        // if(data.data.jstree && data.data.origin) { console.log(data.data.origin.get_node(data.element); }
                    }
                }
            });
  });
    
    
});