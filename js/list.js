// JavaScript Document

documentReady(function(){
	(function(){
		var main=document.getElementById('main');
		var bigPic=document.getElementById('big_pic');
		var oSpan=bigPic.getElementsByTagName('span')[0];
		var Glass=document.getElementById('glass');
		var smallPic=main.getElementsByClassName('small_pic');
		var oUl=document.getElementById('smlpic');
		var aLi=oUl.getElementsByTagName('li');
		var aImg=oUl.getElementsByTagName('img');
		var Img1=document.getElementById('img1');
		var Img2=document.getElementById('img2');
		
		
		
/*
		for(var i=0;i<aImg.length;i++){
			aLi[i].index=i;
			aLi[i].onmouseenter=function(ev){
				ev=ev||event;//兼容性！
				ev.cancelBubble=true;
				for(var j=0;j<aImg.length;j++){
					aLi[j].style.borderColor='#fff';
				};
				this.style.borderColor='#e3393c';
				Img1.src="images/0"+[this.index+1]+".jpg"//图片名从01开始，所以要加1
				Img2.src="images/d"+[this.index+1]+".jpg"
			};//绑事件！鼠标进入小图片的时候
		};//for循环,小图片的鼠标事件！ 
*/

	
	//-------------------------放大镜-------------------------------------
		
		bigPic.onmousemove=function(ev){
			oSpan.style.display=Glass.style.display="block";
			ev=ev||event;
			
			var scroll_top=document.documentElement.scrollTop || document.body.scrollTop;//body 谷歌浏览器
			
			//减偏移量
			var l=ev.clientX-bigPic.offsetParent.offsetLeft-oSpan.offsetWidth/2;
			var t=ev.clientY+scroll_top-bigPic.offsetParent.offsetTop-oSpan.offsetHeight/2;
			
			//限制范围
			if(l<0){l=0};
			if(t<0){ t=0};
			if(l>bigPic.offsetWidth-oSpan.offsetWidth){
				l=bigPic.offsetWidth-oSpan.offsetWidth
			};
			if(t>bigPic.offsetHeight-oSpan.offsetHeight){
				t=bigPic.offsetHeight-oSpan.offsetHeight
			};
			oSpan.style.left=l+'px';
			oSpan.style.top=t+"px";
			//计算比率
			var rateY=t/(bigPic.offsetHeight-oSpan.offsetHeight);
			var rateX=l/(bigPic.offsetWidth-oSpan.offsetWidth);
			
			//移动大图片
			Img2.style.top=-(Img2.offsetHeight-Glass.offsetHeight)*rateY+"px";
			Img2.style.left=-(Img2.offsetWidth-Glass.offsetWidth)*rateX+"px";
		};
		
		bigPic.onmouseout=function(){
			oSpan.style.display=Glass.style.display="none";
		}
	
	
	
	
	})();

//--------------------------鼠标滑过变颜色--------------------------------------------
	(function(){
	   	var infoBottom=document.getElementById('info_bottom');
	   	var aDl=infoBottom.getElementsByTagName('dl');
		
		for(var k=0;k<aDl.length;k++){//循环让每个dl单独执行函数！
			magic1(aDl[k]);
			
		}   
   
		function magic1(m){
			var aA=m.getElementsByTagName('a');//拿到每个dl下面的a标签！
			var oI=document.createElement('i');
			//------------------鼠标进入函数！--------------------- 
			function enter(){
				for(var i=0;i<aA.length;i++){	
					aA[i].onmouseenter=function(){
						this.style.borderColor="#e3393c" 	
					};
				};
			};//enter函数！
		//-----------------------鼠标离开！--------------	
			function leave(){
				for(var i=0;i<aA.length;i++){
					aA[i].onmouseleave=function(){
					  this.style.borderColor="#ccc"
					};
				}; 
			};//leave函数！
		//----------------------鼠标点击切换！------------ 	
			function onc(){
				for(var i=0;i<aA.length;i++){
					aA[i].onclick=function(){
						for(var j=0;j<aA.length;j++){
							aA[j].className=""; 
						};//for循环清掉所有的颜色！
						this.className="ac1";
						this.appendChild(oI);	 
					};
					
				};//for循环！
			};//ONC函数！
		
		
		
			enter();
			leave();
			onc();	
		};//magic1函数！ 
		
		
		
	})();






//----------------------------数字加减
	(function(){
		var adds=document.getElementById('adds');
		var Btn1=adds.getElementsByTagName('button')[0];
		var Btn2=adds.getElementsByTagName('button')[1];
		var Num=document.getElementById('num');
		var n=1;
		
		Btn1.onclick=function(){
			n++;
			Num.innerHTML=n;
			Btn2.style.color="#666"
			Btn2.style.cursor="pointer";
			 if(n>1){
				 Btn2.onclick=function(){
					n--;
				  	if(n<=1){
						 n=1;
						 Btn2.style.color="#ccc"
						 Btn2.style.cursor="not-allowed";	  
					};	
				 	 Num.innerHTML=n;		  
				 }	 	 
			} 	  
		}//btn1函数
		
		
	})();  		
	




});