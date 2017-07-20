var videos;

$(function(){

	var usuarioLogeado = $("#usuarioLogueado");

	var usuario = obtenerUsuarioLogueado();
	usuarioLogueado.innerHTML = usuario.name;

	var page = getParameterByName("page");
	if(page=== null || page==="" || page === undefined){
		alert("No retire el parametro page");
		window.location.href="?page=1"
	}

	$("#logout").on("click",salir);


	//Crear el curso
	const idHtml = 2;

	var promesa = obtenerCurso(idHtml);

	$.when(promesa).then(function(data,textStatus, jqXHR){

	var docente = data.docente;
	var nombreCurso = data.name;
	videos = data.videos;

	//Nombre Profesor
	$("#nombreProfesor").text(docente.nombre)

	//Profesion
	$("#profesion").text(docente.profesion);

	//Imagen profesor
	$("#imagenProfesor").attr("src",docente.img);

	//Agregandi descripcion del profesor
	docente.descripcion.forEach(function(value,index){
		$("#contanedor-descripcion").append("<p>" + value + "</p>")
	});

	//Agregando la lista de videos
	videos.forEach(function(value,index){
		var template = '<li class="list-container-video__item" data-page="{0}">{1}</li>';
		var templateRellenado = template.replace("{0}",index+1).replace("{1}",value.nroVideo + " -- " + value.titulo);
		$(".list-container-video").append(templateRellenado);
	});


	$("#btnSiguiente").on("click",siguiente);

	$("#btnAnterior").on("click",anterior);

	cambioCapitulo(Number.parseInt(page));

	$(".list-container-video__item[data-page="+page+"]").addClass("list-container-video__item--active");

	$(".list-container-video__item").on("click",listSeleccionado);

	});
});


var listSeleccionado = function(){
	var page = $(this).attr("data-page");
	var urlRedireccion = "/cursos/html5.html?page="+page;
	window.location.href=urlRedireccion;
}


var cambioCapitulo = function(page){
	var url ="";
	videos.forEach(function(value,index){
		if(value.page === page)
			url = value.url;
	});
	if(url === "")
		url = videos[0].page;
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
	if(videos.length < page)
		page = 1;
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