var gCanvas;
var gCtx;
var gCurrentMeme = { 
    meme: null, 
    rows: [] 
};
var gSelectedRow;
var rowNum = 0;

function drawCanvase() {
    var memeId = window.location.search
    if (memeId.substring(0, 1) === '?') memeId = memeId.substring(1);
    if (!memeId) memeId = '61520';
    gCurrentMeme.meme = findMemeById(memeId);
    if (!gCurrentMeme.meme) return;
    gCanvas = document.getElementById('my-canvas');
    $('#my-canvas').bind('contextmenu', function(e){
        return false;
    });
    $('.lines-container').bind('contextmenu', function(e){
        return false;
    });
    createCanvaseSize()
    $('.meme-container').css({'width': gCanvas.width, 'height': gCanvas.height})
    gCtx = gCanvas.getContext('2d');
    var img = new Image;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCurrentMeme.meme.width, gCurrentMeme.meme.height, 0, 0, gCanvas.width, gCanvas.height);
    }
    onAddRow(rowNum++)
    onAddRow(rowNum++)
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = gCurrentMeme.meme.url;
}

function createCanvaseSize() {
    if ($('body').width() < 700) {
        gCanvas.width = $('body').width() - 50;
        gCanvas.height = ((($('body').width() - 50) * gCurrentMeme.meme.height) / gCurrentMeme.meme.width);
    } else {
        
        if (gCurrentMeme.meme.width > 500) {
            gCanvas.width = 500;
            gCanvas.height = ((500 * gCurrentMeme.meme.height) / gCurrentMeme.meme.width);
        } else {
            gCanvas.width = gCurrentMeme.meme.width;
            gCanvas.height = gCurrentMeme.meme.height;
        }
    }
}

function renderText() {
    var img = new Image;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCurrentMeme.meme.width, gCurrentMeme.meme.height, 0, 0, gCanvas.width, gCanvas.height);
        var rows = gCurrentMeme.rows;
        rows.forEach(function renderLine(row) {
            gCtx.font = row.size + 'px ' + row.font;
            gCtx.shadowColor = "black";
            (row.isShadow) ? gCtx.shadowBlur = 15 : gCtx.shadowBlur = 0;
            gCtx.fillStyle = row.color;
            gCtx.textAlign = row.align;
            textLength = (row.line.length * row.size) / 2;
            gCtx.lineJoin = 'round';
            gCtx.lineWidth = row.size / 5;
            gCtx.strokeText(row.line, row.x, row.y);
            gCtx.fillText(row.line, row.x, row.y);
        })
    }
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = gCurrentMeme.meme.url;
}

function handleDownload() {
    var imgCanvas = document.createElement("canvas");
    imgCanvas.width = gCanvas.width;
    imgCanvas.height = gCanvas.height;
    var destCtx = imgCanvas.getContext('2d');
    destCtx.drawImage(gCanvas, 0, 0)
    var img = imgCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    $('#download').attr('download', `${gCurrentMeme.meme.name}.png`);
    $('#download').attr('href', img);
}

function onAddRow(rowId = rowNum++) {
    var row = createRow(rowId);
    gCurrentMeme.rows.push(row);
    
    let strHTML = `
    <input type="text" onmouseover="onRowDrag(this)" onkeyup="onInsertTxt(this)"
    class="row row${rowId}" style="top:${row.y}px; left: 0px; ;text-align: ${row.align}; max-width: ${gCanvas.width}px;" 
    placeholder="row #${rowId + 1}">
    `
    document.querySelector('.lines-container').innerHTML += strHTML;
}

function onInsertTxt(elInputText) {
    var rowIdx = elInputText.classList[1].replace(/^\D+/g, '');
    var row = findRowByIdx(rowIdx);
    row.line = elInputText.value;
    gSelectedRow = row;
    // $(`.row${rowIdx}`).val(elInputText.value);
    renderText()
}

