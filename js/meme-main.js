'use strict'
var gCurrentMemes, gJumble;
const MEME_KEY = 'meme';

function init() {
    gCurrentMemes = createMemes();
    var tags = combineTags(gCurrentMemes);
    gJumble = mostRepeatedTags(tags);
    let pageIdx = getCurrPageId();
    renderKeywords()
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

function onClickJumble(searchVal) {
    setSearchPer(searchVal);
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
    var ref = tags.reduce(function(acc, tag) {
        if (!acc.get(tag)) acc.set(tag,0);
        acc.set(tag,+acc.get(tag) + 1);
        return acc;
    },new Map());
    var sorted = new Map([...ref].sort(([k, v], [k2, v2])=> {
        if (v > v2) return -1;
        if (v < v2) return 1;
        return 0; 
      }));
    var iterator1 = sorted.entries();
    var items = new Map();
    for (var i = 0; i < 5; i++) {
        let cell = iterator1.next().value
        items.set(cell[0], cell[1])
    }
    return items;
}

function renderKeywords() {
    var elKeys = document.querySelector('.keywords-container');
    console.log('elKeywordsContainer', elKeys);
    var strHtml = '';
    gJumble.forEach(function(value, key ) {
        // var fontSize = getFontSize(value);
        // console.log('keyyyy', key, 'gKeywordCount[key]', value);
        strHtml += `<a href="#" onclick="onClickJumble('${key}')" style="font-size:${value*2}px";> ${key} </a>`
    });
    elKeys.innerHTML = strHtml;
}

function getFontSize(num) {
    return 5 * num
}