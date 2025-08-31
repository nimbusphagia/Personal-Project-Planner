import SessionPopUp from "./SessionPopUp";
class GuiTaskFinder {
    #projects;
    #activities;
    #tasks;
    #overlay;
    #window;
    #parentContainer;
    #finderCard;
    constructor(projectManager) {
        this.#projects = projectManager.getContainer();
        this.#finderCard = document.createElement("div");
        this.#finderCard.classList.add("finderContainer");
        this.#parentContainer = document.querySelector(".sessionContainer");
    }
    renderFinder() {
        this.#finderCard.innerHTML = "";

        const utilityBtns = document.createElement("div");
        utilityBtns.classList.add("finderUtilitiesContainer");
        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.classList.add("closeFinderBtn", "btn");
        closeBtn.textContent = "x";
        closeBtn.addEventListener("click", () => this.closeWindow());
        utilityBtns.appendChild(closeBtn);
        const content = document.createElement("div");
        content.classList.add("finderContent");
        const projectParent = document.createElement("div");
        projectParent.classList.add("finderProjParent");
        const projectSec = document.createElement("div");
        projectSec.classList.add("finderProjects");
        const newProjectBtn = document.createElement("div");
        newProjectBtn.classList.add("finderProject", "finderItem");
        newProjectBtn.id = "finderNewProjBtn";
        const btnTitle = document.createElement("h5");
        btnTitle.textContent = "New project";
        newProjectBtn.appendChild(btnTitle);
        projectParent.appendChild(projectSec);
        projectParent.appendChild(newProjectBtn);
        const activityParent = document.createElement("div");
        activityParent.classList.add("finderActParent");
        const activitySec = document.createElement("div");
        activitySec.classList.add("finderActivities");
        activityParent.appendChild(activitySec);
        const taskParent = document.createElement("div");
        taskParent.classList.add("finderTaskParent");
        const taskSec = document.createElement("div");
        taskSec.classList.add("finderTasks");
        taskParent.appendChild(taskSec);
        content.appendChild(projectParent);
        content.appendChild(activityParent);
        content.appendChild(taskParent);
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("finderBtns");
        /*const quickTaskBtn = document.createElement("button");
        quickTaskBtn.type = "button";
        quickTaskBtn.classList.add("createTaskBtn", "btn");
        quickTaskBtn.textContent = "Quick Task"*/
        const finderAddBtn = document.createElement("button");
        finderAddBtn.type = "button";
        finderAddBtn.classList.add("finderAddBtn");
        finderAddBtn.textContent = "Select a task";
        //btnDiv.appendChild(quickTaskBtn);
        btnDiv.appendChild(finderAddBtn);

        this.#finderCard.appendChild(utilityBtns);
        this.#finderCard.appendChild(content);
        this.#finderCard.appendChild(btnDiv);

        this.showProjects(projectSec, activitySec, taskSec);
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
    renderWindow() {
        this.createOverlay();
        this.#window = document.createElement("div");
        this.#window.classList.add("finderPopUp");
        this.renderFinder();
        this.#window.appendChild(this.#finderCard);
        this.#parentContainer.appendChild(this.#window);
    }
    clearWindow() {
        if (this.#window) {
            this.#window.replaceChildren();
        }
    }

    closeWindow() {
        this.#parentContainer.removeChild(this.#window)
        this.removeOverlay();
    }
    showProjects(projectsNode, activitiesNode, tasksNode) {
        projectsNode.innerHTML = "";
        for (const p of this.#projects) {
            const projectItem = document.createElement("div");
            projectItem.classList.add("finderProject", "finderItem");
            //pDiv.id = p.getId();
            const pTitle = document.createElement("h5");
            pTitle.textContent = p.getTitle();
            projectItem.appendChild(pTitle);
            projectsNode.appendChild(projectItem);
            this.colorItem(projectItem, p.getCardColor());
            projectItem.addEventListener("click", () => {
                this.clearSections();
                this.showActivities(activitiesNode, p, tasksNode);
            });
        }
    }
    showActivities(activitiesNode, project, tasksNode) {
        activitiesNode.innerHTML = "";
        this.#activities = project.getActivities();

        for (const act of this.#activities) {
            const activityItem = document.createElement("div");
            activityItem.classList.add("finderActivity", "finderItem");
            const aTitle = document.createElement("h5");
            if (act.getId() != "BTN") {
                aTitle.textContent = act.getTitle();
                this.colorItem(activityItem, project.getCardColor());
                activityItem.appendChild(aTitle);
                activitiesNode.appendChild(activityItem);
                activityItem.addEventListener("click", () => this.showTasks(tasksNode, act, project));
            } else {
                const oldBtn = document.querySelector("#finderNewActBtn");
                if (oldBtn) {
                    oldBtn.remove();
                }
                aTitle.textContent = "New Activity";
                activityItem.id = "finderNewActBtn";
                activityItem.appendChild(aTitle);
                activitiesNode.parentElement.appendChild(activityItem);
                activityItem.addEventListener("click", () => console.log(project.getId()));
            }
        }
    }
    showTasks(tasksNode, activity, project) {
        tasksNode.innerHTML = "";
        this.#tasks = activity.getTasks();

        for (const task of this.#tasks) {
            const taskItem = document.createElement("div");
            taskItem.classList.add("finderTask", "finderItem");
            const tTitle = document.createElement("h5");
            if (task.getId() != "BTN") {
                tTitle.textContent = task.getTitle();
                this.colorItem(taskItem, project.getCardColor());
                taskItem.appendChild(tTitle);
                tasksNode.appendChild(taskItem);
            } else {
                const oldBtn = document.querySelector("#finderNewTaskBtn");
                if (oldBtn) {
                    oldBtn.remove();
                }
                tTitle.textContent = "New Task";
                taskItem.id = "finderNewTaskBtn";
                taskItem.appendChild(tTitle);
                tasksNode.parentElement.appendChild(taskItem);
                taskItem.addEventListener("click", () => console.log(project.getId()));
            }
        }
    }
    colorItem(node, color) {
        node.style.borderColor = color;
        node.style.color = color;
    }
    clearSections() {
        const activities = document.querySelector(".finderActivities");
        const tasks = document.querySelector(".finderTasks");
        const btnTask = document.querySelector("#finderNewTaskBtn");
        const btnAct = document.querySelector("#finderNewActBtn");
        if (tasks) {
            tasks.innerHTML = "";
        }
        if (activities) {
            activities.innerHTML = "";
        }
        if (btnTask) {
            btnTask.remove();
        }
        if (btnAct) {
            btnAct.remove();
        }
    }
}
export default GuiTaskFinder;