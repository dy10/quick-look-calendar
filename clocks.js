function updateClocks() {
    const options = { hour: '2-digit', minute: '2-digit' };

    const indiaTime = new Date().toLocaleString("en-US", { ...options, timeZone: "Asia/Kolkata" });
    const usEstTime = new Date().toLocaleString("en-US", { ...options, timeZone: "America/New_York" });
    const usPstTime = new Date().toLocaleString("en-US", { ...options, timeZone: "America/Los_Angeles" });

    document.getElementById('indiaClock').innerText = indiaTime;
    document.getElementById('usEstClock').innerText = usEstTime;
    document.getElementById('usPstClock').innerText = usPstTime;
}
setInterval(updateClocks, 5000);
updateClocks();