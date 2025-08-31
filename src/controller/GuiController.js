import ProjectCard from "../GUI/ProjectCard";
import ActivityCard from "../GUI/ActivityCard";
import SessionPopUp from "../GUI/SessionPopUp";
import Project from "../model/Project";
import Activity from "../model/Activity";
import GuiSession from "../GUI/GuiSession";

class GuiController {
    #projectManager;
    #projectsMenu;
    #projects;
    #currentCard;
    #session;

    constructor(projectManager) {
        this.#projectManager = projectManager;
        this.#projectsMenu = document.querySelector(".sbBody");
        this.#projects = projectManager.getContainer();
        this.#session = new GuiSession("", projectManager);
        document.querySelector(".sbBtnNew").addEventListener("click", () => { this.createNewProject() });
    }
    getCurrentCard() {
        return this.#currentCard;
    }
    setCurrentCard(card) {
        this.#currentCard = card;
    }
    renderMenuContent() {
        this.#projectsMenu.innerHTML = "";
        for (const p of this.#projects) {
            const pDiv = document.createElement("div");
            pDiv.classList.add("sbProject", "btn");
            pDiv.id = p.getId();
            const pTitle = document.createElement("h3");
            pTitle.textContent = p.getTitle();
            pDiv.appendChild(pTitle);
            this.#projectsMenu.appendChild(pDiv);
            this.applyStyles(pDiv, p);

            const pCard = this.createCard("project", p);
            pDiv.addEventListener("click", () => this.showCard("project", pCard));
        }
    }
    createCard(type, object) {
        let card;
        switch (type) {
            case "project":
                card = new ProjectCard(object);
                break;
            case "activity":
                card = new ActivityCard(object);
                break;
        }

        return card;
    }
    showCard(type, card, id) {
        let popUp;
        switch (type) {
            case "project":
                popUp = new SessionPopUp("75%", "80%", card.getCard(), "projectCard", card.getHexColor());
                popUp.renderWindow();
                this.enableProjectDelete();
                const activityBtns = document.querySelectorAll(".projectActivity");
                this.enableActivities(activityBtns);
                break;
            case "activity":
                const projectId = id.split('-')[0];
                const cardColor = this.getProjectColor(projectId);
                popUp = new SessionPopUp("75%", "50%", card.getCard(), "activityCard", cardColor);
                popUp.renderWindow();
                const activityId = id.split('-')[1];
                const taskBtns = document.querySelectorAll(".activityTask");
                if (taskBtns) {
                    this.enableTasks(taskBtns, projectId, activityId);
                }

                if (document.querySelector(".activityBtnContainer")) {
                    document.querySelector(".activityDeleteBtn").style.color = cardColor;
                    document.querySelector(".activityDeleteBtn").style.borderColor = cardColor;
                    document.querySelector(".activityCompleteBtn").style.color = cardColor;
                    document.querySelector(".activityCompleteBtn").style.borderColor = cardColor;
                }
                break;
        }

    }
    applyStyles(node, projectObject) {
        node.style.borderColor = projectObject.getCardColor();
        node.style.color = projectObject.getCardColor();
    }
    createNewProject() {
        const emptyProject = new Project("Title", "Author", "Beginning", "End", "Long ass description about super cool project...", [], "#000000");
        this.#projectManager.addProject(emptyProject);
        this.showCard("project", this.createCard("project", emptyProject));
        this.renderMenuContent();
    }
    enableProjectDelete() {
        document.querySelector(".projectDeleteBtn").addEventListener("click", () => {
            const projectId = document.querySelector(".projectContent").id;
            console.log(projectId);
            this.#projectManager.deleteProjectById(projectId);
            this.renderMenuContent();
            console.log(this.#projectManager.getContainer());
        });
    }
    getProjectColor(projectId) {
        const index = this.#projectManager.getProjectIndexById(projectId);
        return this.#projects[index].getCardColor();
    }
    enableActivities(btns) {
        for (const btn of btns) {
            const actId = btn.id.split('-')[1];
            if (actId == "BTN") {
                return
            }
            const projectId = btn.id.split('-')[0];
            const pIndex = this.#projectManager.getProjectIndexById(projectId);
            const activity = this.#projects[pIndex].getActivityById(actId);
            const aCard = this.createCard("activity", activity);

            btn.addEventListener("click", () => this.showCard("activity", aCard, btn.id));
        }
    }
    enableTasks(btns, projectId, activityId) {
        for (const btn of btns) {
            btn.style.borderColor = this.getProjectColor(projectId);
            const taskId = btn.id;
            if (taskId == "BTN") {
                return
            }
            const pIndex = this.#projectManager.getProjectIndexById(projectId);
            const activity = this.#projects[pIndex].getActivityById(activityId);
            const task = activity.getTaskById(btn.id);
            btn.addEventListener("click", () => {
                if (task.getStatus() == "Ongoing") {
                    task.setStatus("Completed");
                    console.log(task);
                    btn.style.color = "#ffffff";
                    btn.style.backgroundColor = this.getProjectColor(projectId);
                }else if (task.getStatus() == "Completed") {
                    task.setStatus("Ongoing");
                    console.log(task);
                    btn.style.color = this.getProjectColor(projectId);
                    btn.style.backgroundColor = "transparent";
                }
            });
        }
    }
}
export default GuiController;