function onRowDrag(elRow) {    
    var row = findRowByIdx(elRow.classList[1].replace(/^\D+/g, ''))
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elRow.onclick = openContenteditable
    elRow.onmousedown = dragMouseDown;

    function dragMouseDown(ev) {
        // ev = ev || window.event;
        // ev.preventDefault();
        gSelectedRow = row;
        elRow.setAttribute('draggable', "true");
        // get the mouse cursor position at startup:
        pos3 = ev.offsetLeft;
        pos4 = ev.offsetTop;
        if(row.isFirst) {
            row.x += (row.size / 5);
            row.y += row.size - 5;
            row.isFirst = false;
        }
        renderText()
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(ev) {
        ev = ev || window.event;
        ev.preventDefault();
        elRow.setAttribute('contenteditable', "false");
        // calculate the new cursor position:
        pos1 = pos3 - ev.clientX;
        pos2 = pos4 - ev.clientY;
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        // set the element's new position:
        elRow.style.left = (elRow.offsetLeft - pos1) + "px";
        elRow.style.top = (elRow.offsetTop - pos2) + "px";
        // console.log(elRow.offsetLeft, pos1, pos2, row.x, row.y)
        row.x =  elRow.offsetLeft - pos1 + (gCanvas.width / 2);
        row.y = elRow.offsetTop - pos2 + row.size - 5;
        renderText()
    }

    function openContenteditable() {
        elRow.setAttribute('contenteditable', "true");
    }

    function closeDragElement() {
        elRow.setAttribute('draggable', "false");
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


function renderTools(row) {
    var rowId = row.id;
    return `<div class="row-item row-item${rowId}">
    <input class="color color${rowId}" type="color" value="${row.color}" onchange="onColorChanged(this)">
        <button class="up up${rowId}" onclick="onTxtMove(this)"><i class="fas fa-arrow-up"></i></button>
        <button class="down down${rowId}" onclick="onTxtMove(this)"><i class="fas fa-arrow-down"></i></button>
        <button class="right right${rowId}" onclick="onTxtMove(this)"><i class="fas fa-arrow-right"></i></button>
        <button class="left left${rowId}" onclick="onTxtMove(this)"><i class="fas fa-arrow-left"></i></button>
        <button class="larger larger${rowId}" onclick="onChangeSize(this)"><i class="fas fa-plus"></i></button>
        <button class="smaller smaller${rowId}" onclick="onChangeSize(this)"><i class="fas fa-minus"></i></button>
        <button class="align-left align-left${rowId}" onclick="onChangeAlign(this, 'right')"><i class="fas fa-align-left"></i></button>
        <button class="align-center align-center${rowId}" onclick="onChangeAlign(this, 'center')"><i class="fas fa-align-justify"></i></button>
        <button class="align-right align-right${rowId}" onclick="onChangeAlign(this, 'left')"><i class="fas fa-align-right"></i></button>
        <button class="delete delete${rowId}" onclick="onDeleteRow(this)"><i class="fas fa-trash-alt fa-lg"></i></button>
</div>
`;
}

function onDeleteRow(elDeleteBtn) {
    var rowIdx = elDeleteBtn.classList[1].replace(/^\D+/g, '');
    var rowId = findRowId(rowIdx)
    gCurrentMeme.rows.splice(rowId, 1);
    $(`.row${rowIdx}`).remove();
    renderText();
}

function onChangeAlign(elAlign, direction) {
    var rowIdx = elAlign.classList[1].replace(/^\D+/g, '');
    var row = findRowByIdx(rowIdx);
    row.align = direction;
    renderText();
}

function addFontSize() {
    $('.changeFontSize').addClass('hide');
    $('.fontSizing').removeClass('hide');
}

function hideFontSize() {
    $('.fontSizing').addClass('hide');
    $('.changeFontSize').removeClass('hide');
}

function onChangeSize(changeSize) {
    switch (changeSize) {
        case 'larger':
            if (gSelectedRow.size > 120) return;
            gSelectedRow.size = gSelectedRow.size + 5;
            break;
        case 'smaller':
            if (gSelectedRow.size < 6) return;
            gSelectedRow.size -= 5;
            break;
        default:
            break;
    }
    renderText();
}

function onTxtMove(elBtnMove) {
    var direction = elBtnMove.classList[0];
    var rowIdx = elBtnMove.classList[1].slice(-1);
    var row = findRowByIdx(rowIdx);
    switch (direction) {
        case 'up':
            row.y = row.y - 10;
            break;
        case 'down':
            row.y = row.y + 10;
            break;
        case 'right':
            row.x = row.x + 10;
            break;
        case 'left':
            row.x = row.x - 10;
            break;
        default:
            break;
    }
    renderText();
}

function onOpenColorPalette() {
    $('.control-color-btn')[0].click();
}

function onColorChanged() {
    gSelectedRow.color = $('.control-color-btn').val();
    renderText();
}

function canvasClicked(ev) {
    var clickedRow = gCurrentMeme.rows.find((row) => {
        return (
            ev.offsetX > row.x - 50 &&
            ev.offsetX < row.x + 50 &&
            ev.offsetY > (row.y - row.size) &&
            ev.offsetY < row.y
        )
    })

    if (clickedRow) openModal(ev, clickedRow)
    else closeModal()
}

function findRowByIdx(rowIdx) {
    return gCurrentMeme.rows.find((currRow) => {
        return rowIdx === currRow.id;
    });
}

function findRowId(rowId) {
    return gCurrentMeme.rows.findIndex((currRow) => {
        return rowId === currRow.id;
    });
}