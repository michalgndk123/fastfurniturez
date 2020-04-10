let slideContainer = document.getElementById('slide-container');
let nav = document.getElementById('nav');
let navChildren = Array.from(nav.children);

slideContainer.style.setProperty('--n', slideContainer.childElementCount);
slideContainer.style.setProperty('--i', 0);

let actualPage = 0;
let blockScroll = false;
let blockScrollTime = parseFloat(getComputedStyle(slideContainer).transitionDuration)*1000;

navChildren.forEach((item) => {
    item.addEventListener('click', (e) => {
        let id = e.target.id.split('_')[1];
        slideContainer.style.setProperty('--i', id);
        actualPage = parseInt(id);
        activeMenu(id);
    })
})

document.addEventListener('wheel', (e) => {
    if(blockScroll) return;
    actualPage = (e.deltaY > 0) ? actualPage+1 : actualPage-1;

    if(actualPage > parseInt(slideContainer.style.getPropertyValue('--n'))-1) actualPage--;
    else if(actualPage < 0) actualPage++;

    slideContainer.style.setProperty('--i', actualPage);
    activeMenu(actualPage);

    blockScroll = true;
    setTimeout(() => {
        blockScroll = false;
    }, blockScrollTime);
})

function activeMenu(id) {
    navChildren.forEach((item) => {
        item.classList.remove('navigation-active');
    })
    navChildren[id].classList.add('navigation-active');
}