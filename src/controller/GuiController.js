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
    #projectCard;
    #activityCard;
    #mainWindow;
    #session;

    constructor() {
        this.#projectManager = new ProjectManager();
        this.startMockContent();
        this.#projectsMenu = document.querySelector(".sbBody");
        this.#projects = this.#projectManager.getContainer();
        this.#mainWindow = new SessionPopUp();
        this.#session = new GuiSession("", this.#projectManager);
        document.querySelector(".sbBtnNew").addEventListener("click", () => { this.createNewProject() });
    }
    getProjectCard() {
        return this.#projectCard;
    }
    setProjectCard(card) {
        this.#projectCard = card;
    }
    getActivityCard() {
        return this.#activityCard;
    }
    setActivityCard(card) {
        this.#activityCard = card;
    }
    getMainWindow() {
        return this.#mainWindow;
    }
    setMainWindow(window) {
        this.#mainWindow = window;
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
            pDiv.addEventListener("click", () => {
                this.createCard("project", p);
                this.showCard("project", this.#projectCard);
            });
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
        switch (type) {
            case "project":
                this.#projectCard = new ProjectCard(object);
                break;
            case "activity":
                this.#activityCard = new ActivityCard(object);
                break;
        }
    }
    showCard(type) {
        const popUp = new SessionPopUp("75%", "80%", this.#projectCard.getCard(), "projectCard", this.#projectCard.getHexColor());;
        switch (type) {
            case "project":
                this.setMainWindow(popUp);
                this.#mainWindow.renderWindow();
                document.querySelector(".projectDeleteBtn").addEventListener("click", () => this.#mainWindow.closeWindow());//CLOSE IF DELETED
                const activityBtns = document.querySelectorAll(".projectActivity");
                this.enableActivities(activityBtns, this.#mainWindow);

                break;
            case "activity":
                const color = this.#activityCard.getHexColor();
                this.#mainWindow.openSubWindow("activityCard", this.#activityCard.getCard(), color);
                document.querySelector(".subWindow").style.borderColor = color;
                if (document.querySelector(".activityBtnContainer")) {
                    document.querySelector(".activityDeleteBtn").style.color = color;
                    document.querySelector(".activityDeleteBtn").style.borderColor = color;
                    document.querySelector(".activityCompleteBtn").style.color = color;
                    document.querySelector(".activityCompleteBtn").style.borderColor = color;
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
        this.createCard("project", emptyProject);
        this.showCard("project");
        this.renderMenuContent();
    }
    createNewActivity(project) {
        const emptyActivity = new Activity("Title", "Casual", "What does this activity accomplish?", []);
        project.addActivity(emptyActivity);
        this.createCard("activity", emptyActivity)
        this.showCard("activity");
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

            btn.addEventListener("click", () => {
                this.createCard("activity", activity);
                const color = this.#activityCard.getHexColor();

                const activityWindow = this.#mainWindow.openSubWindow("activityCard", this.#activityCard.getCard(), color);
                const closeBtn = activityWindow.querySelector(".closeBtn");
                document.querySelector(".subWindow").style.borderColor = color;
                if (document.querySelector(".activityBtnContainer")) {
                    document.querySelector(".activityDeleteBtn").style.color = color;
                    document.querySelector(".activityDeleteBtn").style.borderColor = color;
                    document.querySelector(".activityCompleteBtn").style.color = color;
                    document.querySelector(".activityCompleteBtn").style.borderColor = color;
                }
            });
        }
    }
    editTask(activity, id, input) {
        const [projectId, activityId, taskId] = id.split("-");
        if (taskId == "BTN") {

            return
        }
        const task = activity.getTaskById(taskId);
        task.setTitle(input);

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
            const projectCard = document.querySelector("#sessionWindow");
            if (!projectCard) return;

            const projectId = projectCard.children[1]?.id;
            if (!projectId) return;

            let currentObject = null;

            // --- Project ---
            const project = this.#projectManager.getProjectById(projectId);
            if (!project) return;
            currentObject = project;
            const activityContainer = document.querySelector(".projectActivityContainer");
            // --- Activity (if any open) ---
            const activityCard = document.querySelector(".activityContent");
            if (activityCard) {
                const activityId = activityCard.id.split("-")[1];
                const activity = project.getActivityById(activityId);
                if (!activity) return;
                currentObject = activity;

                // --- Task (if any open) ---
                const taskCard = document.querySelector(".taskContent");
                if (taskCard) {
                    const taskId = taskCard.id.split("-")[1]; // fixed
                    const task = activity.getTaskById(taskId);
                    if (!task) return;
                    currentObject = task;
                }
            }

            console.log("Current object:", currentObject);
            //AFTER FINDING CURRENTOBJECT
            switch (true) {
                case currentObject instanceof Project:
                    // project-specific logic
                    projectCard.addEventListener("input", (e) => {
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
                    projectCard.addEventListener("click", (e) => {
                        const btn = e.target;
                        if (btn.tagName === "BUTTON") {
                            if (btn.classList.contains("projectDeleteBtn")) {
                                this.#projectManager.deleteProjectById(projectId);
                                this.renderMenuContent();
                            } else if (btn.classList.contains("projectCompleteBtn")) {
                                e.stopPropagation(); // 🔑 prevents duplicate handlers higher up
                                const status = currentObject.getStatus();
                                currentObject.setStatus(status === "Ongoing" ? "Completed" : "Ongoing");

                            } else if (btn.classList.contains("addActivity")) {
                                this.createNewActivity(project);
                                this.createCard("project", project);
                            }
                        }
                    });

                    break;

                case currentObject instanceof Activity:
                    // activity-specific logic
                    const activityCard = projectCard.querySelector(".activityCard");
                    activityCard.querySelector(".closeBtn").addEventListener("click", () => {
                        this.createCard("project", project);
                        this.showCard("project", this.#projectCard);
                    })
                    activityCard.addEventListener("input", (e) => {
                        const input = e.target;
                        if (input.tagName === "INPUT" || input.tagName === "TEXTAREA") {
                            if (input.classList.contains("activityTitle")) {
                                currentObject.setTitle(input.value);
                                let nodeId = "#" + currentObject.getProjectId() + "-" + currentObject.getId();
                                this.#projectCard.renderAllActivities(activityContainer);
                            } else if (input.classList.contains("activityPriority")) {
                                currentObject.setPriority(input.value);
                            } else if (input.classList.contains("activityDescription")) {
                                currentObject.setDescription(input.value);
                            }
                        }
                        //console.log("It's an Activity:", currentObject);
                    });
                    const taskContainer = activityCard.querySelector(".activityTasksContainer");
                    taskContainer.addEventListener("click", (e) => {
                        const input = e.target;
                        if (e.target.classList.contains("activityTask")) {
                            this.editTask(currentObject, e.target.id, input.value);
                        }

                    })
                    break;
                default:
                    console.log("Unknown type");
            }
        });
    }
    updateItemsContent(itemContainer, id, updatedValue, obj) {
        const item = itemContainer.querySelector(id);
        if (!item) {
            const newItem = document.createElement("div");
            newItem.classList.add("projectActivity", "btn");
            newItem.id = id.substring(1);
            newItem.textContent = updatedValue;

            this.styleActivityBtn(newItem, true, true, obj.getColor());

            itemContainer.appendChild(newItem);
            return;
        }
        item.textContent = updatedValue;
    }
    styleActivityBtn(node, border, fontColor, color) {
        if (border) {
            node.style.border = `2.2px solid ${color}`;
            node.style.borderRadius = "5px";
        }
        if (fontColor) {
            node.style.color = color;
        }
    }
}
export default GuiController;