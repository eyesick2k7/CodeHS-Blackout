document.addEventListener("DOMContentLoaded", () => {
    const manifestData = chrome.runtime.getManifest();
    const version = manifestData.version;
    document.getElementById("version").textContent = version;
});