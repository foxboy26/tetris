var BLOCK_WIDTH = 20;

var ctx = null;
var nextTet = null;

window.onload = function() {
  ctx = $("canvas").getContext("2d");

  var pos = 
  {
    x : 40,
    y : 40
  };
  
  var curPos = pos;
  for (var i = 0; i < 7; i++)
  {
    for (var j = 0; j < 4; j++)
    {
      renderTetromino(i, curPos, j);
      curPos.x += (BLOCK_WIDTH * 4);
    }
    curPos.x = 40;
    curPos.y += (BLOCK_WIDTH * 4);
  }
};

function generateNextTet()
{
  nextTet.type = Math.floor(Math.random() * 7);
  nextTet.orientation = Math.floor(Math.random() * 4);
  nextTet.pos = {x : 0, y : 0};
  renderTetromino(type, pos, orientation);  
}

function renderTetromino(type, pos, orientation)
{
  switch (type)
  {
  case 0: // I
    renderITet(pos, orientation);
    break;
  case 1: // O
    renderOTet(pos, orientation);
    break;
  case 2: // T
    renderTTet(pos, orientation);
    break;
  case 3: // S
    renderSTet(pos, orientation);
    break;
  case 4: // Z
    renderZTet(pos, orientation);
    break;
  case 5: // J
    renderJTet(pos, orientation);
    break;
  case 6: // L
    renderLTet(pos, orientation);
    break;
  default:
    throw "Error: unknown type of tetromino.";
  }
}

function renderITet(pos, orientation)
{
  var color = "cyan";
  var x = pos.x, y = pos.y;
  switch (orientation)
  {
  case 3:
    y -= BLOCK_WIDTH;
  case 1:
    renderBlock(x - 2 * BLOCK_WIDTH, y, color);
    renderBlock(x - BLOCK_WIDTH, y, color);
    renderBlock(x, y, color);
    renderBlock(x + BLOCK_WIDTH, y, color);
    break;
  case 2:
    x -= BLOCK_WIDTH;
  case 0:
    renderBlock(x, y - 2 * BLOCK_WIDTH, color);
    renderBlock(x, y - BLOCK_WIDTH), color;
    renderBlock(x, y, color);
    renderBlock(x, y + BLOCK_WIDTH, color);
    break;
  default:
    throw "Error: unknown type of orientation.";
  }
}

function renderOTet(pos, orientation)
{
  var color = "yellow";
  var x = pos.x, y = pos.y;
  switch (orientation)
  {
    case 0:
    case 1:
    case 2:
    case 3:
    renderBlock(x - BLOCK_WIDTH, y, color);
    renderBlock(x - BLOCK_WIDTH, y - BLOCK_WIDTH, color);
    renderBlock(x, y, color);
    renderBlock(x, y - BLOCK_WIDTH, color);
    break;
  default:
    throw "Error: unknown type of orientation.";
  }
}

function renderTTet(pos, orientation)
{
  var color = "purple";
  var x = pos.x, y = pos.y;
  switch (orientation)
  {
  case 3:
    renderBar3(x, y, color, "horizontal");
    renderBlock(x, y - BLOCK_WIDTH, color);
    break;
  case 1:
    renderBar3(x, y, color, "horizontal");
    renderBlock(x, y + BLOCK_WIDTH, color);
    break;
  case 2:
    renderBar3(x, y, color, "vertical");
    renderBlock(x - BLOCK_WIDTH, y, color);
    break;
  case 0:
    renderBar3(x, y, color, "vertical");
    renderBlock(x + BLOCK_WIDTH, y, color);
    break;
  default:
    throw "Error: unknown type of orientation.";
  }
}

