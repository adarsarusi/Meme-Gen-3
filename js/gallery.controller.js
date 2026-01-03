'use strict'

function openGallery() {
    document.querySelector('.gallery').classList.remove('hidden')
    document.querySelector('.editor').classList.add('hidden')
}

function onSelectImg(imgId) {
    setImg(imgId)
    openEditor()
    renderMeme()
}

function renderGallery(){
    

    const imgs = getGallery()
  const strHTMLs = imgs.map(img => {
    return `
        <article>
            <img class="gallery-img" src="${img.url}" onclick="onSelectImg('${img.id}')">
        </article>
        `
  })

    const elGallery = document.querySelector('.gallery-container')
  elGallery.innerHTML = strHTMLs.join('')
}