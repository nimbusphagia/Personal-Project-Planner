class ActivityCard {
    #title;
    #priority;
    #description;
    #tasks;
    #status;
    #hexColor;
    #id;
    #card;
    constructor(activity) {
        this.#title = activity.getTitle();
        this.#priority = activity.getPriority();
        this.#description = activity.getDescription();
        this.#tasks = activity.getTasks();
        this.#status = activity.getStatus();
        this.#hexColor = activity.getColor();
        this.#id = activity.getId();
        this.#card = document.createElement("div");
        this.#card.classList.add("activityContent");
        this.#card.id = activity.getProjectId() + "-" + this.#id;
        this.populateDiv();
    }
    getCard() {
        return this.#card;
    }
    setCard(card) {
        this.#card = card;
    }
    getHexColor() {
        return this.#hexColor;
    }
    populateDiv() {
        const titleInput = this.createInputNode(["activityTitle", "styledInput"], "activityTitle", this.#title, this.#card, true);
        const priorityInput = this.createInputNode(["activityPriority", "styledInput"], "activityPriority", this.#priority, this.#card, true);
        const descriptionArea = this.createInputNode(["activityDescription", "styledInput"], "activityDescription", this.#description, this.#card, true, true);
        this.applyStyles(descriptionArea, true);

        const tasksDisplay = document.createElement("div");
        tasksDisplay.classList.add("activityTasksParent");
        const tasksDiv = document.createElement("div");
        tasksDiv.classList.add("activityTasksContainer");

        //render Tasks
        for (const t of this.#tasks) {
            this.renderTask(t, tasksDiv);
        }
        tasksDisplay.appendChild(tasksDiv);
        this.#card.appendChild(tasksDisplay);

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("activityBtnContainer");
        this.#card.appendChild(btnContainer);

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.classList.add("activityDeleteBtn", "btn");
        deleteBtn.textContent = "Delete";
        btnContainer.appendChild(deleteBtn);

        const completeBtn = document.createElement("button");
        completeBtn.setAttribute("type", "button");
        completeBtn.classList.add("activityCompleteBtn", "btn", "hover");
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
    renderTask(task, container) {
        if (task.getId() == "BTN") {
            const taskBtn = document.createElement("button");
            taskBtn.type = "button";
            taskBtn.textContent = "+";
            taskBtn.classList.add("addTask", "btn");
            taskBtn.id = task.getProjectId() + "-" + task.getActivityId() + "-" + task.getId();
            this.applyStyles(taskBtn, true, true);
            container.appendChild(taskBtn);
            return
        }
        const taskInput = this.createInputNode(["activityTask", "styledInput"], "taskTitle", task.getTitle(), container, true);
        taskInput.id = task.getProjectId() + "-" + task.getActivityId() + "-" + task.getId();
        taskInput.addEventListener("focus", () => {
            taskInput.style.border = "2.5px solid";
        });
        taskInput.addEventListener("blur", () => {
            taskInput.style.border = "2px solid";
            taskInput.style.fontWeight = "550";
        });
    }
}
export default ActivityCard;