function renderSTet(pos, orientation)
{
  var color = "green";
  var x = pos.x, y = pos.y;
  switch (orientation)
  {
  case 1:
    y += BLOCK_WIDTH;
  case 3:
    renderBar2(x, y, color, "horizontal");
    renderBar2(x + BLOCK_WIDTH, y - BLOCK_WIDTH, color, "horizontal");
    break;
  case 0:
    x += BLOCK_WIDTH;
  case 2:
    renderBar2(x, y + BLOCK_WIDTH, color, "vertical");
    renderBar2(x - BLOCK_WIDTH, y, color, "vertical");
    break;
  default:
    throw "Error: unknown type of orientation.";
  }
}

function renderZTet(pos, orientation)
{
  var color = "red";
  var x = pos.x, y = pos.y;
  switch (orientation)
  {
  case 1:
    y += BLOCK_WIDTH;
  case 3:
    renderBar2(x, y - BLOCK_WIDTH, color, "horizontal");
    renderBar2(x + BLOCK_WIDTH, y, color, "horizontal");
    break;
  case 0:
    x += BLOCK_WIDTH;
  case 2:
    renderBar2(x - BLOCK_WIDTH, y + BLOCK_WIDTH, color, "vertical");
    renderBar2(x, y, color, "vertical");
    break;
  default:
    throw "Error: unknown type of orientation.";
  }
}

function renderJTet(pos, orientation)
{
  var color = "blue";
  var x = pos.x, y = pos.y;
  switch (orientation)
  {
  case 3:
    renderBar3(x, y, color, "horizontal");
    renderBlock(x - BLOCK_WIDTH, y - BLOCK_WIDTH, color);
    break;
  case 1:
    renderBar3(x, y, color, "horizontal");
    renderBlock(x + BLOCK_WIDTH, y + BLOCK_WIDTH, color);
    break;
  case 0:
    renderBar3(x, y, color, "vertical");
    renderBlock(x + BLOCK_WIDTH, y - BLOCK_WIDTH, color);
    break;
  case 2:
    renderBar3(x, y, color, "vertical");
    renderBlock(x - BLOCK_WIDTH, y + BLOCK_WIDTH, color);
    break;
  default:
    throw "Error: unknown type of orientation.";
  }
}

function renderLTet(pos, orientation)
{
  var color = "orange";
  var x = pos.x, y = pos.y;
  switch (orientation)
  {
  case 3:
    renderBar3(x, y, color, "horizontal");
    renderBlock(x + BLOCK_WIDTH, y - BLOCK_WIDTH, color);
    break;
  case 1:
    renderBar3(x, y, color, "horizontal");
    renderBlock(x - BLOCK_WIDTH, y + BLOCK_WIDTH, color);
    break;
  case 2:
    renderBar3(x, y, color, "vertical");
    renderBlock(x - BLOCK_WIDTH, y - BLOCK_WIDTH, color);
    break;
  case 0:
    renderBar3(x, y, color, "vertical");
    renderBlock(x + BLOCK_WIDTH, y + BLOCK_WIDTH, color);
    break;
  default:
    throw "Error: unknown type of orientation.";
  }
}

function renderBar2(x, y, color, direction)
{
  switch (direction)
  {
  case "horizontal":
    renderBlock(x - BLOCK_WIDTH, y, color);
    renderBlock(x, y, color);
    break;
  case "vertical":
    renderBlock(x, y - BLOCK_WIDTH, color);
    renderBlock(x, y, color);
    break;
  default:
    throw "Error: unknown type of direction";
  }
}

function renderBar3(x, y, color, direction)
{
  switch (direction)
  {
  case "horizontal":
    renderBlock(x - BLOCK_WIDTH, y, color);
    renderBlock(x, y, color);
    renderBlock(x + BLOCK_WIDTH, y, color);
    break;
  case "vertical":
    renderBlock(x, y - BLOCK_WIDTH, color);
    renderBlock(x, y, color);
    renderBlock(x, y + BLOCK_WIDTH, color);
    break;
  default:
    throw "Error: unknown type of direction";
  }
}

function renderBlock(x, y, color)
{
  ctx.beginPath();
  ctx.rect(x, y, BLOCK_WIDTH, BLOCK_WIDTH);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokestyle = 'black';
  ctx.stroke();
  ctx.closePath();
}
