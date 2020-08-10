document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid');
    let squares=Array.from(grid.querySelectorAll('div'))
    const width=10;
    const height=20;
    let currentPosotion=4;

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
    

})