$(document).ready(function(){

  function onDragStart(evt) {
        console.log("Nyan");
        console.log(evt);
        }
    
    //ckeditor instance
  var editor1 = $( 'textarea#editor1' ).ckeditor().editor;
    console.log(editor1);
    editor1.on('drop',onDragStart);

    
    
    //sample json
  $('#json').jstree({
    'core' : {
      'data' : [
        {"id" : 1, "text" : "Node 1"},
        {"id" : 2, "text" : "Node 2"},
      ]
    },
    
      
    //load plugins
    "plugins" : ["checkbox", "contextmenu", "dnd", "search", "sort", "unique", "themes", "ui"],
    
      
      //apple theme
    "themes" : {
        "theme" : "apple"
    }
      
      
  });
    
    
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
});