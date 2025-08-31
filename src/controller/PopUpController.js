class PopUpController{
    #popUp;
    #projectCard;
    #activityCard;
    #projectManager;
    constructor(projectManager){
        this.#projectManager = projectManager;
    }
    enableProjectDelete(){
        this.#projectCard = document.querySelector(".projectCard");
        const projectId = this.#projectCard.id;
        document.querySelector(".projectDeleteBtn").addEventListener("click", ()=>this.#projectManager.deleteProjectById(projectId));
        console.log(this.#projectManager.getContainer());
    }
}
export default PopUpController;