

const GRID_SIZE = 24
const grid = document.querySelector('.grid')

let isMouseDown = false
let mouseUpTriggered = false
let hasDragged = false
// Inserting the grid cells
for(let i = 0; i<Math.pow(GRID_SIZE,2);i++){
    grid.innerHTML += '<div class="grid-cell" draggable="false"></div>'
}

const allCells = document.querySelectorAll('.grid-cell')
allCells.forEach((gridCell)=>{
   
    gridCell.addEventListener('mousedown', ()=> {
        isMouseDown = true
        mouseUpTriggered = false
        hasDragged = false
        if(mouseUpTriggered === false) gridCell.classList.add('clicked')
        console.log('mousedown')
    })
    gridCell.addEventListener('mouseover', ()=> {
        if(isMouseDown === true && mouseUpTriggered === false && hasDragged ===false){
            gridCell.classList.add('clicked')
        }
        console.log("mouseover");
    })
    gridCell.addEventListener('mouseup', ()=> {
        isMouseDown = false
        mouseUpTriggered = true
        gridCell.classList.add('clicked')
        console.log("mouseup");
    })
    // Ensuring user doesn't accidentally drag grid cell
    gridCell.addEventListener('dragstart', (e)=>{
        e.preventDefault()
        hasDragged = true
        console.log('dragged')

        // mouse down event listener function in drag (place in function)
        isMouseDown = true;
        mouseUpTriggered = false;
        hasDragged = false;
        if (mouseUpTriggered === false) gridCell.classList.add("clicked");
        console.log("mousedown in dragged");
    })
    
})

// Fail safe for when mouseup is triggered outside of grid cell
document.addEventListener('mouseup', ()=>{
    mouseUpTriggered = true
})
// Place mousedown in document listener too so I can click from outside the grid

// Clear button 
// Look thru all the grid cells and remove clicked class
// Add transition?


// Notes
// Glitch where mouseover not working because it needs to be released over an element 
// Can use document event listener to check for mouse up event with a boolean but still doesn't work if mouseup event is triggered by moving mouse too fast 

