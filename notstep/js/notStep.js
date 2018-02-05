var pre=[0,0,0,0,0,0];//记录上一次黑快的位置;
var state=0,stall=1;//state表示游戏状态 0:初始,1:进行,2:暂停;
var start = document.getElementById('start'),
    hold  = document.getElementById('hold'),
    reset = document.getElementById('reset');
var timing,moving;//timing:时间计时器; moving:砖块移动计时器
var letter ='';
var startTime = 0;//开始时间
var timeBox = document.getElementById('timeBox');
var stallButon = document.getElementById('stall');

//选择随机数.初始行选择哪块砖变成黑块
function optBlock() {
  var ranNum = Math.round(Math.random()*3+1);
  pre[0] = ranNum;
  return ranNum;
}

//踩到黑块
function clickRight(str) {
  if(state == 1){
    var m = document.getElementById(str);
    m.className = 'grey'
  }
}

//白块上的事件
function clickWrong(str) {
  if(state == 1) {
    document.getElementById(str).className = 'red';
    window.clearInterval(moving);
    window.clearInterval(timing);
    alert("游戏结束");
    state = -1;
  }
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
  var blockUp='';
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

    if(pre[i] != 0 && i != 5){
      var Str = 'line'+pre[i]+letter;
      blockUp = document.getElementById(Str);
      blockUp.className = 'null';
      blockUp.onclick = function() {
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
      var blockNow = document.getElementById(Str);
      if(i==5&&blockLast.className != "grey"){
        alert('触底,游戏结束');
        window.clearInterval(moving);
        window.clearInterval(timing);
        state = -1;
        return;
      }

      if(i !=5){
        blockNow.className = blockLast.className;
      }
      blockNow.onclick = function() {
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

//重置游戏
function resetGame() {
  for (var i = 0; i < pre.length; i++) {
    //匹配对应的黑块对象id
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
    //将黑块的className设为空
    if(pre[i] != 0) {
      var Str = 'line'+pre[i]+letter;
      var block = document.getElementById(Str);
      block.onclick = function() {
        clickWrong(this.id);
      }
      block.className = 'null';
    }
  }
  var redBlock = document.getElementsByClassName('red');
  if(redBlock.length>0) {
    redBlock[0].className = 'null';
  }

  //=>重置所有黑块位置
  pre=[0,0,0,0,0,0];
  state = 0;
  timeBox.innerText = '00:00:00'
}

//计时器
function timeUp() {
  var time = new Date();
  var spaceTime = time -startTime;
  var hour = Math.floor(spaceTime/(1000*60*60));
  spaceTime -= hour*60*60*1000;
  var min  = Math.floor(spaceTime/(1000*60));
  spaceTime -= min*1000*60;
  var sec  = Math.floor(spaceTime/1000);
  spaceTime -= sec*1000;
  var mill = spaceTime;

  hour<10?hour="0"+hour:hour;
  min <10?min="0"+min :min;
  sec <10?sec="0"+sec :sec;
  mill<100?(mill<10?mill='00'+mill:mill='0'+mill):mill;

  var strTime;
  if(hour=='00' && min=='00'){
    strTime = sec+ ':'+ mill;
  }else if (hour == '00') {
    strTime = min+ ':'+ sec+ ':'+ mill;
  }else {
    strTime = hour+ ':'+ min+ ':'+ sec+ ':'+ mill;
  }
  timeBox.innerText = strTime;
}


//按钮绑定事件
start.onclick = function() {
  if(state == 0){//新游戏开始
    startTime = new Date().getTime();
    timing = window.setInterval(timeUp,1);
    moving = window.setInterval(moveBlock,1000-stall*200);
    state = 1;
  }else if(state == 2) {  //暂停游戏开始
    timing = window.setInterval(timeUp,1);
    moving = window.setInterval(moveBlock,1000-stall*200);
    state = 1;
    start.innerText = '开始';
  }else if(state == -1){//游戏结束,按开始重置游戏
    resetGame();
    startTime = new Date().getTime();
    timing = window.setInterval(timeUp,1);
    moving = window.setInterval(moveBlock,1000-stall*200);
    state = 1;
  }
}

hold.onclick = function() {//暂停
  if(state == 1){
    window.clearInterval(moving);
    window.clearInterval(timing);
    state = 2;
    start.innerText = '继续';
  }

}

reset.onclick = function() {//重置
  window.clearInterval(moving);
  window.clearInterval(timing);
  resetGame();
  //moving = window.setInterval(moveBlock,1000);
}

stallButon.onchange = function() {//修改档位
  stall = document.getElementById('stall').value;
  if(state == 1) {//在运行状态,进行换挡
    window.clearInterval(moving);
    moving = window.setInterval(moveBlock,1000-stall*200);
  }
}
