var gCanvas, gCtx, gCurrentMeme;

function drawCanvase() {
    gCurrentMeme = loadFromLocalStorage(MEME_KEY);
    if (!gCurrentMeme) return;
    gCanvas = document.getElementById('my-canvas');
    createCanvaseSize()
    gCtx = gCanvas.getContext('2d');
    var img = new Image;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCurrentMeme.width, gCurrentMeme.height , 0, 0, gCanvas.width, gCanvas.height);
    }
    img.src = gCurrentMeme.url;
}

function createCanvaseSize() {
    if ($('body').width() < 700) {
        gCanvas.width = $('body').width();
        gCanvas.height = (($('body').width() * gCurrentMeme.height) / gCurrentMeme.width);
    } else if (gCurrentMeme.width > 500) {
        console.log(gCurrentMeme.width);
        gCanvas.width = 500;
        gCanvas.height = ((500 * gCurrentMeme.height) / gCurrentMeme.width);
    } else {
        gCanvas.width = gCurrentMeme.width;
        gCanvas.height = gCurrentMeme.height;
    }
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

