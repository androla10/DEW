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
			console.log(this.val());
			buscarCurso(this.val());
		}
	});

	$(".btn-comenzar").on("click")

	$('.carousel').carousel({
	  interval: 2000
	});

})


var comenzarCurso = function(){
	var elemento = this;
	var curso = elemento.attr("data-curso");
	var page = elemento.attr("data-page");
	var url = "";

	switch( curso )
	{
		case 'html' : {
			url="/html5.html?page="+page;
		},

		case 'css': {
			url="/css.html?page="+page;
		},

		case 'javascript': {
			url="/javascript.html?page="+page;
		},

		case 'angularjs': {
			url="/angularjs.html?page="+page;
		}	
	}


	window.location.href="/"
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