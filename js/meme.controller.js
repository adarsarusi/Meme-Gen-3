'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    openGallery()
    window.addEventListener('resize', () => resizeCanvas())
}

function renderMeme() {

    const meme = gMeme
    const img = getImgById(meme.selectedImgId)

    if (!img) return

    const image = new Image()
    image.src = img.url

    image.onload = () => {
        // Resize canvas to image size
        // gElCanvas.width = image.width
        // gElCanvas.height = image.height

        // Draw image
        // gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

        gElCanvas.height = (image.naturalHeight / image.naturalWidth) * gElCanvas.width
        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
        
        // Draw text line (top)
        const line = meme.lines[meme.selectedLineIdx]
        
        drawTextLine(line, gElCanvas.width / 2, line.size)
    }
}

function openEditor() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.editor').classList.remove('hidden')
}

function drawTextLine(line, x, y) {
    gCtx.font = `${line.size}px Impact`
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'

    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth

    renderMeme()
}

function onSetLineText(txt) {
    setLineText(txt)
    renderMeme()
}

function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent

    elLink.download = 'my-meme'
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onChangeSize(size){
    changeSize(size)
    renderMeme()
}