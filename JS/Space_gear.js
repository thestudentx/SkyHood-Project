document.addEventListener("DOMContentLoaded", function () {
    function createStars() {
        const starContainer = document.querySelector(".SpaceGear_stars");
        for (let i = 0; i < 50; i++) {
            let star = document.createElement("div");
            star.classList.add("star");

            let size = Math.random() * 4 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            star.style.animationDuration = `${Math.random() * 2 + 1}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;

            starContainer.appendChild(star);
        }
    }

    createStars();
});
