// ==UserScript==
// @name         Smart Auto Click Panel
// @namespace    mii-center-click
// @version      3.2
// @match        https://miis.whatastupididea.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
// @inject-into  page
// ==/UserScript==

(function () {
    var speeds = [5,10,20,50,75,100,150,200,300,500,1000];
    var savedSpeed = parseInt(GM_getValue("ac_speed", 100), 10);
    if (speeds.indexOf(savedSpeed) === -1) savedSpeed = 100;

    var panel = document.createElement("div");
    panel.style.position = "fixed";
    panel.style.bottom = "20px";
    panel.style.right = "20px";
    panel.style.width = "200px";
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

    var speedLabel = document.createElement("div");
    speedLabel.textContent = "Speed (ms)";
    speedLabel.style.fontSize = "12px";
    speedLabel.style.marginBottom = "4px";
    speedLabel.style.opacity = "0.8";

    var speedSelect = document.createElement("select");
    speedSelect.style.width = "100%";
    speedSelect.style.marginBottom = "8px";
    speedSelect.style.padding = "4px";
    speedSelect.style.borderRadius = "6px";
    speedSelect.style.border = "none";

    for (var i = 0; i < speeds.length; i++) {
        var opt = document.createElement("option");
        opt.value = speeds[i];
        opt.textContent = speeds[i] + " ms";
        if (speeds[i] === savedSpeed) opt.selected = true;
        speedSelect.appendChild(opt);
    }

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
    panel.appendChild(speedLabel);
    panel.appendChild(speedSelect);
    panel.appendChild(button);
    panel.appendChild(status);
    document.body.appendChild(panel);

    var clicking = false;
    var intervalId = null;
    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var currentSpeed = savedSpeed;

    function fireClick(x, y) {
        var el = document.elementFromPoint(x, y);
        if (!el) return;
        el.dispatchEvent(new MouseEvent("mousedown", {bubbles:true, clientX:x, clientY:y}));
        el.dispatchEvent(new MouseEvent("mouseup", {bubbles:true, clientX:x, clientY:y}));
        el.dispatchEvent(new MouseEvent("click", {bubbles:true, clientX:x, clientY:y}));
    }

    function startInterval() {
        intervalId = setInterval(function () {
            fireClick(targetX, targetY);
        }, currentSpeed);
    }

    function setTarget(e) {
        targetX = e.clientX;
        targetY = e.clientY;
        document.removeEventListener("click", setTarget, true);
        status.textContent = "Running";
        startInterval();
    }

    speedSelect.addEventListener("change", function () {
        currentSpeed = parseInt(speedSelect.value, 10);
        GM_setValue("ac_speed", currentSpeed);
        if (clicking) {
            clearInterval(intervalId);
            startInterval();
        }
    });

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
