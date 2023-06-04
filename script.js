class Task {
    constructor() {
        this.text = '';
        this.isDone = false;
        this.div = null;
    }

    createIn(element) {
        this.div = document.createElement('div');
        this.div.classList.add('task');

        let textDiv = document.createElement('div'); // Создаем отдельный div для текста задачи
        let imageDiv = document.createElement('div'); // Создаем отдельный div для картинок
        imageDiv.classList.add('image-container');

        let remove = document.createElement('img');
        let change = document.createElement('img');

        let input = document.createElement('input');
        input.addEventListener('click', () => this.changeState(this.div));
        remove.addEventListener('click', () => this.removeDiv());
        change.addEventListener('click', () => this.changeDiv(textDiv));
        input.type = 'checkbox';
        remove.src = '216658.png';
        change.src = 'png-transparent-action-compose-edit-new-pencil-basic-actions-set-icon.png';

        remove.classList.add('remove-image');
        imageDiv.append(remove); // Добавляем картинку remove в отдельный div
        change.classList.add('change-image');
        imageDiv.append(change); // Добавляем картинку change в отдельный div

        let p = document.createElement('p');
        p.innerText = this.text;
        textDiv.append(p); // Добавляем текстовый элемент в отдельный div

        this.div.append(input);
        this.div.append(textDiv); // Добавляем div с текстом после input
        this.div.append(imageDiv); // Добавляем div с картинками после div с текстом

        element.append(this.div);
    }

    changeState(element) {
        this.isDone = !this.isDone;
        element.classList.toggle('completed');
    }
    removeDiv(){
        if (this.div && this.div.parentNode) {
            this.div.parentNode.removeChild(this.div);
        }
    }
    changeDiv(textDiv){
        let input = document.createElement('input');
        input.type = 'text';
        input.value = this.text;

        input.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                this.text = input.value;
                let p = document.createElement('p');
                p.innerText = this.text;

                textDiv.innerHTML = ''; // Очищаем содержимое textDiv
                textDiv.append(p); // Добавляем новый параграф с обновленным текстом
            }
        });

        textDiv.innerHTML = ''; // Очищаем содержимое textDiv
        textDiv.append(input); // Добавляем input вместо параграфа
    }
}

let taskNameInput = document.querySelector('#task-name-input');
let addTaskButton = document.querySelector('#add-task-btn');
let startMessage = document.querySelector('#start-message');
let taskList = document.querySelector('.task-list');

addTaskButton.addEventListener('click', addTaskHandler);

taskNameInput.addEventListener('keydown', function (e) {
    if (e.code == 'Enter') addTaskHandler();
});

function addTaskHandler() {
    if (taskNameInput.value) {
        if (!startMessage.hidden) startMessage.hidden = true;

        let newTask = new Task();
        newTask.text = taskNameInput.value;
        newTask.isDone = false;
        newTask.createIn(taskList);

        taskNameInput.value = '';
    } else {
        alert('Введите имя задачи');
    }
}
