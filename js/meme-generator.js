var gCanvas, gCtx, gCurrentMeme = {meme: null, rows: []};
var rowNum = 0;

function drawCanvase() {
    gCurrentMeme.meme = loadFromLocalStorage(MEME_KEY);
    if (!gCurrentMeme.meme) return;
    gCanvas = document.getElementById('my-canvas');
    createCanvaseSize()
    gCtx = gCanvas.getContext('2d');
    onAddRow(rowNum++)
    onAddRow(rowNum++)
    renderText()
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
    var img = new Image;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCurrentMeme.meme.width, gCurrentMeme.meme.height , 0, 0, gCanvas.width, gCanvas.height);
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
    img.src = gCurrentMeme.meme.url;

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

function onAddRow(rowId = rowNum++) {
    var row = createRow(rowId);
    gCurrentMeme.rows.push(row);
    var strHTML = `<div row-item row-item${rowId}>
        <input type="text" class="txt txt${rowId}"  value="" onkeyup="onInsertTxt(this)">
        <input class="color color${rowId}" type="color">
    </div>
    `;
    $('.text-container').append(strHTML);
}

function onInsertTxt(elText) {
    var rowIdx = elText.classList[1].slice(-1)
    var txt =  gCurrentMeme.rows.find((row) => {
        return rowIdx === row.id;
    })
    txt.line = elText.value;
    $(`.row-item${rowIdx} input[type="text"]`).val(elText.value)
    renderText()
}