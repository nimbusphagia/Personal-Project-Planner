import Project from "./Project";
import Activity from "./Activity";

class ProjectManager {
    #container;
    #casualProject;
    constructor() {
        this.#container = [];

        const defaultCasualActivity = new Activity("Casual Activity", "casual", "Change the world.", []);
        this.#casualProject = new Project("Casual Project", "author", "Today", "Undefined", "My final words...", [], "#000000");
        this.#casualProject.addActivity(defaultCasualActivity);
        this.addProject(this.#casualProject);
    }
    getContainer() {
        return this.#container;
    }
    setContainer(container) {
        this.#container = container;
    }
    addProject(project) {
        this.#container.push(project);
    }
    getProjectIndexById(projectId) {
        const index = this.#container.findIndex(p => p.getId() === projectId);
        return index !== -1 ? index : null;
    }

    deleteProjectById(id) {
        const index = this.getProjectIndexById(id);
        this.#container.splice(index, 1);
    }
    getTaskById(projectId, activityId, taskId){
        const project = this.#container[this.getProjectIndexById(projectId)];
        const activity = project.getActivityById(activityId);
        const task = activity.getTaskById(taskId);
        return task;
    }
}

export default ProjectManager;
