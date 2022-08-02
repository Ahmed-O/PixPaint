

let GRID_SIZE = 24
const grid = document.querySelector('.grid')


// Grid size 
let gridSizeOptions = document.querySelector('#grid-size')
let selectedSize = gridSizeOptions
console.log('grid size: ', gridSizeOptions)

gridSizeOptions.addEventListener('change', (event)=>{

  // Changing the size of the grid
  const styleSheet = document.styleSheets[0];
  let gridSelector = document.querySelector(".grid");
  let gridCellSelector = document.querySelector(".grid-cell");

  // Accessing the CSS selectors for the grid and grid cells
  for (let i = 0; i < styleSheet.cssRules.length; i++) {
    if (styleSheet.cssRules[i].selectorText === ".grid") {
      gridSelector = styleSheet.cssRules[i];
    } else if (styleSheet.cssRules[i].selectorText === ".grid-cell") {
      gridCellSelector = styleSheet.cssRules[i];
    }
  }

  // Changing the CSS to accomdate new grid size
  gridSelector.style.setProperty(
    "grid-template-columns",
    `repeat(${event.target.value},1fr)`
  );
  gridSelector.style.setProperty(
    "grid-template-rows",
    `repeat(${event.target.value},1fr)`
  );

  gridCellSelector.style.setProperty(
    "height",
    `calc(600px / ${event.target.value})`
  );
  gridCellSelector.style.setProperty(
    "width",
    `calc(600px / ${event.target.value})`
  );

  let gridCells = document.querySelectorAll('.grid-cell')
  gridCells.forEach((gridCell)=>{
    gridCell.remove()  
  })

  GRID_SIZE = event.target.value
  // Deleting and re-rendering the grid 
  for(let i = 0; i<(GRID_SIZE**2);i++){
    let div = document.createElement("div");
    div.classList.add("grid-cell");
    div.style.backgroundColor = "#fff";
    // div.setAttribute('draggable', false)
    grid.appendChild(div);

    // grid.innerHTML +=
    //   '<div class="grid-cell" draggable="false" style="background-color: #fff"></div>';
  }

  listen()
})


// Color picker (iro.js)
let colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker
  width: 150,
  // Set the initial color to pure red
  color: "#f00",
  boxHeight: 300,
  sliderSize: 15,
});

let isMouseDown = false
let mouseUpTriggered = false
let hasDragged = false
// Inserting the grid cells
for (let i = 0; i < Math.pow(GRID_SIZE, 2); i++) {
  let div = document.createElement('div')
  div.classList.add('grid-cell')
  div.style.backgroundColor = '#fff'
  // div.setAttribute('draggable', false)
  grid.appendChild(div)
 
  // grid.innerHTML +=
  //   '<div class="grid-cell" draggable="false" style="background-color: #fff"></div>';
}


function listen() {
  const allCells = document.querySelectorAll(".grid-cell");
  allCells.forEach((gridCell) => {
    gridCell.addEventListener("mousedown", () => {
      isMouseDown = true;
      mouseUpTriggered = false;
      hasDragged = false;
      if (mouseUpTriggered === false)
        gridCell.style.backgroundColor = colorPicker.color.hexString;
    });
    gridCell.addEventListener("mouseover", () => {
      if (
        isMouseDown === true &&
        mouseUpTriggered === false &&
        hasDragged === false
      ) {
        gridCell.style.backgroundColor = colorPicker.color.hexString;
      }
    });
    gridCell.addEventListener("mouseup", () => {
      isMouseDown = false;
      mouseUpTriggered = true;
      gridCell.style.backgroundColor = colorPicker.color.hexString;
    });
    // Ensuring user doesn't accidentally drag grid cell
    gridCell.addEventListener("dragstart", (e) => {
      e.preventDefault();
      hasDragged = true;

      // mouse down event listener function in drag (place in function)
      isMouseDown = true;
      mouseUpTriggered = false;
      hasDragged = false;
      if (mouseUpTriggered === false)
        gridCell.style.backgroundColor = colorPicker.color.hexString;
      // console.log("mousedown in dragged");
    });
  });

  // Fail safe for when mouseup is triggered outside of grid cell
  document.addEventListener("mouseup", () => {
    mouseUpTriggered = true;
  });
  // Place mousedown in document listener too so I can click from outside the grid
}

listen()


// Erase tool
// Need to incorporate with the coloring tool b/c this one can be toggled on or off 
// Need to use the same logic but add conditional checks to see which button is currently being pressed
let eraseBtn = document.querySelector('#erase')
eraseBtn.addEventListener('click', ()=>{
  colorPicker.color.hexString = '#fff'
})


// Clear tool
// Loop thru grid cells and change background color to white
// Using settimeout to stagger the clear
let clearBtn = document.querySelector('#clear')
clearBtn.addEventListener('click', ()=>{
  document.querySelectorAll('.grid-cell').forEach((gridCell,index)=>{
     setTimeout(() => {
       gridCell.style.backgroundColor = "#fff";
     }, (GRID_SIZE / 100) * (index + 1));
  })
})


// Notes
// Had glitch where mouseover doesn't work well b/c mouseup needs to be in the document otherwise it only fires when mouseup occurs over the grid cell element
// Can use document event listener to check for mouse up event with a boolean but still doesn't work if mouseup event is triggered by moving mouse too fast. This is because grid cell is being dragged so I need to make draggable false and prevent default behavior for the drag event 