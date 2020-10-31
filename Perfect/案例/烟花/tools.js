/**
 * random：求某个范围之内的随机整数
 * @param1 {number} n 起始值
 * @param2 {number} m 结束值
 */
"use strict";

// 用法:取n~m之间任意随机数,包括
// random(n,m);
function random(n,m){
    var abs = Math.abs(m-n);
    var min = Math.min(m,n);
    var res = parseInt(Math.random()*abs)+min+1;
    return res;
}




function rdcolor(id){
    var str = "#";
    for(var i=0;i<6;i++){
        var res = parseInt(Math.random()*16);
        var str = str + res.toString(16);
    }
    console.log(str);
    id.style.color=str;
}





function rdbgcolor(id){
    var str = "#";
    for(var i=0;i<6;i++){
        var res = parseInt(Math.random()*16);
        var str = str + res.toString(16);
    }
    console.log(str);
    id.style.background=str;
}

















