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

    exports.setupSlides = function () {
        showSlide(1);
        document.querySelector('#prevButton').addEventListener('click', previousSlide);
        document.querySelector('#nextButton').addEventListener('click', nextSlide);
        document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => showSlide(index + 1));
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
