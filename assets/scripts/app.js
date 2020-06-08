class DOMHelper {
    static moveElement(elementId, destinationSelector) {
        const element = document.getElementById(elementId);
        const destination = document.querySelector(destinationSelector);
        destination.append(element);
    }

    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }
}

class ProjectItem {
    constructor(id, updateProjectListFunction, type) {
        this.id = id;
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectSwitchButton(type);
    }

    connectSwitchButton(type) {
        const projectElement = document.getElementById(this.id);
        let switchBtn = projectElement.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchBtn.addEventListener(
            'click',
            this.updateProjectListHandler.bind(null, this.id)
        );
    }

    update(updateProjectListFunction, type) {
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;
        const projectList = document.querySelectorAll(
            `section#${type}-projects li`
        );
        for (const project of projectList) {
            this.projects.push(
                new ProjectItem(
                    project.id,
                    this.switchProject.bind(this),
                    this.type
                )
            );
        }
    }

    setSwitchProjectHandler(switchProjectHandlerFunction) {
        this.switchProjectHandler = switchProjectHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projectId) {
        this.switchProjectHandler(
            this.projects.find((project) => project.id === projectId)
        );
        this.projects = this.projects.filter(
            (project) => project.id !== projectId
        );
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
        activeProjectList.setSwitchProjectHandler(
            finishedProjectList.addProject.bind(finishedProjectList)
        );
        finishedProjectList.setSwitchProjectHandler(
            activeProjectList.addProject.bind(activeProjectList)
        );
    }
}

App.init();
