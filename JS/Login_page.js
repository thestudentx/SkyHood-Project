document.addEventListener("DOMContentLoaded", function () {
    let images = [
        "../Img/About_section_bg.jpg",
        "../Img/vecteezy_3d-render-of-astronaut-in-space_23338706.png",
        "../Img/satellite-67718_1920.jpg",
        "../Img/Blue_astronaut.jpg",
        "../Img/night-1920x1080.jpg"
    ];

    let mediaElement = document.getElementById("Media_element");

    if (!mediaElement) {
        console.error("Media element not found!");
        return;
    }

    function changeImage() {
        let randomIndex = Math.floor(Math.random() * images.length);
        let randomTime = Math.floor(Math.random() * (15 - 10 + 1) + 10) * 60000; // 10-15 mins

        console.log("Changing image to:", images[randomIndex]); // Debugging
        mediaElement.style.opacity = "0";

        setTimeout(() => {
            mediaElement.src = images[randomIndex];
            mediaElement.style.opacity = "1";
        }, 1000); // Smooth transition

        setTimeout(changeImage, randomTime);
    }

    changeImage();
});
