import "./css/main.css";
import SessionPopUp from "./GUI/SessionPopUp";
import Project from "./model/Project";
import ProjectCard from "./GUI/ProjectCard";
import Activity from "./model/Activity";
import Task from "./model/Task";
import ProjectManager from "./model/ProjectManager";
import PopUpController from "./controller/PopUpController";
import GuiController from "./controller/GuiController";
import GuiSession from "./GUI/GuiSession";


const mockActivity1 = new Activity("Short a", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity2 = new Activity("Looong mock activity", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockTask1 = new Task("Try hard!");
const mockTask2 = new Task("Try harder!");
const mockTask3 = new Task("Try harderer!");
const mockTask4 = new Task("You've tried enough...");
const mockActivity3 = new Activity("Mock activity 3", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity4 = new Activity("Mock activity 4", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity5 = new Activity("Mock activity 5", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivityArray = [mockActivity1, mockActivity2, mockActivity3, mockActivity4, mockActivity5];

const mockProject = new Project("Title", "author", "beginning", "end", "Long ass description about super cool project...", [], "#362ff1ff");
for (const a of mockActivityArray) {
    mockProject.addActivity(a);
}
const mockProject2 = new Project("Punk rock title", "author", "beginning", "end", "Long ass description about kinda lame project...", [], "#f12f46ff");
for (const a of mockActivityArray) {
    mockProject2.addActivity(a);
}
const mockProject3 = new Project("Very serious project", "author", "beginning", "end", "Long ass description about super serious project...", [], "#fb993eff");
for (const a of mockActivityArray) {
    mockProject3.addActivity(a);
}
mockActivity4.addTask(mockTask1);
mockActivity4.addTask(mockTask2);
mockActivity4.addTask(mockTask3);
mockActivity4.addTask(mockTask4);

const pjM = new ProjectManager();
pjM.addProject(mockProject);
pjM.addProject(mockProject3);
pjM.addProject(mockProject2);

console.log(pjM.getContainer()[0]);
const sbControl = new GuiController(pjM);
sbControl.renderMenuContent();

//const session = new GuiSession("","",mockTasks);
