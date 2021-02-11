(function (exports) {
    let slideIndex = 0;

    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    function previousSlide() {
        showSlide(slideIndex - 1);
    }

    function showSlide(n) {
        const slides = document.getElementsByClassName("slide-container");
        const thumbnails = document.getElementsByClassName("thumbnail");
        const captionText = document.getElementById("caption");
        slideIndex = ((n % slides.length) + slides.length) % slides.length;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].className = thumbnails[i].className.replace(" active", "");
        }
        slides[slideIndex].style.display = "block";
        thumbnails[slideIndex].className += " active";
        captionText.innerHTML = thumbnails[slideIndex].alt;
    }

    function toggleModal() {
        const modalCurrentlyOpen = document.getElementById('imageGallery') === null;
        if (modalCurrentlyOpen) {
            document.getElementById('modal').id = "imageGallery";
            document.getElementById('fullScreenButton').textContent = "⤡";
        } else {
            document.getElementById('imageGallery').id = "modal";
            document.getElementById('fullScreenButton').textContent = "×";
        }
    }

    exports.setupSlides = function () {
        showSlide(0);
        document.querySelector('#prevButton').addEventListener('click', previousSlide);
        document.querySelector('#nextButton').addEventListener('click', nextSlide);
        document.querySelector('#fullScreenButton').addEventListener('click', toggleModal);
        document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => showSlide(index));
        });
        document.querySelectorAll('.slide').forEach((slide) => {
            slide.addEventListener('click', toggleModal);
        });
        document.addEventListener("keydown", function (event) {
            event.preventDefault();
            switch (event.key) {
                case "ArrowLeft":
                    previousSlide();
                    break;
                case "ArrowRight":
                    nextSlide();
                    break;
            }
        });
    };
})(window);
window.setupSlides();
