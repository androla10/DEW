var arregloCursos = ["Javascript Básico", "Html5 Básico", "Css 3", "AngularJS"];

$(function(){

	var elemento = $("#searchCursos");

	elemento.autocomplete({
		source: arregloCursos
	});

	elemento.keypress(function(e){
		var code = e.which;
		if(code==13) 
		{	
			if(validarCursoExistente(this.value))
			{
				alert("Sé busco correctamente");
			}
			else{
				alert("No existe el curso ingresado");
			}
			buscarCurso(this.val());
		}
	});

	$("#logout").on("click",salir);

	$(".btn-comenzar").on("click",comenzarCurso);

	$('.carousel').carousel({
	  interval: 2000
	});

	var usuarioLogeado = $("#usuarioLogueado");

	var usuario = obtenerUsuarioLogueado();

	usuarioLogueado.innerHTML = usuario.name;
	
})


var comenzarCurso = function(){
	var elemento = $(this);
	var curso = elemento.attr("data-curso");
	var page = elemento.attr("data-page");
	var url = "";

	//var cursoLlevado = obtenerCursoLlevado();
	//cursoLlevado.cursos.push(curso);

	switch( curso )
	{
		case 'html' : 
			url="/cursos/html5.html?page="+page;
			break;
		
		case 'css': 
			url="/cursos/css.html?page="+page;
			break;
		
		case 'javascript': 
			url="/cursos/javascript.html?page="+page;
			break;
		
		case 'angularjs': 
			url="/cursos/angularjs.html?page="+page;
			break;
		
		default :
			url = "";
		
	}

	if(url!=="" || url !== undefined)
		window.location.href= url;	
}


var validarCursoExistente = function(nombreCurso){
	var valorRetornado = false;
	arregloCursos.forEach(function(value,index){
		 if(value === nombreCurso) {
		 	valorRetornado = true;
		 }
		
	});
	return valorRetornado;
}