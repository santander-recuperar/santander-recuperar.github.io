/**
 * JS con las funciones para generar metricas.
 */
function enviarPagina(nombrePagina, tituloPagina, tipoPersona, codPersona, error){
	var codCliente = "";
	if(tipoPersona != null && tipoPersona != undefined){
		codCliente += tipoPersona;
	}
	if(codPersona != null && codPersona != undefined){
		codCliente += "" + codPersona;
	}
	if(error == ''){
		$("body").trigger("evShowView", {"page_name": nombrePagina, "page_title": tituloPagina, "cod_cliente" : codCliente});
	} else {
		$("body").trigger("evShowView", {"page_name": nombrePagina, "page_title": tituloPagina, "cod_cliente" : codCliente, "error": error});
	}
}

function enviarAccion(nombreAccion, category, label){
	$("body").trigger("evSendAction", {"action":  nombreAccion,  "category": category, "label": label});
}

function enviarMetricaPaginaLogin(tipoPersona, codPersona){
	enviarPagina("login", "Solicitud nueva clave de acceso NIF", tipoPersona, codPersona, "");
}

function enviarMetricaPaginaSolicitud(tipoPersona, codPersona){
	enviarPagina("solicitud", "Solicitud nueva clave de acceso SMS", tipoPersona, codPersona, "");
}

function enviarMetricaPaginaError(tipoPersona, codPersona){
	enviarPagina("error", "Solicitud nueva clave de acceso Error",tipoPersona, codPersona, errorGenericoPaginaError);
}

function enviarMetricaPaginaConfirmacion(tipoPersona, codPersona){
	enviarPagina("confirmacion", "Solicitud nueva clave de acceso Confirmación", tipoPersona, codPersona);
}

function enviarMetricaErrorSolicitud(){
	enviarAccion("error", "solicitud_reg_cla", "btn_validar");
}

function enviarMetricaErrorReSolicitud(){
	enviarAccion("error", "solicitud_reg_cla", "re-solicitar");
}

function enviarMetricaErrorGeneracion(){
	enviarAccion("", "generacion_reg_cla", "btn_generar_clave");
}