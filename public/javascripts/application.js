// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(document).ready(function() {
	$("table tr").hover(
		function() {
			$(this).addClass("emphasized")
		},
		
		function() {
			$(this).removeClass("emphasized")
	});
	
	$(".refresh").hover(
		function() {
			$(this).addClass("refresh_hover");
		},
		function() {
			$(this).removeClass("refresh_hover");
		}
	)
	.click(function() {
		$(this).addClass("refresh_loading");
		setTimeout(function() {
			$(".refresh_loading").removeClass("refresh_loading");
			var current_count = $("#shown_requests_count").text();
			$(".b-notice-wrapper").load('/check_for_new_requests.js?count=' + current_count);
		}, 500);
	});
	
	$(".full").live('click', function(){
		$(".refresh").addClass("refresh_loading");
		
		var current_count = $("#shown_requests_count").text();
		$("#shown_requests_count").load('/update_requests_count.js');
		
		$.get('/fetch_new_requests.js?count=' + current_count, function(data) {
		  $("tbody").prepend(data);
		});		
		
		setTimeout(function() {
			$(".refresh_loading").removeClass("refresh_loading");
			var current_count = $("#shown_requests_count").text();
			$(".b-notice-wrapper").load('/check_for_new_requests.js?count=' + current_count);
		}, 500);	
	});
});

setInterval(function() {
    $(".refresh_loading").removeClass("refresh_loading");
	var current_count = $("#shown_requests_count").text();
	$(".b-notice-wrapper").load('/check_for_new_requests.js?count=' + current_count);
}, 60000);