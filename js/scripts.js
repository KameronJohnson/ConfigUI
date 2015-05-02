

var jsonObj = {
			"ID": "TestHTML",
			"On": true,
			"From": {
				"Email": "?<RequiredProps1.FromEmail>?",
				"Name": "?<RequiredProps1.SenderName>?"
			},
			"Subject": {
				"Text": "Warranty Repair Notification"
			},
			"BodyHTML": {
				"Text": "[[TextFiles.C:\\misc\\_src\\SAP\\ServiceLayers\\MailService\\bin\\x86\\Debug\\Config\\HTML\\FW RMA for Warranty Repair.htm]]",
				"TokenSettings": {
					"StartToken": "[[",
					"EndToken": "]]",
					"LevelDelimiter": "."
				}
			},
			"To": [{
				"Email": "?<RequiredProps1.ToEmail>?"
			}],
			"Attachments": [{
				"Type": "ExistingFile",
				"Source": "C:\\misc\\_src\\SAP\\ServiceLayers\\MailService\\bin\\x86\\Debug\\Config\\HTML\\FW RMA for Warranty Repair_files\\image001.jpg",
				"ContentID": "sigIMG",
				"SourceType": "DirectFilePath"
			},
			{
				"Type": "ExistingFile",
				"Source": "C:\\misc\\_src\\SAP\\ServiceLayers\\MailService\\bin\\x86\\Debug\\Config\\HTML\\FW RMA for Warranty Repair_files\\PORTLAND PACKING SLIP.pdf",
				"SourceType": "DirectFilePath"
			}],
				// First folder
			"PropertySources": [
			{
				"Name": "StaticEmailProps",
				"Type": "List",
				"SingleRowDependenciesGuaranteed": false,
				"Data": [{
					//Name on folder, Value in CKEditor
					"Name": "FromAddr",
					"Type": "String",
					"Value": "auto@tiger-sheep.com"
				},
				{
					"Name": "FromName",
					"Type": "String",
					"Value": "TS Auto"
				}]
			},
			{
				//Second Folder
				"Name": "RequiredProps1",
				"Type": "List",
				"SingleRowDependenciesGuaranteed": false,
				"Data": [{
					//Child folder, Value in CKEditor
					"Name": "FromEmail",
					"Type": "String",
					"Value": "?<StaticEmailProps.FromAddr>?"
				},
				{
					"Name": "SenderName",
					"Type": "String",
					"Value": "?<StaticEmailProps.FromName>?"
				},
				{
					"Name": "SenderTitle",
					"Type": "String",
					"Value": "Representative"
				},
				{
					"Name": "SenderPhone",
					"Type": "String",
					"Value": "PHONE GOES HERE"
				},
				{
					"Name": "SenderCell",
					"Type": "String",
					"Value": "CELL GOES HERE"
				},
				{
					"Name": "RMANum",
					"Type": "String",
					"Value": "RMA GOES HERE"
				},
				{
					"Name": "ImageURL",
					"Type": "String",
					"Value": "image001.jpg"
				},
				{
					"Name": "ToEmail",
					"Type": "String",
					"Value": "testClient@crystalize.me"
				}]
			}]
}

