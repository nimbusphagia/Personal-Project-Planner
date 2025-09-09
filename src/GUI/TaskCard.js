class TaskCard {
    #title;
    #status;
    #hexColor;
    #id;
    #card;
    constructor(task) {
        this.#title = task.getTitle();
        this.#status = task.getStatus();
        this.#hexColor = task.getProjectColor();
        this.#id = task.getId();
        this.#card = document.createElement("div");
        this.#card.classList.add("taskContent");
        this.#card.id = task.getProjectId() + "-" + task.getActivityId() + "-" + this.#id;
        this.populateDiv();
    }
    getCard() {
        return this.#card;
    }
    setCard(card) {
        this.#card = card;
    }
    populateDiv() {
        const titleInput = this.createInputNode(["taskTitle", "styledInput"], "taskTitle", this.#title, this.#card, true);

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("taskBtnContainer");
        this.#card.appendChild(btnContainer);

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.classList.add("taskDeleteBtn", "btn");
        deleteBtn.textContent = "Delete";
        btnContainer.appendChild(deleteBtn);

        const completeBtn = document.createElement("button");
        completeBtn.setAttribute("type", "button");
        completeBtn.classList.add("taskCompleteBtn", "btn", "hover");
        completeBtn.textContent = "Mark as complete";
        btnContainer.appendChild(completeBtn);
    }
    createInputNode(classList, name, value, parent, appendChoice, textAreaChoice = false) {
        const resize = (node) => {
            node.style.width = node.value.length + 1 + "ch"
        }
        const assignValues = (node) => {
            for (const className of classList) {
                node.classList.add(className);
            }
            node.name = name;
            node.value = value;
            this.applyStyles(node, false, true);
        }
        if (textAreaChoice) {
            const textArea = document.createElement("textarea");
            assignValues(textArea);
            textArea.maxLength = "200";
            if (appendChoice) {
                parent.appendChild(textArea);
                textArea.addEventListener("input", () => {
                    textArea.style.height = Math.min(textArea.scrollHeight, textArea.parentElement.clientHeight) + "px";
                });
                this.applyFocusStyle(textArea);
            }
            return textArea;
        } else {
            const inputNode = document.createElement("input");
            assignValues(inputNode);
            inputNode.maxLength = "30";
            resize(inputNode);
            if (appendChoice) {
                parent.appendChild(inputNode);
                inputNode.addEventListener("input", () => resize(inputNode));
                this.applyFocusStyle(inputNode);
            }
            return inputNode;
        }
    }
    applyFocusStyle(node) {
        const dimColor = this.dimHexColor(this.#hexColor, 0.11);
        node.addEventListener("focus", () => {
            node.style.background = dimColor;
        });

        node.addEventListener("blur", () => {
            node.style.background = "transparent";
        });
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
    applyStyles(node, border, fontColor) {
        if (border) {
            node.style.border = `2.2px solid ${this.#hexColor}`;
            node.style.borderRadius = "5px";
        }
        if (fontColor) {
            node.style.color = this.#hexColor;
        }
    }
}
export default TaskCard;