document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid');
    const displaySquares=document.querySelectorAll('previous-grid div')
    let squares=Array.from(grid.querySelectorAll('div'))
    const width=10;
    const height=20;
    let currentPosotion=4;
    let timerId

    //assign functions to keycodes
    function control(e){
        if(e.keyCode===39){
            moveRight()
        }else if(e.keyCode===38){
            rotate()
        }else if(e.keyCode===37){
            moveLeft()
        }else if(e.keyCode===40){
            moveDown()
        }
    }

    document.addEventListener('keyup',control);

    //The Tetromonoes
    const lTetromino=[
        [1,width+1,width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2+1,width*2],
        [width,width*2,width*2+1,width*2+2]
    ]

    const zTetromino=[
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1]
    ]

    const tTetromino=[
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width*2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino=[
        [1,1,width,width+1],
        [1,1,width,width+1],
        [1,1,width,width+1],
        [1,1,width,width+1]
    ]

    const iTetromino=[
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes=[lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]

    //Rendomly select Tetromino
    let random=Math.floor(Math.random()*theTetrominoes.length);
    let currentRotation=0
    let current=theTetrominoes[random][currentRotation]

    //Draw the shape 
    function draw(){
        current.forEach(index=>(
            squares[currentPosotion+index].classList.add('block')
        ))
    }

    function undraw(){
        current.forEach(index=>(
            squares[currentPosotion+index].classList.remove('block')
        ))
    }

    //move down the shape
    function moveDown(){
        undraw()
        currentPosotion=currentPosotion+=width
        draw()
        freeze()
    }

    function moveRight(){
        undraw()
        const isAtRightEdge=current.some(index=>(currentPosition+index)%width==width-1);
        if(!isAtRightEdge) currentPosotion+=1;
        if(currentPosotion.some(index=>squares[currentPosotion+index].classList.contains('block'))){
            currentPosotion-=1;
        }
        draw()

    }

    function moveLeft(){
        undraw()
        const isLeftEdge=current.some(index=>(currentPosotion+index)%width===0)
        if(isLeftEdge) currentPosotion-=1
        if(current.some(index=>squares[currentPosotion+index].classList.contains('block2'))){
            currentPosotion+=1
        }
        draw()
    }
    
    function rotate(){
        undraw()
        currentRotation++;
        if(currentRotation===current.length){
            currentRotation=0
        }
        current=theTetrominoes[random][currentRotation]
        draw()
    }
    
    //show previous tetromino is displaySquares
    const displayWidth=4
    const displayIndex=0
    let nextRandom=0

    const smallTetrominoes=[
        [1,displayWidth+1,displayWidth*2+1,2],
        [0,displayWidth,displayWidth+1,displayWidth*2+1],
        [1,displayWidth,displayWidth+1,displayWidth+2],
        [0,1,displayWidth,displayWidth+1],
        [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
    ];

    function displayShape(){
        displaySquares.forEach(square=>{
            square.classList.remove('block')
    })
   
    smallTetrominoes[nextRandom].forEach(index=>{
        displaySquares[displayIndex+index].classList.add('block')
    })
    
}
 //Freze the shape
 function freez(){
     if(current.some(index=>squares[currentPosotion + index +width].classList.contains('block3')) 
     || squares[currentPosotion+index + width].classList.contains('block2')){
         current.forEach(index =>squares[index+currentPosition].classList.add('block2'))
             random=nextRandom
             nextRandom=Math.floor(Math.random()*theTetrominoes.length)
             current=theTetrominoes[random][currentRotation]
             currentPosition=4
             draw()
             displayShape()
         }
     }
 }

     startBtn.addEventListener('click',()=>{
         if(timerId){
            clearInterval(timerId)
            timerId=null
         }else{
             draw()
             timerId=setInterval(moveDown,1000;)
             nextRandom=Math.floor(Math.random()*theTetrominoes.length)
         }
     })

})