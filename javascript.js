
var movebelow = 0;
var moveleft = 0;
var arrSnake1;
var minus = false;
var moveup = false;
var btm = 0;
var lft = 0;

function logicalvalues(moveup, minus)
{
	this.moveup = moveup;
	this.minus = minus;
	this.changevalues = function(moveup, minus)
	{
		this.moveup = moveup;
		this.minus = minus;
	}
	this.getminusvalue()
	{
		return this.minus;
	}
	this.getmoveupvalue()
	{
		return this.moveup;
	}
}

window.onload = function()
{
	var arrSnakefirst = document.getElementsByClassName('snake');
	for(var i = 0; i < arrSnakefirst.length; i++)
		arrSnakefirst[i].style.left = (i * 10) + 'px';
    var box = document.getElementById('box');
	setSnakeFood();
	var timer = setInterval(move,100);

	function move()
	{
		if(moveup)
		{
			if(minus)
				if(movebelow <= 0)
					movebelow = document.getElementById('GameBox').clientHeight - 10;
				else
					movebelow -=10;
			else
				if(movebelow >= document.getElementById('GameBox').clientHeight - 10)
					movebelow = 0;
				else
					movebelow +=10;
			snakemove(false, movebelow);
		}
		
		else
		{
			if(minus)
				if(moveleft <= 0)
					moveleft = document.getElementById('GameBox').clientWidth - 10;
				else
					moveleft -=10;
			else
				if(moveleft >= document.getElementById('GameBox').clientWidth - 10)
					moveleft = 0;
				else
					moveleft +=10;
			snakemove(true, moveleft);
		}
    }
	
	function snakemove(left, position)
	{
		var lastLeft = 0;
		var Lasttop = 0;
		var positionBottom = position;
		var positionLeft = position;
		var arrSnake = document.getElementsByClassName('snake');
	
		for(var i = 0; i < arrSnake.length; i++)
		{
			if(left)
			{
				lastLeft = arrSnake[i].offsetLeft;
				Lasttop = arrSnake[i].offsetTop;
				if(positionLeft  == arrSnake[i].offsetLeft && i != 0)
					arrSnake[i].style.top = positionBottom + 'px';		
				else
					arrSnake[i].style.left = positionLeft + 'px';
				
				if(i == 0)
				{
					var FoodLeft= document.getElementById('foodID').offsetLeft;
					var FoodTop= document.getElementById('foodID').offsetTop;
					if( FoodLeft == (arrSnake[0].offsetLeft + 10) || (FoodLeft + 10) == arrSnake[0].offsetLeft)
					{
						if(FoodTop == arrSnake[0].offsetTop)
						{
							document.getElementById('foodID').parentNode.removeChild(document.getElementById('foodID'));
							setSnakeFood();
							growSnake(FoodLeft, FoodTop);
						}
					}
				}
				
			}
			else
			{
			    lastLeft = arrSnake[i].offsetLeft;
				Lasttop = arrSnake[i].offsetTop;
				if(positionBottom  == arrSnake[i].offsetTop && i != 0)
					arrSnake[i].style.left = positionLeft + 'px';
				else
					arrSnake[i].style.top = positionBottom + 'px';
				
				if(i == 0)
				{
					var FoodLeft= document.getElementById('foodID').offsetLeft;
					var FoodTop= document.getElementById('foodID').offsetTop;
					if( FoodTop == (arrSnake[0].offsetTop + 10) || (FoodTop + 10) == arrSnake[0].offsetTop)
					{
						if(FoodLeft == arrSnake[0].offsetLeft)
						{
							document.getElementById('foodID').parentNode.removeChild(document.getElementById('foodID'));
							setSnakeFood();
							growSnake(FoodLeft, FoodTop);
						}
					}
				}
			}
			positionLeft = lastLeft;
			positionBottom = Lasttop;
		}
		
	}
	
	function checkEatFood()
	{
		var foodTop = document.getElementById('food').offsetTop;
		var foodLeft = document.getElementById('food').offsetLeft;
		
	}
	
	function setSnakeFood()
	{
		var food = document.createElement('span');
		food.setAttribute('class', 'food');
		food.setAttribute('id', 'foodID');
	    document.getElementById('GameBox').appendChild(food);
		food.style.left = getRandomNum(document.getElementById('GameBox').clientWidth) + 'px';
		food.style.top = getRandomNum(document.getElementById('GameBox').clientHeight) + 'px';	
	}
	
	function growSnake(posLeft, posTop)
	{
		var food = document.createElement('span');
		food.setAttribute('class', 'snake');
		//food.setAttribute('id', 'foodID');
	    document.getElementById('GameBox').appendChild(food);
		food.style.left = posLeft + 'px';
		food.style.top = posTop + 'px';	
	}
	
	function getRandomNum(max)
	{
		var randomNumber = Math.floor(Math.random() * Math.floor(max));
		return randomNumber - (randomNumber % 10);
	}

}

function uniKeyCode(event)
{
    var key = event.keyCode;
	if(key == 40) //Down
	{	
	    if(!minus || !moveup)
		{
			minus = false;
			moveup = true;
			arrSnake1 = document.getElementsByClassName('snake');		
			movebelow = arrSnake1[0].offsetTop;
		}
	}
	else if(key == 38) //Up
	{
		if(minus || !moveup)
		{
			minus = true;
			moveup = true;
			arrSnake1 = document.getElementsByClassName('snake');		
			movebelow = arrSnake1[0].offsetTop;
		}
	}
	else if(key == 37)
	{
		if(minus || moveup)
		{
			minus = true;
			moveup = false;
			arrSnake1 = document.getElementsByClassName('snake');		
			moveleft = arrSnake[0].offsetLeft;
		}
	}
	else if(key == 39)
	{
		if(!minus || moveup)
		{
			minus = false;
			moveup = false;
			arrSnake1 = document.getElementsByClassName('snake');		
			moveleft = arrSnake[0].offsetLeft;
		}
	}
}