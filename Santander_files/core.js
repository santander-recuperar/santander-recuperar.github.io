/**
 * JS que contiene las utilidades de la aplicacion.
 */
var serviceURL = "/REGCLA_PHOENIX";
var urlConsejosSeguridad = "https://www.bancosantander.es/es/particulares/tu-dia-a-dia/seguridad-online/seguridad-online/aprende-seguridad-online/";
var urlTusClaves = "https://www.bancosantander.es/es/particulares/banca-online/seguridad-online/aprende-seguridad-online/como-crear-contrasenas-seguras";
var ticket;
var numeroDocumento;
var tipoDocumento;
var tipoPersona;
var codigoPersona;
var movilCliente;
var isMovil;
var capchatDone = false;
var device = navigator.userAgent;
if (device.match(/Iphone/i)|| device.match(/Ipod/i)
		|| device.match(/Android/i)|| device.match(/J2ME/i)
		|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPad|iPod/i)
		|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)
		|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)
		|| device.match(/windows mobile/i)|| device.match(/windows ce/i)
		|| device.match(/webOS/i)|| device.match(/palm/i)
		|| device.match(/bada/i)|| device.match(/series60/i)
		|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
	isMovil=true;
} else {
	isMovil=false;
}

function showLoading(idBtn, idImg, idDiv){
	$("#" + idBtn).hide();
	$("#" + idImg).show();
	if(idDiv != ""){
		$("#" + idDiv).hide();
	}
}

function hideLoading(idBtn, idImg, idDiv){
	$("#" + idBtn).show();
	$("#" + idImg).hide();
	if(idDiv != ""){
		$("#" + idDiv).show();
	}
}

function activarCloseWindow(){
	$('#closeWindow').val('0');
}

function desactivarCloseWindow(){
	$('#closeWindow').val('1');	
}

function closeWindow(){
	var closeWindow = $('#closeWindow').val();
	return closeWindow == '0';
}

function limpiarFormGeneracion(){
	$("#sms").val("");
	$("#clave1").val("");
	$("#clave2").val("");
	hideLoading("btn_generar_clave", "loading_generar", "div-re-solicitar");
}

function limpiarFormSolicitud(){
	$("#tipo_doc").val("-1");
	$("#documento").val("");
	hideLoading("btn_validar", "loading_validar", "");
}

function desactivarCopyPaste(){
	
	$('#clave1').bind('paste', function (e) {
        e.preventDefault();
    });
	$('#clave2').bind('paste', function (e) {
        e.preventDefault();
    });
}

function activarFooter(){
	$(".consejos_seguridad").click(function(e){
		window.open(urlConsejosSeguridad);
	});
	$(".tus_claves").click(function(e){
		window.open(urlTusClaves);
	});
}

function validar_dni_nif_nie(tipo, value){
	var valido = false;
	var str = value.toString().toUpperCase();
	if(tipo == 'N'){
		if(/^((([LM])){1}([-]?)((\d){7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]))$/.test( str )) {
			valido = validarNumeroDocumento(str);
		}
	} else if(tipo == 'C'){
		var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
		if(nieRexp.test(str)){
			var nie = str
				.replace(/^[X]/, '0')
				.replace(/^[Y]/, '1')
				.replace(/^[Z]/, '2');
			valido = validarNumeroDocumento(nie);
		}
	} else if(tipo == 'S'){		  
		value = value.toUpperCase();		
		valido=validarCIF(value).valid;
		
	} else if(tipo =='I' || tipo=='P'){
		valido=true;
	}

    return valido;
}

function validarNumeroDocumento(value){
	var valido = false;
	var prime = value.trim().charAt(0).toUpperCase();
	if ( prime == 'M' || prime == 'L' ) {
		temp=value.replace(/\D/g, "");
        var num=parseInt(temp);
        var letras='TRWAGMYFPDXBNJZSQVHLCKET';
        var cifras=num.toString().length;
        var ceros=Array(7-cifras+1).join('0');
        var letra=letras.charAt(num%23);
        if (isNaN(num)) {
        	valido=false;
        }else{
        	temp=prime+ceros+num+letra;
            if(temp==value){
            	valido=true;
            }else{
            	valido=false;
            }
        }
	}else{
		var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
		var letter = value.substr(-1);
		var charIndex = parseInt(value.substr(0, 8)) % 23;
		if (validChars.charAt(charIndex) === letter){
			valido = true;
		}
	}
	return valido;
}

function parametroURL(_par) {
	  var _p = null;
	  if (location.search) location.search.substr(1).split("&").forEach(function(pllv) {
	    var s = pllv.split("="); 
	    var ll = s[0];
	    var v = s[1] && decodeURIComponent(s[1]); 
	    if (ll == _par) {
	      if(_p==null){
	    	  _p=v; 
	      }else if(Array.isArray(_p)){
	    	  _p.push(v); 
	      }else{
	    	  _p=[_p,v]; 
	      }
	    }
	  });
	  return _p;
	}
function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function formatNumeroDocumento(value){
	var numeros="0123456789";
	var formattedDoc = value;
	var length = value.length;
	if (length > 0 && length < 9) {
		if (numeros.indexOf(formattedDoc.charAt(0),0)===-1){
			var letra = value.charAt(0);
			var numero = value.substring(1);
			length = numero.length;
			for (var j = 0; j < 8 - length; j++){
				numero = "0" + numero;
			}
			formattedDoc = letra + numero;
		} else {
			for (var i = 0; i < 9 - length; i++){
				formattedDoc = "0" + formattedDoc;
			}
		}
	}
	return formattedDoc;
}

validarCIF = (function() {
	  'use strict';

	  var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
	  var validarCIF = function( str ) {

	    // Ensure upcase and remove whitespace
	    str = str.toUpperCase().replace(/\s/, '');

	    var valid = false;
	    var type = spainIdType( str );

	    switch (type) {
	      case 'cif':
	        valid = validCIF( str );
	        break;
	    }

	    return {
	      type: type,
	      valid: valid
	    };

	  };

	  var spainIdType = function( str ) {
	    if ( str.match( CIF_REGEX ) ) {
	      return 'cif';
	    }
	  };
	  
	  var validCIF = function( cif ) {

	    var match = cif.match( CIF_REGEX );
	    var letter  = match[1],
	        number  = match[2],
	        control = match[3];

	    var even_sum = 0;
	    var odd_sum = 0;
	    var n;

	    for ( var i = 0; i < number.length; i++) {
	      n = parseInt( number[i], 10 );

	      // Odd positions (Even index equals to odd position. i=0 equals first position)
	      if ( i % 2 === 0 ) {
	        // Odd positions are multiplied first.
	        n *= 2;

	        // If the multiplication is bigger than 10 we need to adjust
	        odd_sum += n < 10 ? n : n - 9;

	      // Even positions
	      // Just sum them
	      } else {
	        even_sum += n;
	      }

	    }

	    var control_digit = (10 - (even_sum + odd_sum).toString().substr(-1) );
	    if(control_digit === 10){
	    	control_digit = 0;
	    }
	    var control_letter = 'JABCDEFGHI'.substr( control_digit, 1 );

	    // Control must be a digit
	    if ( letter.match( /[ABEH]/ ) ) {
	      return control == control_digit;

	    // Control must be a letter
	    } else if ( letter.match( /[KPQS]/ ) ) {
	      return control == control_letter;

	    // Can be either
	    } else {
	      return control == control_digit || control == control_letter;
	    }

	  };

	  return validarCIF;
	})();