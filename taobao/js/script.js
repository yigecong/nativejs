//=>这里是想通过两个循环,获取所有的的dd标签对象,但是不知道为何无法获取.
// var preIndex = 0;
// var liList = document.getElementById('select2');
// var ddList;

// for (var i in liList) {
// ddList = liList[i].getElementsByTagName('dd');
// }


var pre1 = pre2 = pre3 = 0;
var seList1 = document.getElementById('select1'),
    seList2 = document.getElementById('select2'),
    seList3 = document.getElementById('select3');

var ddList1 = seList1.getElementsByTagName('dd'),
    ddList2 = seList2.getElementsByTagName('dd'),
    ddList3 = seList3.getElementsByTagName('dd');

function disDd() {
  if(pre1==0&&pre2==0&&pre3==0) {
    //document.getElementClassName('select-no').display = 'block';
    //document.getElementsByClassName('select-no')[0].display = 'block';
    document.getElementById('select-no').style.display = 'block';
  }else{
    //document.getElementsByClassName('select-no')[0].display = 'none';
    document.getElementById('select-no').style.display = 'none';
  }
}

function deleteDom1() {
  document.getElementById('selectA').innerHTML = null;
  for (var i in ddList1) {
    ddList1[i].className = null;
  }
    ddList1[0].className = "selected";
    pre1 = 0;
    disDd();
}

function deleteDom2() {
  document.getElementById('selectB').innerHTML = null;
  for (var i in ddList2) {
    ddList2[i].className = null;
  }
  ddList2[0].className = "selected";
  pre2 = 0;
  disDd();
}

function deleteDom3() {
  document.getElementById('selectC').innerHTML = null;
  for (var i in ddList3) {
    ddList3[i].className = null;
  }
  ddList3[0].className = "selected";
  pre3 = 0;
  disDd();
}

//=>选择点击对象
function change1(index) {
  if(pre1 == index) {
    return;
  }
  //去除所有选中的
  for (var i in ddList1) {
    ddList1[i].className = null;
  }
  ddList1[index].className = "selected";

  //把选中的对象添加到已选条件
  var txt = '<dd id="selectA" class="selected"><a id="selA">'+ddList1[index].textContent+"</a></dd>";
  if(index == 0) {
    document.getElementById('selectA').innerHTML = null;
  }else if(document.getElementById('selectA') == null) {
    //=>使用innerHTML修改以后,丢失原有的绑定事件.
    //document.getElementById('selectGoods').innerHTML = document.getElementById('selectGoods').innerHTML+txt;
    var ddElement=document.createElement('dd');
    ddElement.setAttribute('id','selectA');
    ddElement.setAttribute('class','selected');
    document.getElementById('selectGoods').appendChild(ddElement);
    document.getElementById('selectA').innerHTML = '<a id="selA">'+ddList1[index].textContent;+"</a>";
  }else{
    document.getElementById('selectA').innerHTML = '<a id="selA">'+ddList1[index].textContent;+"</a>";
  }

  if(index != 0) {
    document.getElementById('selA').onclick = function() {
      deleteDom1();
    }
  }
  pre1=index;
  disDd();
}

function change2(index) {
  if(pre2 == index) {
    return;
  }

  for (var i in ddList2) {
    ddList2[i].className = null;
  }
  ddList2[index].className = "selected";

  var txt = '<a id="selB">'+ddList2[index].textContent+"</a>";
  if(index == 0) {
    document.getElementById('selectB').innerHTML = null;
  }else if(document.getElementById('selectB') == null) {
    //document.getElementById('selectGoods').innerHTML = document.getElementById('selectGoods').innerHTML+txt;
    var ddElement=document.createElement('dd');
    ddElement.setAttribute('id','selectB');
    ddElement.setAttribute('class','selected');
    document.getElementById('selectGoods').appendChild(ddElement);
    document.getElementById('selectB').innerHTML = '<a id="selB">'+ddList2[index].textContent;+"</a>";
  }else {
    document.getElementById('selectB').innerHTML = '<a id="selB">'+ddList2[index].textContent;+"</a>";
  }

  if(index != 0) {
    document.getElementById('selB').onclick = function() {
    deleteDom2();
    }
  }
  pre2=index;
  disDd();
}

function change3(index) {
  if(pre3 == index) {
    return;
  }

  for (var i in ddList3) {
    ddList3[i].className = null;
  }
  ddList3[index].className = "selected";

  var txt = '<dd id="selectC" class="selected"><a id="selC">'+ddList3[index].textContent+"</a></dd>";
  if(index == 0) {
    document.getElementById('selectC').innerHTML = null;
  }else if(document.getElementById('selectC') == null) {
    //document.getElementById('selectGoods').innerHTML = document.getElementById('selectGoods').innerHTML+txt;
    var ddElement=document.createElement('dd');
    ddElement.setAttribute('id','selectC');
    ddElement.setAttribute('class','selected');
    document.getElementById('selectGoods').appendChild(ddElement);
    document.getElementById('selectC').innerHTML = '<a id="selC">'+ddList3[index].textContent;+"</a>";
  }else {
    document.getElementById('selectC').innerHTML = '<a id="selC">'+ddList3[index].textContent;+"</a>";
  }

  if(index != 0) {
    document.getElementById('selC').onclick = function() {
      deleteDom3();
    }
  }
  pre3=index;
  disDd();
}

//=>给选项绑定事件
for (var i = 0; i < ddList1.length; i++) {
  ddList1[i].index=i;
  ddList1[i].onclick = function() {
    change1(this.index);
  }
}

for (var i = 0; i < ddList2.length; i++) {
  ddList2[i].index=i;
  ddList2[i].onclick = function() {
    change2(this.index);
  }
}

for (var i = 0; i < ddList3.length; i++) {
  ddList3[i].index=i;
  ddList3[i].onclick = function() {
    change3(this.index);
  }
}
