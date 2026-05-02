function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab-content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active-content");
    }

    // Remove active class from all tabs
    tablinks = document.getElementsByClassName("editorial-tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button
    var currentTab = document.getElementById(tabName);
    currentTab.style.display = "block";
    currentTab.classList.add("active-content");
    evt.currentTarget.classList.add("active");

    // Scroll automatically to the folder content area so the user sees the new tab content immediately
    const folderSection = document.getElementById("portafolio");
    if (folderSection) {
        folderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Lógica interactiva para activar sonido en los videos sin controles nativos
document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Asegurar que no tengan controles nativos para que el click funcione en toda la superficie
        video.removeAttribute('controls');
        
        video.addEventListener('click', function() {
            if (video.muted) {
                // Silenciar todos los demás videos para que no se mezclen los audios
                videos.forEach(v => {
                    v.muted = true;
                });
                
                // Des-silenciar el video clickeado y reiniciar para escuchar desde el principio
                video.muted = false;
                video.currentTime = 0;
            } else {
                // Si ya tenía sonido, lo volvemos a silenciar
                video.muted = true;
            }
        });
    });
});
