/*
 * jQuery Plugins:
 *
 * - Toggle
 * - Accordion
 *
 * Copyright 2011, MTD
 * http://themeforest.net/user/MTD
 */
(function($){
	$.fn.extend({

		// --- -- - TOGGLE PLUGIN - -- --- //
		elegant_Toggle	: function(){
			
			return this.each(function(){
			
				var obj			= {
						panel	: $(this),
						title	: $(this).find(".toggleTitle"),
						content	: $(this).find(".toggleContent"),
						isOpen	: $(this).data("open")
					}
				
				// Setting a fixed width prevent the jumpy bug
				obj.content.css({ width	: obj.content.width() });
				
				// Close panel by default
				if( !obj.isOpen ){
					obj.content.slideUp(100);
					obj.panel.addClass("closed");
				}
				
				// Add click event
				obj.title.click(function(){
					obj.content.slideToggle(300);
					obj.panel.toggleClass("closed");
					return false;
				});
						
			});
	
		}
	
	});
})(jQuery);


// Initialize scripts
var mtdScript = {};

jQuery(document).ready(function($){

	mtdScript = {
		
		// Initialize functions
		initSite	: function(){
		
			$("body").removeClass("noJs");
			
			this.placeHolder();
			
			this.topPanel();
			
			// Initialize the toggle widgets
			$(".toggle").elegant_Toggle();
			
		},
		
		
		
		// Show and Hide the top panel
		topPanel		: function(){
		
			var topPanel	= $("#topPanel"),
				panelHandle	= $("#topPanelHandle"),
				height		= 0,
				wrapHeight	= 0,
				imgs		= topPanel.find("img"),
				imgsNum		= imgs.length,
				readyImg	= 0;
			
			// If there are images in the toppanel
			// load them before initializing the toggle effect
			if( imgsNum ){
				imgs.each(function(){
					$(this).load(function(){
						readyImg++;
						initTopPanel();
					});
				});
			}else{
				initTopPanel();
			}
			
			function initTopPanel(){
				if( imgsNum === readyImg ){
					height		= topPanel.height();
					
					topPanel.css({ display : "block" });
					// wrapHeight	= topPanel.find(".gwrap").height();
					
					topPanel.css({
						marginTop	: -height,
						height		: '352px',
						display		: "block",
						overflow	: "visible"
					});
					
					topPanel.find(".gwrap").css({
						height		: '0px',
						display		: "block",
						overflow	: "visible"
					});
					
					// Open / Close Panel
					panelHandle.click(function(){
						if( !$(this).hasClass("close") ){
							topPanel.animate({
								marginTop	: 0
							}, 350, function(){
								panelHandle.addClass("close")
							});
						}else{
							topPanel.animate({
								marginTop	: -height
							}, 350, function(){
								panelHandle.removeClass("close")
							});
						}
					});
					
					//custom locate button
					
					$('#locate_icon a').click(function(){
							if( !$(panelHandle).hasClass("close") ){
							topPanel.animate({
								marginTop	: 0
							}, 350, function(){
								panelHandle.addClass("close")
							});
						}else{
							topPanel.animate({
								marginTop	: -height
							}, 350, function(){
								panelHandle.removeClass("close")
							});
						}						   
					});
					
					
					
					// Open the panel by clicking on a link that point to #topPanel
					$('a[href="#topPanel"]').click(function(){
						$('html, body').animate({  
							scrollTop: 0  
						}, 300);
						panelHandle.trigger("click");
						return false;
					});
				}
			}
		
		},
		
		
		
	
		// Show a placeholder text in input fields
		placeHolder		: function(){
		
			var inputElement		= document.createElement('input'),
				supportsPlaceholder	= 'placeholder' in inputElement;
			
			if( !supportsPlaceholder ){
				// If your browser does not support placeholders
				$("input[type=text], textarea").each(function(){
					$(this).val($(this).attr('placeholder'));
				}).focus(function(){
					if($(this).val() == $(this).attr('placeholder')) { $(this).val(""); }
				}).blur(function(){
					if($(this).val() == "") { $(this).val($(this).attr('placeholder')); }
				});
			}
		
		}
	
	}
	
	mtdScript.initSite();

});