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

const mockProject1 = new Project("Title", "author", "beginning", "end", "Long ass description about super cool project...", [], "#362ff1ff");
const mockProject2 = new Project("Punk rock title", "author", "beginning", "end", "Long ass description about kinda lame project...", [], "#f12f46ff");
const mockProject3 = new Project("Very serious project", "author", "beginning", "end", "Long ass description about super serious project...", [], "#fb993eff");
const mockActivity1 = new Activity("Short a", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity2 = new Activity("Looong mock activity", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity3 = new Activity("Mock activity 3", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity4 = new Activity("Mock activity 4", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity5 = new Activity("Short a", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity6 = new Activity("Looong mock activity", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity7 = new Activity("Mock activity 3", "ongoing", "This activity focuses on doing stuff about the project", []);
const mockActivity8 = new Activity("Mock activity 4", "ongoing", "This activity focuses on doing stuff about the project", []);
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


const pjM = new ProjectManager();
pjM.addProject(mockProject1);
pjM.addProject(mockProject2);
pjM.addProject(mockProject3);

console.log(pjM.getContainer()[0]);
const sbControl = new GuiController(pjM);
sbControl.renderMenuContent();

//const session = new GuiSession("","",mockTasks);
