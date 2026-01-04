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

function renderMeme(isExport = false) {

    const meme = gMeme
    const img = getImgById(meme.selectedImgId)

    if (!img) return

    const image = new Image()
    image.src = img.url

    image.onload = () => {

        // Draw image
        gElCanvas.height = (image.naturalHeight / image.naturalWidth) * gElCanvas.width
        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

        adjustDefaultLinePosistions()

        // Draw Lines
        meme.lines.forEach((line, idx) => {
            const x = line.pos.x || gElCanvas.width / 2
            const y = line.pos.y


            const isSelected =
                !isExport && idx === meme.selectedLineIdx
            drawTextLine(line, gElCanvas.width / 2, y, isSelected)
        })

    }
}

function openEditor() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.editor').classList.remove('hidden')
}

function drawTextLine(line, x, y, isSelected) {
    gCtx.font = `${line.size}px Impact`
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
    gElCanvas.width = elContainer.clientWidth

    renderMeme()
}

function onSetLineText(txt) {
    setLineText(txt)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
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

// function onDownloadImg(elLink) {

//     renderMeme(true)

//     var imgContent = gElCanvas.toDataURL('image/png');

//     setTimeout(() => {
//         elLink.href = imgContent
//     }, 0)


    
//     // elLink.href = imgContent

//     elLink.download = 'my-meme'
// }

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onChangeSize(size) {
    changeSize(size)
    renderMeme()
}

function adjustDefaultLinePosistions() {
    gMeme.lines[1].pos.y = gElCanvas.height - 20
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