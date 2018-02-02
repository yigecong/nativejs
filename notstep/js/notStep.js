var pre=[0,0,0,0,0,0];//记录上一次黑快的位置;
var selected,state=0;
var start = document.getElementById('start'),
    hold  = document.getElementById('hold'),
    reset = document.getElementById('reset');
var timing;
var letter ='';

//选择随机数
function optBlock() {
  var ranNum = Math.round(Math.random()*3+1)
  pre[0] = ranNum;
  return ranNum;
}

//踩到黑块
function clickRight(str) {
  var m = document.getElementById(str);
  m.className = 'grey'
}

//踩到白块
function clickWrong(str) {
  document.getElementById(str).className = 'red';
  window.clearInterval(timing);
  alert("游戏结束");
}
//给所有对象绑定别踩白块事件
var ddAllList={};
ddAllList = document.getElementsByTagName('dd');
for (var key in ddAllList) {
  ddAllList[key].onclick = function() {
    clickWrong(this.id);
  }
}

//砖块移动
function moveBlock() {
  var block1='';
  var lett='';
  for (var i = 5; i >= 0; i--) {
    switch (i) {
      case 0:
        letter='A';break;
      case 1:
        letter='B';
        lett = 'A';break;
      case 2:
        letter='C';
        lett = 'B';break;
      case 3:
        letter='D';
        lett = 'C';break;
      case 4:
        letter='E';
        lett = 'D';break;
      case 5:
        letter='F';
        lett = 'E';break;
    }

    if(pre[i] != 0){
      var Str = 'line'+pre[i]+letter;
      block1 = document.getElementById(Str);
      block1.className = 'null';
      block1.onclick = function() {
        clickWrong(this.id);
      }
    }

    if(pre[i-1] != 0&&i!=0) {
      pre[i]=pre[i-1];
    }

    if(pre[i] != 0&&i!=0) {

      var Str = 'line'+pre[i]+letter;
      var strLast = 'line'+pre[i]+lett;
      var blockLast = document.getElementById(strLast);
      var block2 = document.getElementById(Str);
      if(i==5&&blockLast.className != "grey"){
        alert('触底,游戏结束');
        window.clearInterval(timing);
        return;
      }
      block2.className = blockLast.className;
      block2.onclick = function() {
        clickRight(this.id);
      }
    }
  }

  var ranNum = optBlock();
  var optStr = 'line'+ranNum+'A';
  var block = document.getElementById(optStr);
  block.className = 'black';
  block.onclick = function() {
    clickRight(this.id);
  }


}

//重置
function resetGame() {
  for (var i = 0; i < pre.length; i++) {
    switch (i) {
      case 0:
        letter='A';break;
      case 1:
        letter='B';break;
      case 2:
        letter='C';break;
      case 3:
        letter='D';break;
      case 4:
        letter='E';break;
    }
    if(pre[i] != 0) {
      var Str = 'line'+pre[i]+letter;
      var block = document.getElementById(Str);
      block.className = 'null';
    }
    for (var key in ddAllList) {
      ddAllList[key].onclick = function() {
        clickWrong(this.id);
      }
    }
  }
  pre=[0,0,0,0,0,0];
}

start.onclick = function() {
  if(state == 0){
    timing = window.setInterval(moveBlock,1000);
    state = 1;
  }
}

hold.onclick = function() {
  if(state == 1){
    window.clearInterval(timing);
    state = 2;
  }
}

reset.onclick = function() {
  window.clearInterval(timing);
  resetGame();
  timing = window.setInterval(moveBlock,1000);
}
