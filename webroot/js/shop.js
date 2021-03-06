/*
 * sort out the specials page with a nice slider
 */
$(function() {
	$(".priceAdjusters").hide();
	var $SpecialDiscountSlider = $(".SpecialDiscountSlider");
	var $SpecialAmount = $("#SpecialAmount");
	var $SpecialDiscount = $('#SpecialDiscount');
	var currentProduct;

	$SpecialDiscountSlider.slider({
		value:0,
		min: 0,
		max: 100,
		range: "min",
		step: 0.01,
		slide: function(event, ui) {
			specialAmount = $.NumberHelper.format((currentProduct.price/100)*ui.value);
			$SpecialAmount.val(specialAmount);
			$SpecialDiscountSlider.slider("option", "value", specialAmount);
			$SpecialDiscount.val(ui.value);
		}
	});

	// when the amount field is updated
	$SpecialAmount.change(function(){
		var amount = $(this).val();
		var discount = $.NumberHelper.format((amount / currentProduct.price) * 100);
		$SpecialDiscount.val(discount);
		$SpecialDiscountSlider.slider("option", "value", discount);

	});

	// when the discount field is updated
	$SpecialDiscount.change(function(){
		var discount = $(this).val();
		var amount = $.NumberHelper.format((currentProduct.price/100) * discount);

		$SpecialAmount.val(amount);
		$SpecialDiscountSlider.slider("option", "value", discount);

	});

	// when the product is changed
	$('.productChange').change(function(){
		if ($(this).val().length != 0) {
			$(".priceAdjusters").hide();
			metaData = $.HtmlHelper.getParams($(this));
			metaData.params.product = $(this).val();
			$.HtmlHelper.requestAction(metaData, resetData);
		}
	});

	// after the product is changed. call back for above
	var maxDiscount;
	function resetData(data, metaData){
		$(".priceAdjusters").show();
		currentProduct = data.Product;
		maxDiscount = 100 - (currentProduct.cost/currentProduct.price)*100;

		$SpecialDiscountSlider.slider("option", "max", maxDiscount);

		$SpecialAmount.val(0.00);
		$SpecialDiscount.val(0.00);
		$SpecialDiscountSlider.slider("option", "value", 0);
	}

	$('ul.gallery').galleria({
		history : true,
		clickNext : true,
		insert : '.mainImage',
		onThumb : function(thumb) { // thumbnail effects goes here
			 // fetch the thumbnail container
			 var _li = thumb.parents('li');

			 // if thumbnail is active, fade all the way.
			 var _fadeTo = _li.is('.active') ? '1' : '0.3';

			 // fade in the thumbnail when finnished loading
			 thumb.css({display:'none',opacity:_fadeTo}).fadeIn(1500);

			 // hover effects
			 thumb.hover(
				 function() { thumb.fadeTo('fast',1); },
				 function() { _li.not('.active').children('img').fadeTo('fast',0.3); } // don't fade out if the parent is active
			 )
		 },
		 onImage : function(image,caption,thumb) { // let's add some image effects for demonstration purposes
			 // fade in the image & caption
			 image.css('display','none').fadeIn(1000);
			 caption.css('display','none').fadeIn(1000);

			 // fetch the thumbnail container
			 var _li = thumb.parents('li');

			 // fade out inactive thumbnail
			 _li.siblings().children('img.selected').fadeTo(500,0.3);

			 // fade in active thumbnail
			 thumb.fadeTo('fast',1).addClass('selected');

			 // add a title for the clickable image
			 image.attr('title','Click for next image');
		 }
	});

});

