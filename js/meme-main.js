'use strict'
var gCurrentMemes;

function init() {
    gCurrentMemes = createMemes()
}

function renderGallery(pageId) {
    let memes = memesToShow(pageId)
    let strGallerry = memes.map(function (meme) {
        return `
        <div class="card meme meme-item${meme.id}">
            <img class="card-img" src="${meme.url}" onclick="onMemeChose('${meme.id}')">
        </div> 
        `
    });
    
    let leftArrow = '&laquo;';
    let rightArrow = '&raquo;';
    if ($('body').hasClass('rtl')) {
        leftArrow = '&raquo;';
        rightArrow = '&laquo;';
    }
    let pageNumbersStr = `<a onclick="onPageChange(-1)">${leftArrow}</a>`;
    for (let j = 0; j < getNumberOfPages(); j++) {
        pageNumbersStr += `<a id="page-${j + 1}" onclick="selectPage(${j})">${j + 1}</a>`;
    }
    pageNumbersStr += `<a onclick="onPageChange(1)">${rightArrow}</a>`;
    $('.pagination').html(pageNumbersStr);
}