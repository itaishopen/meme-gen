'use strict'
var gSearchBy = 'all';
var gCurrentPageId = 0;
const MEMES_KEY = 'my-memes';
const memesInPage = 15;
var gMeme;

function createMemes() {
    var memes = loadFromLocalStorage(MEMES_KEY);
    if (!memes || memes.length === 0) {
        memes = getMemes();
        saveToLocalStorage(MEMES_KEY, memes)
    }
    return memes;
}

function createMeme(name, url, width, height, tags = []) {
    return {
        id: makeId(),
        name: name,
        url: url,
        width: width,
        height: height,
        rate: 1,
        tags: tags
    }
}

function findMemeById(memeId) {
    return getMemes().find(function (meme) {
        return meme.id === memeId;
    });
}

function arrangeMemes() {
    if (gSearchBy === 'all') return getMemes().sort(sortRating);

    var memes = getMemes().filter(function(meme) {
        var res = meme.tags.some((tag) => {
            return (!tag.indexOf(gSearchBy));
        });
        return res;
    });    
    return memes.sort(sortRating);
}

function memesToShow(pageId) {
    var memes = arrangeMemes();
    var fromIdx = pageId * memesInPage;
    return memes.slice(fromIdx, fromIdx + memesInPage)
}

function sortRating(a,b) {
    return b.rate - a.rate;
}

function setSearchPer(searchBy) {
    gSearchBy = searchBy;
}

function getCurrPageId() {
    return gCurrentPageId;
}

function setCurrPageId(pageId) {
    gCurrentPageId = pageId;
    renderGallery(gCurrentPageId);
}

function getNumberOfPages(memes) {
    return Math.ceil(memes.length / memesInPage);
}



