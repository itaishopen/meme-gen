'use strict'
var gCurrentMemes;
const MEME_KEY = 'meme';

function init() {
    gCurrentMemes = createMemes();
    let pageIdx = getCurrPageId();
    renderGallery(pageIdx);
}

function renderGallery(pageId) {
    let memes = memesToShow(pageId)
    let strGallery = memes.map(function (meme) {
        return `
        <div class="card meme meme-item${meme.id}">
            <img class="card-img" src="${meme.url}" onclick="onMemeChose('${meme.id}')">
        </div> 
        `
    });
    $('.gallery-container').html(strGallery.join(''));
    let leftArrow = '&laquo;';
    let rightArrow = '&raquo;';
    if ($('body').hasClass('rtl')) {
        leftArrow = '&raquo;';
        rightArrow = '&laquo;';
    }
    let pageNumbersStr = `<a onclick="onPageChange(-1)">${leftArrow}</a>`;
    for (let j = 0; j < getNumberOfPages(gCurrentMemes); j++) {
        pageNumbersStr += `<a id="page-${j + 1}" onclick="setCurrPageId(${j})">${j + 1}</a>`;
    }
    pageNumbersStr += `<a onclick="onPageChange(1)">${rightArrow}</a>`;
    $('.pagination').html(pageNumbersStr);
    $(`#page-${+pageId + 1}`).addClass('active');
}

function onPageChange(num) {
    let pageId = getCurrPageId() + num;
    if (pageId < getNumberOfPages(gCurrentMemes) && pageId >= 0) {
        setCurrPageId(pageId);
    }
}

function onMemeChose(memeId) {
    var meme = findMemeById(memeId);
    meme.rate += 1;
    saveToLocalStorage(MEME_KEY, meme)    
    saveToLocalStorage(MEMES_KEY, gCurrentMemes)
    window.location.assign('meme-generator.html');
    drawCanvase();
}