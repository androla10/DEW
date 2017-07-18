$(function(){

	//Asignacion de evento al botón de logueo
	$("#btnLogueo").on("click",function(){
		logueo();
	});

});

//function de validacion de credenciales
var logueo = function(){
	var username = $("#username").val();
	var password = $("#clave").val();
	var object = login(username,password);

	$.when(object).then(function(data,textStatus, jqXHR){
		if(data === undefined)
			alert("Usuario no encontrado")
		else{
			sessionStorage.setItem('user',JSON.stringify(data));
			window.location.href = 'principal.html';
		}
	});
}
