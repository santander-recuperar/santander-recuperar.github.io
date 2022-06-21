$(document).ready(function() {
	
	$('.swipe-knob').css([{'left':'0px !important'}]);
	$( '#sliderCapchat' ).sliderCaptcha({
		type: "filled",
		textFeedbackAnimation: 'swipe_overlap',
		hintText: "Mover para validar",
		hintTextSize: '10',
		hintTextAfterUnlock: 'Verificado',
		width: '80%',
		height: '35px',
		left:'0px',
		styles: {
			knobColor: "#FF0000",
			knobColorAfterUnlock: "#F1F1F1",
			backgroundColor: "#F1F1F1",
			textColor: "#676767",
			textColorAfterUnlock: "#fff"
		},
		face: {
			textColor: '#FF0000',
			textColorAfterUnlock: '#F1F1F1',
			topAfterUnlock: 0,
			rightAfterUnlock: 9,	
			icon: 'right-thin',			
			iconAfterUnlock: 'flag'
		},
		events: {
			afterUnlock: function () {
				capchatDone = true;
				$('#sliderCapchat').addClass('after-unlock');
			},
			beforeUnlock: function () {
				capchatDone = false;
			},
			beforeSubmit: function () {
			},
			noSubmit: function() {
			},				
			submitAfterUnlock: 0,
			validateOnServer: 0
		}
	});	  
		var captcha = $("#sliderCapchat")[0];
		captcha.style.left = ($(".look-for").offset().left + 26 + 15) + "px";
		captcha.style.width = ($(".anchor")[0].offsetWidth - 52 + 15) + "px";
		captcha.style.top = "305px";
		$(".col-12.capchat-container").show();
});

$(window).resize(scrlResize);

$(window).scroll(function() {
	var elmnt = document.getElementById("Ventana_1");
	var captcha = $("#sliderCapchat")[0];
	var calculator = 305 - elmnt.scrollTop;
	captcha.style.top = calculator + "px";
});

function scrlResize(){
    var captcha = $("#sliderCapchat")[0];
	captcha.style.left = ($(".look-for").offset().left + 26 + 15) + "px";
	captcha.style.width = ($(".anchor")[0].offsetWidth - 52 + 15) + "px";
	captcha.style.top = "305px";
}


function getScroll() {
	var elmnt = document.getElementById("Ventana_1");
	var captcha = $("#sliderCapchat")[0];
	var calculator = 305 - elmnt.scrollTop;
	captcha.style.top = calculator + "px";	
}