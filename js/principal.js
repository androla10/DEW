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

	$('.carousel').carousel({
	  interval: 2000
	})

})



var validarCursoExistente = function(nombreCurso){
	var valorRetornado = false;
	arregloCursos.forEach(function(value,index){
		 if(value === nombreCurso) {
		 	valorRetornado = true;
		 }
		
	});
	return valorRetornado;
}