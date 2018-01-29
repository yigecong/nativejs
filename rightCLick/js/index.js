//=>e和event指的是触发的该事件
/*使用document.getElementsByClassName和document.getElementById不一样,
前者获取的是类数组,包含>=0个对象;后者直接单独的一个对象.id不可重复,class可以重复
*/
/*=>event.preventDefault()是让浏览器不要执行与事件相关的事件;
也可以用return false替代,也许和oncontextmenu的触发方式有关.*/
//=>获取对象的高度宽度,尚未解决;因为在display为none的情况下,对象的各个宽度都为0;
var menu = document.getElementById('contextmenu');

function creatMenu(event){
  var e = event || window.event;
  //get window size
  var winWidth = document.body.scrollWidth;
  var winHeight = document.body.scrollHeight;
  //get point position
  var posX = e.pageX;
  var posY = e.pageY;
  //get menu size

  //var menuWidth = document.getElementsByClassName('contextmenu').offsetWidth;
  //var menuHeight = document.getElementsByClassName('contextmenu').height;
  var menuWidth = 200;
  var menuHeight = 194;
  //securityt margin
  var sercMargin = 10;

  //Prevent page overflow
  if (posX+menuWidth+sercMargin > winWidth&&
      posY+menuHeight+sercMargin > winHeight) {
    //Case 1: right-bottom overflow:
    menuLeft = posX - menuWidth - sercMargin + "px";
    menuTop = posY - menuHeight - sercMargin + "px";
  }else if (posX+menuWidth+sercMargin > winWidth) {
    //Case 2: right overflow:
    menuLeft = posX - menuWidth - sercMargin + "px";
    menuTop = posY + sercMargin + "px";
  }else if (posY+menuHeight+sercMargin > winHeight) {
    //Case 3: bottom overflow:
    menuLeft = posX + sercMargin + "px";
    menuTop = posY - menuHeight - sercMargin + "px";
  }else {
    //Case 4: default values:
    menuLeft = posX + sercMargin + "px";
    menuTop = posY + sercMargin + "px";
  }

  //display contextmenu
  menu.style.left = menuLeft;
  menu.style.top = menuTop;
  menu.style.display = 'block';


}
//右键单击创建菜单栏
document.oncontextmenu =function(event){
  //event.preventDefault();
  creatMenu(event);
  return false;
}
//左键单击隐藏菜单栏
document.onclick = function() {
  menu.style.display = "none";
}
