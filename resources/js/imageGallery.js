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
        captionText.innerText = thumbnails[slideIndex].alt;
        showExif(slideIndex);
    }

    function toggleModal() {
        const modalCurrentlyOpen = document.getElementById('image-gallery') === null;
        if (modalCurrentlyOpen) {
            document.getElementById('modal').id = "image-gallery";
            document.getElementById('fullscreen-button').textContent = "⤡";
        } else {
            document.getElementById('image-gallery').id = "modal";
            document.getElementById('fullscreen-button').textContent = "×";
        }
    }

    function adjustElementDisplay() {
        document.querySelectorAll('.no-js-caption').forEach((caption) => {
            caption.style.display = "none";
        });
        document.getElementById('prev-button').style.display = "block";
        document.getElementById('next-button').style.display = "block";
        document.getElementById('fullscreen-button').style.display = "block";
        document.getElementById('caption-container').style.display = "block";
        document.getElementById('exif-container').style.display = "block";
        document.querySelectorAll('.counter').forEach((caption) => {
            caption.style.display = "block";
        });
        document.querySelectorAll('.thumbnail-container').forEach((caption) => {
            caption.style.display = "block";
        });
    }

    function showExif(slideIndex) {
        const displayedImage = document.getElementsByClassName("thumbnail")[slideIndex];
        if (displayedImage.complete) {
            EXIF.getData(displayedImage, extractExifData);
        } else {
            displayedImage.onload = function () {
                EXIF.getData(displayedImage, extractExifData)
            };
        }
    }

    function getDeviceName(image) {
        const make = EXIF.getTag(image, "Make");
        const model = EXIF.getTag(image, "Model")
            .replace("IN2023", "8 Pro")
            .replace("M50m2", "M50 Mark II");
        return model.startsWith(make) ? model : `${make} ${model}`;
    }

    function extractExifData() {
        const exifText = document.getElementById("exif");
        const device = getDeviceName(this);
        const focalLength = EXIF.getTag(this, "FocalLength");
        const fNumber = EXIF.getTag(this, "FNumber");
        const iso = EXIF.getTag(this, "ISOSpeedRatings");
        const exposureDecimal = parseFloat(EXIF.getTag(this, "ExposureTime"));
        const exposureTime = exposureDecimal < 1 ? `1/${Math.round(1 / exposureDecimal)}` : exposureDecimal;
        exifText.innerText = [
            `${device}`,
            `${focalLength}mm focal length`,
            `f/${fNumber}`,
            `ISO ${iso}`,
            `${exposureTime}s exposure`
        ].join(" - ");
    }

    exports.setupSlides = function () {
        adjustElementDisplay();
        showSlide(0);
        document.getElementById('prev-button').addEventListener('click', previousSlide);
        document.getElementById('next-button').addEventListener('click', nextSlide);
        document.getElementById('fullscreen-button').addEventListener('click', toggleModal);
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
