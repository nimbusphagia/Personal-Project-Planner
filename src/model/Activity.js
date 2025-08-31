import Project from "./Project";
import Task from "./Task";

class Activity {
    #title;
    #priority;
    #description;
    #tasks;
    #status;
    #id;
    #projectId;
    static #nextId = 1;
    constructor(title, priority, description, tasks = []) {
        this.#title = title;
        this.#priority = priority;
        this.#description = description;
        this.#tasks = tasks;
        this.addBtnTask();
        this.#status = "ongoing";
        this.#id = this.#generateId();
    }
    //SET / GET
    getTitle() {
        return this.#title;
    }
    setTitle(title) {
        this.#title = title;
    }

    getPriority() {
        return this.#priority;
    }
    setPriority(priority) {
        this.#priority = priority;
    }

    getDescription() {
        return this.#description;
    }
    setDescription(description) {
        this.#description = description;
    }

    getTasks() {
        return this.#tasks;
    }
    setTasks(tasks) {
        this.#tasks = tasks;
    }

    getStatus() {
        return this.#status;
    }
    setStatus(status) {
        this.#status = status;
    }
    getId() {
        return this.#id;
    }
    setId(id) {
        this.#id = id;
    }
    getProjectId() {
        return this.#projectId;
    }
    setProjectId(projId) {
        this.#projectId = projId;
    }
    setBtnId() {
        this.#id = "BTN";
    }
    //METHODS 
    #generateId() {
        const rawNumber = Activity.#nextId++;
        return `AC${String(rawNumber).padStart(4, '0')}`;
    }
    addTask(task) {
        this.#tasks.push(task);
        task.setActivityId(this.#id);
        task.setProjectId(this.#projectId);
        this.addBtnTask();
    }
    getTaskById(taskId) {
        return this.#tasks.find(task => task.getId() == taskId) || null;
    }

    getTaskIndex(task) {
        return this.#tasks.findIndex(t => t === task);
    }
    deleteTask(task) {
        const index = this.getTaskIndex(task);
        if (index != -1) {
            this.#tasks.splice(index, 1);
        }
    }
    addBtnTask() {
        const lastTask = this.#tasks[this.#tasks.length - 1];

        if (lastTask && lastTask.getId() === "BTN") {
            return;
        }
        this.#tasks = this.#tasks.filter(task => task.getId() !== "BTN");

        const newBtn = new Task("+", "", "", []);
        newBtn.setBtnId();
        this.#tasks.push(newBtn);
        newBtn.setActivityId(this.#id);
        newBtn.setProjectId(this.#projectId);
    }
}
export default Activity;