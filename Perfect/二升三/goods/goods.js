reg();
addTbody();
classClick();

$("#btn").click(function(e){
  // 序列化表单数据
  // var data = $("form").serialize();
  nullReg();
  addGoods();
  addTbody();
  red();
  classClick();
  return false;
})
red();

// 表格tbody创建
function addTbody(){
  var goodsClass = $("option.oP0").text();
  var data = localStorage.getItem("goods");
  if(!data){
    // console.log(3333);
    $("tbody").empty();
    var str = `<div class="empty">
    <h1>这里是空的</h1>
    </div>`;
    $("tbody").html(str);
  }else{
    data = JSON.parse(data);

    var res = data.some(v=>v.goodsClass == goodsClass);
    if(!res){
      $("tbody").empty();
      var str = `<div class="empty">
      <h1>这里是空的</h1>
      </div>`;
      $("tbody").html(str);
    }else{
      var str = "";
      var l = []

      for(var i=0;i<data.length;i++){  
        var name = data[i].name;
        var goodsClass = data[i].goodsClass;
        var reprice = data[i].reprice;
        var price = data[i].price;
        var num = data[i].num;
        var red = data[i].red;
        str += `<tr>
          <td class="name">${name}</td>
          <td >${goodsClass}</td>
          <td class="price">
            ￥<del>${reprice}</del>元
          </td>
          <td class="price">
            ￥<span>${price}</span>元
          </td>
          <td class="price">
            <span>${num}</span>
          </td>
          <td class="red">
            <span>${red}</span>
          </td>
          <td>
            <span class="active">删除</span>
          </td>
        </tr>`;
      }
        $("tbody").html(str);

      for(var i=0;i<$("tr").length;i++){
        //偶数行时执行
        if(i%2 == 0){
          $("table").children().children("tr")[i].style.background = "#0f0";
        }else{
          $("table").children().children("tr")[i].style.background = "#f00";
        }
      } 
      clearText()
    }
  }
  removeOne();
}

// 添加商品数据到本地
function addGoods(){
  // 获取数据
  var name = $("[name=name]").val();
  var goodsClass = $('#testSelect option:selected').text();//选中的文本
  var reprice = $("[name=reprice]").val();
  var price = $("[name=price]").val();
  var num = $("[name=num]").val();
  var red = $("[name=red]:checked").next().attr("data-red");

  // var red = $("#choose").prop("checked")
  // 判断本地是否有数据
  var data = localStorage.getItem("goods");
  // 如果有数据
  if(data){
    data = JSON.parse(data);
    var res1 = data.some(function(v){
      return v.goodsClass == goodsClass;
    })
    if(res1){
      var res2 = data.some(function(v){
        return v.goodsClass == goodsClass && v.name == name;
      })
      if(res2){
        var oldObj = data.find(function(v){
          return v.name == name && v.goodsClass == goodsClass;
        })
        oldObj.num -= 0;
        console.log(oldObj.num);
        oldObj.num += ~~num;
        oldObj.num += ""
        data = JSON.stringify(data);
        localStorage.setItem("goods",data)
        return false;
      }else{
        var newObj = {
          name,
          goodsClass:goodsClass,
          reprice:reprice,
          price:price,
          num:num,
          red:red,
        }
        // 放在数据最前面
        data.unshift(newObj);
        // 数据转化为字符串
        data = JSON.stringify(data);
        // 再次存入本地
        localStorage.setItem("goods",data) 
      }
    }else{
      var newObj = {
        name,
        goodsClass:goodsClass,
        reprice:reprice,
        price:price,
        num:num,
        red:red,
      }
      // 放在数据最前面
      data.unshift(newObj);
      // 数据转化为字符串
      data = JSON.stringify(data);
      // 再次存入本地
      localStorage.setItem("goods",data)
      return false;
    }
    
  }else{  // 如果没有数据
    // 将数据存为对象
    var obj = {
      name,
      goodsClass:goodsClass,
      reprice:reprice,
      price:price,
      num:num,
      red:red,
    }
    // 将对象存入数组
    var arr = [];
    arr.unshift(obj);
    var goods = JSON.stringify(arr);
    localStorage.setItem("goods",goods);
    return false;
  }
  layer.alert("商品添加成功!!!!",{icon:1});
  return false;
}

