const BLOCK_SIZE = 20;
const COL_NUM = 10;
const ROW_NUM = 20;

var TYPE = 
{
  I : 0,
  O : 1,
  T : 2,
  S : 3,
  Z : 4,
  J : 5,
  L : 6
};

var STATE = 
{
  EAST  : 0,
  SOUTH : 1,
  WEST  : 2,
  NORTH : 3
};

var COLOR = new Array("cyan", "yellow", "purple", "green", "red", "blue", "orange");

var canvas = null;
var ctx = null;
var board = null;
var tet = null;

var leftKey = false;
var rightKey = false;
var upKey = false;
var downKey = false;

window.onload = function() {
  Game.init();
  Game.start();
  Game.run();
};

function onKeyDownHandler(evt)
{
  switch (evt.keyCode)
  {
    case 37:
      leftKey= true;
      break;
    case 38:
      upKey = true;
      break;
    case 39:
      rightKey = true;
      break;
    case 40:
      downKey= true;
      break;
  }
}

function onKeyUpHandler(evt)
{
  switch (evt.keyCode)
  {
    case 37:
      leftKey= false;
      break;
    case 38:
      upKey = false;
      break;
    case 39:
      rightKey = false;
      break;
    case 40:
      downKey= false;
      break;
  }
}

Game = {
  init: function()
  {
    canvas = $("canvas");
    ctx = canvas.getContext("2d");

    // register key handlers
    document.onkeydown = onKeyDownHandler;
    document.onkeyup = onKeyUpHandler;

    // init board
    board = new Array(ROW_NUM);
    for (var i = 0; i < ROW_NUM; i++)
    {
      board[i] = new Array(COL_NUM);
      for (var j = 0; j < COL_NUM; j++)
      {
        board[i][j] = -1;
      }
    }

    tet = 
    {
      pos : {x : 0, y : 0},
      type : -1,
      orientation: -1,
    };
  },

  start : function()
  {
    generateNextTet();  
    renderTetromino(tet.type, tet.pos, tet.orientation);
  },

  run : function()
  {
    // update
    if (isHitBottom())
    {
      generateNextTet();  
    }

    if (leftKey)
    {
      if (tet.pos.x > 0)
      {
        tet.pos.x -= BLOCK_SIZE;
      }
    }
    else if (rightKey)
    {
      if (tet.pos.x < canvas.width)
      {
        tet.pos.x += BLOCK_SIZE;
      }
    }
    else if (upKey)
    {
      tet.orientation = (tet.orientation + 1) % 4;
    }
    else if (tet.pos.y < canvas.height)
    {
      tet.pos.y += BLOCK_SIZE;
    }

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw
    renderBoard(board);
    renderTetromino(tet.type, tet.pos, tet.orientation);

    // request new frame
    window.setTimeout(Game.run, 1000 / 2);
  },

  end : function()
  {
  }
};

function isHitBottom()
{
  return false;
}

function generateNextTet()
{
  tet.type = Math.floor(Math.random() * 7);
  tet.orientation = Math.floor(Math.random() * 4);

  switch (tet.type)
  {
  case TYPE.I:
  case TYPE.O:
    tet.pos = {x : COL_NUM * BLOCK_SIZE / 2, y : 0};
    break;
  case TYPE.T:
  case TYPE.S:
  case TYPE.Z:
  case TYPE.J:
  case TYPE.L:
    tet.pos = {x : (COL_NUM / 2 - 1) * BLOCK_SIZE, y : 0};
    break;
  }
}

function renderBoard(board)
{
  for (var i = ROW_NUM - 1; i >= 0; i--)
  {
    for (var j = 0; j < COL_NUM; j++)
    {
      if (board[i][j] != -1)
      {
        renderBlock(i * BLOCK_SIZE, j, COLOR[board[i][j]]);
      }
    }
  }
}

