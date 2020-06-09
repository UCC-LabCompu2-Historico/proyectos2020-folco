/**
 * Función que trata con .
 * @method nombre
 * @param {} = 
 * @param {} =
 * @return 
 */
 
 function universalidad (valor, unidad){
	 console.log(valor,unidad);
	if (valor.includes(",")){
		valor=valor.replace(",",".");
	}
	if (isNaN(valor)){
		alert("Valor inválido ingresado.");
	}else{
		switch(unidad){
		case 'ml':
			break;
		case 'cc':
			break;
		case 'gal':
			valor=Math.round((3785.41*valor)*100)/100;
			break;
		case 'g':
			break;
		case 'mg':
			valor=Math.round((0.001*valor)*100)/100;
			break;
		case 'oz':
			valor=Math.round((28.3495*valor)*100)/100;
			break;
		case 'lib':
			valor=Math.round((453.592*valor)*100)/100;
			break;
	}}
	return valor;
}

function setup(){
	var canvas = document.getElementById("dibujo");
	var ctx = canvas.getContext('2d');
	
	var img = new Image();
	img.src="Media/vaso.png";
	
	canvas.width = canvas.width;
	
	var imgl = new Image();
	imgl.src="Media/sal.png";
	imgl.onload = function(){
		ctx.drawImage(img, 300, 380);
		ctx.drawImage(imgl, 100, 380, 200, 200);
	}
}	
function dibujarImage(px, py){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext('2d');
	
	console.log(px, py);
	var img = new Image();
	img.src="images/auto.png";
	
	canvas.width = canvas.width;
	
	img.onload = function(){
		ctx.drawImage(img, px, py);
	}

}	

function Estequiometria(svc, svu, so, soc, sou){
	
	var a=universalidad(svc,svu); //ml
	var b=svu; //Solo para conformar al user luego
	var c=so;
	var d=universalidad(soc,sou); //g
	var e=sou;
	console.log(a,b,c,d,e);
	
	if(c=='aceite'){
		mistakewasmade();
	}else{
		/*La solubilidad del azúcar en agua, a 20 ºC, 
		es de 1330 g/L en agua.
		Sal: 359 g/L en agua.
		*/
		if(c=='azucar'){
			var solvsat=(d*1000)/1330;
		}else if(c=='sal'){
			var solvsat=(d*1000)/359;
		}
		if (a<solvsat){
			//Aquí irian el dibujado en canvas y la escritura en el div.
			document.getElementById("resultados").innerHTML="<u>Resultados:</u> la mezcla en el vaso está absolutamente saturada, hasta tal punto que quedan restos de " + c + " en el vaso.";
		}else if(a==solvsat){
			document.getElementById("resultados").innerHTML="<u>Resultados:</u> la mezcla en el vaso está saturada, por lo que no admite ni un poco más de " + c + " en él. ¡Felicidades por el cálculo exacto! Solo recuerda que hay muchas variables que pueden cambiar este estado.";
		}else{
			document.getElementById("resultados").innerHTML="<u>Resultados:</u> la mezcla en el vaso no está saturada, con lo que se puede seguir añadiendo " + c + ", si deseas.";
		}		
	}	
}

function corregirCanvas(soluto){
	var canvas = document.getElementById("dibujo");
	var ctx = canvas.getContext('2d');	
	canvas.width = canvas.width;
	var img = new Image();
	img.src="Media/vaso.png";
	
	var img2 = new Image();
	switch(soluto){
	case 'sal':
		img2.src="Media/sal.png";
		break;
	case 'azucar':
		img2.src="Media/azucar.png";
		break;
	case 'aceite':
		img2.src="Media/aceite.png";
		break;
	}
	img2.onload = function(){
		ctx.drawImage(img, 300, 380);
		ctx.drawImage(img2, 100, 380, 200, 200);
	}
}

function mistakewasmade(){
	alert('you fool');
}