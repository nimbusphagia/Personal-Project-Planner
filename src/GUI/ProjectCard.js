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
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("projectTitle");
        titleDiv.textContent = this.#title;
        this.#card.appendChild(titleDiv);

        const subTitleDiv = document.createElement("div");
        subTitleDiv.classList.add("projectSubtitle");
        this.#card.appendChild(subTitleDiv);

        const authorDiv = document.createElement("div");
        authorDiv.classList.add("author-div");
        authorDiv.textContent = this.#author;
        subTitleDiv.appendChild(authorDiv);

        const beginningDiv = document.createElement("div");
        beginningDiv.classList.add("beginning-div");
        beginningDiv.textContent = this.#beginning;
        subTitleDiv.appendChild(beginningDiv);

        const endingDiv = document.createElement("div");
        endingDiv.classList.add("ending-div");
        endingDiv.textContent = this.#end;
        subTitleDiv.appendChild(endingDiv);

        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color-div");
        colorDiv.textContent = this.#hexColor;
        subTitleDiv.appendChild(colorDiv);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("projectDescription");
        descriptionDiv.textContent = this.#description;
        descriptionDiv.style.fontStyle = "italic";
        this.applyStyles(descriptionDiv, true,);
        this.#card.appendChild(descriptionDiv);

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
    applyStyles(node, border, fontColor) {
        if (border) {
            node.style.border = `2.2px solid ${this.#hexColor}`;
            node.style.borderRadius = "5px";
        }
        if (fontColor) {
            node.style.color = this.#hexColor;
        }
    }
    renderActivity(activity, container) {
        const activityDiv = document.createElement("div");
        activityDiv.classList.add("projectActivity", "btn");
        activityDiv.id = this.#id + "-" + activity.getId();
        activityDiv.textContent = activity.getTitle();

        this.applyStyles(activityDiv, true, true);

        container.appendChild(activityDiv);
    }
}
export default ProjectCard;