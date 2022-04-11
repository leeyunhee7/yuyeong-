var App = function() {

	function handleViewport() {
		$("input, textarea, select, button, i, div.note-editing-area, span.select2-selection, .calendar-time, ul.tag-editor, div.asSpinner-control").on({ 'touchstart' : function() {
			zoomDisable();
		}});
		$("input, textarea, select, button, i, div.note-editing-area, span.select2-selection, .calendar-time, ul.tag-editor, div.asSpinner-control").on({ 'touchend' : function() {
			setTimeout(zoomEnable, 500);
		}});
		function zoomDisable() {
			$('head meta[name=viewport]').remove();
			$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">');
		}
		function zoomEnable() {
			$('head meta[name=viewport]').remove();
			$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1">');
		}
	}

    function handleIEFixes() {
        //fix html5 placeholder attribute for ie7 & ie8
        if (jQuery.browser.msie && jQuery.browser.version.substr(0, 1) < 9) { // ie7&ie8
            $('input[placeholder], textarea[placeholder]').each(function () {
                var input = jQuery(this);
                $(input).val(input.attr('placeholder'));
                $(input).focus(function() {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
                $(input).blur(function() {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    }

    function handleBootstrap() {
        /*Bootstrap Carousel*/
        $('.carousel').carousel({
            interval: 15000,
            pause: 'hover'
        });
        /*Tooltips*/
        $('.tooltips').tooltip();
        $('.tooltips-show').tooltip('show');
        $('.tooltips-hide').tooltip('hide');
        $('.tooltips-toggle').tooltip('toggle');
        $('.tooltips-destroy').tooltip('destroy');
        /*Popovers*/
        $('.popovers').popover();
        $('.popovers-show').popover('show');
        $('.popovers-hide').popover('hide');
        $('.popovers-toggle').popover('toggle');
        $('.popovers-destroy').popover('destroy');
    }

    function handleToggle() {
        $('.list-toggle').on('click', function() {
            $(this).toggleClass('active');
        });
    }

    function handleSticky() {
	    var stickyAddClass = function() {
	        $("#header-fixed").addClass("header-fixed-trans");
	        $(".header-sticky-space").addClass("header-fixed-space-trans");
	    }
	    var stickyRemoveClass = function() {
            $("#header-fixed").removeClass("header-fixed-trans");
            $(".header-sticky-space").removeClass("header-fixed-space-trans");
	    }
	    $(window).scroll(function() {
		    if ($("#header-fixed").hasClass("fixed-main")) {
		        if ($(window).scrollTop()>66){ stickyAddClass(); } else { stickyRemoveClass(); }
		    } else {
		        if ($(window).scrollTop()>66){ stickyAddClass(); } else { stickyRemoveClass(); }
		    }
	    });
	}

	function handleSidebar() {
	    var sides = ["left", "top", "right", "bottom"];
	    for (var i = 0; i < sides.length; ++i) {
	        var cSide = sides[i];
	        $(".sidebar." + cSide).sidebar({side: cSide});
	    }
	    $(".sidebar-left-trigger[data-action]").on("click", function() {
	        var $this = $(this);
	        var action = $this.attr("data-action");
	        var side = $this.attr("data-side");
	        $(".sidebar." + side).trigger("sidebar:" + action);
	        $("html").toggleClass("overflow-hidden");
	        $(".sidebar-left-mask, .sidebar-left-content").toggleClass("active");
	        return false;
	    });
	    $(".sidebar-right-trigger[data-action]").on("click", function() {
	        var $this = $(this);
	        var action = $this.attr("data-action");
	        var side = $this.attr("data-side");
	        $(".sidebar." + side).trigger("sidebar:" + action);
	        $("html").toggleClass("overflow-hidden");
	        $(".sidebar-right-mask").toggleClass("active");
	        return false;
	    });
	    setTimeout(function() {
		    $(".sidebar").show();
	    }, 800);
	    $(window).resize(function() {
			$(".sidebar").show();
	    });
	}

	function handleBackToTop() {
		$(document).ready(function() {
			$(".back-to-top").addClass("hidden-top");
				$(window).scroll(function() {
				if ($(this).scrollTop() === 0) {
					$(".back-to-top").addClass("hidden-top")
				} else {
					$(".back-to-top").removeClass("hidden-top")
				}
			});

			$('.back-to-top').click(function() {
				$('body,html').animate({scrollTop:0}, 1200);
				return false;
			});
			
			$('.btn-fix-navi-top').click(function() {
				$('body,html').animate({scrollTop:0}, 1200);
				return false;
			});

			$('.quick-scroll-btn.top-btn').click(function() {
				$('body,html').animate({scrollTop:0}, 1200);
				return false;
			});

			$('.quick-scroll-btn.down-btn').click(function() {
				$('body,html').animate({scrollTop:$(document).height()}, 1200);
				return false;
			});
		});
	}
	
	// 992px 이상에서 1차메뉴 동일하게 분할하기
	function handleNavList() {
		$(document).ready(function() {
			var navList, navListLength, navListDivision;
			navList = $(".nav.navbar-nav > .division");
			navListLength = navList.length;
			navListDivision = 100/navListLength;
			navList.css("width",navListDivision + "%")
		});
	}

	function handleFamilySite() {
		$(".family-site dt a").click(function(){
			$(".family-site dd").slideToggle(300);
			return false;
		});
	}
	
	function handleFixNavi() {
		$(".btn-fix-navi").click(function(){
			$(".fix-navi").toggleClass("active");
		});
	}

    return {
        init: function() {
	        handleViewport();
            handleBootstrap();
            handleIEFixes();
            handleToggle();
            handleSticky();
            handleSidebar();
            handleBackToTop();
            handleNavList();
            handleFamilySite();
            handleFixNavi();
        }
    };

}();