$(function(){
	//Inicializacion de variables
	var username,clave;

	//Validar session
	validarSession();

	//Asignacion de evento al botón de logueo
	$("#btnLogueo").on("click",function(){
		logueo();
	});


});

//function de validacion de credenciales
var logueo = function(){
		username = $("#username").val();
		password = $("#clave").val();
		var object = login(username,password);

		$.when(object).then(function(data,textStatus, jqXHR){
			if(data === undefined)
				alert("Usuario no encontrado")
			else{
				sessionStorage.setItem('user', data);
				window.location.href = 'principal.html';
			}
		});
}
