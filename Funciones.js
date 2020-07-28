/**
 * Función que trata con la conversión al sistema internacional de datos.
 * @method universalidad
 * @param {number} valor La cantidad del soluto o solvente.
 * @param {string} unidad La unidad en que dicho valor se halla.
 * @return {number} El valor convertido en mililitros o gramos.
 */
function universalidad(valor, unidad) {
	switch (unidad) {
        case 'ml':
			break;
        case 'cc':
            break;
		case 'gal':
			valor = Math.round((3785.41 * valor) * 100) / 100;
			break;
		case 'g':
			break;
		case 'mg':
			valor = Math.round((0.001 * valor) * 100) / 100;
			break;
		case 'oz':
			valor = Math.round((28.3495 * valor) * 100) / 100;
			break;
		case 'lib':
			valor = Math.round((453.592 * valor) * 100) / 100;
			break;
    }
    return valor;
}
/**
 * Deshace los posibles cambios hechos por la función universalidad.
 * @method desuniversalidad
 * @param {number} valor La cantidad del soluto o solvente.
 * @param {string} unidad La unidad en que dicho valor se halla.
 * @return {number} el valor convertido en la unidad original.
 */
function desuniversalidad(valor, unidad) {
    switch (unidad) {
        case 'ml':
            break;
        case 'cc':
            break;
        case 'gal':
            valor = Math.round((0.00026 * valor) * 100) / 100;
            break;
        case 'g':
            break;
        case 'mg':
            valor = Math.round((1000 * valor) * 100) / 100;
            break;
        case 'oz':
            valor = Math.round((0.035 * valor) * 100) / 100;
            break;
        case 'lib':
            valor = Math.round((0.002 * valor) * 100) / 100;
            break;
    }
    return valor;
}
/**
 * Función que prepara el canvas con lo mostrado al iniciar la página.
 * @method setup
 */
function setup() {
    var canvas = document.getElementById("dibujo");
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = "Media/vaso.png";

    canvas.width = canvas.width;

    var img2 = new Image();
    img2.src = "Media/sal.png";
    img2.onload = function() {
        ctx.drawImage(img, 300, 130);
        ctx.drawImage(img2, 100, 380, 100, 199);
    }
}
/**
 * Hace el cálculo estequiométrico y dibuja la representación en el canvas.
 * @method Estequiometria
 * @param {number} svc La cantidad del solvente.
 * @param {string} svu La unidad en que dicho valor se halla.
 * @param {string} so El tipo de soluto que se usa.
 * @param {number} soc La cantidad del soluto.
 * @param {string} sou La unidad en que dicho valor se halla.
 */
function Estequiometria(svc, svu, so, soc, sou) {

    var a = universalidad(svc, svu); //ml
    var b = svu; //Solo para conformar al user luego
    var c = so;
    var d = universalidad(soc, sou); //g
    var e = sou;
	
    if (c == 'aceite') {
        mistakewasmade();
    } else {
        /*La solubilidad del azúcar en agua, a 20 ºC, 
        es de 1330 g/L en agua.
        Sal: 359 g/L en agua.
        */
        if (c == 'azucar') {
            //var solvsat = (d * 1000) / 1330;
            var solusat = (a * 1330) / 1000;
        } else if (c == 'sal') {
            //var solvsat = (d * 1000) / 359;
            var solusat = (a * 359) / 1000;
        }
        reajuste();
        animarSoluto(c);
        setTimeout(rotar, 3000, c);
        if (d > solusat) {
			setTimeout(precipitado, 5500, c);
            document.getElementById("resultados").innerHTML = "<p><u>Resultados:</u> la mezcla en el vaso está absolutamente saturada, hasta tal punto que quedan restos de " + c + " en el vaso.</p><p>Máximo permitido: " + desuniversalidad(solusat, e) + " " + e + "</p>";
        } else if (d == solusat) {
            document.getElementById("resultados").innerHTML = "<u>Resultados:</u> la mezcla en el vaso está saturada, por lo que no admite ni un poco más de " + c + " en él. ¡Felicidades por el cálculo exacto! Solo recuerda que hay muchas variables que pueden cambiar este estado.";
        } else {
            document.getElementById("resultados").innerHTML = "<p><u>Resultados:</u> la mezcla en el vaso no está saturada, con lo que se puede seguir añadiendo " + c + ", si deseas.</p><p>Máximo permitido: " + desuniversalidad(solusat, e) + " " + e + "</p>";
        }
    }
}
/**
 * Cambia lo que el canvas muestra al modificar alguna caja del formulario.
 * @method corregirCanvas
 * @param {string} soluto El tipo de soluto que se usa.
 */
