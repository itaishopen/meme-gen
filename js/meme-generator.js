var gCanvas;
var gCtx;
var gCurrentMeme = {
    img: null,
    meme: null,
    rows: []
};
var gImage;
var gSelectedRow;
var rowNum = 0;
var tryRender

function drawCanvase() {
    gCurrentMemes = createMemes();
    var memeId = window.location.search
    if (memeId.substring(0, 1) === '?') memeId = memeId.substring(1);
    if (!memeId) memeId = '61520';
    gCurrentMeme.meme = findMemeById(memeId);
    if (!gCurrentMeme.meme) return;
    gCanvas = document.getElementById('my-canvas');
    $('#my-canvas').bind('contextmenu', function (e) {
        return false;
    });
    $('.lines-container').bind('contextmenu', function (e) {
        return false;
    });
    createCanvaseSize()
    $('.meme-container').css({ 'width': gCanvas.width, 'height': gCanvas.height })
    gCtx = gCanvas.getContext('2d');
    gCurrentMeme.img = new Image;
    gCurrentMeme.img.onload = function () {
        gCtx.drawImage(gCurrentMeme.img, 0, 0, gCurrentMeme.meme.width, gCurrentMeme.meme.height, 0, 0, gCanvas.width, gCanvas.height);
    }
    onAddRow(rowNum++)
    onAddRow(rowNum++)
    gCurrentMeme.img.setAttribute('crossOrigin', 'anonymous');
    gCurrentMeme.img.src = gCurrentMeme.meme.url;
}

function createCanvaseSize() {
    if ($('body').width() < 700) {
        gCanvas.width = $('body').width() - 50;
        gCanvas.height = ((($('body').width() - 50) * gCurrentMeme.meme.height) / gCurrentMeme.meme.width);
        if (gCanvas.height > $('body').height() - 200) {
            $('.more-room').css('display', 'block');
        }
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
    var img = gCurrentMeme.img;
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
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

function onDownload() {
    $('#download')[0].click();
}

function handleDownload() {
    var imgCanvas = document.createElement("canvas");
    imgCanvas.width = gCanvas.width;
    imgCanvas.height = gCanvas.height;
    var destCtx = imgCanvas.getContext('2d');
    destCtx.drawImage(gCanvas, 0, 0)
    var img = imgCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    $('footer #download').attr('download', `${gCurrentMeme.meme.name}.png`);
    $('footer #download').attr('href', img);
}

function onAddRow(rowId = rowNum++) {
    var row = createRow(rowId);
    gCurrentMeme.rows.push(row);

    let strHTML = `
    <input type="text" ontouchmove="dragTouch(this)" onmouseover="onRowDrag(this)" onkeyup="onInsertTxt(this)"
    class="row row${rowId}" style="top:${row.y}px; left: 0px; ;text-align: ${row.align}; max-width: ${gCanvas.width}px;" 
    placeholder="row #${rowId + 1}">
    `
    $('.lines-container').append(strHTML);
}

function onInsertTxt(elInputText) {
    var rowIdx = elInputText.classList[1].replace(/^\D+/g, '');
    var row = findRowByIdx(rowIdx);
    row.line = elInputText.value;
    gSelectedRow = row;
    // $(`.row${rowIdx}`).val(elInputText.value);
    renderText()
}

function dragTouch(elRow) {
    var row = findRowByIdx(elRow.classList[1].replace(/^\D+/g, ''));
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    gSelectedRow = row;
    elRow.setAttribute('draggable', "true");

    pos3 = event.touches[0].pageX;
    pos4 = event.touches[0].pageY;

    pos1 = pos3 - getOffsetLeft(gCanvas);
    pos2 = pos4 - getOffsetTop(gCanvas);

    pos3 = event.touches[0].pageX;
    pos4 = event.touches[0].pageY;

    elRow.style.left = (pos1 - (gCanvas.width / 2)) + "px";
    elRow.style.top = (pos2 - (row.size / 2)) + "px";
    row.x = pos1;
    row.y = pos2 + (row.size / 2);
    renderText()
}

function getOffsetLeft(elem) {
    var offsetLeft = 0;
    do {
        if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
        }
    } while (elem = elem.offsetParent);
    return offsetLeft;
}
function getOffsetTop(elem) {
    var offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while (elem = elem.offsetParent);
    return offsetTop;
}

function onRowDrag(elRow) {
    var row = findRowByIdx(elRow.classList[1].replace(/^\D+/g, ''))
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elRow.onclick = openContenteditable
    elRow.onmousedown = dragMouseDown;

    function dragMouseDown(ev) {
        gSelectedRow = row;
        elRow.setAttribute('draggable', "true");
        // get the mouse cursor position at startup:
        pos3 = ev.offsetLeft;
        pos4 = ev.offsetTop;
        if (row.isFirst) {
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
        row.x = elRow.offsetLeft - pos1 + (gCanvas.width / 2);
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

function onDeleteRow() {
    if (!gSelectedRow) return;
    var rowIdx = findRowId(gSelectedRow.id);
    gCurrentMeme.rows.splice(rowIdx, 1);
    $(`.row${gSelectedRow.id}`).remove();
    renderText();
}

function onChangeSize(changeSize) {
    if (!gSelectedRow) return;
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

function onOpenColorPalette() {
    if (!gSelectedRow) return;
    $('.control-color-btn')[0].click();
}

function onColorChanged() {
    if (!gSelectedRow) return;
    gSelectedRow.color = $('.control-color-btn').val();
    renderText();
}

function onChangeFont(elFontBtn) {
    var fontFamily = elFontBtn.classList[1];
    switch (fontFamily) {
        case 'impact':
            gSelectedRow.font = fontFamily;
            break;
        case 'lobster':
            gSelectedRow.font = fontFamily;
            break;
        case 'oswald':
            gSelectedRow.font = fontFamily;
            break;
        case 'coiny':
            gSelectedRow.font = fontFamily;
            break;
        default:
            break;
    }
    renderText();
    setTimeout(renderText, 5)
    closeModal();
}

function openModal() {
    if (!gSelectedRow) return;
    $('.fontModal').removeClass('hide');
}

function closeModal() {
    $('.fontModal').addClass('hide');
    clearModal();
}

function clearModal() {
    $('.fontSelect').prop('selectedIndex',0);
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

