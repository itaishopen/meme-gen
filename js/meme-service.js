'use strict'
var gSearchBy = 'all';
var gCurrentPage = 0;
const MEME_KEY = 'my-memes';
const memesInPage = 12;

function createMemes() {
    var memes = loadFromLocalStorage(MEME_KEY);
    if (!memes || memes.length === 0) {
        memes = getMemes();
        saveToLocalStorage(MEME_KEY, memes)
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
    var memes = getMemes().map(function(meme) {
        return meme.tags(gSearchBy);
    });
    return memes.sort(sortRating);
}

function memesToShow() {
    var memes = arrangeMemes();
    var fromIdx = gCurrentPage * memesInPage;
    return memes.slice(fromIdx, fromIdx + memesInPage)
}

function sortRating(a,b) {
    return b.rate - a.rate;
}

function setSearchPer(searchBy) {
    gSearchBy = searchBy;
}
