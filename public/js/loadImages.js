async function loadImages() {
    const response = await fetch('/list-images');
    const images = await response.json();
    const container = document.getElementById('gallery');

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Gallery Image";
        container.appendChild(img);
    });
}
// MODAL KEZELÉSE
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");
const downloadBtn = document.getElementById("downloadBtn");
const deleteBtn = document.getElementById("deleteBtn");
const selectBtn = document.getElementById("selectBtn");

let selectedImages = [];

function openModal(imageSrc) {
    modal.style.display = "flex";
    modalImg.src = imageSrc;
    downloadBtn.onclick = () => downloadImage(imageSrc);
    deleteBtn.onclick = () => deleteImage(imageSrc);
    selectBtn.onclick = () => toggleSelect(imageSrc);
}

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// LETÖLTÉS FUNKCIÓ
function downloadImage(imageSrc) {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = imageSrc.split('/').pop();
    link.click();
}

// KÉP KIJELÖLÉSE
function toggleSelect(imageSrc) {
    const index = selectedImages.indexOf(imageSrc);
    if (index > -1) {
        selectedImages.splice(index, 1);
    } else {
        selectedImages.push(imageSrc);
    }
    updateSelectedImages();
}

// Kijelölt képek vizuális kiemelése
function updateSelectedImages() {
    document.querySelectorAll(".gallery-item").forEach(img => {
        if (selectedImages.includes(img.src)) {
            img.classList.add("selected");
        } else {
            img.classList.remove("selected");
        }
    });
}

// KÉP TÖRLÉSE (backend végpont meghívásával)
async function deleteImage(imageSrc) {
    const filename = imageSrc.split('/').pop();
    const response = await fetch(`/delete-image/${filename}`, { method: "DELETE" });

    if (response.ok) {
        alert("Image deleted successfully!");
        loadImages(); // Frissítjük a galériát
        modal.style.display = "none";
    } else {
        alert("Error deleting image.");
    }
}

window.onload = loadImages;