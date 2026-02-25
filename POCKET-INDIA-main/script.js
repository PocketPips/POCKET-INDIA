// Small tilt effect for device mockup
const card = document.querySelector(".device-card");

if (card) {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 20;
        const rotateX = -(y / rect.height - 0.5) * 20;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
}

// Download buttons (Play Store link)
document.querySelectorAll("#downloadBtn, #downloadCta").forEach(btn => {
    btn?.addEventListener("click", () => {
        window.open("https://play.google.com/store/apps/details?id=com.mentorship.pocketration", "_blank");
    });
});

// Console log
console.log("Pocket Ration website ready");