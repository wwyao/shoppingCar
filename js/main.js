window.onload = function() {
	var tbody = document.querySelector('.table tbody');
	var trs = document.querySelectorAll('.goods');
	var selectAll = document.querySelector('.select-all');
	var selectItem = document.getElementsByClassName('select');
	var dels = document.getElementsByClassName('del');
	var money = document.getElementsByClassName('money');
	var total = document.querySelector('.table tr td:last-child span');
	var btns = document.querySelectorAll('.btn');
	var places = document.getElementsByClassName('place');

	//每个商品的价格
	var moneyArray = getMoney(money);
	//每个商品的产地
	var placeArray = getPlace(places);
	var sum = getSum();
	selectAll.onclick = function() {
		if(!this.checked) {
			for(var i = 0;i < selectItem.length;i++){
				selectItem[i].checked = false;
			}
		}else{
			for(var i = 0;i < selectItem.length;i++){
				selectItem[i].checked = true;
			}
		}
		sum = getSum();
		total.innerText = '￥'+sum.toFixed(2)+'元';
	};
	for(var i = 0;i < selectItem.length;i++) {
		selectItem[i].tag = i;
		selectItem[i].onclick = function() {
			var isAll = true
			if(!this.checked){
 				isAll = false;
 			}else{
 				for(var k = 0;k < selectItem.length;k++){
 					if(!selectItem[k].checked){
 						isAll = false;
 					}
 				}
 			}
 			selectAll.checked = isAll;
 			sum = getSum();
 			total.innerText = '￥'+sum.toFixed(2)+'元';
		};
		dels[i].tag = i;
		dels[i].onclick = function() {
			this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
			moneyArray = getMoney(money);
			sum = getSum();
			total.innerText = '￥'+sum.toFixed(2)+'元';
		};
	}
	for(var i = 0;i < btns.length;i++){
		btns[i].tag = i;
		btns[i].isUp = true;
		btns[i].onclick = function() {
			this.style.cssText= "background:url('img/ico1.gif') no-repeat 0px -19px;";
			if(this.tag === 0) {
				btns[1].style.cssText= "background:url('img/ico1.gif') no-repeat 0px 0px;";
				var poi = moneyArray.sort(function(a,b){return a-b;});
				if(this.isUp){
					poi.reverse();
					this.isUp = false;
				}else{
					this.style.background = "url(img/down.gif)";
					this.isUp = true;
				}
				moneyArray = getMoney(money);
				trs = document.querySelectorAll('.goods');
				// console.log(poi.length,moneyArray.length,trs.length);
				for(var m =0;m < poi.length;m++){
					for(var n = 0;n < moneyArray.length;n++){
						if(poi[m] === moneyArray[n]){
							tbody.insertBefore(trs[n],tbody.children[1]);
						}
					}
				}
				moneyArray = getMoney(money);
			}else {
				btns[0].style.cssText= "background:url('img/ico1.gif') no-repeat 0px 0px;";
				var poi = placeArray.sort(function(a,b){return a.localeCompare(b);});
				if(this.isUp){
					poi.reverse();
					this.isUp = false;
				}else{
					this.style.background = "url(img/down.gif)";
					this.isUp = true;
				}
				placeArray = getPlace(places);
				trs = document.querySelectorAll('.goods');
				for(var m = 0;m < poi.length;m++){
					for(var n = 0;n < placeArray.length;n++){
						if(poi[m] === placeArray[n]){
							tbody.insertBefore(trs[n],tbody.children[1]);
						}
					}
				}
				placeArray = getPlace(places);
			}
		};
	}
	function getSum(){
		var temptotal = 0;
		for(var i = 0;i < selectItem.length;i++) {
			if(selectItem[i].checked){
				temptotal += moneyArray[i];
			}
		}
		return temptotal;
	}
	//获取价格，返回数组
	function getMoney(arr) {
		var m = [];
		for(var i = 0;i < arr.length;i++) {
			var str = (arr[i].innerText).substring(1);
			m[i]=parseFloat(str);
		}
		return m;
	}
	//获取地方，返回数组
	function getPlace(arr) {
		var m = [];
		for(var i = 0;i < arr.length;i++) {
			var str = (arr[i].innerText);
			m[i]=str;
		}
		return m;
	}
};
