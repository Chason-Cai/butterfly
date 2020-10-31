function Page(classname,options={}){
  // 根据传进来的类名获取大盒子
  this.box = document.querySelector("."+classname);
  // 定义默认的参数
  this.default = {
      language:{ // 因为用户可以不传，所以需要定义默认值
          first:"首页",
          prev:"上一页",
          list:null,
          next:"下一页",
          last:"尾页"
      },
      pageInfo:{ // 因为用户可以不传，所以需要定义默认值
          total:100,
          pageSize:10
      },
      showData:function(){}
  }
  // 定义当前页
  this.currentPage = 1;
  // 定义放页码的盒子
  this.list = null;

  // 参数替换
  // 替换语言
  for(var attr in options.language){
      this.default.language[attr] = options.language[attr];
  }
  // 替换页码信息
  for(var attr in options.pageInfo){
      this.default.pageInfo[attr] = options.pageInfo[attr];
  }
  // 定义总页数
  this.totalPage = Math.ceil(this.default.pageInfo.total/this.default.pageInfo.pageSize)

  // 以后在使用这些数据的时候，使用default
  // 创建标签 - 通过语言
  for(var attr in this.default.language){
      var div = document.createElement("div");
      div.className = attr;
      div.innerText = this.default.language[attr];
      this.box.appendChild(div)
      // 加样式是除了list都加
      if(attr != 'list'){
          setStyle(div,{
            cursor:"pointer",
            float:"left",
            padding:"5px",
            margin:"5px",
            border:"1px solid #000"
          });
      }else{
          this.list = div;
      }
  }
  // 创建页码
  /*
  页码有3种情况：
      1.前2页
      2.最后2页
      3.中间的页码
  条件：需要知道当前是第几页 - 一打开就是第一页 - 定义当前页，作为对象的属性
  */

  // 处理showData的可选性
  if(options.showData){
      this.default.showData = options.showData
  }
  
  // console.log(this.default);

  this.createPageNum();
  this.setDisabled()
  this.default.showData(this.currentPage)
  // 应该给这些标签添加点击事件，让整个分页动起来，事件挺多 - 事件委托
  this.box.onclick = (e)=>{
      // 通过事件对象，获取目标元素
      var e = e || window.event;
      var target = e.target || e.srcElement;
      // 判断是哪个标签，每个标签的功能是不一样的
      if(target.className == "first" && target.getAttribute("disabled")!="true"){ // 点击了首页
          // 将当前页设置为1
          this.currentPage = 1;
          this.setDisabled()
          this.list.innerHTML = '';
          this.createPageNum();
          this.default.showData(this.currentPage)
      }else if(target.className == "prev" && target.getAttribute("disabled")!="true"){ // 点击了上一页
          this.currentPage-- // 当前页-1
          // 在第1页点击会出问题
          if(this.currentPage<=1){
              this.currentPage = 1;
          }
          this.setDisabled()
          this.list.innerHTML = '';
          this.createPageNum();
          this.default.showData(this.currentPage)
      }else if(target.className == 'next' && target.getAttribute("disabled")!="true"){ // 点击了下一页
          // 让当前页+1
          this.currentPage++
          if(this.currentPage>=this.totalPage){
              this.currentPage=this.totalPage
          }
          this.setDisabled()
          this.list.innerHTML = '';
          this.createPageNum();
          this.default.showData(this.currentPage)
      }else if(target.className == 'last' && target.getAttribute("disabled")!="true"){ // 点击了尾页
          // 让当前页=最后一页
          this.currentPage=this.totalPage
          this.setDisabled()
          this.list.innerHTML = '';
          this.createPageNum();
          this.default.showData(this.currentPage)
      }else if(target.nodeName == 'P' && target.innerText-0 != this.currentPage){ // 点击了页码
          // 将当前页设置为这个页码标签中的内容
          // 获取页码标签中的内容
          var num = target.innerText;
          this.currentPage = num-0;
          this.setDisabled()
          this.list.innerHTML = '';
          this.createPageNum();
          this.default.showData(this.currentPage)
      }else if(target.nodeName === "BUTTON"){
          // 获取输入的页码
          var num = target.previousElementSibling.value-0;
          /* if(num<=1){
              num = 1;
          }
          if(num>=this.totalPage){
              num = this.totalPage
          }
          target.previousElementSibling.value = num; */
          if(num<1 || num>this.totalPage){
              alert("请输入合法的页码数字");
              return false;
          }
          // 将当前页设置为这个页码
          this.currentPage = num;
          this.setDisabled()
          this.list.innerHTML = '';
          this.createPageNum();
          this.default.showData(this.currentPage)
      }
  }
  // 创建页码跳转
  // 创建一个文本框追加在大盒子中
  var input = document.createElement("input");
  input.setAttribute("type","number")
  this.box.appendChild(input)
  setStyle(input,{
      outline:"none",
      border:"none",
      padding:"8px",
      border:"1px solid #000",
      margin:"5px",
      width:"50px"
  })
  // 创建一个按钮追加大盒子中
  var btn = document.createElement("button");
  btn.innerText = 'GO';
  this.box.appendChild(btn)
  setStyle(btn,{
      outline:"none",
      border:"none",
      padding:"8px",
      border:"1px solid #000",
      margin:"5px",
  })
  // 多加一点显示总页数和当前页
  console.log(this.currentPage);
  var div = document.createElement("span");
  div.innerText = `共${this.totalPage}页，当前第${this.currentPage}页`;
  this.box.appendChild(div);
}
// 设置禁用项
Page.prototype.setDisabled = function(){
  if(this.currentPage==1){
      this.box.children[0].setAttribute("disabled",true)
      this.box.children[0].style.backgroundColor = '#ccc';
      this.box.children[1].setAttribute("disabled",true)
      this.box.children[1].style.backgroundColor = '#ccc';
  }else{
      this.box.children[0].setAttribute("disabled",false)
      this.box.children[1].style.backgroundColor = this.box.children[0].style.backgroundColor = '#fff';
      this.box.children[1].setAttribute("disabled",false)
  }
  if(this.currentPage == this.totalPage){
      this.box.children[3].setAttribute("disabled",true)
      this.box.children[3].style.backgroundColor = '#ccc';
      this.box.children[4].setAttribute("disabled",true)
      this.box.children[4].style.backgroundColor = '#ccc';
  }else{
      this.box.children[3].setAttribute("disabled",false)
      this.box.children[4].style.backgroundColor = this.box.children[3].style.backgroundColor = '#fff';
      this.box.children[4].setAttribute("disabled",false)
  }
}
// 创建页码标签的
Page.prototype.createPageNum = function(){
  if(this.totalPage>=5){
      if(this.currentPage<3){ // 前2页
          for(var i=1;i<=5;i++){ // 创建1~5的页码
              var p = document.createElement("p");
              p.innerText = i;
              // 将p标签放到放页码的list里面 - 获取list - 将list作为自己的属性
              this.list.appendChild(p)
              // 给p标签加样式
              setStyle(p,{
                cursor:"pointer",
                float:"left",
                padding:"5px",
                margin:"5px",
                border:"1px solid #000"
              })
              if(this.currentPage == i){
                  p.style.backgroundColor = 'orange';
              }
          }
      }else if(this.currentPage > this.totalPage-2){ // 判断当前页是否大于总也是-2，发现没有总页数
          for(var i=this.totalPage-4;i<=this.totalPage;i++){ // 循环总页数-4开始，到总页数结束
              var p = document.createElement("p");
              p.innerText = i;
              // 将p标签放到放页码的list里面 - 获取list - 将list作为自己的属性
              this.list.appendChild(p)
              // 给p标签加样式
              setStyle(p,{
                cursor:"pointer",
                  float:"left",
                  padding:"5px",
                  margin:"5px",
                  border:"1px solid #000"
              })
              if(this.currentPage == i){
                  p.style.backgroundColor = 'orange';
              }
          }
      }else{
          for(var i=this.currentPage-2;i<=this.currentPage+2;i++){ // 中间页是  当前页-2开始到当前页+2结束
              var p = document.createElement("p");
              p.innerText = i;
              // 将p标签放到放页码的list里面 - 获取list - 将list作为自己的属性
              this.list.appendChild(p)
              // 给p标签加样式
              setStyle(p,{
                cursor:"pointer",
                  float:"left",
                  padding:"5px",
                  margin:"5px",
                  border:"1px solid #000"
              })
              if(this.currentPage == i){
                  p.style.backgroundColor = 'orange';
              }
          }
      }
  }else{ // 总页数小于5的情况
      for(var i=1;i<=this.totalPage;i++){ // 展示1~总页数
          var p = document.createElement("p");
          p.innerText = i;
          // 将p标签放到放页码的list里面 - 获取list - 将list作为自己的属性
          this.list.appendChild(p)
          // 给p标签加样式
          setStyle(p,{
            cursor:"pointer",
              float:"left",
              padding:"5px",
              margin:"5px",
              border:"1px solid #000"
          })
          if(this.currentPage == i){
              p.style.backgroundColor = 'orange';
          }
      }
  }
}


function setStyle(ele,styleObj){
  for(var attr in styleObj){
    ele["style"][attr] = styleObj[attr];
  }
}