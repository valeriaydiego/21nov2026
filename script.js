let currentIndex = 0;
const slider = document.getElementById('gallerySlider');
const previousButton = document.getElementsByClassName('prev');

// starts mobile functions
const galleryContainer = document.getElementById('dress-code-gallery');
let touchStartX = 0;
let touchEndX = 0;

// Listen for the start of a touch
galleryContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

// Listen for the end of a touch
galleryContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance in pixels to be considered a swipe
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swiped Left -> Show Next
        moveGallery(1, 'dress-code-gallery');
    }
    
    if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped Right -> Show Previous
        moveGallery(-1, 'dress-code-gallery');
    }
}

// ends mobile functions


// get the total amount of images
function getTotalImages(galleryObject){
    // get the total amount of images
    const galleryItems = Array.from( galleryObject.getElementsByClassName('gallery-item'));
    return galleryItems.length;
}


function updateSlider(visibleItems) {
    // Each item is 25% width. We move by that percentage.
    const percentage = currentIndex * (100 / visibleItems);
    slider.style.transform = `translateX(-${percentage}%)`;
}

function updateThumbnails(galleryObject){

    const galleryThumbs = galleryObject.querySelectorAll('.gallery-thumbs img');

    // update active items
    const activeImagesIndex = [];
    for(let i=0; i<4; i++){
        activeImagesIndex.push(currentIndex+i);
    }

    galleryThumbs.forEach(img => img.classList.remove('active'));

    activeImagesIndex.forEach(index => {
    // Check if the index actually exists in our galleryThumbs array
    if (galleryThumbs[index]) {
        galleryThumbs[index].classList.add('active');
    }
});

}

// when clicking next or previous
function moveGallery(direction, galleryID) {
    const galleryObject = document.getElementById(galleryID);
    // Calculate max index: total images minus the ones visible
    const totalItems = getTotalImages(galleryObject);
    
    const visibleItems = getVisibleItems();
    const maxIndex = totalItems - visibleItems; // Can't slide past the last 4
    currentIndex += direction;
    
    if (currentIndex > maxIndex) {
        currentIndex = 0;
        //desactivar boton de next
    } 
    if (currentIndex < 0) currentIndex = 0;

    // updateSlider();
    updateGallery(visibleItems);
    updateThumbnails(galleryObject);
    updateButtons(galleryObject);
}

function getVisibleItems() {
    const width = window.innerWidth;
    console.log(width);
    if (width <= 400) {
        return 1;
    } else if (width > 400 && width <= 600) {
        return 2;
    } else {
        return 4;
    }
}

function moveGalleryMobile(direction, galleryID) {
    const galleryObject = document.getElementById(galleryID);
    // Calculate max index: total images minus the ones visible
    const totalItems = getTotalImages(galleryObject);

    
    const visibleItems = getVisibleItems();
    const maxIndex = totalItems - visibleItems; // Can't slide past the last 4
    currentIndex += direction;
    
    if (currentIndex > maxIndex) {
        currentIndex = 0;
        //desactivar boton de next
    } 
    if (currentIndex < 0) currentIndex = 0;

    // updateSlider();
    updateGallery(1);
    updateThumbnails(galleryObject);
    updateButtons(galleryObject);
}


function updateButtons(galleryObject){
    const nextButton = galleryObject.getElementsByClassName('prev');
    const previousButton = galleryObject.getElementsByClassName('next');
}


function updateGallery(visibleItems) {
    const container = document.getElementById('gallerySlider');
    // We move by 25% because each item is 25% of the visible area
    const percentage = currentIndex * (100/visibleItems); 
    container.style.transform = `translateX(-${percentage}%)`;
}

function goToSlide(index, visibleItems, galleryID) {
    const galleryObject= document.getElementById(galleryID);
    // If we want to show a specific image, we try to center it or 
    // just slide to that position (clamped to max index)
    const totalImages = getTotalImages(galleryObject);
    const maxIndex = totalImages - visibleItems;
    currentIndex = Math.min(index, maxIndex);
    updateSlider();
}