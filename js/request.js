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


var validarSession = function(){
	var user = sessionStorage.getItem("user");
	if(user !== undefined && user !== null)
		window.location.href = 'principal.html';
}