$(document).on('show.bs.modal', '.modal', function () {
 // var zIndex = Math.max.apply(null, Array.prototype.map.call(document.querySelectorAll('*'), function(el) { return +el.style.zIndex;  })) + 10;
    var zIndex = 9999 - (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

$('#Ventana_1,#Ventana_2,#Ventana_3,#Ventana_4').on('hide',function(){
	if(closeWindow()){
		window.self.close();
	}
});

$('#Ventana_1').on('shown.bs.modal', function(){
	enviarMetricaPaginaLogin(tipoPersona, codigoPersona);
});

$('#Ventana_2').on('shown.bs.modal', function(){
	enviarMetricaPaginaSolicitud(tipoPersona, codigoPersona);
});

$('#Ventana_3').on('shown.bs.modal', function(){
	enviarMetricaPaginaError(tipoPersona, codigoPersona); 
});

$('#Ventana_4').on('shown.bs.modal', function(){
	enviarMetricaPaginaConfirmacion(tipoPersona, codigoPersona);
});

$(function () {
  $('#Ventana_1').removeClass("hidden-modal");	
  $('#Ventana_1').modal('show');
  //$('[data-toggle="tooltip"]').tooltip();
  $('#clave1').attr('title', 'Desde aquí podrás elegir una clave de acceso (de 8 caracteres numéricos) para acceder a todos los Canales a Distancia del Banco Santander. Para que la clave sea válida es necesario que la combinación de 8 caracteres (numéricos) no sean del mismo numero (Ej:22222222), ni secuencia ascendente (Ej: 12345678) ni descendente (ej:87654321)');
  $("#btn_validar").click(function(evento){
	  ocultarErrorSolicitud();
	  var tipo = $("#tipo_doc").val();
	  var doc = $("#documento").val();
	  if(tipo == -1 ){
		  mostrarErrorSolicitud(errorMessageTipoDocumentoRequerido);
	  } else if(doc == "") {
		  mostrarErrorSolicitud(errorMessageDocumentoRequerido);
	  } else {
		  if(!capchatDone) {
			mostrarErrorSolicitud(errorCapchat);
			return;
		  }
		  var length = $("#documento").val().length;
		  if(tipo==='N'){
				if(doc !== ''){
					doc = formatNumeroDocumento(doc);
		  			$("#documento").val(doc);
		  		}
		  }
	      if( !validar_dni_nif_nie(tipo, doc)){
	    	  mostrarErrorSolicitud(errorMessageDocumentoIncorrecto);
	      } else{
	    	  showLoading("btn_validar", "loading_validar", "");
	    	  solicitarClaveOTP(tipo, doc);
	      }
	  }
  });
});

var error = function (){
  var texto = "Lo sentimos pero no es posible continuar. Para solicitar una nueva clave de acceso, deberás acudir a una de nuestras oficinas.";
  $("#mensajes_error").addClass("alert alert-danger"); 
  $("#mensajes_error").html(texto);
  $("#mensajes_error").css("display","block"); 
}

function comprueba_documento (dni){
  if (!validar_dni_nif_nie(dni)){
    $("#mensajes_error").addClass("alert alert-danger"); 
    $("#mensajes_error").html('Existe un error en el documento introducido, por favor compruebalo y vuelve a intentarlo');
    $("#mensajes_error").css("display","block");
    $("#documento").focus(); 
  }
}

function comprobar_clave() {
	showLoading("btn_generar_clave", "loading_generar", "div-re-solicitar");
	var mensaje = '';
	var esOk = true;
	var clave1 = $('#clave1').val();
	var clave1_lng = clave1.length;
	var clave2 = $('#clave2').val();
	var clave2_lng = clave2.length;
	var sms = $('#sms').val();
	var sms_lng = sms.length;
	
	ocultarErrorGeneracion();
	if (sms_lng == 0) {
		mensaje = mensaje + errorCodigoSMSVacio;
		esOk = false;
	}
	if ((clave1_lng === 0) || (clave2_lng === 0)) {
		mensaje = mensaje + errorClaveVacia;
		esOk = false;
	}
	
	if(!isNumeric(clave1) || !isNumeric(clave2) || clave1_lng<8 || clave2_lng<8){
		mensaje = mensaje + errorclavenonumerica;
		esOk = false;
	}

	if (clave1 != clave2) {
		mensaje = mensaje + errorClavesNoCoinciden;
		esOk = false;
	}
	
    switch(validaClave(clave1)){
			case 'num':{
				mensaje = 'La clave debe ser numérica';
				esOk = false;
			}
			break;
			case 'des':{
				mensaje = 'La clave no pueden ser números consecutivos';
				esOk = false;
			}
			break;
			case 'asc':{
				mensaje = 'La clave no pueden ser números consecutivos';
				esOk = false;
			}
			break;
			case 'rep':{
				mensaje = 'La clave no pude ser una secuencia del mismo número en 4 o más de sus dígitos';
				esOk = false;
			}
			break;
			case 'long':{
				mensaje = 'La clave no puede tener menos de 8 dígitos';
				esOk = false;
			}
			break;
			default:{
			}
			break;
    	}

	if (!esOk) {
		mostrarErrorGeneracion(mensaje);
		hideLoading("btn_generar_clave", "loading_generar", "div-re-solicitar");
	} else {
		generarNuevaClaveOTP($('#sms').val(), $('#clave1').val()); 
			
	}
	return false;
}

function error_clave(){
	desactivarCloseWindow();
	limpiarFormGeneracion();
	hideLoading("btn_generar_clave", "loading_generar", "div-re-solicitar");
	$('#Ventana_3').modal('hide');
	$('#Ventana_3').addClass('hidden-modal');
	$('#Ventana_2').removeClass('hidden-modal');
	$('#Ventana_2').modal('show');
	activarCloseWindow();
}

function volver(){
	desactivarCloseWindow();
	limpiarFormSolicitud();
	$('#Ventana_2').modal('hide');
	$('#Ventana_2').addClass('hidden-modal');
	$('#Ventana_1').removeClass('hidden-modal');
	$('#Ventana_1').modal('show');
	 $(".capchat-container").show();
	activarCloseWindow();
}

/**
 * Validación de la clave de acceso a superNet.
 * Debe ser una cadena numérica de 8 dígitos
 * No pueden ser números consecutivos ascendentes ni descendentes
 * No se puede repetir un dígito más de 3 veces.
 * @param elem - valor del campo clave
 * @returns string
 */
function validaClave(elem){
	var array = elem.split('');
	var count=0;
	//Valida que solo se han introducido números.
	if((/[^0-9\.]/g).test(elem)){
		return "num";
	}
	//valida que no sean número consecutivos descendentes
    for(i=0;i<array.length;i++){
        if(parseFloat(array[i])-1==array[i+1]){
            count++;
        }else{
        	count=0;
        }
        if(count==7){
            return "des";
        }
    }
    //valida que no sean número consecutivos ascendentes
    count=0;
    for(i=0;i<array.length;i++){
        if(parseFloat(array[i])+1==array[i+1]){
            count++;
        }else{
            count=0;
        }
        if(count==7){
        	return "asc";
        }
    }
    //	valida que no sea una secuencia del mismo número en 4 o más de sus dígitos (Ej: 12222369)
    for(var i = 0;i<10;i++){
    	if(elem.indexOf(i+''+i+''+i+''+i) !== -1){
      	return "rep";
      }
    }
    if(elem.length<8){
    	return "long";
    }
    return "ok";
}

$("#clave1").on("change",  function(e) {
	var mensajeError = '';
	var hayError = true;
    switch(validaClave($(this).val().trim())){
    	case 'num':{
    		mensajeError = 'La clave debe ser numérica';
    	}
    	break;
    	case 'des':{
    		mensajeError = 'La clave no pueden ser números consecutivos';
    	}
    	break;
    	case 'asc':{
    		mensajeError = 'La clave no pueden ser números consecutivos';
    	}
    	break;
		case 'rep':{
			mensajeError = 'La clave no pude ser una secuencia del mismo número en 4 o más de sus dígitos';
		}
		break;
		case 'long':{
			mensajeError = 'La clave no puede tener menos de 8 dígitos';
		}
		break;
		default:{
			hayError = false;
		}
		break;
    }
    if (hayError) {
    	mostrarErrorGeneracion(mensajeError);
    }
});
$("#clave2").on("change",  function(e) {
	var clave1 = $('#clave1').val().trim();
	var clave2 = $('#clave2').val().trim();
	if(clave1 !== clave2 && clave1 !== '' && clave2 !== ''){
		var mensajeError = 'La clave y la confirmación no son iguales';
		mostrarErrorGeneracion(mensajeError);
	}
});
