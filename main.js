class TodoApp {

    todosArray = ['Implement the addTodo method', 
    'Implement the removeTodo method',
    'Implement the clearCompletedTodos method',
    'Implement the removeAllTodos method',
    'Implement the showHideCompletedTodos method',
    'Implement the toggleTodoCompleteStatus method',
];
    /**
     * @param {HTMLDivElement} todoArea
     */
    constructor(todoArea) {
        this.todoArea = todoArea;
        const todoSubmit = document.getElementById('new_todo_submit');
        const removeAll = document.getElementById('remove_all');

        todoSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            let todoInput = document.getElementById('new_todo_input').value
            if (todoInput == "") {
                alert('Please enter something into the text box');
            }
            else {
                this.addTodo(todoInput);
            }
        })
        removeAll.addEventListener('click', (e) => {
            e.preventDefault();
            this.removeAllTodos();
        })
    }

    /**
     * @param {HTMLInputElement} todoInput
     * uses push to add the new todo to the array and calls renerAll() to add 
     * the DOM to the screen
     */
    addTodo(todoInput) {
        this.todosArray.push(todoInput);
        this.activeTodo('Plus');
        this.renderAll(true);
    }

    /**
     * @param {number} todoId
     * removes a individual array item 
     */
    removeTodo(todoId) {
        let todoList = document.getElementById('todo_area');
        this.activeTodo('Minus');
        // needed as the filter below can't remove the last item in the list as 
        // it gets set to 0 and the filter is looking for it at 4
        if (this.todosArray.length <= 3) {
            let todoItem = document.getElementById(todoId);
            todoList.removeChild(todoItem);
            if (this.todosArray.length == 1) {
                this.todosArray = [];
            }
            return;
        }
        this.todosArray = this.todosArray.filter((element) => { 
            if (element == this.todosArray[todoId]) {
                let todoItem = document.getElementById(todoId);
                todoList.removeChild(todoItem);
                return false;
            }
            else {
                return true;
            }
        })
    }

    /**
     * @param {Number} Id
     * @param {Boolean} checked
     */
    clearCompletedTodos(Id, checked) {
        let todoList = document.getElementById('todo_area');
        let todoItem = document.getElementById(Id);
        console.log(todoItem);
        this.todosArray.filter((element) => {
            console.log(checked);
            if (checked == true && todoItem !== 'null') {
                try {
                    todoList.removeChild(todoItem);
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        console.log(e.message, e.name, e.lineNumber);
                    }
                }
                checked = false;
                return false;
            }
            else {
                return true;
            }
        })
    }

    /** 
     * removes all todo's from DOM & Empties the array
     */
    removeAllTodos() {
        let i = 0;
        this.todosArray.forEach(element => {
            let removal = document.getElementsByTagName('li')[i];
            removal.parentNode.removeChild(removal);
            this.activeTodo('Minus');
        });
        this.todosArray.splice(0, (this.todosArray.length));
    }

    /**
     * @param {Number} id
     * @param {Boolean} hide
     */
    showHideCompletedTodos(id, hide, checked) {
        this.todosArray.forEach((element) => {
            if (hide == true)
            {
                if (checked == true) {
                    document.getElementById(id).hidden = true;
                }
                else if (checked == false) {
                    return;
                }
                
            }
            else if (hide == false)
            {
                document.getElementById(id).hidden = false;
            }
            else {
                return;
            }
        })
    }

    /**
     * @param {Boolean} newTodo
     * Clarifies if this is a new todo or the startup so there is no duplicated 
     * todo's
     */
    renderAll(newTodo) {
        if (newTodo == true) {
            let id = this.todosArray.length -1;
            this.render(id);
        }
        else {
            for (let id = 0; id < this.todosArray.length; id++){
                this.render(id);
            }
        }
    }

    /**
     * @param {Number} id
     * Renders the entire list of the DOM
     */
    render(id) {
        const wrapper = document.createElement('li');
        wrapper.className = 'todo_row' + id;
        wrapper.setAttribute('id', id);

        const label = document.createElement('label');
        label.className = 'todo_label';
        label.innerText = this.todosArray[id];
        wrapper.appendChild(label);

        const toggle = document.createElement('input');
        toggle.className = 'todo_toggle';
        toggle.type = 'checkbox';
        toggle.checked = this.todosArray[id] ? false : true;
        wrapper.appendChild(toggle);

        const remove = document.createElement('button');
        remove.innerText = 'Remove';
        wrapper.appendChild(remove);
        this.todoArea.appendChild(wrapper);

        remove.addEventListener('click', (e) => {
            this.removeTodo(id);
        })
        const removeComplete = document.getElementById('remove_complete');
        removeComplete.addEventListener('click', (e) => {
            e.preventDefault();
            if (toggle.checked == true) {
                console.log(id);
                this.clearCompletedTodos(id, toggle.checked);
            }
        })

        toggle.addEventListener('change', (e) => {
            if (toggle.checked == true) {
                this.completedTodo('Plus');
                this.activeTodo('Minus');
            }
            else if (toggle.checked == false) {
                this.completedTodo('Minus');
                this.activeTodo('Plus');
            }
        })

        const toggleComplete = document.getElementById('toggle_complete');
        toggleComplete.addEventListener('change', (e) => {
            e.preventDefault();
            if (toggleComplete.checked == true) {
                this.showHideCompletedTodos(id, true, toggle.checked);
            }
            else if (toggleComplete.checked == false) {
                this.showHideCompletedTodos(id, false, toggle.checked);
            }
        })
    }
    activeTodo(change) {
        if (change == 'Plus') {
            let activeTodo = document.getElementById('active_todo').innerText;
            activeTodo++;
            document.getElementById('active_todo').innerText = activeTodo;
        }
        else if (change == 'Minus') {
            let activeTodo = document.getElementById('active_todo').innerText;
            activeTodo--;
            document.getElementById('active_todo').innerText = activeTodo;
        }
    }

    completedTodo(change) {
        if (change == 'Plus') {
            let completedTodo = document.getElementById('completed_todo').innerText;
            completedTodo++;
            document.getElementById('completed_todo').innerText = completedTodo;
        }
        else if (change == 'Minus') {
            let completedTodo = document.getElementById('completed_todo').innerText;
            completedTodo--;
            document.getElementById('completed_todo').innerText = completedTodo;

        }
    }
}

function main() {
    const todoArea = document.getElementById('todo_area');

    const app = new TodoApp(todoArea);
    app.renderAll(false);
}
window.addEventListener('DOMContentLoaded', main);