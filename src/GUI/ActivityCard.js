class ActivityCard {
    #title;
    #priority;
    #description;
    #tasks;
    #status;
    #id;
    #card;
    constructor(activity) {
        this.#title = activity.getTitle();
        this.#priority = activity.getPriority();
        this.#description = activity.getDescription();
        this.#tasks = activity.getTasks();
        this.#status = activity.getStatus();
        this.#id = activity.getId();
        this.#card = document.createElement("div");
        this.#card.classList.add("activityContent");
        //this.#card.id = this.#id;
        this.populateDiv();
    }
    getCard(){
        return this.#card;
    }
    setCard(card){
        this.#card = card;
    }
    populateDiv() {
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("activityTitle");
        titleDiv.textContent = this.#title;
        this.#card.appendChild(titleDiv);

        const priorityDiv = document.createElement("div");
        priorityDiv.classList.add("activityPriority");
        priorityDiv.textContent = this.#priority;
        this.#card.appendChild(priorityDiv);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("activityDescription");
        descriptionDiv.textContent = this.#description;
        descriptionDiv.style.fontStyle = "italic";
        this.#card.appendChild(descriptionDiv);

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
    renderTask(task, container) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("activityTask", "btn");
        taskDiv.id = task.getId();
        taskDiv.textContent = task.getTitle();

        container.appendChild(taskDiv);
    }
}
export default ActivityCard;