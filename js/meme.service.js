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
            color: 'white',
            pos: { x: null, y: 40}
        },
        {
            txt: 'Even for breakfest'
            ,
            size: 30,
            color: 'white',
            pos: { x: null, y: null}
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

function setColor(color){
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeSize(size){
    gMeme.lines[gMeme.selectedLineIdx].size += size
}

function getGallery() {
    return gImgs
}

function setImg(id){
    gMeme.selectedImgId = +id
}

function addLine(){
    const y = getDefaultLineY(gMeme.lines.length)

    gMeme.lines.push({
        txt: 'New Line',
        size: 30,
        color: 'white',
        pos: {x: null, y}
    })

    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine(){
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) return gMeme.selectedLineIdx = 0

    return gMeme.selectedLineIdx++
}

function getDefaultLineY(lineCount){
    const margin = 40
    const spacing = 40

    if (lineCount === 0) return margin
    if (lineCount === 1) return gElCanvas.height - margin

    return margin + spacing * lineCount
}