(function (exports) {
    let slideIndex = 1;

    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    function previousSlide() {
        showSlide(slideIndex - 1);
    }

    function showSlide(n) {
        slideIndex = n;
        const slides = document.getElementsByClassName("slide-container");
        const thumbnails = document.getElementsByClassName("thumbnail");
        const captionText = document.getElementById("caption");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].className = thumbnails[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        thumbnails[slideIndex - 1].className += " active";
        captionText.innerHTML = thumbnails[slideIndex - 1].alt;
    }

    function toggleModal() {
        const modalCurrentlyOpen = document.getElementById('imageGallery') === null;
        if (modalCurrentlyOpen) {
            document.getElementById('modal').id = "imageGallery";
            document.getElementById('closeButton').style.display = "none";
        } else {
            document.getElementById('imageGallery').id = "modal";
            document.getElementById('closeButton').style.display = "block";
        }
    }

    exports.setupSlides = function () {
        showSlide(1);
        document.querySelector('#prevButton').addEventListener('click', previousSlide);
        document.querySelector('#nextButton').addEventListener('click', nextSlide);
        document.querySelector('#closeButton').addEventListener('click', toggleModal);
        document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => showSlide(index + 1));
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
    }
})(window);
window.setupSlides();
