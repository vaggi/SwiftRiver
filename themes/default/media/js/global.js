var inlineInputValue;
(function($,c,b){$.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "),function(d){a(d)});a("focusin","focus"+b);a("focusout","blur"+b);$.addOutsideEvent=a;function a(g,e){e=e||g+b;var d=$(),h=g+"."+e+"-special-event";$.event.special[e]={setup:function(){d=d.add(this);if(d.length===1){$(c).bind(h,f)}},teardown:function(){d=d.not(this);if(d.length===0){$(c).unbind(h)}},add:function(i){var j=i.handler;i.handler=function(l,k){l.target=k;j.apply(this,arguments)}}};function f(i){$(d).each(function(){var j=$(this);if(this!==i.target&&!j.has(i.target).length){j.triggerHandler(e,[i.target])}})}}})(jQuery,document,"outside");
$(document).ready(function() {
	// Hide dropdowns on click outside
	$('ul.dropdown').bind('clickoutside', function(event) {
		$(this).fadeOut('fast');
		$('section.actions p.button_change').removeClass('active');
		$('.has_dropdown').removeClass('active');
	});
	
	// View or hide a dropdown menu
	$('.has_dropdown > a').click(function(event) {
		// $('ul.dropdown').fadeOut('fast');
		$(this).parent().toggleClass('active');
	    $(this).siblings('ul.dropdown').fadeToggle('fast');
		event.stopPropagation();
	});
	
	// Create new bucket
	$('li.create_new').live('click', function() {
		$(this).empty();
		$(this).parents('ul.dropdown').append('<li class="create_name"><input type="text" value="" placeholder="Name your new bucket"><div class="buttons"><button class="save">Save</button><button class="cancel">Cancel</button></div></li>');
		$('button.cancel').click(function(event) {
			$(this).closest('ul.dropdown').children('li.create_new').append('<a onclick=""><span class="create_trigger"><em>Create new</em></span></a>');
			$(this).closest('li.create_name').remove();
			event.stopPropagation();
		});
	});
	
	// Edit page contents
	$('.edit_trigger').live('click', function() {
		inlineInputValue = $(this).text();
		inlineInputName = $(this).attr('title');
		inlineInputId = $(this).attr('id').replace(/[^0-9]/g, '');
		$(this).replaceWith('<span class="edit_input"><input type="hidden" id="inline_edit_id" value="'+ inlineInputId +'"><input type="hidden" id="inline_edit_name" value="'+ inlineInputName +'"><input type="text" id="inline_edit_text" value="'+ inlineInputValue +'" placeholder="Enter the name of your River"></span>');
		$('.edit').append('<div class="buttons"><button class="save" onclick="inlineEdit()">Save</button><button class="cancel">Cancel</button></div>');
		$('button.cancel').click(function() {
			$(this).parent().remove();
			$('.edit_input').replaceWith('<span class="edit_trigger" title="'+ inlineInputName +'" id="edit_'+ inlineInputId +'" onclick="">' + inlineInputValue + '</span>');
		});
	});
	
	// View or hide page actions panel
	if (screen.width <= 600) {
		$('ul.views li').not('ul.views li.active, ul.views li.view_panel').remove();
	}
	$('section.panel nav ul li.view_panel a').toggle(function(e) {
			var url = $(this).attr('href');
			$('ul.views li, ul.actions li').fadeTo('fast', 0);
			$(this).parent('li').addClass('active').fadeTo('fast', 1);
			$('section.panel div.panel_body').slideDown('fast').load(url);
			e.preventDefault();				
		}, function(e) {
			$('ul.views li, ul.actions li').fadeTo('fast', 1);
			$(this).parent('li').removeClass('active');
			$('section.panel div.panel_body').slideUp('fast').empty();				
			e.preventDefault();
	});
	$('section.panel a.close').live('click', function() {
		$('ul.views li, ul.actions li').fadeTo('fast', 1);
		$('section.panel nav ul li.view_panel').removeClass('active');
		$('section.panel div.panel_body').slideUp('fast').empty();
	});
	
	// Toggle following or subscribing
	$('.button_change a.subscribe').click(function() {
		$(this).parent().toggleClass('active');
		$(this).toggleClass('subscribed');
	});
	
	// Show/Hide a droplet's detail drawer
	$('section.actions p.button_view a').toggle(function(e) {
			var url = $(this).attr('href');
			$(this).addClass('detail_hide').closest('article.droplet').children('section.detail').slideDown('slow').load(url);
			e.preventDefault();				
		}, function(e) {
			$(this).removeClass('detail_hide').closest('article.droplet').children('section.detail').slideUp('slow').empty();
			e.preventDefault();
	});
	$('section.detail div.bottom a.close').live('click', function() {
		$(this).closest('article.droplet').find('section.actions p.button_view a').removeClass('detail_hide');
		$(this).closest('article.droplet').children('section.detail').slideUp('slow').empty();
	});

	// Add or remove a droplet from buckets
	$('section.actions p.bucket').click(function(event) {
		// $('ul.dropdown').fadeOut('fast');
		$(this).toggleClass('active');
		$(this).siblings('ul.dropdown').fadeToggle('fast');
		event.stopPropagation();
	});
	$('section.actions ul.dropdown li.bucket a.selected').closest('ul.dropdown').siblings('p.button_change').children('a').addClass('bucket_added');
	jQuery.fn.checkBuckets = function() {
		if ($('section.actions ul.dropdown li.bucket a').is('.selected')) {
			$(this).closest('ul.dropdown').siblings('p.bucket').children('a').addClass('bucket_added');
		}
		else {
			$(this).closest('ul.dropdown').siblings('p.bucket').children('a').removeClass('bucket_added');
		}
	};
	$('section.actions ul.dropdown li.bucket a').live('click', function() {
		$(this).toggleClass('selected').checkBuckets();
	});
	
	// Score a droplet
	$('section.source div.actions p.score').click(function(event) {
		$(this).toggleClass('active');
		$(this).siblings('ul.dropdown').fadeToggle('fast');
		event.stopPropagation();
	});
	$('section.source div.actions ul.dropdown li.useful a.selected').closest('ul.dropdown').siblings('p.score').children('a').addClass('scored');
});

function submitForm(button){
	var form = $(button).parents('form:first');
	form.submit();
}

function submitAjax(button){
	var form = $(button).parents('form:first');
	form.submit();
}