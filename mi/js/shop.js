
// 从Cookie中读取用户名,设置用户名
var username = getCookie("username");
if(username){
  var login = $("<a href=\"javascript:;\">"+username+"的世界</a>");
  var register = $("<a href=\"javascript:;\">退出</a>")
  $(".login").empty().append(login);
  $(".register").empty().append(register);
  $(".register").click(()=>{
    if(confirm("确定退出登录???")){
      removeCookie("username")
      $(".login").empty().html("<a href=\"../html/login.html\">登录</a>")
      $(".register").empty().html("<a href=\"../html/register.html\">注册</a>")
    }else{
      return false;
    }
  })
}

// 购物车动态页面
var data = localStorage.getItem("cart");
if(!data){
  $(".table").empty();
  var str = `<div class="empty">
  <h1>购物车是空的</h1>
  <img src="../img/public/cart.jpg">
  <p>
  <a href="../html/list.html"><button>我要去购物</button></a>
  </p>
  </div>`;
  $("table").html(str);
}else{
  data = JSON.parse(data);
  var res = data.some(v=>v.username == username);
  if(!res){
    $(".table").empty();
    var str = `<div class="empty">
    <h1>购物车是空的</h1>
    <img src="../img/public/cart.jpg">
    <p>
    <a href="../html/list.html"><button>我要去购物</button></a>
    </p>
    </div>`;
    $("table").html(str);
  }else{
    var arr = data.filter(v=>v.username = username);
    var ids = arr.map(v=>v.goodsid);
    ids = ids.join(",")
    // console.log(ids);
    $.ajax({
      url:"../php/shop.php",
      data:{
        ids
      },
      type:"get",
      datatype:"json",
      success:res =>{
        // console.log(res);
        res = JSON.parse(res);
        var str = "";
        for(var i=0;i<res.length;i++){  
          // console.log(arr[i].goodsid,res[i].id);
          var number = arr.find(v=>v.goodsid = res[i].id).number;
          str += `<tr>
            <td><input type="checkbox" name="single"></td>
            <td class="img"><img src="${res[i].imgpath}" alt=""></td>
            <td class="name">${res[i].name}</td>
            <td class="price">
              ￥<span>${res[i].price}</span>元
            </td>
            <td class="number" data-id="${res[i].id}">
              <input type="button" name="reduce" value="-">
              <input type="number" disabled="disabled"  name="number" da="10" ta="1" value="${number}">
              <input type="button" name="add" value="+">
            </td>
            <td class="install">
              小计:<span class="sp">${res[i].price*number}</span>元
            </td>
            <td>
              <button class="active">删除</button>
            </td>
          </tr>`;
        }

        // 小计

        $("tbody").html(str);
        selectAll();
        selectSingle();
        numAll();
        addReduce();
        removeOne();
      }
    })
  }
}

// 删除
function removeOne(){
  $(".active").click(function(){
    if(!confirm("你确定要删除吗?")){
      return false;
    }
    var data = JSON.parse(localStorage.getItem("cart"))
    var index = data.findIndex(v=>v.username==username && v.goodsid==$(this).parent().siblings(".number").attr("data-id"))
    data.splice(index,1)
    localStorage.setItem("cart",JSON.stringify(data))
    $(this).parent().parent().remove()
    if(!data.filter(v=>v.username==username).length){
      $(".table").empty();
      var str = `<div class="empty">
      <h1>购物车是空的</h1>
      <img src="../img/public/cart.jpg">
      <p>
      <a href="../html/list.html"><button>我要去购物</button></a>
      </p>
      </div>`;
      $("table").html(str);
    }
    numAll();
  })
}

// 数量加减
function addReduce(){
  $("[name='add']").click(function(){
    var num = $(this).prev().val()-0
    num++;
    if(num>=5){
      num = 5
      $(this).prev().val(num)
      $(this).css({background:"red"})
    }else{
      $(this).css({background:"#fff"})
      $(this).prev().prev().css({background:"#fff"})
    }
    $(this).prev().val(num);

    // 小计
    var price = $(this).parent().prev().find("span").text()-0
    var subtotal = price * num;
    $(this).parent().next().find(".sp").text(subtotal);

    var data = localStorage.getItem("cart");
    data = JSON.parse(data);
    var obj = data.find(v=>username==username && v.goodsid == $(this).parent().attr("data-id"))
    obj.number = num;
    localStorage.setItem("cart",JSON.stringify(data))
    numAll()
  })

  $("[name='reduce']").click(function(){
    var num = $(this).next().val()-0
    // console.log(num);
    num--;
    if(num<=$(this).next().attr("ta")-0){
      num = $(this).next().attr("ta")-0
      $(this).next().val(num)
      $(this).css({background:"red"})
    }else{
      $(this).css({background:"#fff"})
      $(this).next().next().css({background:"#fff"})
    }
    $(this).next().val(num);

    // 小计
    var price = $(this).parent().prev().find("span").text()-0
    var subtotal = price * num;
    $(this).parent().next().find(".sp").text(subtotal)

    var data = localStorage.getItem("cart");
    data = JSON.parse(data)
    var obj = data.find(v=>username==username && v.goodsid == $(this).parent().attr("data-id"))
    obj.number = num;
    localStorage.setItem("cart",JSON.stringify(data))
    numAll();
  })

}



// 计算总价和总数量
function numAll(){
  // 总数量
  var allNum = $("[name='single']:checked").parent().siblings('.number').find("[name='number']")
  var num = 0;
  // console.log(allNum);
  allNum.each(function(k,v){
    console.log(v.value);
    num += v.value-0;
  })
  $(".number span").text(num)
  // 总价
  var allEle = $("[name='single']:checked").parent().siblings(".install").find(".sp");
  // console.log(allEle);
  var allAlljion = 0;
  allEle.each(function(k,v){
    console.log(v.innerText);
    allAlljion += v.innerText-0;
  })
  $(".total span").text(allAlljion); 
}

// 单选
function selectSingle(){
  $("[name='single']").click(()=>{
    var arr = Array.prototype.slice.call($("[name='single']"));
    var res = arr.every(v=>$(v).prop("checked"))
    if(res) 
      $(".chioce input")[0].checked = $(".chioce input")[1].checked = true
    else
      $(".chioce input")[1].checked = $(".chioce input")[0].checked = false
    // console.log(res);
    numAll()
  })
}

// 全选
function selectAll(){
  $(".chioce input")[0].onclick = $(".chioce input")[1].onclick = function(){
    $("[name='single']").prop("checked",$(this).prop("checked"))
    $(".chioce input").prop("checked",$(this).prop("checked"))
    numAll()
  }
}