$(document).ready(function() {
	
	
	function parentLoop() {
		var parents = [];
		var parent_id = 0;
		var propertySources = jsonObj.PropertySources
			for (var i = 0; i < propertySources.length; i++) {
				propertySources[i].parent_id = parent_id++; 
				parents.push(propertySources[i]);
			}
		return parents;
	}
	
	function childLoop() {
		var children = [];
		var child_id = 0;
		var propertySources = jsonObj.PropertySources
			for (var i = 0; i < propertySources.length; i++) {
				 var items = propertySources[i]["Data"];
					for (var n = 0; n < items.length; n++) {
						items[n].id = child_id++;
						items[n].children = items[n].Name
						children.push(items[n]);

					}
			}
		return children;
	}
	
	var addChild = childLoop();
	var addParent = parentLoop();
	

//	for (var key in addChild) {
//		console.log(addChild[key])
//	}
//	for (var key in addParent) {
//		console.log(addParent[key])
//	}

	console.log(addParent);
	
	
    //access the CKEDITOR.editor object using the editor property
	var editor1 = $( 'textarea#editor1' ).ckeditor().editor;
	
	$('#json').jstree({
		//load plugins
		'plugins' : [ "dnd", "search", "sort", "unique", "themes", "ui", "json_data" ],


		//apple theme
		'themes' : {
			"theme" : "apple",
		},
		'core' : {
			'data' : (function () {
						var parents = [];
						var children = [];
						var parent_id = 0;
						var child_id = 0;
						var propertySources = jsonObj.PropertySources
							for (var i = 0; i < propertySources.length; i++) {
								propertySources[i].parent_id = parent_id++; 
								parents.push({ id: propertySources[i].id, text: propertySources[i].Name });
								
								
							var items = propertySources[i]["Data"];
								for (var n = 0; n < items.length; n++) {
									items[n].id = child_id++;
									items[n].children = items[n].Name
									children.push({ id: items[n].children.id, text: items[n].children.Name });

								}

							}
						return parents;
						return children;
					})()
			} 
	});

			
		$("#json").on("select_node.jstree",
			function(evt, data) {
				editor1.insertText(ckValue[data.node.id]);

	});	
	
//	var ckValue = {
//		treePop[key].id = jsonObj.PropertySources[0].Data[0].Value;
//	}
	
	
//	$('#json').jstree({
//		'core' : {
//		  'data' : [
//			{"id" : 1,
//			 "text" : jsonObj.PropertySources[0].Name, 
//			 "children" : [
//				 { "id" : 2, text: jsonObj.PropertySources[0].Data[0].Name },
//				 { "id" : 3, text: jsonObj.PropertySources[0].Data[1].Name }
//			 ]
//			},
//			{"id" : 4, 
//			 "text" : jsonObj.PropertySources[1].Name,
//			 "children" : [
//				 { "id" : 5, text: jsonObj.PropertySources[1].Data[0].Name },
//				 { "id" : 6, text: jsonObj.PropertySources[1].Data[1].Name },
//				 { "id" : 7, text: jsonObj.PropertySources[1].Data[2].Name },
//				 { "id" : 8, text: jsonObj.PropertySources[1].Data[3].Name },
//				 { "id" : 9, text: jsonObj.PropertySources[1].Data[4].Name },
//				 { "id" : 10, text: jsonObj.PropertySources[1].Data[5].Name },
//				 { "id" : 11, text: jsonObj.PropertySources[1].Data[6].Name },
//				 { "id" : 12, text: jsonObj.PropertySources[1].Data[7].Name }
//			 ]
//			},
//		  ]
//		},
//
//		//load plugins
//		"plugins" : [ "dnd", "search", "sort", "unique", "themes", "ui", "json_data"],
//
//
//		  //apple theme
//		"themes" : {
//			"theme" : "apple"
//		}
//	});
	
	var ckValue = {

	1 : "",
	2 : jsonObj.PropertySources[0].Data[0].Value,
	3 : jsonObj.PropertySources[0].Data[1].Value,
	4 : "",
	5 : jsonObj.PropertySources[1].Data[0].Value,
	6 : jsonObj.PropertySources[1].Data[1].Value,
	7 : jsonObj.PropertySources[1].Data[2].Value,
	8 : jsonObj.PropertySources[1].Data[3].Value,
	9 : jsonObj.PropertySources[1].Data[4].Value,
	10 : jsonObj.PropertySources[1].Data[5].Value,
	11 : jsonObj.PropertySources[1].Data[6].Value,
	12 : jsonObj.PropertySources[1].Data[7].Value
	}
	
//	insert data to editor1 
	$("#json").on("select_node.jstree",
			function(evt, data) {
				editor1.insertText(ckValue[data.node.id]);

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
    
    
    //notification of changed event on console
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