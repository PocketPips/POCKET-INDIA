/* DEVICE TILT */
const card = document.querySelector(".device-card");

if (card) {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 18;
        const rotateX = -(y / rect.height - 0.5) * 18;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
}

/* DOWNLOAD BUTTON */
document.querySelectorAll("#downloadBtn, #downloadCta").forEach(btn => {
    btn?.addEventListener("click", () => {
        window.open("https://play.google.com/store/apps/details?id=com.mentorship.pocketration", "_blank");
    });
});

/* RIPPLE EFFECT */
document.querySelectorAll(".btn-cta").forEach(btn => {
    btn.addEventListener("click", function(e){
        const circle = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = circle.style.height = diameter + "px";
        circle.style.left = e.clientX - this.offsetLeft - diameter / 2 + "px";
        circle.style.top = e.clientY - this.offsetTop - diameter / 2 + "px";
        circle.classList.add("ripple");

        this.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
    });
});

/* SCROLL ANIMATION */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".card").forEach(el => {
    observer.observe(el);
});

/* SMOOTH LOAD */
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

console.log("🚀 Pocket Ration website loaded");