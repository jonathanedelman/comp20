//game.js
//DOCTYPE javascript


function draw()	{
	canvas = document.getElementById('game');
	//Check if canvas is supported on browser
	if(canvas.getContext)	{

		ctx = canvas.getContext('2d');
		var spriteSheet = new Image();
		spriteSheet.src = "assets/duckhunt.png";
		spriteSheet.addEventListener("load", function(){
			//Road, grass, bushes
			ctx.drawImage(spriteSheet, 0, 713, 900, 184, 0, 416, 800, 184);
			
			//Tree
			ctx.drawImage(spriteSheet, 0, 270, 78, 125, 30, 180, 195, 312);
			
			//dog
			ctx.drawImage(spriteSheet, 0, 0, 59, 46, 300, 466, 118, 92);
			
			//birds
			ctx.drawImage(spriteSheet, 0, 117, 38, 38, 250, 180, 76, 76);
			ctx.drawImage(spriteSheet, 128, 117, 38, 38, 300, 100, 76, 76);
			ctx.drawImage(spriteSheet, 256, 117, 43, 40, 350, 230, 76, 76);
			ctx.drawImage(spriteSheet, 79, 117, 43, 40, 190, 230, 76, 76);
			ctx.drawImage(spriteSheet, 167, 117, 43, 40, 420, 100, 76, 76);
		});
	}
	else	{
	alert('Sorry, canvas is not supported on your browser!');
	}
}
