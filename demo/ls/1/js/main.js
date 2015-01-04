$(function ()
{	
	//工具类
	var Tools = new startTools();
	
	//是否监测滑动
	var isAnim = false;
	
	//第几个动画
	var AnimNumbers = 0;
	
	var CONTEXT = document.getElementById("canvas").getContext("2d");
	var CONTEXT_W = 640;
	var CONTEXT_H = $('html').height();
	
	var GameLead = new Image();
	GameLead.src = 'img/img1x.jpg';
	
	loadImage(function()
	{
		InitStart();
	});
	
	var startAmin = function()
	{
		//添加侦听事件
		onTouchStart();	
			
		//初始动画
		$('#sd').animate({'opacity':'1', 'width':'100%', 'left':'0%' }, 500, null, function()
		{			
			$('#indexmain').animate({'opacity':'1', 'margin-top':'61px' }, 500, null, function()
			{
				$('#hdts').animate({'opacity':'1' }, 400, null, function()
				{
					isAnim = true;
				});
			});
		});
	}
	
	var onTouchStart = function()
	{
		//向上滑动
		$("html, body").touchwipe(
		{		
			wipeDown: function()
			{
				if(isAnim)
				{
					if(AnimNumbers < 10) 
					{
						isAnim = false;
						AnimNumbers++;
						
						if(AnimNumbers == 1)
						{
							$('#sd2').css({'opacity':'0' });
							
							$('#box2').show();			
							$('#box1').animate({'top':-$('html').height() }, 500, null, function()
							{
								$('#box1').hide();
								
								$('#sd2').animate({'opacity':'1' }, 500, null, function()
								{
									isAnim = true;
								});
							});
						
						}else if(AnimNumbers == 2)
						{
							$('#sd3').css({'opacity':'0' });
										
							$('#box2').animate({'top':-$('html').height() }, 500, null, function()
							{
								$('#box2').hide();
							});
							
							$('#box3').show();
							$('#box3').animate({'top':'0' }, 500, null, function()
							{							
								$('#sd3').animate({'opacity':'1' }, 500, null, function()
								{
									isAnim = true;
								});
							});
							
						}else if(AnimNumbers == 3)
						{
							$('#sd4').css({'opacity':'0' });
							
							$('#box3').animate({'top':-$('html').height() }, 500, null, function()
							{
								$('#box3').hide();
							});
							
							$('#box4').show();
							$('#box4').animate({'top':'0' }, 500, null, function()
							{
								$('#sd4').animate({'opacity':'1' }, 500, null, function()
								{
									isAnim = true;
								});
							});
						
						}else if(AnimNumbers == 4)
						{
							$('#sd5').css({'opacity':'0' });
							
							$('#box4').animate({'top':-$('html').height() }, 500, null, function()
							{
								$('#box4').hide();
							});
							
							$('#box5').show();
							$('#box5').animate({'top':'0' }, 500, null, function()
							{
								$('#sd5').animate({'opacity':'1' }, 500, null, function()
								{
									isAnim = true;
								});
							});
						
						}else if(AnimNumbers == 5)
						{
							$('#sd6').css({'opacity':'0' });
							
							$('#box5').animate({'top':-$('html').height() }, 500, null, function()
							{
								$('#box5').hide();
								$('#sd6').animate({'opacity':'1' }, 500, null, function()
								{
									isAnim = true;
								});
							});
							
							$('#box6').show();
							$('#box6').animate({'top':'0' }, 500, null, function()
							{
								$('#sd6').animate({'opacity':'1' }, 500, null, function()
								{
									isAnim = true;
								});
							});
						
						}else if(AnimNumbers == 6)
						{
							$('#sd7').css({'opacity':'0' });
							
							$('#box6').animate({'top':-$('html').height() }, 500, null, function()
							{
								$('#box6').hide();
							});
							
							$('#box7').show();
							$('#box7').animate({'top':'0' }, 500, null, function()
							{
								$('#sd7').animate({'opacity':'1' }, 500, null, function()
								{
									isAnim = true;
								});
							});
						
						}else if(AnimNumbers == 7)
						{
							$('#sd8').css({'opacity':'0', 'width':'0%', 'left':'50%' });
							
							$('#box7').animate({'top':-$('html').height() }, 500, null, function()
							{
								$('#box7').hide();
							});
							
							$('#box8').show();
							$('#box8').animate({'top':'0' }, 500, null, function()
							{
								$('#sd8').show();
								$('#sd8').animate({'opacity':'1', 'width':'100%', 'left':'0%' }, 500, null, function()
								{
									isAnim = true;
								});
							});
						
						}else if(AnimNumbers == 8)
						{
							$('#sd9').css({'opacity':'0' });
							
							$('#box8').animate({'top':-$('html').height() }, 500, null, function()
							{
								$('#box8').hide();
							});
							
							$('#box9').show();
							$('#box9').animate({'top':'0' }, 500, null, function()
							{
								$('#sd9').animate({'opacity':'1' }, 500, null, function()
								{
									isAnim = true;
								});
							});
						
						}else if(AnimNumbers == 9)
						{
							$('#sd10x').css({'margin':'-195px 0 0 -4px', 'width':'0', 'height':'0' });
							$('#sd10').css({'opacity':'0', 'margin-top':'55px' });
							
							$('#box9').animate({'top':-$('html').height() }, 500, null, function()
							{
								$('#box9').hide();
							});
							
							$('#box10').show();
							$('#box10').animate({'top':'0' }, 500, null, function()
							{
								$('#sd10x').animate({'width':'400px', 'height':'400px', 'margin':'-395px 0 0 -204px' }, 800);							
								$('#sd10').animate({'opacity':'1', 'margin-top':'35px' }, 500, null, function()
								{
									isAnim = true;
								});
							});
						
						}else if(AnimNumbers == 10)
						{
							$('#sd11').css({'opacity':'0', 'width':'0%', 'left':'50%' });								
							
							$('#sd10x').animate({'width':'600px', 'height':'600px', 'margin':'-495px 0 0 -304px' }, 600);	
							
							$('#sd11').animate({ 'opacity':'1', 'width':'100%', 'left':'0%' }, 600);
							
							$('#box11').show();
							$('#box11').animate({'opacity':'1' }, 1000, null, function()
							{
								isAnim = true;
							});			
								
							$('#hdts').animate({'opacity':'0' }, 400);
						}
					}
				}
			},	
					
			wipeUp: function()
			{
				if(isAnim)
				{
					isAnim = false;
					if(AnimNumbers > 0) AnimNumbers--;
					
					if(AnimNumbers == 0)
					{						
						$('#box1').show();
						$('#box1').animate({'top':'0' }, 500, null, function()
						{
							isAnim = true;
							$('#box2').hide();
						});
					
					}else if(AnimNumbers == 1)
					{						
						$('#box3').animate({'top':$('html').height() }, 500, null, function()
						{
							$('#box3').hide();
						});
						
						$('#box2').show();
						$('#box2').animate({'top':'0' }, 500, null, function()
						{							
							isAnim = true;
						});
						
					}else if(AnimNumbers == 2)
					{
						$('#box4').animate({'top':$('html').height() }, 500, null, function()
						{
							$('#box4').hide();
						});
						
						$('#box3').show();
						$('#box3').animate({'top':'0' }, 500, null, function()
						{
							isAnim = true;
						});
					
					}else if(AnimNumbers == 3)
					{
						$('#box5').animate({'top':$('html').height() }, 500, null, function()
						{
							$('#box5').hide();
						});
						
						$('#box4').show();
						$('#box4').animate({'top':'0' }, 500, null, function()
						{
							isAnim = true;
						});
					
					}else if(AnimNumbers == 4)
					{
						$('#box6').animate({'top':$('html').height() }, 500, null, function()
						{
							$('#box6').hide();
						});
						
						$('#box5').show();
						$('#box5').animate({'top':'0' }, 500, null, function()
						{
							isAnim = true;
						});
					
					}else if(AnimNumbers == 5)
					{
						$('#box7').animate({'top':$('html').height() }, 500, null, function()
						{
							$('#box7').hide();
						});
						
						$('#box6').show();
						$('#box6').animate({'top':'0' }, 500, null, function()
						{
							isAnim = true;
						});
					
					}else if(AnimNumbers == 6)
					{
						$('#box8').animate({'top':$('html').height() }, 500, null, function()
						{
							$('#box8').hide();
						});
						
						$('#box7').show();
						$('#box7').animate({'top':'0' }, 500, null, function()
						{
							isAnim = true;
						});
					
					}else if(AnimNumbers == 7)
					{
						$('#box9').animate({'top':$('html').height() }, 500, null, function()
						{
							$('#box9').hide();
						});
						
						$('#box8').show();
						$('#box8').animate({'top':'0' }, 500, null, function()
						{
							isAnim = true;
						});
					
					}else if(AnimNumbers == 8)
					{
						$('#box10').animate({'top':$('html').height() }, 500, null, function()
						{
							$('#box10').hide();
						});
						
						$('#box9').show();
						$('#box9').animate({'top':'0' }, 500, null, function()
						{
							isAnim = true;
						});
					
					}else if(AnimNumbers == 9)
					{						
						$('#sd10x').css({'width':'400px', 'height':'400px', 'margin':'-395px 0 0 -204px' });
									
						$('#box11').show();
						$('#box11').animate({'opacity':'0' }, 500, null, function()
						{
							isAnim = true;
						});
						
						$('#hdts').animate({'opacity':'1' }, 400);
					}
				}
			}
		});
	}
	
	
	var InitStart = function()
	{			
		canvas.height = $('html').height();
		canvas.width = CONTEXT_W;
		
		CONTEXT.drawImage(GameLead, 0, 0, CONTEXT_W, 1100);			
		CONTEXT.globalCompositeOperation = 'destination-out';
		
		// 处理“鼠标”或“手指”按下时的动作。
		function eventDown(e)
		{
			e.preventDefault();				
			mousedown = true;	
			
			document.getElementById('bgMusic').play();
			$('#indextext, #index_1, #index_2').hide();				
		}
	
		// 处理“鼠标”或“手指”按下后移动时的动作。
		function eventMove(e)
		{
			e.preventDefault();
				
			if (mousedown)
			{
				// 如果存在涉及当前事件的手指的一个列表（这里是指正在移动中的手指）。
				if (e.changedTouches)
				{
					// 取得涉及当前事件中众多手指中的最后一个。
					e = e.changedTouches[e.changedTouches.length - 1];
				}
	                    
				// 计算当前“鼠标”或“手指”在canvas中的坐标（注意，计算的坐标是canvas里的坐标）。
				var x = (e.clientX + document.body.scrollLeft || e.pageX) - $('#canvas').offset().left || 0, y = (e.clientY + document.body.scrollTop || e.pageY) - $('#canvas').offset().top || 0;
					
				with (CONTEXT)
				{						
					beginPath();
					arc(x, y, 50, 0, Math.PI * 2);
					fill();
				}
			}
		}
	            
		// 处理“鼠标”或“手指”按下后抬起时的动作。
		function eventUp(e)
		{
			mousedown = false;
				
			// 得到中奖图片的像素数据（像素计算非常耗费CPU和内存，可能会导致浏览器崩溃）。
			var data = CONTEXT.getImageData(0, 10, CONTEXT_W, CONTEXT_H).data;
				
			// 通过计算每一个像素，得知还有多少“遮挡区域”。
			for (var i = 0, j = 0; i < data.length; i += 4)
			{
				if (data[i] && data[i + 1] && data[i + 2] && data[i + 3])
				{
					j++;
				}
			}
	                
			// 当还只剩下20%的遮挡区域时弹出中奖信息，同时撤掉遮挡区域。
			if (j <= CONTEXT_W * CONTEXT_H * 0.5)
			{			
				CONTEXT.clearRect(0, 0, CONTEXT_W, CONTEXT_H);					
					
				//开始
				startAmin();
				
				$('canvas').hide();
				
				// 监听“触摸的开始、移动与抬起”事件。
				document.removeEventListener('touchstart', eventDown);			
				document.removeEventListener('touchmove', eventMove);
				document.removeEventListener('touchend', eventUp);
						
				// 监听“鼠标的开始、移动与抬起”事件。
				document.removeEventListener('mousedown', eventDown);			
				document.removeEventListener('mousemove', eventMove);
				document.removeEventListener('mouseup', eventUp);
			}
		}
	            
		// 监听“触摸的开始、移动与抬起”事件。
		document.addEventListener('touchstart', eventDown);			
		document.addEventListener('touchmove', eventMove);
		document.addEventListener('touchend', eventUp);
	            
		// 监听“鼠标的开始、移动与抬起”事件。
		document.addEventListener('mousedown', eventDown);			
		document.addEventListener('mousemove', eventMove);
		document.addEventListener('mouseup', eventUp);
	}
	
	function loadImage($callback)
	{
		var baseURL = 'img/';
		var pArr = ['11_1.png', '11_2.png', 'bg_op.png', 'bg_op2.png', 'hdts.png', 'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg', 'img10s.jpg', 'img11.jpg', 'indexmain.png', 'main2flower.png', 'namename.png', 'sd4.png', 'sd5.png', 'sd6.png', 'sd7.png', 'sd8.png', 'sd9.png'];
		var loader = new PxLoader();
			
		for(var i = 0; i < pArr.length; i++)
		{
			loader.addImage(baseURL + pArr[i]);
		}
				
		loader.addProgressListener(function (e)
		{
			var loadnum = parseInt((e.completedCount / e.totalCount) * 100);
				
			//$('#unmbers').text(loadnum + '%');
		});
			
		loader.addCompletionListener(function (e)
		{
			//$('#loading').animate({'opacity':'0'}, 1000, null, function()
			//{
				//$('#loading').hide();
				$callback();
			//});
		});
			
		loader.start();
	}
});