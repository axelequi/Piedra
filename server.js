var http=require('http');
var url=require('url');
var fs=require('fs');
var querystring = require('querystring');

var mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

var servidor=http.createServer(function(pedido,respuestauesta){
    var objetourl = url.parse(pedido.url);
	var camino='public'+objetourl.pathname;
	if (camino=='public/')
		camino='public/index.html';
	encaminar(pedido,respuestauesta,camino);
});

var server_port = process.env.YOUR_PORT || process.env.PORT || 8888;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
servidor.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});

function encaminar (pedido,respuestauesta,camino) {
	console.log(camino);
	switch (camino) {
		case 'public/recuperardatos': {
			recuperar(pedido,respuestauesta);
			break;
		}	
	    default : {  
			fs.exists(camino,function(existe){
				if (existe) {
					fs.readFile(camino,function(error,contenido){
						if (error) {
							respuestauesta.writeHead(500, {'Content-Type': 'text/plain'});
							respuestauesta.write('Error interno');
							respuestauesta.end();					
						} else {
							var vec = camino.split('.');
							var extension=vec[vec.length-1];
							var mimearchivo=mime[extension];
							respuestauesta.writeHead(200, {'Content-Type': mimearchivo});
							respuestauesta.write(contenido);
							respuestauesta.end();
						}
					});
				} else {
					respuestauesta.writeHead(404, {'Content-Type': 'text/html'});
					respuestauesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
					respuestauesta.end();
				}
			});	
		}
	}	
}


function recuperar(pedido,respuestauesta, num) {
    var info = '';
    pedido.on('data', function(datosparciales){
         info += datosparciales;
    });
    pedido.on('end', function(){
		num = Mathrandom(1,4);
		var formulario = querystring.parse(info);
		var respuestauesta1 = formulario['nombre'];
		respuestauesta.writeHead(200, {'Content-Type': 'text/html'});
		var pagina='<!doctype html><html><head><title>tp Presidente</title> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> </head><body>'+
		           '¿Piedra, papel o tijera?:'+Retornar(respuestauesta1,num)+'<br>'+
				   '<a href="index.html"   class="btn btn-dark" type="submit" value="Enviar">Inicio</button></a>'+
		           '</body></html>';
		respuestauesta.end(pagina);
    });	
}

	function Mathrandom(min, max) 
	{
	 var num = Math.floor(Math.random() * (4 - 1) + 1);
	 return num;	
	}

	function Retornar(respuestauesta1, num)
	{
		num = parseInt(num);
		var respuesta;
		//1 piedra, 2 papel, 3 tijeras
		if(num==1 && respuestauesta1=="a")
		{
			respuesta = "You Win!";
		}
		if(num==2 && respuestauesta1=="t")
		{
			respuesta = "You Win!";
		}
		if(num==3 && respuestauesta1=="p")
		{
			respuesta = "You Win!";
		}
		if(num==1 && respuestauesta1=="t")
		{
			respuesta = "You Lose!";
		}
		if(num==2 && respuestauesta1=="p")
		{
			respuesta = "You Lose!";
		}
		if(num==3 && respuestauesta1=="a")
		{
			respuesta = "You Lose!";
		}
		if(num==1 && respuestauesta1=="p")
		{
			respuesta = "Draw!";
		}
		if(num==2 && respuestauesta1=="a")
		{
			respuesta = "Draw!";
		}
		if(num==3 && respuestauesta1=="t")
		{
			respuesta = "Draw!";
		}
		return respuesta;
	}
	 

console.log('Servidor web iniciado');