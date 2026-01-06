'use strict'

var gElCanvas
var gCtx

var isFirstDraw = true

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    openGallery()
    window.addEventListener('resize', () => renderMeme())
    gElCanvas.addEventListener('click', onCanvasClick)
}

function renderMeme(isExport = false) {
    resizeCanvas()

    const meme = gMeme
    const img = getImgById(meme.selectedImgId)

    if (!img) return

    const image = new Image()
    image.src = img.url

    image.onload = () => {

        // Draw image
        gElCanvas.height = (image.naturalHeight / image.naturalWidth) * gElCanvas.width
        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

        // Draw and store line position
        meme.lines.forEach((line, idx) => {
            if (!line.pos) line.pos = {}

            // set defaults once
            if (line.pos.xRatio == null) line.pos.xRatio = 0.5
            if (line.pos.yRatio == null)
                line.pos.yRatio = getDefaultLineYRatio(idx)

            const x = line.pos.xRatio * gElCanvas.width
            const y = line.pos.yRatio * gElCanvas.height

            const isSelected = !isExport && idx === meme.selectedLineIdx
            drawTextLine(line, x, y, isSelected)
        })

    }
}

function openEditor() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.editor').classList.remove('hidden')

    resetMeme()
}

function drawTextLine(line, x, y, isSelected) {
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'

    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)

    if (isSelected) drawSelectionFrame(line, x, y)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
}

function onSetLineText(txt) {
    setLineText(txt)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onDeleteLine(){
    deleteLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onAlignLeft(){
    alignLeft()
    renderMeme()
}

function onAlignCenter(){
    alignCenter()
    renderMeme()
}

function onAlignRight(){
    alignRight()
    renderMeme()
}

function onDownloadImg() {
    renderMeme(true)

    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL('image/png')

        const link = document.createElement('a')
        link.href = imgContent
        link.download = 'my-meme.png'

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        renderMeme()
    }, 50)
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onChangeSize(size) {
    changeSize(size)
    renderMeme()
}

function onChangeFont(font){
    changeFont(font)
    renderMeme()
}

function drawSelectionFrame(line, x, y) {
    const metrics = gCtx.measureText(line.txt)
    const textWidth = metrics.width
    const textHeight = line.size

    const padding = 6

    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 1

    gCtx.strokeRect(
        x - textWidth / 2 - padding,
        y - textHeight - padding,
        textWidth + padding * 2,
        textHeight + padding * 2
    )
}

function onCanvasClick(ev) {
    const { offsetX, offsetY } = ev

    const clickedLineIdx = getClickedLineIdx(offsetX, offsetY)
    if (clickedLineIdx === -1) return

    gMeme.selectedLineIdx = clickedLineIdx
    renderMeme()
}

function getClickedLineIdx(x, y) {
    for (let i = gMeme.lines.length - 1; i >= 0; i--) {
        const line = gMeme.lines[i]

        gCtx.font = `${line.size}px Impact`
        const textWidth = gCtx.measureText(line.txt).width
        const textHeight = line.size
        const padding = 6

        const lineX = line.pos.xRatio * gElCanvas.width
        const lineY = line.pos.yRatio * gElCanvas.height

        const left   = lineX - textWidth / 2 - padding
        const right  = lineX + textWidth / 2 + padding
        const top    = lineY - textHeight - padding
        const bottom = lineY + padding

        if (
            x >= left &&
            x <= right &&
            y >= top &&
            y <= bottom
        ) {
            return i
        }
    }
    return -1
}