const form  = document.querySelector('.form');
const inputField = document.querySelector('.input_field');
const todos = document.querySelector('.todo_list');

let localDate = [];

if(localStorage.getItem('todoData')) {
    localDate = JSON.parse(localStorage.getItem('todoData'))
}

function onload() {
    todos.innerHTML = localDate.map(function(item) {
        return itemTemplate(item);
    }).join(" ")
}

onload();
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(inputField.value){
        todos.insertAdjacentHTML("beforeend", itemTemplate(inputField.value));
        inputField.value = "";
        saveData();
    }else{
        alert('Please add a task!')
    }  
});

function handleEdit(el) {
    const newElement = el.parentElement.parentElement.querySelector(".value")
    let newValue = prompt('Edit your task:', newElement.innerHTML);
    if(newValue) {
        newElement.innerHTML = newValue;
    }
    saveData();
}

function handleDelete(el) {
    const deleteElement = el.parentElement.parentElement;
    console.log(el)
    console.log(el.parentElement)
    console.log(deleteElement)
    deleteElement.remove();
    saveData();
}

function handleToggle(el) {
    const toggle = el.parentElement.querySelector('.toggleDiv')
    console.log(toggle)
    if(toggle.classList.contains('toggle')){
        toggle.classList.remove('toggle')
    }else{
        toggle.classList.add('toggle')
    }
}

function itemTemplate(item) {
    return `<li>
                <div class="toggleDiv" onclick="handleToggle(this)">
                    <span>-</span><span class="value">${item}</span>
                </div>
                <div class="action">
                    <button class="editBtn" onclick="handleEdit(this)">Edit</button> 
                    <button class="delBtn" onclick="handleDelete(this)">X</button>
                </div>
            </li>`
}

function saveData(){
    let allItems = [];
    todos.querySelectorAll('li').forEach(function(el){
      allItems.push(el.querySelector(".value").innerHTML);
    })
    localStorage.setItem('todoData', JSON.stringify(allItems));
}