class SessionPopUp {
    #height;
    #width;
    #hexBg;
    #window;
    #parentContainer;
    #contentNode;
    #className;
    #overlay;
    constructor(height = "200px", width = "100px", contentNode = null, className = "", hexBg = "#000000ff") {
        this.#height = height;
        this.#width = width;
        this.#className = className;
        this.#hexBg = hexBg;
        this.#contentNode = contentNode;
        this.#parentContainer = document.querySelector(".sessionContainer");
    }
    //GET SET
    getHeight() {
        return this.#height;
    }
    setHeight(height) {
        this.#height = height;
    }
    getWidth() {
        return this.#height;
    }
    setWidth(width) {
        this.#width = width;
    }
    getHexBg() {
        return this.#hexBg;
    }
    setHexBg(hexBg) {
        this.#hexBg = hexBg;
    }
    getClassName() {
        return this.#className;
    }
    setClassName(className) {
        this.#className = className;
    }
    getContentNode() {
        return this.#contentNode;
    }
    setContentNode(contentNode) {
        this.#contentNode = contentNode;
    }
    //METHODS
    renderWindow() {
        this.createOverlay();
        if (document.getElementById("sessionWindow")) {
            this.#window = document.querySelector("#sessionWindow");
            this.applyStyles(this.#window);
            this.renderContent();
        } else {
            this.#window = document.createElement("div");
            this.#parentContainer.appendChild(this.#window);
            this.#window.id = "sessionWindow";
            this.renderContent();
            this.applyStyles(this.#window);
        }

    }
    applyStyles(node) {
        //popup styles
        node.className = this.#className;
        node.style.height = this.#height;
        node.style.width = this.#width;
        node.style.border = `2.5px solid ${this.#hexBg}`;
        node.style.borderRadius = "5px";
        node.style.color = this.#hexBg;
        node.style.zIndex = "1000"; // Above overlay
    }
    closeWindow() {
        this.#parentContainer.removeChild(this.#window)
        this.removeOverlay();
    }
    renderContent() {
        this.clearWindow();
        //CLOSE BUTTON
        const closeBtn = document.createElement("button");
        this.#window.appendChild(closeBtn);
        closeBtn.setAttribute("type", "button");
        closeBtn.textContent = "✕";
        closeBtn.classList.add("closeBtn");
        closeBtn.addEventListener("click", () => this.closeWindow());
        //APPEND CONTENT
        this.#window.appendChild(this.#contentNode);
        closeBtn.style.color = this.#hexBg;
    }
    clearWindow() {
        this.#window.replaceChildren();
    }
    createOverlay(parentWindow = null, hexColor) {
        if (parentWindow) {
            const overlay = document.createElement("div");
            overlay.classList.add("overlay");
            //overlay.style.background = this.darkenHexColor(hexColor);
            parentWindow.appendChild(overlay);
            return overlay;
        }
        if (!document.getElementById("sessionOverlay")) {
            this.#overlay = document.createElement("div");
            this.#overlay.id = "sessionOverlay";
            document.body.appendChild(this.#overlay);
        }
    }
    removeOverlay() {
        const overlay = document.getElementById("sessionOverlay");
        if (overlay) {
            overlay.remove();
        }
    }
    openSubWindow(className, contentNode, hexColor, parentContainer = null) {
        const previousSubWindow = document.querySelector(".subWindow")
        //const previousOverlay = document.querySelector(".overlay");
        if (previousSubWindow) {
            previousSubWindow.remove();
        }
        /*if (previousOverlay) {
            previousOverlay.remove();
        }*/
        const subWindow = document.createElement("div");
        subWindow.classList.add(className, "subWindow");
        if (!parentContainer) {
            const mainWindow = document.getElementById("sessionWindow");
            parentContainer = mainWindow;
        }
        const overlay = this.createOverlay(parentContainer, hexColor);
        subWindow.appendChild(this.createCloseBtn(subWindow, overlay));
        subWindow.appendChild(contentNode);
        parentContainer.appendChild(subWindow);
        return subWindow;
    }
    createCloseBtn(windowNode, overlay) {
        const closeBtn = document.createElement("button");
        closeBtn.setAttribute("type", "button");
        closeBtn.textContent = "✕";
        closeBtn.classList.add("closeBtn");
        closeBtn.style.color = this.#hexBg;
        closeBtn.addEventListener("click", () => {
            overlay.remove();
            windowNode.remove();
        });
        return closeBtn
    }
    dimHexColor(hex, alpha = 0.5) {
        // Remove "#" if present
        hex = hex.replace(/^#/, "");

        // Parse r,g,b
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    darkenHexColor(hex, alpha = 0.2, factor = 0.4) {
        // Remove "#" if present
        hex = hex.replace(/^#/, "");

        // Parse r,g,b
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        // Darken by multiplying each channel by the factor (0 < factor < 1)
        r = Math.round(r * factor);
        g = Math.round(g * factor);
        b = Math.round(b * factor);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

}
export default SessionPopUp;