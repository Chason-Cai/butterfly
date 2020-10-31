/**
 * setCookie 设置cookie的函数
 * @param {1} key 设置的cookie的键
 * @param {2} value 设置的cookie的值
 * @param {3} seconds 设置cookie在多少秒之后失效 - 单位：秒
 * @param {4} path 设置cookie的路径 - 默认是 / 根目录
 */
function setCookie(key,value,seconds,path="/"){
    var date = new Date();
    date.setTime(date.getTime()-8*3600*1000+seconds*1000)
    document.cookie = key + '=' + value + ';expires='+date+";path=" + path;
}
/**
 * getCookie 获取cookie的函数
 * @param {1} key 要获取的cookie的键
 * return 返回想要的键对应的值
 */
function getCookie(key){
    var cookies = document.cookie;
    var arr = cookies.split("; ");
    for(var i=0;i<arr.length;i++){
        if(arr[i].split("=")[0] == key){
            return arr[i].split("=")[1];
        }
    }
}
/**
 * removeCookie 删除cookie的函数
 * @param {1} key 要删除的cookie的键
 * @param {2} path 要删除的cookie的路径 - 默认为 / 根目录
 */
function removeCookie(key,path="/"){
    setCookie(key,null,-1,path);
}