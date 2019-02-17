'use strict'
var gSearchBy = 'all';
var gCurrentPageId = 0;
var isFirstJumble = true;
const MEMES_KEY = 'my-memes';
const memesInPage = 11;

function createMemes() {
    var memes = loadFromLocalStorage(MEMES_KEY);
    if (!memes || memes.length === 0) {
        memes = getMemes();
        saveToLocalStorage(MEMES_KEY, memes)
    }
    return memes;
}

function createMeme(id, name, url, width, height, tags = []) {
    return {
        id: id,
        name: name,
        url: url,
        width: width,
        height: height,
        rate: 0,
        tags: tags
    }
}

function findMemeById(memeId) {
    gCurrentMemes = loadFromLocalStorage(MEMES_KEY);
    return gCurrentMemes.find(function (meme) {
        return meme.id === memeId;
    });
}

function makeJumble(tags) {
    var iterator1 = tags.entries();
    var items = [];
    for (var i = 0; i < 5; i++) {
        let cell = iterator1.next().value
        for (let j = 0; j < +cell[1]; j++) {
            items.push(cell[0])
        }
    }
    return items;
}

function arrangeMemes() {
    let allMemes = loadFromLocalStorage(MEMES_KEY);
    if (gSearchBy === 'all') return allMemes.sort(sortRating);
    var memes = allMemes.filter(function (meme) {
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

function sortRating(a, b) {
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


function createRow(num) {
    switch (num) {
        case 0:
            return {
                id: `${num}`,
                line: '',
                size: 60,
                align: 'center',
                color: '#ffffff',
                stroke: 'black',
                x: (gCanvas.width / 2),
                y: 0,
                isShadow: false,
                font: 'impact',
                isFirst: true
            }
        case 1:
            return {
                id: `${num}`,
                line: '',
                size: 60,
                align: 'center',
                color: '#ffffff',
                stroke: 'black',
                x: (gCanvas.width / 2),
                y: gCanvas.height - 60,
                isShadow: false,
                font: 'impact',
                isFirst: true
            }
        default:
            if ((60 + (60 * (num - 1))) < gCanvas.height) {
                return {
                    id: `${num}`,
                    line: ``,
                    size: 60,
                    align: 'center',
                    color: '#ffffff',
                    stroke: 'black',
                    x: (gCanvas.width / 2) - 30,
                    y: 60 + (60 * (num - 1)),
                    isShadow: false,
                    font: 'impact',
                    isFirst: true
                }
            } else {
                return {
                    id: `${num}`,
                    line: '',
                    size: 60,
                    align: 'center',
                    color: '#ffffff',
                    stroke: 'black',
                    x: (gCanvas.width / 2) - 30,
                    y: gCanvas.height / 2,
                    isShadow: false,
                    font: 'impact',
                    isFirst: true
                }
            }
    }
}
