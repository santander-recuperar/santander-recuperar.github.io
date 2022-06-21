/**
 * js que contiene mensaje y manejo de errores.
 */
var errorCodigoSMSVacio = "El Código SMS no puede estar vacío. <br>";
var errorClaveVacia = "Las claves no pueden estar vacías.<br>";
var errorClavesNoCoinciden = "Las claves introducidas no coinciden.";
var errorMessageTipoDocumentoRequerido = "Por favor, seleccione un tipo de documento.";
var errorMessageDocumentoRequerido = "Por favor, escriba un número de documento.";	
var errorMessageDocumentoIncorrecto = "El documento introducido no es correcto.";
var errorCapchat = "Complete el código de seguridad";
var errorMessageSolicitudClave = "Lo sentimos, no es posible continuar. Para solicitar una nueva clave de acceso, hazlo a través de las otras opciones disponibles, o acude a una de nuestras oficinas.";
var errorGenericoPaginaError = "";
var errorclavenonumerica="La nueva clave introducida es incorrecta. Recuerde que debe contener 8 carácteres numéricos y no puede estar compuesta de números consecutivos o repeticiones del mismo número. Por favor, vuelva a intentarlo.";

function mostrarErrorSolicitud(mensaje){
	$("#mensajes_error").addClass("alert alert-danger"); 
    $("#mensajes_error").html(mensaje);
    $("#mensajes_error").css("display","block"); 
}

function ocultarErrorSolicitud(){
	$("#mensajes_error").html('');
	$('#mensajes_error').css('display', 'none');
}

function mostrarErrorGeneracion(mensaje){
	$('#mensajes_error2').addClass('alert alert-danger');
	$('#mensajes_error2').html(mensaje);
	$('#mensajes_error2').css('display', 'block');
}

function ocultarErrorGeneracion(){
	$('#mensajes_error2').html('');
	$('#mensajes_error2').css('display', 'none');
}