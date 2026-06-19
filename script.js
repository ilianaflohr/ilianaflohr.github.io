function toggleProductions() {
    var hiddenDiv = document.getElementById("more-productions");
    var btnText = document.getElementById("toggle-productions-btn");

    if (hiddenDiv.style.display === "flex") {
        hiddenDiv.style.display = "none";
        btnText.innerHTML = "Show Full History";
        document.getElementById("productions").scrollIntoView({ behavior: 'smooth' });
    } else {
        hiddenDiv.style.display = "flex";
        btnText.innerHTML = "Show Less";
    }
}

function openModal(element) {
    const modal = document.getElementById("production-modal");
    
    // Extract base metadata text elements
    const title = element.getAttribute("data-title");
    const role = element.getAttribute("data-role");
    const company = element.getAttribute("data-company");
    const desc = element.getAttribute("data-desc");
    
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-role").innerText = role;
    document.getElementById("modal-company").innerText = company;
    document.getElementById("modal-description").innerText = desc;

    // Reset video tracking elements
    const videoWrapper = document.getElementById("modal-video-wrapper");
    const videoElement = document.getElementById("modal-video");
    const embedWrapper = document.getElementById("modal-embed-wrapper");
    const embedIframe = document.getElementById("modal-embed");
    const galleryContainer = document.getElementById("modal-gallery");
    
    videoWrapper.classList.add("hidden");
    videoElement.pause();
    videoElement.src = "";
    embedWrapper.classList.add("hidden");
    embedIframe.src = "";
    galleryContainer.innerHTML = ""; // Clear image layout stack

    // Parse out combined string list from data-media-list
    const mediaString = element.getAttribute("data-media-list");
    
    if (mediaString) {
        const mediaFiles = mediaString.split(",");
        
        mediaFiles.forEach(file => {
            const cleanFile = file.trim();
            if (!cleanFile) return;

            // Check if item is a local raw MP4 file
            if (cleanFile.toLowerCase().endsWith(".mp4")) {
                videoElement.src = cleanFile;
                videoElement.load();
                videoWrapper.classList.remove("hidden");
            } 
            // Check if it is a streaming frame URL link instead
            else if (cleanFile.startsWith("http")) {
                embedIframe.src = cleanFile;
                embedWrapper.classList.remove("hidden");
            } 
            // Default: generate image elements dynamically
            else {
                const img = document.createElement("img");
                img.src = cleanFile;
                img.alt = "Production Still - " + title;
                img.className = "modal-photo";
                galleryContainer.appendChild(img);
            }
        });
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("production-modal");
    modal.classList.remove("active");
    
    // Completely freeze background media playbacks instantly
    document.getElementById("modal-video").pause();
    document.getElementById("modal-video").src = "";
    document.getElementById("modal-embed").src = "";
    
    document.body.style.overflow = "auto";
}

function closeModalOnOutsideClick(event) {
    if (event.target.id === "production-modal") {
        closeModal();
    }
}