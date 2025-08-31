import Activity from "./Activity";

class Project {
    #title;
    #author;
    #beginningDate;
    #endDate;
    #description;
    #activities;
    #status;
    #cardColor;
    #id;
    static #nextId = 1;
    constructor(title, author, beginningDate, endDate, description, activities, cardColor) {
        this.#title = title;
        this.#author = author;
        this.#beginningDate = beginningDate;
        this.#endDate = endDate;
        this.#description = description;
        this.#activities = activities;
        this.addBtnActivity();
        this.#status = "ongoing";
        this.#cardColor = cardColor;
        this.#id = this.#generateId();
    }
    //SET / GET
    getId() {
        return this.#id;
    }
    getTitle() {
        return this.#title;
    }
    setTitle(title) {
        this.#title = title;
    }

    getAuthor() {
        return this.#author;
    }
    setAuthor(author) {
        this.#author = author;
    }

    getBeginningDate() {
        return this.#beginningDate;
    }
    setBeginningDate(beginningDate) {
        this.#beginningDate = beginningDate;
    }

    getEndDate() {
        return this.#endDate;
    }
    setEndDate(endDate) {
        this.#endDate = endDate;
    }
    getDescription() {
        return this.#description;
    }
    setDescription(description) {
        this.#description = description;
    }
    getActivities() {
        return [...this.#activities];
    }

    setActivities(activities) {
        this.#activities = activities;
    }

    getStatus() {
        return this.#status;
    }
    setStatus(status) {
        this.#status = status;
    }

    getCardColor() {
        return this.#cardColor;
    }
    setCardColor(cardColor) {
        this.#cardColor = cardColor;
    }
    //METHODS
    #generateId() {
        const rawNumber = Project.#nextId++;
        return `PR${String(rawNumber).padStart(4, '0')}`;
    }

    getActivityById(activityId) {
        return this.#activities.find(activity => activity.getId() == activityId) || null;
    }
    getActivityIndex(activity) {
        return this.#activities.findIndex(a => a === activity);
    }


    deleteActivity(activity) {
        const index = this.getActivityIndex(activity);
        if (index != -1) {
            this.#activities.splice(index, 1);
        }
    }
    addBtnActivity() {
        // Remove any existing BTN
        this.#activities = this.#activities.filter(activity => activity.getId() !== "BTN");

        // Add new BTN at the end
        const newBtn = new Activity("+", "", "", []);
        newBtn.setBtnId();
        newBtn.setProjectId(this.#id);
        this.#activities.push(newBtn);
    }


    addActivity(activity) {
        activity.setProjectId(this.#id);
        this.#activities.push(activity);
        this.addBtnActivity();
    }

}

export default Project;