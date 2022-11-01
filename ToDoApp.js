window.addEventListener('load', () => {
    todos=JSON.parse(localStorage.getItem('todos')) || [];

    const nameInput=document.querySelector('#name');
    const newTask=document.querySelector('#write-a-task');

    const username=localStorage.getItem('username') || '';
    nameInput.value=username;

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })

    newTask.addEventListener('submit', e => {
        e.preventDefault();
        const todo={
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            time: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset(); //reset the form

        displayTaskList();
    })

    displayTaskList();
})

    function displayTaskList(){
        const taskList=document.querySelector('#task-list');
        taskList.innerHTML='';
        todos.forEach(todo => {
            const todoItem=document.createElement('div');
            todoItem.classList.add('todo-item');

            const label=document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const edit = document.createElement('button');
            const deleteButton = document.createElement('button');

            input.type='checkbox';
            input.checked=todo.done;
            span.classList.add('bubble');

            if(todo.category === 'work'){
                span.classList.add('work');
            }

            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit.classList.add('edit-button');
            deleteButton.classList.add('delete-button');

            content.innerHTML=`<input type="text" value="${todo.content}" readonly>`;
            edit.innerHTML='Edit';
            deleteButton.innerHTML='Delete';

            label.appendChild(input);
            label.appendChild(span);

            actions.appendChild(edit);
            actions.appendChild(deleteButton);

            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            taskList.appendChild(todoItem);
            
            if (todo.done) {
                todoItem.classList.add('done');
            }
    
            input.addEventListener('change', (e) => {
                todo.done = e.target.checked;
                localStorage.setItem('todos', JSON.stringify(todos));
    
                if (todo.done) {
                    todoItem.classList.add('done');
                } else {
                    todoItem.classList.remove('done');
                }
    
                displayTaskList();
    
            })

            edit.addEventListener('click', (e) =>{
                const input=content.querySelector('input');
                input.removeAttribute('readonly');
                input.focus();
                input.addEventListener('blur', (e) =>{
                    input.setAttribute('readonly', true);
                    todo.content=e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    displayTaskList()
                })
            })

            deleteButton.addEventListener('click', (e) =>{
                todos=todos.filter(function(t){
                    return t!==todo;
                })
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTaskList();
            })
        }) 
    }