function renderTetromino(type, pos, orientation)
{
  switch (type)
  {
  case TYPE.I:
    renderITet(pos, orientation);
    break;
  case TYPE.O:
    renderOTet(pos, orientation);
    break;
  case TYPE.T:
    renderTTet(pos, orientation);
    break;
  case TYPE.S:
    renderSTet(pos, orientation);
    break;
  case TYPE.Z:
    renderZTet(pos, orientation);
    break;
  case TYPE.J:
    renderJTet(pos, orientation);
    break;
  case TYPE.L:
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
    y -= BLOCK_SIZE;
  case 1:
    renderBlock(x - 2 * BLOCK_SIZE, y, color);
    renderBlock(x - BLOCK_SIZE, y, color);
    renderBlock(x, y, color);
    renderBlock(x + BLOCK_SIZE, y, color);
    break;
  case 2:
    x -= BLOCK_SIZE;
  case 0:
    renderBlock(x, y - 2 * BLOCK_SIZE, color);
    renderBlock(x, y - BLOCK_SIZE), color;
    renderBlock(x, y, color);
    renderBlock(x, y + BLOCK_SIZE, color);
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
    renderBlock(x - BLOCK_SIZE, y, color);
    renderBlock(x - BLOCK_SIZE, y - BLOCK_SIZE, color);
    renderBlock(x, y, color);
    renderBlock(x, y - BLOCK_SIZE, color);
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
    renderBlock(x, y - BLOCK_SIZE, color);
    break;
  case 1:
    renderBar3(x, y, color, "horizontal");
    renderBlock(x, y + BLOCK_SIZE, color);
    break;
  case 2:
    renderBar3(x, y, color, "vertical");
    renderBlock(x - BLOCK_SIZE, y, color);
    break;
  case 0:
    renderBar3(x, y, color, "vertical");
    renderBlock(x + BLOCK_SIZE, y, color);
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
    y += BLOCK_SIZE;
  case 3:
    renderBar2(x, y, color, "horizontal");
    renderBar2(x + BLOCK_SIZE, y - BLOCK_SIZE, color, "horizontal");
    break;
  case 0:
    x += BLOCK_SIZE;
  case 2:
    renderBar2(x, y + BLOCK_SIZE, color, "vertical");
    renderBar2(x - BLOCK_SIZE, y, color, "vertical");
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
    y += BLOCK_SIZE;
  case 3:
    renderBar2(x, y - BLOCK_SIZE, color, "horizontal");
    renderBar2(x + BLOCK_SIZE, y, color, "horizontal");
    break;
  case 0:
    x += BLOCK_SIZE;
  case 2:
    renderBar2(x - BLOCK_SIZE, y + BLOCK_SIZE, color, "vertical");
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
    renderBlock(x - BLOCK_SIZE, y - BLOCK_SIZE, color);
    break;
  case 1:
    renderBar3(x, y, color, "horizontal");
    renderBlock(x + BLOCK_SIZE, y + BLOCK_SIZE, color);
    break;
  case 0:
    renderBar3(x, y, color, "vertical");
    renderBlock(x + BLOCK_SIZE, y - BLOCK_SIZE, color);
    break;
  case 2:
    renderBar3(x, y, color, "vertical");
    renderBlock(x - BLOCK_SIZE, y + BLOCK_SIZE, color);
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
    renderBlock(x + BLOCK_SIZE, y - BLOCK_SIZE, color);
    break;
  case 1:
    renderBar3(x, y, color, "horizontal");
    renderBlock(x - BLOCK_SIZE, y + BLOCK_SIZE, color);
    break;
  case 2:
    renderBar3(x, y, color, "vertical");
    renderBlock(x - BLOCK_SIZE, y - BLOCK_SIZE, color);
    break;
  case 0:
    renderBar3(x, y, color, "vertical");
    renderBlock(x + BLOCK_SIZE, y + BLOCK_SIZE, color);
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
    renderBlock(x - BLOCK_SIZE, y, color);
    renderBlock(x, y, color);
    break;
  case "vertical":
    renderBlock(x, y - BLOCK_SIZE, color);
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
    renderBlock(x - BLOCK_SIZE, y, color);
    renderBlock(x, y, color);
    renderBlock(x + BLOCK_SIZE, y, color);
    break;
  case "vertical":
    renderBlock(x, y - BLOCK_SIZE, color);
    renderBlock(x, y, color);
    renderBlock(x, y + BLOCK_SIZE, color);
    break;
  default:
    throw "Error: unknown type of direction";
  }
}

function renderBlock(x, y, color)
{
  ctx.beginPath();
  ctx.rect(x, y, BLOCK_SIZE, BLOCK_SIZE);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokestyle = 'black';
  ctx.stroke();
  ctx.closePath();
}
