$(document).ready(function() {
//		$.extend({hello: function(){alert("hello");}});
		
		
$.fn.extend({
	waterfall: function() {
		var $main = $("#main"),
			$box = $(".box"),
			$pic = $(".pic"),
			$img = $(".pic>img"),
			$loader = $("#loader");
		var boxWidth = $box.eq(0).outerWidth(),//盒子宽度
		num = Math.floor($(window).width() / boxWidth), //获取每行最多放置图片数目	
		boxItem = []; //存储每列高度
	
		$box.each(function(index, value) {
			var boxHeight = $box.eq( index ).outerHeight();
//			console.log(boxHeight);
			if( index < num ) {
				boxItem[ index ] = boxHeight;
			} else {
				var minHeight = Math.min.apply(null, boxItem); //获取数组中最小高度值
				var minIndex = $.inArray(minHeight, boxItem); //获取最小高度值在数组中的索引位置
				var min = boxItem.indexOf(minHeight);
				$( value ).css({
					position: "absolute",
					top: minHeight,
					left: $box.eq( minIndex ).position().left
				});
				boxItem [ minIndex ] += $box.eq( index ).outerHeight();
			}
		});
		return $(this);
	},
	loader: function(){
		var imgData = {"data":[{src: "1.jpg"},{src: "2.jpg"},{src: "3.jpg"},{src: "4.jpg"},{src: "5.jpg"},{src: "6.jpg"},{src: "7.jpg"},{src: "8.jpg"},{src: "9.jpg"},{src: "10.jpg"}]};
		$.each(imgData.data, function(index, value) {
			var $obox = $("<div>").addClass("box").appendTo($("#main"));
			var $opic = $("<div>").addClass("pic").appendTo($obox);
			$("<img>").attr({
				src: "images/" + value.src,
				alt: "pic"
			}).appendTo($opic);
		});
		return $(this);
	}
});
	$(document).waterfall();
	$( window ).on("resize", function(){
		var boxWidth = $box.eq(0).outerWidth(),//盒子宽度
		num = Math.floor($(window).width() / boxWidth), //获取每行最多放置图片数目	
		$main = $("#main");
		
		$main.css({
			width: num * boxWidth,
			margin: "0 auto"
		});
		$(document).waterfall();
	})
	$(document).scroll(function() {
		var $box = $(".box");
		var scrollTop = $(document).scrollTop();
		var docHeight = $(document).height();
		var lastHeight = $box.last().offset().top + Math.floor($box.last().offset().top / 2 );
//		console.log(lastHeight);
//		console.log(scrollTop);
//		console.log(docHeight);
		if( lastHeight < scrollTop + docHeight){//判断距离底部距离
			$(document).loader().promise().done(function(){ //通过队列先载入后排列
			$(document).waterfall();
		});
		}
	});
});
