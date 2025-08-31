class SessionPopUp {
    #height;
    #width;
    #hexBg;
    #window;
    #parentContainer;
    #contentNode;
    #className;
    #overlay;
    constructor(height, width, contentNode, className, hexBg = "#ffffff") {
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
        closeBtn.classList.add("closeBtn", "btn");
        closeBtn.addEventListener("click", () => this.closeWindow());
        //APPEND CONTENT
        this.#window.appendChild(this.#contentNode);
        closeBtn.style.color = this.#hexBg;
    }
    clearWindow() {
        this.#window.replaceChildren();
    }
    createOverlay() {
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
}
export default SessionPopUp;