var gCanvas, gCtx, gCurrentMeme = {meme: null, rows: [
    {
        line: 'world',
        size: 60,
        align: 'center',
        color: 'black',
        x: 250,
        y: 50,
        isShadow: false,
        font: 'eurofbold',
    },
    {
        line: 'hello',
        size: 60,
        align: 'center',
        color: 'black',
        x: 250,
        y: 333,
        isShadow: false,
        font: 'Calibri',
    },
]};

function drawCanvase() {
    gCurrentMeme.meme = loadFromLocalStorage(MEME_KEY);
    if (!gCurrentMeme.meme) return;
    gCanvas = document.getElementById('my-canvas');
    createCanvaseSize()
    gCtx = gCanvas.getContext('2d');
    var img = new Image;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCurrentMeme.meme.width, gCurrentMeme.meme.height , 0, 0, gCanvas.width, gCanvas.height);
        renderText()
    }
    img.src = gCurrentMeme.meme.url;
}

function createCanvaseSize() {
    if ($('body').width() < 700) {
        gCanvas.width = $('meme-container').width();
        gCanvas.height = (($('meme-container').width() * gCurrentMeme.meme.height) / gCurrentMeme.meme.width);
    } else if (gCurrentMeme.meme.width > 500) {
        gCanvas.width = 500;
        gCanvas.height = ((500 * gCurrentMeme.meme.height) / gCurrentMeme.meme.width);
    } else {
        gCanvas.width = gCurrentMeme.meme.width;
        gCanvas.height = gCurrentMeme.meme.height;
    }
}

function renderText() {
    var rows = gCurrentMeme.rows;
    rows.forEach(function renderLine(row) {
        gCtx.font = row.size + 'px ' + row.font;
        gCtx.shadowColor = "black";
        (row.isShadow) ? gCtx.shadowBlur = 15 : gCtx.shadowBlur = 0;
        gCtx.fillStyle = row.color;
        gCtx.textAlign = row.align;
        textLength = (row.line.length * row.size) / 2;
        gCtx.fillText(row.line, row.x, row.y);
    })

}

function handleDownload() {
    var imgCanvas = document.createElement("canvas");
   imgCanvas.width = gCurrentMeme.width;
   imgCanvas.height = gCurrentMeme.height;
   var destCtx = imgCanvas.getContext('2d');
   destCtx.drawImage(gCanvas, 0, 0);
   var img = imgCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
   $('#download').attr('href', img);
}

function handleAddLine() {
    var row = {
        line: '',
        size: 20,
        align: 'left',
        color: 'black',
        isShadow: false,
        x: 250,
        y: 400,
        font: 'Calibri',
    }
    gCurrentMeme.rows.push(row);
}

function onColorChanged(elColorInput) {
    var classList = elColorInput.classList[1].slice(-1);
    console.log(classList);
    
}