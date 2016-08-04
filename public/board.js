/**
 * La funcion drawBoard se encarga de dibujar los circulos que se utilizan
 * para la interacción del usuario
 * Tambien divide el tablero en los cuatro sectores que sirven como zona de 
 * ingreso de los puntos de diferentes colores a los diferentes jugadores
 */
drawBoard =function() {
	// Dibujado del svg
	board = new Snap(flat.w, flat.h);
	// Lineas divisoras
	board.line(0,flat.centerY,flat.w,flat.centerY)
		.attr({stroke:'#555'});
	board.line(flat.centerX,0,flat.centerX,flat.h)
		.attr({stroke:'#555'});
	// Circulo neutral (desplegado al pulzar el boton)
	blue=board.circle(flat.centerX, flat.centerY, 0)
		.attr({stroke:'#000',"stroke-width":5,"opacity":0.25,fill:'#fff'});
	blue.expanded=false;
	// Circulo rojo central
	red=board.circle(flat.centerX, flat.centerY, 0)
		.attr({fill:'#f00'});
	red.expanded=false;
	// Circulo verde central
	green=board.circle(flat.centerX, flat.centerY, 0)
		.attr({fill:'#0b0'});
	green.expanded=false;
	// Boton
	button=board.circle(flat.centerX, flat.centerY, flat.minRadius)
		.attr({'fill-opacity':0.25});
	button.drawer =this;
	addingPoint=false;
	button.drag(onMove, onStart, onFinish);

}

// Inicio del drag del boton
onStart=function(x,y,ev){
	blue.animate({r: flat.maxRadius}, 400, mina.elastic);
	addingPoint=true;
};

// Movimiento sobre el boton
onMove = function(dx,dy){
	if(addingPoint){
		if(!red.expanded && dy>0){
			// expandir el rojo contraer el verde
			if(green.expanded){
				$(green.node).appendTo($(red.node).parent());
				$(button.node).appendTo($(red.node).parent());
				green.animate({r: 0}, 200);
				green.expanded=false;
			}
			red.animate({r: flat.maxRadius}, 200);
			red.expanded=true;
		}
		else{
			// expandir el verde contraer el rojo
			if (!green.expanded && dy<0){
				if(red.expanded){
					$(red.node).appendTo($(red.node).parent());
					$(button.node).appendTo($(red.node).parent());
					red.animate({r: 0}, 200);
					red.expanded=false;
				}
				green.animate({r:flat.maxRadius}, 200);
				green.expanded=true;
			}
		}
	}
};

onFinish = function(){}


