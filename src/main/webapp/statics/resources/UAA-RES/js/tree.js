var url = "findAuthTree.json";
	var zNodes;
	var roleId = $('#id').val(); 
	$.ajax({
	    url: url,
	    dataType: 'json',
	    data:{roleId:roleId},
	    async: false,
	    success: function(data){
	     zNodes = data;
	    }
	});
	
	
	var setting = {
		
	  treeId:"tree",
	  
	  check: {
			enable: true,
			chkboxType: { "Y": "", "N": "" }
		},
		
		callback: {
		onCheck: function(event, treeId, treeNode) {
    						/*alert(treeNode.tId + ", " + treeNode.name + "," +treeNode.checked+ ","+treeNode.value);*/
  						 }
	    },
		

		data: {
			simpleData: {
				enable:true,
				rootPId: "0"
			}
		}
	};
