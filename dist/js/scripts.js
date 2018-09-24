function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.scale');
		if ( !t.is('.scale-min') ) {
			t.outerHeight(t.outerWidth()*$(this).attr('data-ratio'));
		} else {
			t.css({
				'min-height': t.outerWidth()*$(this).attr('data-ratio')
			});
		}
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:1099px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	
	function setHeroSlider() {
		if ( $('.hero-slider').hasClass('slick-initialized') ) {
			$('.hero-slider').slick('unslick').removeClass('is-visible');
		}
		$('.hero-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			infinite: true,
			speed: 750,
			adaptiveHeight: true,
			cssEase: 'ease'
		}).addClass('is-visible');
	}
	if ( $('.hero-slider').length ) {
		setHeroSlider();
	}
	
	$('.steps-item').on('mouseenter', function() {
		var svg = $(this).find('.steps--speedometer');
		var paths = svg.find('path');
		var speed = 500;
		paths.each(function() {
			var delay = speed/paths.length*$(this).attr('data');
			$(this).css({
				'-webkit-transition-delay': delay/1000+'s',
				'transition-delay': delay/1000+'s'
			});
		});
		paths.css({
			'fill': '#55afed'
		});
	});
	$('.steps-item').on('mouseleave', function() {
		var svg = $(this).find('.steps--speedometer');
		var paths = svg.find('path');
		var speed = 500;
		paths.each(function() {
			var delay = speed-(speed/paths.length*$(this).attr('data'));
			$(this).css({
				'-webkit-transition-delay': delay/1000+'s',
				'transition-delay': delay/1000+'s'
			});
		});
		paths.css({
			'fill': '#dfdfdf'
		});
	});
	
	$('.reviews-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 500,
		adaptiveHeight: true,
		cssEase: 'ease',
		responsive: [
			{
				breakpoint: 1099,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 639,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	function setReviews() {
		$('.reviews-slider').each(function() {
			var items = $(this).find('.reviews-slider__item');
			var max = 0;
			items.each(function() {
				var h = $(this).find('.reviews-slider-quote').position().top+$(this).find('.reviews-slider-quote').outerHeight();
				max = h > max ? h : max;
			});
			items.outerHeight(max);
		});
	}
	if ( $('.reviews-slider').length ) {
		setReviews();
	}
	setReviews();
	$('.reviews-slider__item').on('click', function() {
		if ( !$(this).hasClass('slick-active') ) {
			$('.reviews-slider').slick('slickGoTo',$(this).attr('data-slick-index'));
		}
	});
	
	$('.news__grid').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 500,
		adaptiveHeight: true,
		cssEase: 'ease',
		responsive: [
			{
				breakpoint: 1099,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 639,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$('.gallery').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 500,
		adaptiveHeight: true,
		cssEase: 'ease',
		responsive: [
			{
				breakpoint: 1499,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 1099,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 639,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	
	function generateSliderIcons() {
		$('.slick-circled .slick-prev, .slick-circled .slick-next').empty().append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.494 31.494" width="512" height="512"><path d="M10.273 5.009a1.112 1.112 0 0 1 1.587 0 1.12 1.12 0 0 1 0 1.571l-8.047 8.047h26.554c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127 1.127H3.813l8.047 8.032c.429.444.429 1.159 0 1.587a1.112 1.112 0 0 1-1.587 0L.321 16.532a1.12 1.12 0 0 1 0-1.571l9.952-9.952z" fill="#FFF"/></svg>');
	}
	generateSliderIcons();
	
	function generateCalcProgress() {
		$('.calc-progress').each(function() {
			var t = $(this);
			var nums = t.find('.calc-progress--num');
			for ( var i=1; i<nums.length; i++ ) {
				nums.filter('[data-id="'+i+'"]').after('<i class="calc-progress--line"></i>');
			}
		});
	}
	function setCalcProgress() {
		$('.calc-progress').each(function() {
			var t = $(this);
			var lines = t.find('.calc-progress--line');
			lines.each(function() {
				var prevNum = $(this).prev('.calc-progress--num');
				var nextNum = $(this).next('.calc-progress--num');
				if ( !isMobile ) {
					var diff = 20;
				} else {
					var diff = 10;
				}
				$(this).css({
					left: prevNum.position().left+prevNum.outerWidth()+diff,
					width: nextNum.position().left-(prevNum.outerWidth()+prevNum.position().left)-diff
				});
			});
		});
	}
	function updateCalcProgress(e,i) {
		var target = e.find('.calc-progress--num').filter('[data="'+i+'"]');
		if ( !target.hasClass('is-active') ) {
			target.addClass('is-active').prev('.calc-progress--line').addClass('is-active');
		}
	}
	function setCalcStep(e,i) {
		e.find('.calc-content').slick('slickGoTo',i-1);
		updateCalcProgress(e,i)
	}
	
	if ( $('.calc').length ) {
		generateCalcProgress();
		setCalcProgress();
	}
	
	$('.calc-content').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		speed: 500,
		//adaptiveHeight: true,
		fade: true,
		cssEase: 'ease',
		draggable: false,
		swipe: false,
		responsive: [
			{
				breakpoint: 1099,
				settings: {
					adaptiveHeight: true
				}
			}
		]
	});
	$('[data-step-go]').on('click', function(e) {
		e.preventDefault();
		var container = $(this).parents('.calc');
		setCalcStep(container,$(this).attr('data-step-go'));
	});
	$('.calc-progress--num').on('click', function(e) {
		e.preventDefault();
		if ( $(this).hasClass('is-active') ) {
			var container = $(this).parents('.calc');
			setCalcStep(container,$(this).attr('data'));
		}
	});
	
	function setStepsSlider() {
		if ( $('.steps__grid').hasClass('slick-initialized') ) {
			$('.steps__grid').slick('unslick');
		}
		if ( isMobile ) {
			$('.steps__grid').slick({
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				speed: 500,
				cssEase: 'ease',
				responsive: [
					{
						breakpoint: 639,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
		}
	}
	if ( $('.steps__grid').length ) {
		setStepsSlider();
	}

	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {
				
			} else {
			}
		}
		setRatio();
		if ( $('.hero-slider').length ) {
			setHeroSlider();
		}
		if ( $('.steps__grid').length ) {
			setStepsSlider();
		}
		if ( $('.calc').length ) {
			setCalcProgress();
		}
		if ( $('.reviews-slider').length ) {
			setReviews();
		}
		generateSliderIcons();
	}
	
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	
	$('input[type="checkbox"], input[type="radio"]').uniform();
	$('.select-standart').selectric({
		nativeOnMobile: true
	});
	$('.input-date').datepicker();
	
	$('.calc-color--item').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('is-active') ) {
			$(this).addClass('is-active').siblings().removeClass('is-active');
		}
	});
	
	$('.calc-address input[type="radio"]').on('change', function(e) {
		var label = $(this).parents('.calc-address__label');
		label.addClass('is-active').siblings().removeClass('is-active');
	});
	
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( !Modernizr.mq('(max-width:999px)') ) {
			var diff = 30;
		} else {
			var diff = 15;
		}
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff; 
		}
		t.css({
			'top': h+'px'
		});
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	function menuOpen() {
		$('.menu-open, .menu-m, .fade-bg').addClass('is-opened');
		$('body').addClass('is-locked');
	}
	function menuClose() {
		$('.menu-open, .menu-m, .fade-bg').removeClass('is-opened');
		$('body').removeClass('is-locked');
	}
	$('.menu-open').on('click', function(e) {
		if ( !$(this).hasClass('is-opened') ) {
			menuOpen();
		} else {
			menuClose();
		}
	});
	$('.menu-m--close, .fade-bg').on('click', function(e) {
		menuClose();
	});

	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	
	$(document).on('scroll', function() {
		if ( !isMobile ) {
			if ( $(document).scrollTop() > 136-70 ) {
				$('.header').addClass('is-fixed');
			} else {
				$('.header').removeClass('is-fixed');
			}
		} else {
			$('.header').removeClass('is-fixed');
		}
	});
	
	$('.faq--title').on('click', function() {
		var t = $(this);
		var content = t.next('.faq__content');
		if ( !t.hasClass('is-active') ) {
			content.stop().slideDown(300);
			t.addClass('is-active');
		} else {
			content.stop().slideUp(300);
			t.removeClass('is-active');
		}
	});
	
	$('[data-anchor]').on('click', function(e) {
		e.preventDefault();
		var id = $(this).attr('data-anchor');
		var target = $('[data-anchor-to="'+id+'"]');
		if ( !isMobile ) {
			var diff = 69;
		} else {
			var diff = 60;
		}
		$('html, body').stop().animate({
			scrollTop: target.offset().top-diff
		}, 1000, 'easeInOutCubic');
		if ( $('.menu-open').hasClass('is-opened') ) {
			menuClose();
		}
	});
});