var urlUser = "resources/user.json";


var ajaxRequest = function(url, verbType, data) {
    var d = $.Deferred();
    var options = {
        url: url,
        type: verbType,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        cache: false
    };
    $.ajax(options).done(function(json) { d.resolve(json); }).fail(function(jqXhr, textStatus, errorThrown) {
        d.reject();
        switch (jqXhr.status) {
            case 401:
                unauthorized();
                break;
            case 500:
                alert(errorThrown);
                break;
        }
    });

    return d.promise();
};


var salir = function(){
    sessionStorage.removeItem("user");
    window.location.href="/index.html";
}


var login = function(username, password){
	return ajaxRequest(urlUser, 'GET', null).then(function(data){
		var object = data[0];
		var objectReturn = undefined;
		object.user.forEach(function(value,index){
			if(value.username == username && value.clave == password){
				objectReturn = value;
			}
			
		});
		return objectReturn;
	});
}

var obtenerUsuarioLogueado = function(){
    return JSON.parse(sessionStorage.getItem("user"));
}


var validarSession = function(){
	var user = sessionStorage.getItem("user");
	if(user === undefined || user === null)
        if(!window.location.pathname.includes("/index.html"))
            window.location.href = 'index.html';    

    		
}

var guardarLocalStorage = function(key, objeto){
    var dataGuardar = JSON.stringify(objeto);
    localStorage.setItem(key, dataGuardar);
}

var obtenerLocalStorage = function(key){
    return localStorage.getItem(key);
}

var obtenerCursoLlevado = function(){
    if(obtenerLocalStorage('cursoLlevado') === "null"){
        var cursoLlevado = {
        idUsuario : obtenerUsuarioLogueado().id,
        cursos : []
    };
        guardarLocalStorage('cursoLlevado',cursoLlevado);
    }
    return JSON.parse(obtenerLocalStorage('cursoLlevado'));
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

validarSession();