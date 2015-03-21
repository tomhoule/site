$(document).ready(function() {

    //
    // Smooth scrolling
    //
    var $scrollLinks = $('a.scroll');

    $scrollLinks.click(function(e) {
        e.preventDefault();

		var target 	        = this.hash,
			$target         = $(target),
            targetOffset    = $target.offset().top;

        $('html, body').stop().animate({
			scrollTop: targetOffset
		}, 500);
    });


});