import "./css/main.css";
import GuiController from "./controller/GuiController";

const sbControl = new GuiController();
sbControl.renderMenuContent();
sbControl.enableSession();

//const session = new GuiSession("","",mockTasks);
