import GuiTaskFinder from "./GuiTaskFinder";
class GuiSession {
    #numDivs; //min 1 max 4
    #taskFinder; //maybe remove it from this class
    #sessionContainer;
    #card;
    #sessionTasks;
    constructor(numDivs, projectManager) {
        this.#sessionContainer = document.querySelector(".sessionContainer");
        this.#numDivs = numDivs;
        this.#sessionTasks = {
            div1: [],
            div2: [],
            div3: [],
            div4: []
        }
        this.#taskFinder = new GuiTaskFinder(projectManager);
        this.#card = document.createElement("div");
        this.#card.classList.add("activeSession");
        this.enableNewBtn();
    }
    //GET SET
    getNumDivs() {
        return this.#numDivs;
    }
    setNumDivs(numDivs) {
        this.#numDivs = numDivs;
    }
    getTaskFinder() {
        return this.#taskFinder;
    }
    setTaskFinder(taskFinder) {
        this.#taskFinder = taskFinder;
    }
    //METHODS
    emptySession() {
        this.#sessionContainer.innerHTML = "";
    }
    restartSession() {
        const newBtn = document.createElement("button");
        newBtn.setAttribute("type", "button");
        newBtn.classList.add("sessionStart", "btn");
        this.#sessionContainer.appendChild(newBtn);
    }
    divideCard() {
        let division1, division2, division3, division4;
        let container1, container2, container3, container4;
        switch (this.#numDivs) {
            case 1:
                division1 = this.createDiv("Tasks");
                division1.classList.add("section1Container");
                container1 = division1.querySelector(".sessionTaskContainer");
                this.populateDiv(this.#sessionTasks.div1, "tasksContainer1", container1);
                break;
            case 2:
                division1 = this.createDiv("First Half");
                division1.classList.add("section1Container");
                container1 = division1.querySelector(".sessionTaskContainer");

                division2 = this.createDiv("Second Half");
                division2.classList.add("section2Container");
                container2 = division2.querySelector(".sessionTaskContainer");

                this.populateDiv(this.#sessionTasks.div1, "tasksContainer1", container1);
                this.populateDiv(this.#sessionTasks.div2, "tasksContainer2", container2);

                break;
            case 3:
                division1 = this.createDiv("Morning");
                division1.classList.add("threewayDiv", "section1Container");
                container1 = division1.querySelector(".sessionTaskContainer");

                division2 = this.createDiv("Afternoon");
                division2.classList.add("threewayDiv", "section2Container");
                container2 = division2.querySelector(".sessionTaskContainer");

                division3 = this.createDiv("Night");
                division3.classList.add("threewayDiv", "section3Container");
                container3 = division3.querySelector(".sessionTaskContainer");

                this.populateDiv(this.#sessionTasks.div1, "tasksContainer1", container1);
                this.populateDiv(this.#sessionTasks.div2, "tasksContainer2", container2);
                this.populateDiv(this.#sessionTasks.div3, "tasksContainer3", container3);
                break;
            case 4:
                division1 = this.createDiv("Section Title");
                division1.classList.add("section1Container");
                container1 = division1.querySelector(".sessionTaskContainer");

                division2 = this.createDiv("Section Title");
                division2.classList.add("section2Container");
                container2 = division2.querySelector(".sessionTaskContainer");

                division3 = this.createDiv("Section Title");
                division3.classList.add("section3Container");
                container3 = division3.querySelector(".sessionTaskContainer");

                division4 = this.createDiv("Section Title");
                division4.classList.add("section4Container");
                container4 = division4.querySelector(".sessionTaskContainer");

                this.populateDiv(this.#sessionTasks.div1, "tasksContainer1", container1);
                this.populateDiv(this.#sessionTasks.div2, "tasksContainer2", container2);
                this.populateDiv(this.#sessionTasks.div3, "tasksContainer3", container3);
                this.populateDiv(this.#sessionTasks.div4, "tasksContainer4", container4);
                break;
                break;
        }
    }
    createDiv(divTitle = "Section Title") {
        const div = document.createElement("div");
        div.classList.add("sessionDiv");
        const title = document.createElement("h2");
        title.textContent = divTitle;
        title.classList.add("sectionTitle");
        const tasksContainer = document.createElement("div");
        tasksContainer.classList.add("sessionTaskContainer");
        div.appendChild(title);
        div.appendChild(tasksContainer);
        this.#card.appendChild(div);
        return div;
    }
    applyDivStyles() {
        const div1 = document.querySelector(".section1Container");
        const div2 = document.querySelector(".section2Container");
        const div3 = document.querySelector(".section3Container");
        const div4 = document.querySelector(".section4Container");
        const titles = this.#card.querySelectorAll(".sectionTitle");
        switch (this.#numDivs) {
            case 1:
                this.#card.style.display = "grid";
                this.#card.style.gridTemplateColumns = "1fr";
                div1.style.display = "grid";
                div1.style.gridTemplateRows = "1.5fr 15fr";
                for (const t of titles) {
                    t.style.gridRow = "1/2";
                    t.style.margin = "auto";
                    t.style.borderBottom = "2px solid black";
                }
                break;
            case 2:
                this.#card.style.display = "grid";
                this.#card.style.gridTemplateColumns = "1fr 1fr";
                div1.style.display = "grid";
                div2.style.display = "grid";
                div1.style.gridTemplateRows = "1.5fr 15fr";
                div2.style.gridTemplateRows = "1.5fr 15fr";
                div1.style.borderRight = "1px solid black";
                div2.style.borderLeft = "1px solid black";
                for (const t of titles) {
                    t.style.gridRow = "1/2";
                    t.style.margin = "auto";
                }
                break;
            case 3:
                this.#card.style.display = "grid";
                this.#card.style.gridTemplateColumns = "1fr 1fr 1fr";
                div1.style.display = "grid";
                div2.style.display = "grid";
                div3.style.display = "grid";
                div1.style.gridTemplateRows = "1.5fr 15fr";
                div2.style.gridTemplateRows = "1.5fr 15fr";
                div3.style.gridTemplateRows = "1.5fr 15fr";
                div1.style.borderRight = "2px solid black";
                div3.style.borderLeft = "2px solid black";
                for (const t of titles) {
                    t.style.gridRow = "1/2";
                    t.style.margin = "auto";
                }
                break;
            case 4:
                this.#card.style.display = "grid";
                this.#card.style.gridTemplateColumns = "1fr 1fr";
                this.#card.style.gridTemplateRows = "1fr 1fr";
                div1.style.display = "grid";
                div2.style.display = "grid";
                div3.style.display = "grid";
                div4.style.display = "grid";
                div1.style.gridTemplateRows = "1.5fr 6.75fr";
                div2.style.gridTemplateRows = "1.5fr 6.75fr";
                div3.style.gridTemplateRows = "1.5fr 6.75fr";
                div4.style.gridTemplateRows = "1.5fr 6.75fr";
                div1.style.borderRight = "1px solid black";
                div1.style.borderBottom = "1px solid black";
                div2.style.borderLeft = "1px solid black";
                div2.style.borderBottom = "1px solid black";
                div3.style.borderRight = "1px solid black";
                div3.style.borderTop = "1px solid black";
                div4.style.borderLeft = "1px solid black";
                div4.style.borderTop = "1px solid black";
                for (const t of titles) {
                    t.style.gridRow = "1/2";
                    t.style.margin = "auto";
                }
                break;
        }
    }
    populateDiv(tasksDiv, divClass, parentContainer) {
        let sessionTasks = parentContainer.querySelector("." + divClass);
        if (!sessionTasks) {
            sessionTasks = document.createElement("div");
            sessionTasks.classList.add("divTasks", divClass);
            parentContainer.appendChild(sessionTasks);
        } else {
            sessionTasks.innerHTML = "";
        }


        for (const task of tasksDiv) {
            const taskBtn = document.createElement("button");
            taskBtn.classList.add("sessionTask");
            taskBtn.setAttribute("type", "button");
            taskBtn.textContent = task.getTitle();
            sessionTasks.appendChild(taskBtn);
        }
        const addBtn = document.createElement("button");
        addBtn.classList.add("btn", "addTaskBtn");
        addBtn.setAttribute("type", "button");
        addBtn.textContent = "Add Task";
        parentContainer.appendChild(sessionTasks);
        parentContainer.appendChild(addBtn);

        addBtn.addEventListener("click",()=>this.#taskFinder.renderWindow());
    }
    enableNewBtn() {
        const startBtn = document.querySelector(".sessionStart");
        startBtn.addEventListener("click", () => {
            this.promptDivisions(startBtn)
        })
    }
    startSession() {
        this.emptySession();
        this.divideCard();
        this.#sessionContainer.appendChild(this.#card);
        this.applyDivStyles();
    };
    promptDivisions(startBtn) {
        const promptWindow = document.createElement("div");
        promptWindow.classList.add("sessionStart", "promptWindow");
        const firstOption = document.createElement("div");
        firstOption.classList.add("firstPrompt", "btn");
        const secOption = document.createElement("div");
        secOption.appendChild(document.createElement("div"));
        secOption.appendChild(document.createElement("div"));
        secOption.classList.add("secPrompt", "btn");
        const thirdOption = document.createElement("div");
        thirdOption.appendChild(document.createElement("div"));
        thirdOption.appendChild(document.createElement("div"));
        thirdOption.appendChild(document.createElement("div"));
        thirdOption.classList.add("thirdPrompt", "btn");
        const fourthOption = document.createElement("div");
        fourthOption.appendChild(document.createElement("div"));
        fourthOption.appendChild(document.createElement("div"));
        fourthOption.appendChild(document.createElement("div"));
        fourthOption.appendChild(document.createElement("div"));
        fourthOption.classList.add("fourthPrompt", "btn");
        promptWindow.appendChild(firstOption);
        promptWindow.appendChild(secOption);
        promptWindow.appendChild(thirdOption);
        promptWindow.appendChild(fourthOption);

        this.emptySession();
        this.#sessionContainer.appendChild(promptWindow);
        const icons = [firstOption, secOption, thirdOption, fourthOption];
        for (const i of icons) {
            i.addEventListener("click", () => {
                switch (i.classList[0]) {
                    case "firstPrompt":
                        this.#numDivs = 1;
                        this.startSession();
                        break;
                    case "secPrompt":
                        this.#numDivs = 2;
                        this.startSession();
                        break;
                    case "thirdPrompt":
                        this.#numDivs = 3;
                        this.startSession();
                        break;
                    case "fourthPrompt":
                        this.#numDivs = 4;
                        this.startSession();
                        break;
                }
            });
        }
    }
}

export default GuiSession;