/**
 * Gallery
 * http://devkick.com/lab/galleria/
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){r[e(c)]=k[c]||e(c);}k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);}}return p}('(5($){4 q;q=$.23.7=5(k){6(!q.1o()){Q J}$.1p(q.1b);4 l={Z:\'.1q\',K:E,10:E,1c:5(a,b,c){},1r:5(a){}};4 m=$.11(l,k);1d(4 i 24 m){6(i){$.7[i]=m[i]}}4 n=($(m.Z).R(m.Z))?$(m.Z):3(B.12(\'1e\')).25(8);4 o=$(B.12(\'1e\')).u(\'1s\');4 p=$(B.12(\'1f\')).u(\'1g\');n.u(\'1q\').13(o).13(p);Q 8.1t(5(){$(8).u(\'7\');$(8).1u(\'L\').1t(5(i){4 b=$(8);4 c=$.26?$.11({},m,b.27()):m;c.10=$(8).R(\':28-S\')?J:c.10;4 d=$(8).T(\'a\').R(\'a\')?$(8).T(\'a\'):J;4 e=$(8).1u(\'F\').C(\'M\',\'U\');4 f=d?d.9(\'1v\'):e.9(\'1h\');4 g=d?d.9(\'14\'):e.9(\'14\');4 j=1w 1x();6(c.K&&(N.r.t&&N.r.t.V(/\\#/,\'\')==f)){b.G(\'.D\').W(\'D\');b.u(\'D\')}$(j).29(5(){$(8).9(\'1y\',e.9(\'1y\'));4 a=d?d.T(\'F\').u(\'1z 1A\').C(\'M\',\'U\'):e.2a(E).u(\'1z\').C(\'M\',\'U\');6(d){d.2b(a)}6(!a.1B(\'1A\')){4 w=1i.1C(e.v()/e.y()*b.y());4 h=1i.1C(e.y()/e.v()*b.v());6(w<h){a.C({y:\'1D\',v:b.v(),1E:-(h-b.y())/2})}s{a.C({v:\'1D\',y:b.y(),1F:-(w-b.v())/2})}}s{N.1G(5(){a.C({1F:-(a.v()-b.v())/2,1E:-(a.y()-b.y())/2})},1)}a.9(\'O\',f);a.9(\'14\',g);a.1H(5(){$.7.X(f)});a.P(5(){$(8).u(\'P\')},5(){$(8).W(\'P\')});b.P(5(){b.u(\'P\')},5(){b.W(\'P\')});b.1I(a);a.C(\'M\',\'2c\');c.1r(3(a));6(b.1B(\'D\')){$.7.X(f)}e.1J()}).1K(5(){b.2d(\'<1f 2e="1K" 1L="2f:2g">2h 2i 2j: \'+f+\'</1f>\')}).9(\'1h\',f)})})};q.1M=5(a){Q $(a).R(\':1N-S\')?$(a).G(\':1O-S\'):$(a).1j()};q.1P=5(a){Q $(a).R(\':1O-S\')?$(a).G(\':1N-S\'):$(a).1Q()};q.1o=5(){$(\'1R\').13($(B.12(\'1e\')).9(\'1S\',\'1k\').C({v:\'1T\',y:\'1T\',M:\'U\'}));4 a=($(\'#1k\').v()!=1)?J:E;$(\'#1k\').1J();Q a};q.1b=5(a){4 b=$(\'.1s\');4 c=$(\'.7 F[O="\'+a+\'"]\');6(a){6($.7.K){N.r=N.r.1v.V(/\\#.*/,\'\')+\'#\'+a}c.15(\'L\').G(\'.D\').W(\'D\');c.15(\'L\').u(\'D\');4 d=$(1w 1x()).9(\'1h\',a).u(\'2k\');b.1U().13(d);b.G(\'.1g\').2l(c.9(\'14\'));$.7.1c(d,b.G(\'.1g\'),c);6($.7.10){d.C(\'2m\',\'2n\').1H(5(){$.7.1j()})}}s{b.G().2o().1U();$(\'.7 L.D\').W(\'D\')}$.7.16=a};$.11({7:{16:\'\',1c:5(){},X:5(a){6($.7.K){$.1V(a)}s{q.1b(a)}},1j:5(){4 a=$(q.1M($(\'.7 F[O="\'+$.7.16+\'"]\').15(\'L\'))).T(\'F\').9(\'O\');$.7.X(a)},1Q:5(){4 a=$(q.1P($(\'.7 F[O="\'+$.7.16+\'"]\').15(\'L\'))).T(\'F\').9(\'O\');$.7.X(a)}}})})(3);3.11({z:17,x:17,1p:5(a){3.x=a;4 b=r.t;3.z=b;6(3.H.1l){6(3.z===\'\'){3.z=\'#\'}$("1R").1I(\'<1W 1S="18" 1L="M: U;"></1W>\');4 c=$("#18")[0];4 d=c.1m.B;d.1X();d.1Y();d.r.t=b}s 6($.H.19){3.A=[];3.A.I=K.I;3.1a=[];3.Y=E}3.x(b.V(/^#/,\'\'));2p(3.1Z,2q)},20:5(a){3.A.21(a);3.1a.I=0;8.Y=E},1Z:5(){6(3.H.1l){4 a=$("#18")[0];4 b=a.2r||a.1m.B;4 c=b.r.t;6(c!=3.z){r.t=c;3.z=c;3.x(c.V(/^#/,\'\'))}}s 6($.H.19){6(!3.1n){4 d=K.I-3.A.I;6(d){3.Y=J;4 i;6(d<0){1d(i=0;i<1i.2s(d);i++){3.1a.2t(3.A.2u())}}s{1d(i=0;i<d;i++){3.A.21(3.1a.2v())}}4 e=3.A[3.A.I-1];6(e!==17){3.z=r.t;3.x(e)}}s 6(3.A[3.A.I-1]===17&&!3.Y){6(B.22.2w(\'#\')>=0){3.x(B.22.2x(\'#\')[1])}s{c=r.t;3.x(\'\')}3.Y=E}}}s{c=r.t;6(c!=3.z){3.z=c;3.x(c.V(/^#/,\'\'))}}},1V:5(a){4 b;6(3.H.19){b=a}s{b=\'#\'+a;r.t=b}3.z=b;6(3.H.1l){4 c=$("#18")[0];4 d=c.1m.B;d.1X();d.1Y();d.r.t=b;3.x(a)}s 6(3.H.19){3.1n=E;8.20(a);4 e=5(){3.1n=J};N.1G(e,2y);3.x(a);r.t=b}s{3.x(a)}}});',62,159,'|||jQuery|var|function|if|galleria|this|attr||||||||||||||||||location|else|hash|addClass|width||historyCallback|height|historyCurrentHash|historyBackStack|document|css|active|true|img|siblings|browser|length|false|history|li|display|window|rel|hover|return|is|child|find|none|replace|removeClass|activate|isFirst|insert|clickNext|extend|createElement|append|title|parents|current|undefined|jQuery_history|safari|historyForwardStack|onPageLoad|onImage|for|div|span|caption|src|Math|next|css_test|msie|contentWindow|dontCheck|hasCSS|historyInit|galleria_container|onThumb|galleria_wrapper|each|children|href|new|Image|alt|thumb|noscale|hasClass|ceil|auto|marginTop|marginLeft|setTimeout|click|prepend|remove|error|style|nextSelector|last|first|previousSelector|prev|body|id|1px|empty|historyLoad|iframe|open|close|historyCheck|historyAddHistory|push|URL|fn|in|insertBefore|meta|data|only|load|clone|replaceWith|block|html|class|color|red|Error|loading|image|replaced|text|cursor|pointer|andSelf|setInterval|100|contentDocument|abs|unshift|pop|shift|indexOf|split|200'.split('|'),0,{}));