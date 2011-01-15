/* ---------------------------------------------------------------------

	* File:         jquery.fixed.table.js
	* Description:  plugin for fixing table header at the page top
	* Author:       Pavel Markovnin
	* Website:      http://vremenno.net

------------------------------------------------------------------------ */


(function($) {
	$.fn.fixedTable = function(options) {
	
		// Default Values
		var defaults = {
			hlClass:        'highlight',
			fxClass:        'fixed',
			fxMask:         'tr:first-child th, tr:first-child td'
  		},  opts            = $.extend(defaults, options),
  		    _this           = this,
  		    _fixed          = [],
  		    _copies         = [],
   		    _fxHeight       = 0,
   		    lastScrollTop   = 0,
    		currentScrollTop = 0;
  		    
  		    
  		// Init Plugin
  		this.initialize = function() {
  		
  			// Create Fixed Wrappers
  			_this.createFixedWrapper();
  			
  			// Set Widths
  			_this.setWidths();
  			
  			// Bind On Scroll
  			_this.bindOnScroll();
  			
  			// Bind On Click
  			_this.bindOnClick();
  			
  			// Check on Scroll
  			_this.checkOnScroll();
  			
  			// Bind on Window Resize
  			_this.bindOnResize();
  			
  		};
  		
  		
  		// Create Fixed Wrapper
  		this.createFixedWrapper = function() {
  		
  			// Create Copies of All the Tables
  			$.each(_this, function() {
  				var fixedWrapper = $('<div class="'+ opts.fxClass +'" style="display: none"></div>'),
  				    tableCopy    = $(this).clone(); 
  				    
  				tableCopy.find('tbody tr').hide();
  				    				    
  				_copies.push(tableCopy);
  				_fixed.push(fixedWrapper);
  				
  				fixedWrapper.append(tableCopy);
  				$(this).before(fixedWrapper);
  			}); 		
  		};
  		
  		
  		// Set Widths
  		this.setWidths = function() {
  		
  			$.each(_this, function(i) {
  				var tblInd    = i,
  				    copyTable = $(_copies[tblInd]);
  				
  				// Table Width
  			    copyTable.css('width', $(this).width());
  			
  				// Cell Width
  				$(this).find(opts.fxMask).each(function(index) {
  					$(copyTable.find(opts.fxMask)[index]).css('width', $(this).width());
  				});
  			});
  			
  			_this.findElements();
  		};
  		
  		
  		// Find Elements
  		this.findElements = function() {
  			_origHdr = _this.find('thead');
  			_copyHdr = $('.' + opts.fxClass + ' thead');
  			
  			_origTrs = _this.find('tr.' + opts.hlClass);
  			_copyTrs = $('.' + opts.fxClass + ' tr.' + opts.hlClass);
  		};
  		
  		
  		// Bind On Click
  		this.bindOnClick = function() {
  			_this.find('tbody tr').click(function() {
  				var index = $(this).parent().parent().find('tr').index($(this));
  				
  				$(this).toggleClass(opts.hlClass); 
  				$($(this).parent().parent().prev().find('tr')[index]).toggleClass(opts.hlClass); 
  				
  				_this.findElements();
            }).find('a').click(function(e) {
                e.stopPropagation();
            });
  		};
  		
  		
  		// Bind On Scroll
  		this.bindOnScroll = function() {
  			$(window).scroll(function() {
  				_this.checkOnScroll();
  			});
  		};
  		
  		
  		// Bind On Resize
  		this.bindOnResize = function() {
  			$(window).resize(function() {
  				_this.setWidths();
  				_this.checkOnScroll();
  			});
  		};
  		
  		
  		// Check on Scroll
  		this.checkOnScroll = function() {
  			var scrTop   = $(window).scrollTop();
    		
    		lastScrollTop = currentScrollTop;
        	currentScrollTop = $(document).scrollTop();
        	
        	actFxWr = $('.' + opts.fxClass + '.active');
  			
  			// Check Headers
  			$.each(_this, function(i) {
  				var fxWr   = $(_copyHdr[i]).parent().parent(),
  				    tblTop = $(_origHdr[i]).offset().top,
  				    tblBot = $(_origHdr[i]).parent().height() + tblTop - fxWr.height(),
  				    scrTop = $(window).scrollTop();
  			
  				if(tblTop < scrTop && tblBot > scrTop) {
  					fxWr.css({
  						'position': 'fixed',
  						'top':      0,
  					});
  					fxWr.show();
  					fxWr.addClass('active');
  					
  				} else if(tblTop > scrTop) {
  				
  					fxWr.hide();
  					fxWr.removeClass('active');
  				
  				} else {
  					fxWr.css({
  					 	'position': 'absolute',
  						'top':      tblBot,
  					});
  					fxWr.show();
  					fxWr.removeClass('active');
  				}
  			});
  			
  			// Check TR's
  			$.each(_origTrs, function(i) {
  			
  				var trTop   = $(_origTrs[i]).offset().top,
  				    trHgt   = $(_origTrs[i]).height(),
  				    trBtm   = trTop + trHgt,
  				    fxBtm   = scrTop + actFxWr.height();
  				    
  				if(currentScrollTop > lastScrollTop) {
  					if(trTop < fxBtm) {
  						$(_copyTrs[i]).show();
  					} else {
  						$(_copyTrs[i]).hide();
  					}
  				} else {
  					if(trTop < (fxBtm - trHgt)) {
  						$(_copyTrs[i]).show();
  					} else {
  						$(_copyTrs[i]).hide();
  					}  					
  				}
  				
  				/*
  				if (trTop >= fxBtm) {
  				
  					$(_copyTrs[i]).show();
  					
  				} else if(trTop <= (fxBtm - trHgt)) {
  				
  					$(_copyTrs[i]).hide();
  				
  				} else {
  				
  					$(_copyTrs[i]).show();		
  						
  				}*/
  			});                
                
  		};
  		
  		
  		return _this.initialize();
  		
  	}
})(jQuery);