// JavaScript Document

documentReady(function(){


(function(){
	//---------------------------------------------菜单
	var oMenu=document.getElementsByClassName('list_nav')[0];
	var aLi=oMenu.getElementsByTagName('li');
	var oMenuCont=document.getElementsByClassName('popup')[0];
	var a_cate_part=oMenuCont.getElementsByClassName('section');
	var leave_menu=null;//离开右侧 回到左侧
	
	//cate: n. 美食；佳肴；外购食物
	
	//删除所有li上的ac
	function del_li_ac(){
		for(var i=0; i<aLi.length; i++){
			aLi[i].className="";
		};
	};
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].onmouseover=function(){
			clearTimeout(leave_menu);
			oMenuCont.style.display="block";
			del_li_ac();//删除所有li上的ac  
			this.className="ac";//自己增加ac
			
			//得到自己的data-index自定义属性
			var show_id=this.getAttribute("data-index");
			
			for(var j=0; j<a_cate_part.length; j++){
				a_cate_part[j].style.display="none";
			};
			//显示相对应的内容
			document.getElementById("cate_item"+show_id).style.display="block";
		};
		
		aLi[i].onmouseout=function(){
			clearTimeout(leave_menu);
			leave_menu=setTimeout(function(){
				oMenuCont.style.display="none";
				del_li_ac();//删除所有li上的ac  
			},100)
		};
	};
	
	oMenuCont.onmouseenter=function(ev){
		clearTimeout(leave_menu);
		this.style.display="block";
	};
	
	oMenuCont.onmouseleave=function(){
		del_li_ac();//删除所有li上的ac  
		this.style.display="none";
	};
})();




(function(){
	var oDiv=document.getElementById('slide');
	var aBtn=oDiv.getElementsByTagName('ol')[0].children;
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	var li_w=getStyle(aLi[0], 'width');//图片的宽度
	var n=0;//当前显示图片索引
	
	aLi[n].style.display='block';
	aLi[n].style.left='0px';
	
	
	//添加点击事件
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;//发拍照
		aBtn[i].onclick=function(){
			if(n!=this.index){
				slideItem(n,this.index);
				n=this.index;
				changeAc();
			}
		};
	};
	
	
	var pBtn=oDiv.children[2];
	var nBtn=oDiv.children[3];
	
	//左右按钮动作
	
	pBtn.onclick=function(){
		if(n<1){
			n=aLi.length;
			slideItem(0,aLi.length-1);
		}else{
			slideItem(n,n-1);
		};
		n--;
		changeAc();
	};
	

	nBtn.onclick=function(){
		n++;
		if(n>aLi.length-1){
			n=0;
			slideItem(aLi.length-1,0);
		}else{
			slideItem(n-1,n);
		};
		changeAc();
		
	};
	//-----------------------------------------------
	function slideItem(a,b){
		aLi[a].style.display='block';
		aLi[a].style.left=0;
		aLi[b].style.display='block';
		aLi[b].style.left=li_w+'px';
		move(aLi[a],'left',-li_w,700);
		move(aLi[b],'left',0,700,function(){
			aLi[a].style.display='none';
		});
	};
	
	function changeAc(){
		for(var j=0; j<aBtn.length; j++){
			aBtn[j].className='';
		};
		aBtn[n].className='ac';
	}
	
	var timer;
	function run(){
		timer=setInterval(function(){
			n++;
			if(n>aLi.length-1){
				n=0;
				slideItem(aLi.length-1,0);
			}else{
				slideItem(n-1,n);
			};
				changeAc();
		},2000)
	};
	run();
	oDiv.onmouseover=function(){
		clearInterval(timer); //清除定时器
	};
	oDiv.onmouseout=run;

})();
//-----------------------------------------选项卡
(function(){
	function Tab(obj){
		this.oDiv=obj;
		this.oUl=obj.getElementsByTagName('ul')[0];
		this.aLi=this.oUl.children;
		this.aTabItem=obj.getElementsByClassName('content');
		this.n=0; //自动运行 计数器
	};
	
	//-------------------------------------
	Tab.prototype.changeTab=function(){
		var _this=this;
		for(var i=0; i<this.aLi.length; i++){
			this.aLi[i].index=i;  //发牌照
			
			this.aLi[i].onmouseover=function(){
				for(var j=0; j<_this.aLi.length; j++){
					_this.aLi[j].className="";
					_this.aTabItem[j].style.display="none";
				};
				this.className="ac";
				_this.aTabItem[this.index].style.display="block";
				_this.n=this.index;
			}
		};
		
		return this;
	};

	var oTab1=document.getElementById('one');
	
	var tab1=new Tab(oTab1);
	
	tab1.changeTab();//链式操作

})();

//--------------------------侧边栏导航
(function(){
	var LocationFloorList=document.getElementById('LocationFloorList');
	var aLi=LocationFloorList.getElementsByTagName('li');
	var aFloor=document.getElementsByClassName('floore');
	var arr=[];
		
	//-------------------------------------------------
		
	for(var i=0; i<aFloor.length; i++){
		var json={};
		json.name=i;
		json.offsetTop=aFloor[i].offsetTop;
		arr.push(json);
	};
	
	console.log(arr)
	
	window.onscroll=function(){
		//显示楼层编号-------------------------------------------------
		var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop>1500){
			LocationFloorList.style.display='block';
		}else{
			LocationFloorList.style.display='none';
		};
		
		// 根据楼层滚动位置，定位编号------------------------------------------------
		var last_arr=[];
		for(var j=0; j<arr.length; j++){
			if(arr[j].offsetTop<scrolltop+400){//400为接近屏幕的敏感区
				last_arr.push(arr[j].name);
			}
		};
		
		console.log(last_arr);
		var li_index=last_arr[last_arr.length-1];

		for(var l=0; l<aFloor.length; l++){
			aLi[l].className='';
		};
		//页面上部如果有内容，没有楼层会放入新数组，产生错误
		last_arr.length==0 ?aLi[0].className='ac':aLi[li_index].className='ac';
	};
	
	//点击编号，跳转到相对楼层-----------------------------------------------
	for(var i=0; i<aFloor.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var end=arr[this.index].offsetTop;
			move(start,end)
		}
	};
	//move-------------------------------------------------------
	var timer;
	function move(start,end){
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);
			if(n==count){
				clearInterval(timer);
			};
		},30)
	};

})();




})
