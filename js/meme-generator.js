var gCanvas;
var gCtx;
var gCurrentMeme = { meme: null, rows: [] };
var rowNum = 0;
var gCurrRow;

function drawCanvase() {
    gCurrentMeme.meme = loadFromLocalStorage(MEME_KEY);
    if (!gCurrentMeme.meme) return;
    gCanvas = document.getElementById('my-canvas');
    createCanvaseSize()
    gCtx = gCanvas.getContext('2d');
    var img = new Image;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCurrentMeme.meme.width, gCurrentMeme.meme.height, 0, 0, gCanvas.width, gCanvas.height);
    }
    onAddRow(rowNum++)
    onAddRow(rowNum++)
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

// function renderText() {
//     var rows = gCurrentMeme.rows;
//     rows.forEach(function renderLine(row) {
//         gCtx.font = row.size + 'px ' + row.font;
//         gCtx.shadowColor = "black";
//         (row.isShadow) ? gCtx.shadowBlur = 15 : gCtx.shadowBlur = 0;
//         gCtx.fillStyle = row.color;
//         gCtx.textAlign = row.align;
//         textLength = (row.line.length * row.size) / 2;
//         gCtx.lineJoin = 'round';
//         gCtx.lineWidth = row.size / 5;
//         gCtx.strokeText(row.line, row.x, row.y);
//         gCtx.fillText(row.line, row.x, row.y);
//     })
// }

function handleDownload() {
    var imgCanvas = document.createElement("canvas");
    imgCanvas.width = gCurrentMeme.width;
    imgCanvas.height = gCurrentMeme.height;
    var destCtx = imgCanvas.getContext('2d');
    destCtx.drawImage(gCanvas, 0, 0);
    var img = imgCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    $('#download').attr('href', img);
}

function handlePost(elForm, ev) {
    ev.preventDefault();
    $('#imgData').val(gCanvas.toDataURL("image/jpeg"));
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        $('.share-container').html = `
        <a class="w-inline-block social-share-btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.text()
        })
        .then(onSuccess)
        .catch(function (error) {
            console.error(error)
        })
}

function onAddRow(rowId = rowNum++) {
    var row = createRow(rowId);
    gCurrentMeme.rows.push(row);
    
    let strHTML = `
    <div contenteditable="true" draggable="true" onmousemove="onRowDrag(this)"
        class="row row${rowId}" style="top: ${row.x}; left: ${row.y}">
        ${row.line}
    </div>`
    document.querySelector('.lines-container').innerHTML += strHTML;
}
// function onAddRow(rowId = rowNum++) {
//     var row = createRow(rowId);
//     gCurrentMeme.rows.push(row);
//     var strHTML = `<div class="row-item row-item${rowId}">
//         <input type="text" class="txt txt${rowId}" value="" onkeyup="onInsertTxt(this)">
//         <input class="color color${rowId}" type="color" value="${row.color}" onchange="onColorChanged(this)">
//         <button class="up up${rowId}" onclick="onTxtMove(this)"><i class="fas fa-arrow-up"></i></button>
//         <button class="down down${rowId}" onclick="onTxtMove(this)"><i class="fas fa-arrow-down"></i></button>
//         <button class="right right${rowId}" onclick="onTxtMove(this)"><i class="fas fa-arrow-right"></i></button>
//         <button class="left left${rowId}" onclick="onTxtMove(this)"><i class="fas fa-arrow-left"></i></button>
//         <button class="larger larger${rowId}" onclick="onChangeSize(this)"><i class="fas fa-plus"></i></button>
//         <button class="smaller smaller${rowId}" onclick="onChangeSize(this)"><i class="fas fa-minus"></i></button>
//         <button class="align-left align-left${rowId}" onclick="onChangeAlign(this, 'right')"><i class="fas fa-align-left"></i></button>
//         <button class="align-center align-center${rowId}" onclick="onChangeAlign(this, 'center')"><i class="fas fa-align-justify"></i></button>
//         <button class="align-right align-right${rowId}" onclick="onChangeAlign(this, 'left')"><i class="fas fa-align-right"></i></button>
//         <button class="delete delete${rowId}" onclick="onDeleteRow(this)"><i class="fas fa-trash-alt fa-lg"></i></button>
//     </div>
//     `;
//     $('.text-container').append(strHTML);
// }

function onRowDrag(elRow) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elRow.onmousedown = dragMouseDown;

    function dragMouseDown(ev) {
        ev = ev || window.event;
        ev.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(ev) {
        ev = ev || window.event;
        ev.preventDefault();

        // calculate the new cursor position:
        pos1 = pos3 - ev.clientX;
        pos2 = pos4 - ev.clientY;
        pos3 = ev.clientX;
        pos4 = ev.clientY;

        // set the element's new position:
        elRow.style.top = (elRow.offsetTop - pos2) + "px";
        elRow.style.left = (elRow.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
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
    $(`.row-item${rowIdx}`).remove();
    renderText();
}

function onChangeAlign(elAlign, direction) {
    var rowIdx = elAlign.classList[1].replace(/^\D+/g, '');
    var row = findRowByIdx(rowIdx);
    row.align = direction;
    renderText();
}

function onChangeSize(elBtnSize) {
    var rowIdx = elBtnSize.classList[1].replace(/^\D+/g, '');
    var row = findRowByIdx(rowIdx);

    switch (elBtnSize.classList[0]) {
        case 'larger':
            if (row.size > 120) return;
            row.size = row.size + 5;
            break;
        case 'smaller':
            if (row.size < 6) return;
            row.size -= 5;
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

function onInsertTxt(elInputText) {
    var rowIdx = elInputText.classList[1].replace(/^\D+/g, '');
    var row = findRowByIdx(rowIdx);
    row.line = elInputText.value;
    $(`.row-item${rowIdx} input[type="text"]`).val(elInputText.value);
    renderText()
}

function onColorChanged(elInputColor) {
    var rowIdx = elInputColor.classList[1].replace(/^\D+/g, '');
    var row = findRowByIdx(rowIdx);
    row.color = elInputColor.value;
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

function openModal(ev, row) {
    var modal = document.querySelector('.modal');
    modal.classList.add('d-block');
    document.querySelector('.modal').innerHTML = renderTools(row);
    modal.style.top = ev.clientY + 'px';
    modal.style.left = ev.clientX + 'px';
}
function closeModal() {
    document.querySelector('.modal').classList.remove('d-block')
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