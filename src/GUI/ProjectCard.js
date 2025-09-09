class ProjectCard {
    #title;
    #author;
    #beginning;
    #end;
    #hexColor;
    #description;
    #activities;
    #status;
    #id;
    #card;
    constructor(project) {
        this.#title = project.getTitle();
        this.#author = project.getAuthor();
        this.#beginning = project.getBeginningDate();
        this.#end = project.getEndDate();
        this.#description = project.getEndDate();
        this.#activities = project.getActivities();
        this.#description = project.getDescription();
        this.#hexColor = project.getCardColor();
        this.#status = project.getStatus();
        this.#id = project.getId();
        this.#card = document.createElement("div");
        this.#card.classList.add("projectContent");
        this.#card.id = this.#id;
        this.applyStyles(this.#card, false, true);
        this.populateDiv();
    }
    //GET SET
    getCard() {
        return this.#card;
    }
    getHexColor() {
        return this.#hexColor;
    }
    //METHODS
    populateDiv() {
        const titleInput = this.createInputNode(["projectTitle", "styledInput"], "projectTitle", this.#title, this.#card, true);

        const subTitleDiv = document.createElement("div");
        subTitleDiv.classList.add("projectSubtitle");
        this.#card.appendChild(subTitleDiv);

        const authorInput = this.createInputNode(["projectAuthor", "styledInput"], "projectAuthor", this.#author, subTitleDiv, true);
        const beginningInput = this.createInputNode(["projectStart", "styledInput"], "projectStart", this.#beginning, subTitleDiv, true);
        const endingInput = this.createInputNode(["projectEnd", "styledInput"], "projectEnd", this.#end, subTitleDiv, true);
        const colorInput = this.createInputNode(["projectColor", "styledInput"], "projectColor", this.#hexColor, subTitleDiv, true);
        const descriptionArea = this.createInputNode(["projectDescription", "styledInput"], "projectDescription", this.#description, this.#card, true, true);
        this.applyStyles(descriptionArea, true,);


        const activitiesDisplay = document.createElement("div");
        activitiesDisplay.classList.add("projectActivitiesParent");
        const activitiesDiv = document.createElement("div");
        activitiesDiv.classList.add("projectActivityContainer");
        //render Activities
        for (const act of this.#activities) {
            this.renderActivity(act, activitiesDiv);
        }
        activitiesDisplay.appendChild(activitiesDiv);
        this.#card.appendChild(activitiesDisplay);

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("projectBtnContainer");
        this.#card.appendChild(btnContainer);

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.classList.add("projectDeleteBtn", "btn");
        deleteBtn.textContent = "Delete";
        this.applyStyles(deleteBtn, true, true, this.#hexColor);
        btnContainer.appendChild(deleteBtn);

        const completeBtn = document.createElement("button");
        completeBtn.setAttribute("type", "button");
        completeBtn.classList.add("projectCompleteBtn", "btn", "hover");
        completeBtn.textContent = "Mark as complete";
        btnContainer.appendChild(completeBtn);
        this.applyStyles(completeBtn, true, true, this.#hexColor);

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
    applyStyles(node, border, fontColor) {
        if (border) {
            node.style.border = `2.2px solid ${this.#hexColor}`;
            node.style.borderRadius = "5px";
        }
        if (fontColor) {
            node.style.color = this.#hexColor;
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
    renderActivity(activity, container) {
        const activityDiv = document.createElement("div");
        activityDiv.classList.add("projectActivity", "btn");
        activityDiv.id = this.#id + "-" + activity.getId();
        activityDiv.textContent = activity.getTitle();

        this.applyStyles(activityDiv, true, true);

        container.appendChild(activityDiv);
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

}
export default ProjectCard;