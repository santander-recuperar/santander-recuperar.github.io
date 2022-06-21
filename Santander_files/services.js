/**
 * JS que contiene las llamadas a los servicios REST del back end.
 */

function solicitarClaveOTP(tipoDoc, documento){
	$.ajax({
		url: serviceURL + "/public/SolicitudOTP?tipoDocumento=" + tipoDoc + "&documento=" + documento+"&appMovil=" + isMovil,
		success: function(data){
			if(data.error!=null ){
					hideLoading("btn_validar", "loading_validar", "");
					mostrarErrorSolicitud(data.error.mensaje);
					enviarMetricaErrorSolicitud();
			} else {
				ticket = data.ticket;
				tipoPersona = data.tipoPersona;
				codigoPersona = data.codigoPersona;
				tipoDocumento = tipoDoc;
				numeroDocumento = documento;
				desactivarCloseWindow();
				desactivarCopyPaste();
				activarFooter();
				$(".capchat-container").hide();
				$('#Ventana_1').modal('hide');
				$('#Ventana_1').addClass('hidden-modal');
				$('#Ventana_2').removeClass('hidden-modal');
				$('#Ventana_2').modal('show');
				activarCloseWindow();
				$('#label-movil').html("Teclea el código de seguridad que has recibido en tu móvil <strong>" + data.movilFormateado +"</strong> y pulsa <strong>\"Aceptar\"</strong>");
			}
		},
		error: function(){
			hideLoading("btn_validar", "loading_validar", "");
			enviarMetricaErrorSolicitud();
			mostrarErrorSolicitud(errorMessageSolicitudClave);
		}
	});
}
function resolicitar(){
	ocultarErrorGeneracion();
	limpiarFormGeneracion();
	showLoading("btn_generar_clave", "loading_generar", "div-re-solicitar");
	reSolicitarClaveOTP(tipoDocumento, numeroDocumento);
}

function reSolicitarClaveOTP(tipoDoc, documento){
	$.ajax({
		url: serviceURL + "/public/ResolicitudOTP?tipoDocumento=" + tipoDoc + "&documento=" + documento+"&appMovil=" + isMovil,
		success: function(data){
			if(data.error!=null){
				mostrarErrorGeneracion(data.error.mensaje);
				enviarMetricaErrorReSolicitud();
			} else {
				$("#modal-success").modal({
					backdrop : 'static'
				});
				$("#modal-success").css("top","40%");
				ticket = data.ticket;
			}	
			hideLoading("btn_generar_clave", "loading_generar", "div-re-solicitar");
		},
		error: function(){
			enviarMetricaErrorReSolicitud();
			hideLoading("btn_generar_clave", "loading_generar", "div-re-solicitar");
		}
	});
}


function generarNuevaClaveOTP(claveOTP, nuevaClave){
	var obj = {
		ticket : ticket,
		claveOTP : claveOTP,
		nuevaClave : nuevaClave,
		tipoDocumento : tipoDocumento,
		numeroDocumento : numeroDocumento
	};
	$.ajax({
		url: serviceURL + "/public/GenerarClaveOTP",
		data: JSON.stringify(obj),
		type: "POST",
		contentType: "application/json",
		success: function(data){
			desactivarCloseWindow();
			if(data!==""){
				if(data.cambioPantalla){
					$("#mensaje-error").html(data.mensaje);
					errorGenericoPaginaError = data.mensaje;
					$('#Ventana_2').modal('hide');
					$('#Ventana_2').addClass('hidden-modal');
					$('#Ventana_3').removeClass('hidden-modal');
					$('#Ventana_3').modal('show');
				} else {
					mostrarErrorGeneracion(data.mensaje);
					enviarMetricaErrorGeneracion();
					hideLoading("btn_generar_clave", "loading_generar", "div-re-solicitar");
				}
			} else {
				$('#Ventana_2').modal('hide');
				$('#Ventana_2').addClass('hidden-modal');
				$('#Ventana_4').removeClass('hidden-modal');
				$('#Ventana_4').modal('show');
			}
			activarCloseWindow();
		},
		error: function(){
			desactivarCloseWindow();
			$('#Ventana_2').modal('hide');
			$('#Ventana_2').addClass('hidden-modal');
			$('#Ventana_3').removeClass('hidden-modal');
			$('#Ventana_3').modal('show');
			activarCloseWindow();
		}
	});
}
