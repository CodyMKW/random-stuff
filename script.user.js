// ==UserScript==
// @name         Smart Auto Click Panel
// @namespace    mii-center-click
// @version      2.0
// @match        https://miis.whatastupididea.com/*
// @grant        none
// ==/UserScript==

(function () {
    var panel = document.createElement("div");
    panel.style.position = "fixed";
    panel.style.bottom = "20px";
    panel.style.right = "20px";
    panel.style.width = "190px";
    panel.style.padding = "14px";
    panel.style.background = "linear-gradient(145deg,#1f2937,#111827)";
    panel.style.color = "#fff";
    panel.style.fontFamily = "system-ui, sans-serif";
    panel.style.borderRadius = "12px";
    panel.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";
    panel.style.zIndex = "999999";
    panel.style.textAlign = "center";

    var title = document.createElement("div");
    title.textContent = "Auto Clicker";
    title.style.fontWeight = "600";
    title.style.marginBottom = "10px";
    title.style.fontSize = "15px";

    var button = document.createElement("button");
    button.textContent = "Start";
    button.style.width = "100%";
    button.style.padding = "8px 0";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.fontWeight = "600";
    button.style.cursor = "pointer";
    button.style.background = "#2563eb";
    button.style.color = "#fff";

    var status = document.createElement("div");
    status.textContent = "Stopped";
    status.style.marginTop = "8px";
    status.style.fontSize = "12px";
    status.style.opacity = "0.8";

    panel.appendChild(title);
    panel.appendChild(button);
    panel.appendChild(status);
    document.body.appendChild(panel);

    var clicking = false;
    var intervalId = null;
    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;

    function fireClick(x, y) {
        var el = document.elementFromPoint(x, y);
        if (!el) return;

        var down = document.createEvent("MouseEvents");
        down.initMouseEvent("mousedown", true, true, window, 1, 0, 0, x, y, false, false, false, false, 0, null);
        el.dispatchEvent(down);

        var up = document.createEvent("MouseEvents");
        up.initMouseEvent("mouseup", true, true, window, 1, 0, 0, x, y, false, false, false, false, 0, null);
        el.dispatchEvent(up);

        var click = document.createEvent("MouseEvents");
        click.initMouseEvent("click", true, true, window, 1, 0, 0, x, y, false, false, false, false, 0, null);
        el.dispatchEvent(click);
    }

    function setTarget(e) {
        targetX = e.clientX;
        targetY = e.clientY;
        document.removeEventListener("click", setTarget, true);
        status.textContent = "Running";
        intervalId = setInterval(function () {
            fireClick(targetX, targetY);
        }, 5);
    }

    button.addEventListener("click", function () {
        if (!clicking) {
            clicking = true;
            button.textContent = "Stop";
            button.style.background = "#dc2626";
            status.textContent = "Click a spot...";
            document.addEventListener("click", setTarget, true);
        } else {
            clicking = false;
            clearInterval(intervalId);
            button.textContent = "Start";
            button.style.background = "#2563eb";
            status.textContent = "Stopped";
        }
    });
})();
