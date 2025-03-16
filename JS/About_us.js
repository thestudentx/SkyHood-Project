document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".Timeline_item");

    function revealOnScroll() {
        let windowHeight = window.innerHeight;

        items.forEach(item => {
            let elementTop = item.getBoundingClientRect().top;

            // Ensure animation triggers when item is visible
            if (elementTop < windowHeight - 100) {
                item.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on load
});
