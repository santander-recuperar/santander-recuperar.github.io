// JavaScript Document

$(document).ready(function(e) {
	
    $(".estilo").click(function(){
   	var rutaEstilo = $(this).attr("gama")
   $("#cambiaEstilo").attr("href", rutaEstilo)
   $('#estilo a').removeClass('btn-danger');
   $('#estilo a').removeClass('btn-inverse').addClass('btn-danger')
   $(this).addClass('btn-inverse');
})


$('#lateral a').click(function(){
		$('#lateral a').removeClass('active');
		$(this).addClass('active');
	})


$("#trigger").click(function(){
		$("#menuDos").slideToggle('fast');
});

$('#menuDos a').click(function(){
	$('#menuDos').hide('fast');
})

$(function(){
$('#lateral a').click(function() {
if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
        var $target = $(this.hash);
        $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) {
            var targetOffset = $target.offset().top;
            $('html,body').animate({scrollTop: targetOffset - 50}, 1000);
            return false;
        }
    }

  });
});



$(function(){
$('#menuDos a').click(function() {
if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
        var $target = $(this.hash);
        $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) {
            var targetOffset = $target.offset().top;
            $('html,body').animate({scrollTop: targetOffset - 50}, 1000);
            return false;
        }
    }

  });
});



});

