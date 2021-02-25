var insert = document.getElementById('insert');
var inputbox = document.getElementById('inputbox');
var filter = document.getElementById('filter');

var todo__alllist = document.querySelector('.todo__all-list');
var todo__filtercheckall = document.querySelector('.todo__filter-checkall');
var inputcheckbox = document.getElementById('input-checkbox');

function addList(itemname) {
    let input = document.createElement('input');
    input.value = itemname;
    input.disabled = true;
    input.classList.add('todo__input');
    input.type = 'text';

    saveLocalTodo(itemname);

    let itemBox = document.createElement('div');
    itemBox.classList.add('todo__single-list');

    let editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa fa-edit"></i>';
    editButton.classList.add('todo__edit-btn');

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.classList.add('todo__delete-btn');

    let comButton = document.createElement('button');
    comButton.innerHTML = '<i class="fa fa-check"></i>';
    comButton.classList.add('todo__complate-btn');

    let checkboxButton = document.createElement('input');
    checkboxButton.setAttribute('type', 'checkbox');
    checkboxButton.classList.add('todo__checkbox');

    itemBox.appendChild(checkboxButton);
    itemBox.appendChild(input);
    itemBox.appendChild(comButton);
    itemBox.appendChild(editButton);
    itemBox.appendChild(deleteButton);

    todo__alllist.appendChild(itemBox);

    location.reload();
}

function editList(item) {
    if (item.classList[0] === "todo__edit-btn") {
        const itemBox = item.parentElement;
        editLocalTodo(itemBox);
        location.reload();

    }
}

function removeList(item) {
    console.log(item.classList[0]);
    if (item.classList[0] === "todo__delete-btn") {
        const itemBox = item.parentElement;
        itemBox.classList.add('todo--fall');
        removeLocalTodo(itemBox);
        itemBox.addEventListener('transitionend', () => {
            itemBox.remove();
        });
    }

}

function complateList(item) {
    if (item.classList[0] === "todo__complate-btn") {
        const itemBox = item.parentElement;
        itemBox.classList.toggle('todo--complated');
    }

}


//Add data LocalStorage
function saveLocalTodo(input) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(input);
    localStorage.setItem('todos', JSON.stringify(todos));

}

//Show all data LocalStorage
function showLocalTodo() {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    for (let index = todos.length; index > 0; index--) {

        let input = document.createElement('input');
        input.value = todos[index - 1];
        input.disabled = true;
        input.classList.add('todo__input');
        input.type = 'text';


        let itemBox = document.createElement('div');
        itemBox.classList.add('todo__single-list');

        let editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa fa-edit"></i>';
        editButton.classList.add('todo__edit-btn');

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.classList.add('todo__delete-btn');

        let comButton = document.createElement('button');
        comButton.innerHTML = '<i class="fa fa-check"></i>';
        comButton.classList.add('todo__complate-btn');

        let checkboxButton = document.createElement('input');
        checkboxButton.setAttribute('type', 'checkbox');
        checkboxButton.classList.add('todo__checkbox');

        itemBox.appendChild(checkboxButton);
        itemBox.appendChild(input);
        itemBox.appendChild(comButton);
        itemBox.appendChild(editButton);
        itemBox.appendChild(deleteButton);


        todo__alllist.appendChild(itemBox);

        comButton.addEventListener('click', () => complateList(comButton));
        editButton.addEventListener('click', () => editList(editButton));
        deleteButton.addEventListener('click', () => removeList(deleteButton));
        filter.addEventListener('change', () => filterTodo(event));
        checkboxButton.addEventListener('click', () => checkSelectAll(todo__alllist));
        todo__filtercheckall.addEventListener('change', () => checked(todo__filtercheckall));
        inputcheckbox.addEventListener('click', () => selectAll(inputcheckbox));
    }

}

//Remove data LocalStorage
function removeLocalTodo(todo) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[1].value;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}

//Edit data LocalStorage
function editLocalTodo(todo) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    let todoIndex = todo.children[1].value;
    var user = prompt("Enter : ", todoIndex);
    if (user === "") {
        alert("Empty edit value.....");
    } else {
        todos.splice(todos.indexOf(todoIndex), 1, user);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

}

//Filter data complate and uncomplate
function filterTodo(e) {
    const todos = todo__alllist.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'complated':
                if (todo.classList.contains('todo--complated')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncomplated':
                if (!todo.classList.contains('todo--complated')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });

}

//Checkbox to all data delete/compalte/uncompalte
function checked(item) {
    let cmtbybox = todo__alllist.childNodes;
    switch (item.value) {
        case 'delete':
            cmtbybox.forEach(item => {
                if (item.childNodes[0].checked) {
                    item.classList.add("todo--fall");
                    inputcheckbox.checked = false;
                    this.removelocaltodo(item);
                    item.addEventListener('transitionend', function() {
                        item.remove();
                    });
                }
                todo__filtercheckall.value = "";
            }, this);
            break;
        case 'completed':
            cmtbybox.forEach(item => {
                if (item.childNodes[0].checked) {
                    if (item.classList.contains("todo--complated")) {
                        item.children[0].checked = false;
                        inputcheckbox.checked = false;
                    } else {
                        item.classList.toggle("todo--complated");
                        item.children[0].checked = false;
                        inputcheckbox.checked = false;
                    }
                }
                todo__filtercheckall.value = "";
            });
            break;
        case 'uncomplated':
            cmtbybox.forEach(item => {
                if (item.childNodes[0].checked) {
                    if (!item.classList.contains("todo--complated")) {
                        item.children[0].checked = false;
                        inputcheckbox.checked = false;
                    } else {
                        item.classList.toggle("todo--complated");
                        item.children[0].checked = false;
                        inputcheckbox.checked = false;
                    }
                }
                todo__filtercheckall.value = "";
            });
            break;
    }
}

//Select all checkbox
function selectAll(item) {

    let selectbox = todo__alllist.childNodes;
    if (selectbox.length === 0) {
        item.checked = false
        alert("No Data Available...");
    } else {
        if (item.checked) {
            selectbox.forEach(item => {
                item.children[0].checked = true;
            })
        }
        if (item.checked === false) {
            selectbox.forEach(item => {
                item.children[0].checked = false;
            })
        }
    }

}

//check all check box select 
function checkSelectAll(item) {
    let selectbox = item.childNodes;
    let count = 0;
    selectbox.forEach(item => {
        if (item.children[0].checked === true) {
            count++
        }
    });
    if (selectbox.length == count) {
        inputcheckbox.checked = true;
    } else {
        inputcheckbox.checked = false;
    }
}

//function 
function check(event) {
    if (inputbox.value === "") {
        event.preventDefault();
        alert("Please enter your name ...");
    } else {
        event.preventDefault();
        addList(inputbox.value);
        alert("Add done ...");
        task__input.value = "";
    }
}
//call function
insert.addEventListener('click', check);
document.addEventListener("DOMContentLoaded", showLocalTodo);