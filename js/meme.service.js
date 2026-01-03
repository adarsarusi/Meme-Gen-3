'use strict'

var gImgs = [{ id: 1, url: 'images/meme-imgs (various aspect ratios)/2.jpg', keywords: ['funny', 'cat'] },
            { id: 2, url: 'images/meme-imgs (various aspect ratios)/003.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel'
            ,
            size: 30,
            color: 'white'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function setLineText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getGallery() {
    return gImgs
}

function setImg(id){
    gMeme.selectedImgId = +id
}