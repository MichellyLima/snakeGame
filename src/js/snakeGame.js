 //Feito por Michelly Lima
 window.onload = function(){
 
            var stage = document.getElementById('stage');
            var context = stage.getContext("2d"); //desenha o context
            document.addEventListener("keydown", keyPush); //listener das teclas

            var started = false; //status do jogo
            var lastKey; //última tecla apertada

            const snake = {x:10, y:15, speed: 1, tail:5, body:[]}; //cobra
			const apple = {x: 15, y:15}; //maçã
			const block = {length: 20, quantity: 30}; //bloquinhos ou quadrados

            var sx = sy = 0; //velocidade atual

            var count = 0;
            var pontuation = document.querySelector('span');


            for(var i = 0; i < snake.tail; i++) { //inicializa o corpo da cobra
            	snake.body[i] = {x:snake.x, y:snake.y+i};
            }

            context.fillStyle = "black"; //desenha o fundo preto
            context.fillRect(0,0, stage.width, stage.height);
 
            context.fillStyle = "red"; //desenha a maçã
            context.fillRect(apple.x*block.length, apple.y*block.length, block.length,block.length);
 
            context.fillStyle = "gray"; //desenha a cobra
            for (var i = 0; i < snake.body.length; i++) {
                context.fillRect(snake.body[i].x * block.length, snake.body[i].y * block.length, block.length - 1, block.length - 1);
            }

            
           	function game(){ // função principal do jogo
           		pontuation.textContent = count; // atualiza o contador de pontos

                snake.x += sx; // velocidades sendo atualizadas com a posição da cobra
                snake.y += sy;

                // Fazer a cobra atravessar as paredes
                if (snake.x <0) { 
                    snake.x = block.quantity-1;
                }
                if (snake.x > block.quantity-1) {
                    snake.x = 0;
                }
                if (snake.y < 0) {
                    snake.y = block.quantity-1;
                }
                if (snake.y > block.quantity-1) {
                    snake.y = 0;
                }

                context.fillStyle = "black"; //atualiza a tela preta a cada frame
                context.fillRect(0,0, stage.width, stage.height);
     
                context.fillStyle = "red"; // atualiza a maçã
                context.fillRect(apple.x*block.length, apple.y*block.length, block.length,block.length);
     
                context.fillStyle = "gray"; // atualiza a cobra
                for (var i = 0; i < snake.body.length; i++) {
                    context.fillRect(snake.body[i].x * block.length, snake.body[i].y * block.length, block.length - 1, block.length - 1);

                    if (snake.body[i].x == snake.x && snake.body[i].y == snake.y) { //Verifica se houve colisão
                        gameOver();
                    }
                }
 
                snake.body.push({x:snake.x, y:snake.y}); //desenha a cobra em seu percurso adicionando valores em seu body
                
               if(snake.body.length > snake.tail) { // apaga o rastro da cobra que não corresponde ao tamanho da cauda
                  snake.body.shift();
                }
 
                if (apple.x == snake.x && apple.y == snake.y){ // se a cobra comer a maçã respawma
                    snake.tail++;
                    count++;

                    apple.x = Math.floor(Math.random()*block.quantity);
                    apple.y = Math.floor(Math.random()*block.quantity);
                }
            }


            function gameOver(){ // função de game over
                alert('Game Over');
                window.location.reload(); //Refresh na página;
            }

 
            function keyPush(event){ // função de movimentação pela tela
                if(!started){
                    snake.body = [];
                    setInterval(game, 90);
                    started = true;
                }

                switch (event.keyCode) {
                    case 37: // Left
                        if(lastKey != 39){ //Não pode ter sido RIGHT = 39
                            sx = -snake.speed;
                            sy = 0; 
                            lastKey = 37;  
                        }

                        break;

                    case 38: // Up
                        if(lastKey != 40){ //Não pode ter sido DOWN = 40
                            sx = 0;
                            sy = -snake.speed;
                            lastKey = 38;
                        }

                        break;

                    case 39: // Rigth
                        if(lastKey != 37){ // Não pode ter sido LEFT = 37
                            sx = snake.speed;
                            sy = 0;
                            lastKey = 39;
                        }

                        break;

                    case 40: // Down
                        if(lastKey != 38){ //Não pode ter sido UP = 38
                            sx = 0;
                            sy = snake.speed;
                            lastKey = 40 ;      
                        }

                        break;         
                }
            }
 
        }