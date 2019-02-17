'use strict'
var gCurrentMemes, gJumble, gJumbleInput, isFirstJumble = true;
const JUMBLE_KEY = 'meme';

function init() {
    gCurrentMemes = createMemes();
    gJumbleInput = loadFromLocalStorage(JUMBLE_KEY)
    if (!gJumbleInput || gJumbleInput.length === 0) {
        var tags = combineTags(gCurrentMemes);
        var firstJumble = mostRepeatedTags(tags);
        gJumbleInput = makeJumble(firstJumble);
        saveToLocalStorage(JUMBLE_KEY, gJumbleInput);
    }
    gJumble = mostRepeatedTags(gJumbleInput);
    let pageIdx = getCurrPageId();
    renderKeywords()
    renderGallery(pageIdx);
}

function renderGallery(pageId) {
    let strUpload = `
        <li>
        <div class="hexagon card" onclick="openModal()">
            <i class="fas fa-file-upload"></i>
            <p>Upload image</p>
        </div>
        </li>`
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
    $('.gallery').html(strUpload + strGallery.join(''));


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
    let searchVal = $('.search-input').val();
    if (searchVal) {
        gJumbleInput.push(searchVal.trim())
        saveToLocalStorage(JUMBLE_KEY, gJumbleInput);
    }
    var meme = findMemeById(memeId);
    meme.rate += 1;
    saveToLocalStorage(MEMES_KEY, gCurrentMemes);
    window.location.assign(`meme-generator.html?${memeId}`);

}

function combineTags(memes) {
    return memes.reduce(function (acc, meme) {
        return acc.concat(meme.tags);
    }, []);
}

function mostRepeatedTags(tags) {
    var ref = tags.reduce(function (acc, tag) {
        if (!acc.get(tag)) acc.set(tag, 0);
        acc.set(tag, +acc.get(tag) + 1);
        return acc;
    }, new Map());
    var sorted = new Map([...ref].sort(([k, v], [k2, v2]) => {
        if (v > v2) return -1;
        if (v < v2) return 1;
        return 0;
    }));
    var iterator1 = sorted.entries();
    var items = new Map;
    for (var i = 0; i < 5; i++) {
        let cell = iterator1.next().value;
        items.set(cell[0], cell[1])
    }
    return items;
}

function renderKeywords() {
    var elKeys = document.querySelector('.keywords-container');
    var strHtml = '';
    gJumble.forEach(function (value, key) {
        strHtml += `<a href="#" onclick="onClickJumble('${key}')" style="font-size:${value * 2}px";> ${key} </a>`
    });
    elKeys.innerHTML = strHtml;
}

function getFontSize(num) {
    return 5 * num
}

function onFileLoad() {
    let $elFile = $('#image_uploads');
    let file = $elFile[0].files[0];
    let reader = new FileReader();

    reader.addEventListener("load", function () {
        let memeId = makeId();
        let memeName = `user${memeId}`;
        let memeWidth;
        let memeHeight;
        let img = new Image;
        img.onload = function () {
            memeWidth = img.width;
            memeHeight = img.height;
            let meme = createMeme(memeId, memeName, reader.result, memeWidth, memeHeight, ['user upload'])
            addMeme(meme)
            onMemeChose(memeId)
        }
        img.src = reader.result;
    }, false);

    if (file) reader.readAsDataURL(file);
}

function onUrlLoad() {


}

function openModal() {
    $('.uploadModal').removeClass('hide');
}

function closeModal() {
    $('.uploadModal').addClass('hide');
}