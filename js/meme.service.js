'use strict'

var gImgs = [{ id: 1, url: 'images/meme-imgs (various aspect ratios)/1.jpg', keywords: ['funny', 'lady'] },
{ id: 2, url: 'images/meme-imgs (various aspect ratios)/2.jpg', keywords: ['funny', 'dude'] },
{ id: 3, url: 'images/meme-imgs (various aspect ratios)/3.jpg', keywords: ['funny', 'dog'] },
{ id: 4, url: 'images/meme-imgs (various aspect ratios)/4.jpg', keywords: ['dog', 'cute'] },
{ id: 5, url: 'images/meme-imgs (various aspect ratios)/5.jpg', keywords: ['funny', 'baby'] },
{ id: 6, url: 'images/meme-imgs (various aspect ratios)/6.jpg', keywords: ['funny', 'cat'] },
{ id: 7, url: 'images/meme-imgs (various aspect ratios)/7.jpg', keywords: ['funny', 'dude'] },
{ id: 8, url: 'images/meme-imgs (various aspect ratios)/8.jpg', keywords: ['funny', 'baby'] },
{ id: 9, url: 'images/meme-imgs (various aspect ratios)/9.jpg', keywords: ['funny', 'dude'] },
{ id: 10, url: 'images/meme-imgs (various aspect ratios)/10.jpg', keywords: ['funny', 'dude'] },
{ id: 11, url: 'images/meme-imgs (various aspect ratios)/11.jpg', keywords: ['funny', 'dude'] },
{ id: 12, url: 'images/meme-imgs (various aspect ratios)/12.jpg', keywords: ['funny', 'dude'] },
{ id: 13, url: 'images/meme-imgs (various aspect ratios)/13.jpg', keywords: ['funny', 'baby'] },
{ id: 14, url: 'images/meme-imgs (various aspect ratios)/14.jpg', keywords: ['funny', 'dude'] },
{ id: 15, url: 'images/meme-imgs (various aspect ratios)/15.jpg', keywords: ['funny', 'baby'] },
{ id: 16, url: 'images/meme-imgs (various aspect ratios)/16.jpg', keywords: ['funny', 'dog'] },
{ id: 17, url: 'images/meme-imgs (various aspect ratios)/17.jpg', keywords: ['funny', 'dude'] },
{ id: 18, url: 'images/meme-imgs (various aspect ratios)/18.jpg', keywords: ['funny', 'dude'] },
{ id: 19, url: 'images/meme-imgs (various aspect ratios)/19.jpg', keywords: ['funny', 'dude'] },
{ id: 20, url: 'images/meme-imgs (various aspect ratios)/20.jpg', keywords: ['funny', 'dude'] },
{ id: 21, url: 'images/meme-imgs (various aspect ratios)/21.jpg', keywords: ['funny', 'dude'] },
{ id: 22, url: 'images/meme-imgs (various aspect ratios)/22.jpg', keywords: ['funny', 'lady'] },
{ id: 23, url: 'images/meme-imgs (various aspect ratios)/23.jpg', keywords: ['funny', 'dude'] },
{ id: 24, url: 'images/meme-imgs (various aspect ratios)/24.jpg', keywords: ['funny', 'dude'] },
{ id: 25, url: 'images/meme-imgs (various aspect ratios)/25.jpg', keywords: ['funny', 'toy'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel'
            ,
            size: 30,
            color: 'white',
            font: 'Impact',
            pos: { xRatio: null, yRatio: null }
        },
        {
            txt: 'Even for breakfest'
            ,
            size: 30,
            color: 'white',
            font: 'Impact',
            pos: { xRatio: null, yRatio: null }
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 24, 'cat': 1, 'baby': 4, 'dude': 14, 'lady': 2, 'dog': 3, 'toy': 1 }

function getMeme() {
    return gMeme
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function alignLeft() {
    const textWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    const padding = 6

    gMeme.lines[gMeme.selectedLineIdx].pos.xRatio = (padding + textWidth / 2) / gElCanvas.width
}

function alignCenter() {
    const textWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    const padding = 6

    gMeme.lines[gMeme.selectedLineIdx].pos.xRatio = 0.5
}

function alignRight() {
    const textWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    const padding = 6

    gMeme.lines[gMeme.selectedLineIdx].pos.xRatio = 1 - (padding + textWidth / 2) / gElCanvas.width
}

function setLineText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size += size
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function getGallery() {
    return gImgs
}

function setImg(id) {
    gMeme.selectedImgId = +id
}

function addLine() {
    gMeme.lines.push({
        txt: 'New Line',
        size: 30,
        font: 'Impact',
        color: 'white',
        pos: {
            xRatio: 0.5,
            yRatio: getDefaultLineYRatio(gMeme.lines.length)
        }
    })

    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function switchLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) return gMeme.selectedLineIdx = 0

    return gMeme.selectedLineIdx++
}

function resetMeme() {
    gMeme.lines = [{
        txt: 'I sometimes eat Falafel'
        ,
        size: 30,
        color: 'white',
        font: 'Impact',
        pos: { xRatio: null, yRatio: null }
    },
    {
        txt: 'Even for breakfest'
        ,
        size: 30,
        color: 'white',
        font: 'Impact',
        pos: { xRatio: null, yRatio: null }
    }]
}

function getDefaultLineYRatio(idx) {
    if (idx === 0) return 0.1
    if (idx === 1) return 0.9

    const middleStart = 0.3
    const lineSpacing = 0.08

    return middleStart + (idx - 2) * lineSpacing
}

