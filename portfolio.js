function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab-content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active-content");
    }

    // Remove active class from all tabs
    tablinks = document.getElementsByClassName("folder-tab");
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
