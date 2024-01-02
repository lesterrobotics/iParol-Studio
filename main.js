var images = []
for (i = 0; i < 69; i++) {
    if (i <= 9) {
      images[i] = new Image()
      images[i].style.position = "absolute"
      images[i].src = "frames/frame_0000"+i+".png"
      images[i].style.visibility = "hidden"
      images[i].style.height = "50%"
      document.getElementById("images").appendChild(images[i])
    } else {
      images[i] = new Image()
      images[i].style.position = "absolute"
      images[i].src = "frames/frame_000"+i+".png"
      images[i].style.visibility = "hidden"
      images[i].style.height = "500px"
      images[i].style.height = "50%"
      document.getElementById("images").appendChild(images[i])
    }
}

function press(pin) {
  var p = document.getElementById(pin)
  if (images[pin].style.visibility == "hidden") {
    images[pin].style.visibility = "visible"
    p.style.backgroundColor = "green"
  } else {
    images[pin].style.visibility = "hidden"
    p.style.backgroundColor = "black"
  }
}

function selectAll() {
  for (i = 0; i <= 68; i++) {
    images[i].style.visibility = "visible"
    document.getElementById(""+i).style.backgroundColor = "green"
  }
}

function deselectAll() {
  for (i = 0; i <= 68; i++) {
    images[i].style.visibility = "hidden"
    document.getElementById(""+i).style.backgroundColor = "black"
  }
}

//  0 = buttons
var div = document.getElementById("frames")
var frames = [[]]
var btns = []
var currentFrame = 1

function saveFrame(_currentFrame) {
  frames[_currentFrame] = []
  for (i = 0; i <= 68; i++) {
    if (images[i].style.visibility == "visible") {
      frames[_currentFrame].push(i)
      press(i)
    }
  }
}

function moveTo(_frame) {
  saveFrame(currentFrame)
  document.getElementById(currentFrame+"f").style.backgroundColor = "black"
  currentFrame = _frame
  document.getElementById(currentFrame+"f").style.backgroundColor = "green"
  console.log(frames[_frame])
  if (frames[_frame].length != 0) {
    for (i = 0; i < frames[_frame].length; i++) {
      press(frames[_frame][i])
    }
  } else {
    console.log("This frame is empty...")
  }
  console.log("Frame "+_frame+" selected...")
  console.log(frames)
}

function addFrame() {
  var newBtn = document.createElement("button")
  newBtn.textContent = btns.length + 1
  newBtn.id = btns.length + 1 + "f"
  if (btns.length + 1 <= 99) {
    newBtn.className = "square"
  } else {
    newBtn.className = "rect"
  }
  var temp = btns.length + 1
  newBtn.onclick = function() {moveTo(temp)}
  btns.push(newBtn)
  document.getElementById("frames").appendChild(btns[btns.length - 1])
  frames.push([])
  console.log(btns)
  moveTo(btns.length)
}

function removeFrame() {
  if (currentFrame == btns.length) moveTo(btns.length-1)
  frames.pop()
  btns[btns.length-1].remove()
  btns.pop()
  
}

var clipboard = []

function copyFrame() {frames[currentFrame] = []
  for (i = 0; i <= 68; i++) {
    if (images[i].style.visibility == "visible") {
      frames[currentFrame].push(i)
    }
  }
  clipboard = frames[currentFrame]
  console.log("Copied Frame "+currentFrame+": "+clipboard)
}

function pasteFrame() {
  frames[currentFrame] = clipboard
  deselectAll();
  if (frames[currentFrame].length != 0) {
    for (i = 0; i < frames[currentFrame].length; i++) {
      press(frames[currentFrame][i])
    }
  }
  console.log("Pasted Successfully!")
}

var counter = 1
var playing = false
var player = NaN
var playBtn = document.getElementById("playBtn")
function playButton() {
  if (!playing) {
    playing = true
    player = setInterval(()=>{
      counter++
      if (counter == frames.length) {
        counter = 1
      }
      moveTo(counter)
    }, 83.33)
    playBtn.innerText = "Stop"
    disableButtons()
  } else {
    playing = false
    clearInterval(player)
    playBtn.innerText = "Play"
    enableButtons()
  }
}

function disableButtons() {
  document.getElementById("selectAllBtn").disabled = true
  document.getElementById("selectAllBtn").style.color = "grey"
  document.getElementById("selectAllBtn").style.borderColor = "grey"
  document.getElementById("deselectAllBtn").disabled = true
  document.getElementById("deselectAllBtn").style.color = "grey"
  document.getElementById("deselectAllBtn").style.borderColor = "grey"
  document.getElementById("addFrameBtn").disabled = true
  document.getElementById("addFrameBtn").style.color = "grey"
  document.getElementById("addFrameBtn").style.borderColor = "grey"
  document.getElementById("removeFrameBtn").disabled = true
  document.getElementById("removeFrameBtn").style.color = "grey"
  document.getElementById("removeFrameBtn").style.borderColor = "grey"
  document.getElementById("copyFrameBtn").disabled = true
  document.getElementById("copyFrameBtn").style.color = "grey"
  document.getElementById("copyFrameBtn").style.borderColor = "grey"
  document.getElementById("pasteFrameBtn").disabled = true
  document.getElementById("pasteFrameBtn").style.color = "grey"
  document.getElementById("pasteFrameBtn").style.borderColor = "grey"
  document.getElementById("generateCode").disabled = true
  document.getElementById("generateCode").style.color = "grey"
  document.getElementById("generateCode").style.borderColor = "grey"
}

function enableButtons() {
  document.getElementById("selectAllBtn").disabled = false
  document.getElementById("selectAllBtn").style.color = "white"
  document.getElementById("selectAllBtn").style.borderColor = "white"
  document.getElementById("deselectAllBtn").disabled = false
  document.getElementById("deselectAllBtn").style.color = "white"
  document.getElementById("deselectAllBtn").style.borderColor = "white"
  document.getElementById("addFrameBtn").disabled = false
  document.getElementById("addFrameBtn").style.color = "white"
  document.getElementById("addFrameBtn").style.borderColor = "white"
  document.getElementById("removeFrameBtn").disabled = false
  document.getElementById("removeFrameBtn").style.color = "white"
  document.getElementById("removeFrameBtn").style.borderColor = "white"
  document.getElementById("copyFrameBtn").disabled = false
  document.getElementById("copyFrameBtn").style.color = "white"
  document.getElementById("copyFrameBtn").style.borderColor = "white"
  document.getElementById("pasteFrameBtn").disabled = false
  document.getElementById("pasteFrameBtn").style.color = "white"
  document.getElementById("pasteFrameBtn").style.borderColor = "white"
  document.getElementById("generateCode").disabled = false
  document.getElementById("generateCode").style.color = "white"
  document.getElementById("generateCode").style.borderColor = "white"
}

addFrame()
moveTo(1)
selectAll()
deselectAll()

var generateCodeButton = document.getElementById("generateCode")

function copyCode() {
  navigator.clipboard.writeText(document.getElementById("arduinoCode").innerText)
  console.log("text copied")
}