function corregirCanvas(soluto) {
    var canvas = document.getElementById("dibujo");
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.width;
    var img = new Image();
    img.src = "Media/vaso.png";

    var img2 = new Image();
    switch (soluto) {
        case 'sal':
            img2.src = "Media/sal.png";
            break;
        case 'azucar':
            img2.src = "Media/azucar.png";
            break;
        case 'aceite':
            img2.src = "Media/aceite.png";
            break;
    }
    img2.onload = function() {
        ctx.drawImage(img, 300, 130);
        ctx.drawImage(img2, 100, 380, 100, 199);
    }
}
/**
 * Ocurre si se intenta realizar el experimento con aceite.
 * @method mistakewasmade
 */
function mistakewasmade() {
    var canvas = document.getElementById("dibujo");
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = "Media/error-cross.png";
    img.onload = function() {
        ctx.drawImage(img, 50, 100);
    }
    document.getElementById("resultados").innerHTML = "<u>Resultados:</u> ¡No puedes poner aceite en el vaso! Esta no es una combinación que se pueda mezclar.";
}


/**
 * Hace que el vaso parezca tener restos de soluto.
 * @method precipitado
 * @param {string} soluto El tipo de soluto que se usa.
 */
function precipitado(soluto) {
    var canvas = document.getElementById("dibujo");
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.width;
    var img = new Image();
    img.src = "Media/vaso_sobresaturado.png";
	var img2 = new Image();
    switch (soluto) {
        case 'sal':
            img2.src = "Media/sal.png";
            break;
        case 'azucar':
            img2.src = "Media/azucar.png";
            break;
	}
	img.onload = function() {
        ctx.drawImage(img, 300, 130);
		ctx.save();
        ctx.translate(270, 60);
        ctx.rotate(120 * Math.PI / 180);
        ctx.drawImage(img2,-48.39999999999989, -121, 100, 199);
        ctx.restore();
	}
}

/**
 * Función que verifica que se ingresen valores apropiados.
 * @method verify
 * @param {number} valor El valor ingresado por el usuario.
 */
 function verify(valor){
	 if (valor.includes(",")){
		valor=valor.replace(",",".");
	}
if (isNaN(valor)||(valor < 0)){
        alert("Valor inválido ingresado.");
		document.getElementById("solvente").value = "";
		document.getElementById("solutocant").value = "";
	}	
 }
/**
 * Movimiento inicial del dibujo de soluto hacia el vaso.
 * @method animarSoluto
 * @param {string} soluto El tipo de soluto que se usa.
 */
px = 100;
py = 380;
dx = 1;
dy = 2;

function animarSoluto(soluto) {
    var canvas = document.getElementById("dibujo");
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = "Media/vaso.png";
    var img2 = new Image();
    switch (soluto) {
        case 'sal':
            img2.src = "Media/sal.png";
            break;
        case 'azucar':
            img2.src = "Media/azucar.png";
            break;
        case 'aceite':
            img2.src = "Media/aceite.png";
            break;
    }
    if (py <= 60) {
        return;
    } else {
        canvas.width = canvas.width;
        img2.onload = function() {
            ctx.drawImage(img, 300, 130);
            ctx.drawImage(img2, px, py, 100, 199);
        }
        px += dx;
        py -= dy;
        setTimeout(animarSoluto, 15, soluto);
    }
}

/**
 * Rota el dibujo del soluto para simular un vuelque en el vaso.
 * @method rotar
 * @param {string} soluto El tipo de soluto que se usa.
 */
pr = 0;
dr = 1;
px2 = 0;
dx2 = 0.4;
py2 = 0;
dy2 = 1;

function rotar(soluto) {
    var canvas = document.getElementById("dibujo");
    var ctx = canvas.getContext('2d');
    console.log(soluto);
    var img = new Image();
    img.src = "Media/vaso.png";
    var img2 = new Image();
    switch (soluto) {
        case 'sal':
            img2.src = "Media/sal.png";
            break;
        case 'azucar':
            img2.src = "Media/azucar.png";
            break;
    }
    if (pr > 120) {
        return;
    } else {
        canvas.width = canvas.width;
        img.onload = function() {
            ctx.drawImage(img, 300, 130);
            ctx.save();
            ctx.translate(270, 60);
            ctx.rotate(pr * Math.PI / 180);
            ctx.drawImage(img2, px2, py2, 100, 199);
            ctx.restore();
			console.log(px2,py2);
        }
        px2 -= dx2;
        py2 -= dy2;
        pr += dr;
        setTimeout(rotar, 15, soluto);
    }
}
/*
Intentar hacer rotar correctamente ese salero fue el experimento más tedioso jamás intentado. 
¿POR QUÉ gira como si fuera un círculo? 
¿No se supone que deben hacerlo sobre su propio eje? 
AARGH
*/

/**
 * Reajusta todas las variables globales (el canvas falla si se intenta repetir sin esto).
 * @method reajuste
 */
function reajuste() {
    px = 100;
    py = 380;
    dx = 1;
    dy = 2;
    pr = 0;
    dr = 1;
    px2 = 0;
    dx2 = 0.4;
    py2 = 0;
    dy2 = 1;
}