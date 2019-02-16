'use strict'
var gCurrentMemes;
const MEME_KEY = 'meme';

function init() {
    gCurrentMemes = createMemes();
    var tags = combineTags(gCurrentMemes);
    var sorted = mostRepeatedTags(tags);
    let pageIdx = getCurrPageId();
    renderGallery(pageIdx);
}

function renderGallery(pageId) {
    let memes = memesToShow(pageId)
    let strGallery = memes.map(function (meme) {
        return `
        <li>
            <div class="hexagon card meme meme-item${meme.id}">
                <img class="card-img" src="${meme.url}" onclick="onMemeChose('${meme.id}')">
            </div>
        </li>
        `
    });
    $('.gallery').html(strGallery.join(''));
    let leftArrow = '&laquo;';
    let rightArrow = '&raquo;';
    if ($('body').hasClass('rtl')) {
        leftArrow = '&raquo;';
        rightArrow = '&laquo;';
    }
    let pageNumbersStr = `<a onclick="onPageChange(-1)">${leftArrow}</a>`;
    for (let j = 0; j < getNumberOfPages(arrangeMemes()); j++) {
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

function onSearchImg(elInputSearch) {
    setSearchPer(elInputSearch.value.trim());
    setCurrPageId(0);
}

function onMemeChose(memeId) {
    var meme = findMemeById(memeId);
    meme.rate += 1;
    saveToLocalStorage(MEME_KEY, meme)
    saveToLocalStorage(MEMES_KEY, gCurrentMemes)
    window.location.assign(`meme-generator.html?${memeId}`);

}

function combineTags(memes) {
    return memes.reduce(function (acc, meme) {
        return acc.concat(meme.tags);
    }, []);
}

function mostRepeatedTags(tags) {
    var ref = tags.reduce(function (acc, tag) {
        if (!acc[tag]) acc[tag] = 0;
        acc[tag]++;
        return acc;
    }, {});
    var sorted = Object.keys(ref).sort(function (a, b) { return ref[b] - ref[a] })
    return sorted;
}