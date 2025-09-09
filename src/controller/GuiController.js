import ProjectCard from "../GUI/ProjectCard";
import ActivityCard from "../GUI/ActivityCard";
import TaskCard from "../GUI/TaskCard";
import SessionPopUp from "../GUI/SessionPopUp";
import Project from "../model/Project";
import Activity from "../model/Activity";
import Task from "../model/Task";
import GuiSession from "../GUI/GuiSession";
import ProjectManager from "../model/ProjectManager";


class GuiController {
    #projectManager;
    #projectsMenu;
    #projects;
    #currentCard;
    #session;

    constructor() {
        this.#projectManager = new ProjectManager();
        this.startMockContent();
        this.#projectsMenu = document.querySelector(".sbBody");
        this.#projects = this.#projectManager.getContainer();
        this.#session = new GuiSession("", this.#projectManager);
        document.querySelector(".sbBtnNew").addEventListener("click", () => { this.createNewProject() });
    }
    getCurrentCard() {
        return this.#currentCard;
    }
    setCurrentCard(card) {
        this.#currentCard = card;
    }
    start() {
        this.renderMenuContent();
        this.enableSession();
        this.enableInput();
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
    startMockContent() {
        const mockProject1 = new Project("Title", "author", "beginning", "end", "Long ass description about super cool project...", [], "#362ff1ff");
        const mockProject2 = new Project("Punk rock title", "author", "beginning", "end", "Long ass description about kinda lame project...", [], "#f12f46ff");
        const mockProject3 = new Project("Very serious project", "author", "beginning", "end", "Long ass description about super serious project...", [], "#fb993eff");
        const mockActivity1 = new Activity("Short a", "Ongoing", "This activity focuses on doing stuff about the project", []);
        const mockActivity2 = new Activity("Looong mock activity", "Ongoing", "This activity focuses on doing stuff about the project", []);
        const mockActivity3 = new Activity("Mock activity 3", "Ongoing", "This activity focuses on doing stuff about the project", []);
        const mockActivity4 = new Activity("Mock activity 4", "Ongoing", "This activity focuses on doing stuff about the project", []);
        const mockActivity5 = new Activity("Short a", "Ongoing", "This activity focuses on doing stuff about the project", []);
        const mockActivity6 = new Activity("Looong mock activity", "Ongoing", "This activity focuses on doing stuff about the project", []);
        const mockActivity7 = new Activity("Mock activity 3", "Ongoing", "This activity focuses on doing stuff about the project", []);
        const mockActivity8 = new Activity("Mock activity 4", "Ongoing", "This activity focuses on doing stuff about the project", []);
        const mockTask1 = new Task("Try hard!");
        const mockTask2 = new Task("Try harder!");
        const mockTask3 = new Task("Try harderer!");
        const mockTask4 = new Task("You've tried enough...");

        mockProject1.addActivity(mockActivity1);
        mockProject1.addActivity(mockActivity2);
        mockProject1.addActivity(mockActivity3);
        mockProject1.addActivity(mockActivity4);
        mockProject2.addActivity(mockActivity5);
        mockProject2.addActivity(mockActivity6);
        mockProject2.addActivity(mockActivity7);
        mockProject2.addActivity(mockActivity8);
        mockActivity2.addTask(mockTask1);
        mockActivity2.addTask(mockTask2);
        mockActivity5.addTask(mockTask3);
        mockActivity5.addTask(mockTask4);


        this.#projectManager.addProject(mockProject1);
        this.#projectManager.addProject(mockProject2);
        this.#projectManager.addProject(mockProject3);
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
            case "task":
                card = new TaskCard(object);
        }

        return card;
    }
    showCard(type, card, id) {
        let popUp;
        switch (type) {
            case "project":
                popUp = new SessionPopUp("75%", "80%", card.getCard(), "projectCard", card.getHexColor());
                popUp.renderWindow();
                document.querySelector(".projectDeleteBtn").addEventListener("click", () => popUp.closeWindow());//CLOSE IF DELETED
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
            case "task":
                const idList = id.split("-");
                console.log(idList);
                const taskPopUp = popUp = new SessionPopUp("20%", "30%", card.getCard(), "taskCard", this.getProjectColor(idList[0]));
                popUp.renderWindow();
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
    createNewActivity(project) {
        const emptyActivity = new Activity("Title", "Casual", "What does this activity accomplish?", []);
        project.addActivity(emptyActivity);
        this.showCard("activity", this.createCard("activity", emptyActivity));
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
            const ids = btn.id.split("-");
            const taskId = ids[2];
            if (taskId == "BTN") {
                return
            }
            const pIndex = this.#projectManager.getProjectIndexById(projectId);
            const activity = this.#projects[pIndex].getActivityById(activityId);
            const task = activity.getTaskById(taskId);
            const tCard = this.createCard("task", task);
            this.colorTaskStatus(btn, task);
            btn.addEventListener("click", () => this.showCard("task", tCard, btn.id));
        }
    }
    changeTaskStatus(taskItem) {
        const ids = taskItem.id.split("-");
        const task = this.#projectManager.getTaskById(ids[0], ids[1], ids[2]);

        if (task.getStatus() === "Completed") {
            task.setStatus("Ongoing");
            taskItem.classList.add("Ongoing");
            taskItem.classList.remove("Completed");
        } else if (task.getStatus() === "Ongoing") {
            task.setStatus("Completed");
            taskItem.classList.add("Completed");
            taskItem.classList.remove("Ongoing");
        }

        this.colorTaskStatus(taskItem, task);
        this.renderMenuContent();
        console.log(task);
    }

    enableSession() {
        this.#session.enableNewBtn();
        const sessionContainer = document.querySelector(".sessionContainer");
        sessionContainer.addEventListener("click", (e) => {
            const container = document.querySelector(".sessionTaskContainer");
            if (!container) {
                return;
            }
            if (e.target.classList.contains("sessionTask")) {
                this.changeTaskStatus(e.target);
            }
        });
    }
    colorTaskStatus(taskItem, taskObj) {
        if (taskItem.classList.contains("Completed")) {
            taskItem.style.backgroundColor = taskObj.getProjectColor();
            taskItem.style.color = "white";
        }
        if (taskItem.classList.contains("Ongoing")) {
            taskItem.style.backgroundColor = "white";
            taskItem.style.color = taskObj.getProjectColor();
        }
    }
    enableInput() {
        document.body.addEventListener("click", (e) => {
            const objectCard = document.querySelector("#sessionWindow");
            if (!objectCard) return;

            const nodeId = objectCard.children[1]?.id;
            if (!nodeId) return;

            const [projectId, activityId, taskId] = nodeId.split("-");
            let currentObject = null;

            const project = projectId && this.#projectManager.getProjectById(projectId);
            if (!project) return;

            currentObject = project;

            if (activityId) {
                const activity = project.getActivityById(activityId);
                if (!activity) return;

                currentObject = activity;

                if (taskId) {
                    const task = activity.getTaskById(taskId);
                    if (!task) return;

                    currentObject = task;
                }
            }
            //AFTER FINDING CURRENTOBJECT
            switch (true) {
                case currentObject instanceof Project:
                    // project-specific logic
                    objectCard.addEventListener("input", (e) => {
                        const input = e.target;
                        if (input.tagName === "INPUT" || input.tagName === "TEXTAREA") {
                            if (input.classList.contains("projectTitle")) {
                                currentObject.setTitle(input.value);
                            } else if (input.classList.contains("projectAuthor")) {
                                currentObject.setAuthor(input.value);
                            } else if (input.classList.contains("projectStart")) {
                                currentObject.setBeginningDate(input.value);
                            } else if (input.classList.contains("projectEnd")) {
                                currentObject.setEndDate(input.value);
                            } else if (input.classList.contains("projectColor")) {
                                currentObject.setCardColor(input.value);
                            } else if (input.classList.contains("projectDescription")) {
                                currentObject.setDescription(input.value);
                            }
                        }
                        this.renderMenuContent();
                    });
                    //ENABLE PROJECT BUTTONS
                    objectCard.addEventListener("click", (e) => {
                        const btn = e.target;
                        if (btn.tagName === "BUTTON") {
                            if (btn.classList.contains("projectDeleteBtn")) {
                                this.#projectManager.deleteProjectById(projectId);
                                this.renderMenuContent();
                            } else if (btn.classList.contains("projectCompleteBtn")) {
                                e.stopPropagation(); // 🔑 prevents duplicate handlers higher up
                                const status = currentObject.getStatus();
                                currentObject.setStatus(status === "Ongoing" ? "Completed" : "Ongoing");
                                console.log("New status:", currentObject.getStatus());
                            }
                        }
                    });

                    break;

                case currentObject instanceof Activity:
                    // activity-specific logic
                    objectCard.addEventListener("input", (e) => {
                        const input = e.target;
                        if (input.tagName === "INPUT" || input.tagName === "TEXTAREA") {
                            if (input.classList.contains("activityTitle")) {
                                currentObject.setTitle(input.value);
                            } else if (input.classList.contains("activityPriority")) {
                                currentObject.setAuthor(input.value);
                            } else if (input.classList.contains("activityDescription")) {
                                currentObject.setBeginningDate(input.value);
                            }
                        }
                        console.log("It's an Activity:", currentObject);
                    });
                    break;

                case currentObject instanceof Task:
                    console.log("It's a Task:", currentObject.getTitle());
                    // task-specific logic
                    break;

                default:
                    console.log("Unknown type");
            }
        });
    }


}
export default GuiController;