// 点击按钮后清空输入框
function clearText() {
  $('#testSelect option:selected').text("优选水果");
  $("[name=name]").val("");
  $("[name=reprice]").val("");
  $("[name=price]").val("");
  $("[name=num]").val("");
  $("[data-red=false]").prev().prop("checked",true);
}

// 点击标题变色
function classClick(){
  $(".all").click(function(){
    $(this).css("background","red").siblings().css("background","transparent")
  })
  $(".fruit").click(function(){
    $(this).css("background","red").siblings().css("background","transparent")
  })
  $(".food").click(function(){
    $(this).css("background","red").siblings().css("background","transparent")
  })
  $(".drunk").click(function(){
    $(this).css("background","red").siblings().css("background","transparent")
  })
  $(".snacks").click(function(){
    $(this).css("background","red").siblings().css("background","transparent")
  })
}

// 删除
function removeOne(){
  $(".active").click(function(){
    if(!layer.confirm("你确定要删除吗?")){
      return false;
    }
    var data = JSON.parse(localStorage.getItem("goods"))
    var index = data.findIndex(v=>v.name==name)
    data.splice(index,1)
    localStorage.setItem("goods",JSON.stringify(data))
    $(this).parent().parent().remove()
  })
}

// 输入框为空验证
function nullReg(){
  // 商品名称为空验证
  if(!$("[name='name']").val()){
    // layer弹窗
    layer.alert('商品名称不能为空', {icon:2});
    return false;
  }
  // 原价为空验证
  if(!$("[name='reprice']").val()){
    // layer弹窗
    layer.alert('原价不能为空', {icon:2});
    return false;
  }
  // 现价为空验证
  if(!$("[name='price']").val()){
    // layer弹窗
    layer.alert('现价不能为空', {icon:2});
    return false;
  }
  // 现价为空验证
  if(!$("[name='num']").val()){
    // layer弹窗
    layer.alert('数量不能为空', {icon:2});
    return false;
  }
}

// 输入框正则验证
function reg(){
  var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
  var numReg = /^[1-9][0-9]*$/

  // 鼠标失去焦点验证商品原价
  $("[name='reprice']").blur(()=>{
    // 原价错误验证
    if(!priceReg.test($("[name='reprice']").val())){
      layer.alert('请正确输入原价', {
        skin: 'layui-layer-molv' //样式类名
        ,closeBtn: 0
      }, function(){
        layer.alert('例如: 12.00', {
          skin: 'layui-layer-lan'
          ,closeBtn: 0
          ,anim: 4 //动画类型
        });
      });
      return false;
    }
  })

  // 鼠标失去焦点验证商品现价
  $("[name='price']").blur(()=>{
    // 现价错误验证
    if(!priceReg.test($("[name='price']").val())){
      layer.alert('请正确输入现价', {
        skin: 'layui-layer-molv' //样式类名
        ,closeBtn: 0
      }, function(){
        layer.alert('例如: 12.00', {
          skin: 'layui-layer-lan'
          ,closeBtn: 0
          ,anim: 4 //动画类型
        });
      });
      return false;
    }
  })

  // 鼠标失去焦点验证库存数量
  $("[name='num']").blur(()=>{
    // 库存数量错误验证
    if(!numReg.test($("[name='num']").val())){
      layer.alert('请正确输入库存数量', {
        skin: 'layui-layer-molv' //样式类名
        ,closeBtn: 0
      }, function(){
        layer.alert('最少为 1 件', {
          skin: 'layui-layer-lan'
          ,closeBtn: 0
          ,anim: 4 //动画类型
        });
      });
      return false;
    }
  })
  return false;
}

// 点是商品名称变蓝
function red(){
  for(var i=0;i<$(".red span").length;i++){
    if($(".red span")[i].innerText=="ture"){
      $(".red span").parent().siblings(".name")[i].style.color = "blue"
    }
  }
}



