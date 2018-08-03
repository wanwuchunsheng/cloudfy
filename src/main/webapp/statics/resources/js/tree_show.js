var setting = {
      view: {
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        selectedMulti: false
      },
      edit: {
        enable: true,
        editNameSelectAll: true,
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        beforeDrag: beforeDrag,
        beforeEditName: beforeEditName,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove,
        onRename: onRename
      }
    };

    var zNodes =[
      { id:1, pId:0, name:"工单类型", open:true},
      { id:11, pId:1, name:"咨询",open:true},
      { id:12, pId:11, name:"公司咨询"},
      { id:13, pId:11, name:"产品咨询"},
      { id:2, pId:1, name:"投诉", open:true},
      { id:21, pId:2, name:"客户投诉"},
      { id:3, pId:1, name:"救援", open:true},
      { id:31, pId:3, name:"宅捷修"},
      { id:32, pId:3, name:"道路救援"}
    ];
    var log, className = "dark";
    function beforeDrag(treeId, treeNodes) {
      return false;
    }
    function beforeEditName(treeId, treeNode) {
      className = (className === "dark" ? "":"dark");
      showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
      var zTree = $.fn.zTree.getZTreeObj("tree");
      zTree.selectNode(treeNode);
      return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
    }
    function beforeRemove(treeId, treeNode) {
      className = (className === "dark" ? "":"dark");
      showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
      var zTree = $.fn.zTree.getZTreeObj("tree");
      zTree.selectNode(treeNode);
      return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    }
    function onRemove(e, treeId, treeNode) {
      showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    }
    function beforeRename(treeId, treeNode, newName, isCancel) {
      className = (className === "dark" ? "":"dark");
      showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
      if (newName.length == 0) {
        alert("节点名称不能为空.");
        var zTree = $.fn.zTree.getZTreeObj("tree");
        setTimeout(function(){zTree.editName(treeNode)}, 10);
        return false;
      }
      return true;
    }
    function onRename(e, treeId, treeNode, isCancel) {
      showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
    }
   
    function showLog(str) {
      if (!log) log = $("#log");
      log.append("<li class='"+className+"'>"+str+"</li>");
      if(log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
      }
    }
    function getTime() {
      var now= new Date(),
      h=now.getHours(),
      m=now.getMinutes(),
      s=now.getSeconds(),
      ms=now.getMilliseconds();
      return (h+":"+m+":"+s+ " " +ms);
    }

    var newCount = 1;
    function addHoverDom(treeId, treeNode) {
      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='add node' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_"+treeNode.tId);
      if (btn) btn.bind("click", function(){
        var zTree = $.fn.zTree.getZTreeObj("tree");
        zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
        return false;
      });
    };
    function removeHoverDom(treeId, treeNode) {
      $("#addBtn_"+treeNode.tId).unbind().remove();
    };
    function selectAll() {
      var zTree = $.fn.zTree.getZTreeObj("tree");
      zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
    }
    
    $(document).ready(function(){
      $.fn.zTree.init($("#tree"), setting, zNodes);
      $("#selectAll").bind("click", selectAll);
    });
    $(document).ready(function(){
      var treeObj = $.fn.zTree.getZTreeObj("tree");
       $("#btnclose").click(function(){
         treeObj.expandAll(false);
       });
        $("#btnOpen").click(function(){
         treeObj.expandAll(true);
       });
    });
   
   
  