$(function(){
	var page = getParameterByName("page");
	if(page=== null || page==="" || page === undefined){
		alert("No retire el parametro page");
		window.location.href="?page=1"
	}

	var usuarioLogeado = $("#usuarioLogueado");

	var usuario = obtenerUsuarioLogueado();
	usuarioLogueado.innerHTML = usuario.name;

	$("#logout").on("click",salir);

	$("#btnSiguiente").on("click",siguiente);

	$("#btnAnterior").on("click",anterior);

	cambioCapitulo(Number.parseInt(page));

	$(".list-container-video__item[data-page="+page+"]").addClass("list-container-video__item--active");

	$(".list-container-video__item").on("click",listSeleccionado);
});


var listSeleccionado = function(){
	var page = $(this).attr("data-page");
	var urlRedireccion = "/cursos/html5.html?page="+page;
	window.location.href=urlRedireccion;
}


var cambioCapitulo = function(page){
	var url ="";
	switch( page ){
		case 1: 
			url="https://www.youtube.com/embed/QC9_8nRNNHA?ecver=2";
			break;

		case 2: 
			url="https://www.youtube.com/embed/CdfMG_Qy00E?ecver=2";
			break;

		case 3: 
			url="https://www.youtube.com/embed/F-cDjBkSRT4?ecver=2";
			break;

		case 4: 
			url="https://www.youtube.com/embed/Wjgv2GJUe2I?ecver=2";
			break;

		case 5:
			url ="https://www.youtube.com/embed/23U19omettA?ecver=2";
			break;

		default :
			url="https://www.youtube.com/embed/QC9_8nRNNHA?ecver=2"
			break;
	}
	insertarVideo(url);
}


var insertarVideo = function(url){
	var parent = $("#idVideo").parent();
	$("#idVideo").remove();
	var nuevoEmbeed = '<embed style="width: 100%; height: 100%" id="idVideo" src="{0}"></embed>';
	nuevoEmbeed = nuevoEmbeed.replace("{0}",url);
	parent.append(nuevoEmbeed);
}

var siguiente = function(){
	var page = getParameterByName("page");
	page = Number.parseInt(page);
	page++;
	url = window.location.pathname + "?page="+page;
	window.location.href = url;
}


var anterior = function(){
	var page = getParameterByName("page");
	page = Number.parseInt(page);
	page--;
	if(page==0)
		page=1;

	url = window.location.pathname + "?page="+page;
	window.location.href = url;
}