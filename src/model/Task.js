
class Task {
    #title;
    #status;
    #id;
    #activityId;
    #projectId;
    #projectColor;
    static #nextId = 1;
    constructor(title) {
        this.#title = title;
        this.#status = "Ongoing";
        this.#id = this.#generateId();
    }
    /*constructor(title, activityid, projectId) {
        this.#title = title;
        this.#status = "Ongoing";
        this.#id = this.#generateId();
        this.#activityId = activityid;
        this.#projectId = projectId;
    }*/
    //GET /SET
    getTitle() {
        return this.#title;
    }
    setTitle(title) {
        this.#title = title;
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
    getActivityId() {
        return this.#activityId;
    }
    setActivityId(actId) {
        this.#activityId = actId;
    }
    getProjectColor(){
        return this.#projectColor;
    }
    setProjectColor(color){
        this.#projectColor = color;
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
        const rawNumber = Task.#nextId++;
        return `TA${String(rawNumber).padStart(4, '0')}`;
    }
}
export default Task;