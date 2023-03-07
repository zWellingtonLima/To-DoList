let todosItems = []
const writeTodo = document.querySelector('[data-writeTodo="write-todo"]')
const unCompletedTodosContainer = document.querySelector('.uncompleted-todos')
const completedTodosContainer = document.querySelector('.completed-todos')
const todosContainer = document.querySelector('.todosContainer')

const getLocalStorageItems = () => {
  let storageTodoItems = localStorage.getItem('todoItems')
  if (storageTodoItems !== null) {
    todosItems = JSON.parse(storageTodoItems)
  }

  saveAndRenderTodo()
}

const addTodo = inputValue => {
  todosItems.push({
    id: Date.now(),
    text: inputValue,
    completed: false
  })
  
  saveAndRenderTodo()
}

function removeTodo(id) {
  todosItems = todosItems.filter(todo => todo.id !== Number(id))
  saveAndRenderTodo()
}

function markAsCompleted(id) {
  todosItems = todosItems.filter(todo => {
    if (todo.id === Number(id)) {
      todo.completed = true
    }
    return todo
  })

  saveAndRenderTodo()
}

function markAsUncompleted(id) {
  todosItems = todosItems.filter(todo => {
    if (todo.id === Number(id)) {
      todo.completed = false
    }
    return todo
  })

  saveAndRenderTodo()
}

const saveTodo = () => {
  localStorage.setItem('todoItems', JSON.stringify(todosItems))
}

const renderTodo = () => {
  let unCompletedTodos = todosItems.filter(item => !item.completed)
  let completedTodos = todosItems.filter(item => item.completed)

  unCompletedTodosContainer.innerHTML = ''
  completedTodosContainer.innerHTML = ''

  if (unCompletedTodos.length) {
    unCompletedTodos.forEach(todo => {
      unCompletedTodosContainer.append(createTodoElement(todo))
    })
  }

  if (completedTodos.length) {
    completedTodosContainer.innerHTML = `<div class="completed-title">Concluídos (${completedTodos.length} / ${todosItems.length})</div>`

    completedTodos.forEach(todo => {
      completedTodosContainer.append(createTodoElement(todo))
    })
  }
}

function saveAndRenderTodo() {
  saveTodo()
  renderTodo()
}

function createTodoElement(todo) {
  const todosDiv = document.createElement('div')
  todosDiv.setAttribute('data-id', todo.id)
  todosDiv.className = 'todo-item'

  const todoTextSpan = document.createElement('span')
  todoTextSpan.innerHTML = todo.text

  const todoInputCheckbox = document.createElement('input')
  todoInputCheckbox.type = 'checkbox'
  todoInputCheckbox.checked = todo.completed
  todoInputCheckbox.onclick = e => {
    let id = e.target.closest('.todo-item').dataset.id
    e.target.checked ? markAsCompleted(id) : markAsUncompleted(id)
  }

  const todoRemoveBtn = document.createElement('a')
  todoRemoveBtn.href = '#'
  todoRemoveBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" ><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/>
    </svg>
  `
  todoRemoveBtn.onclick = e => {
    let id = e.target.closest('.todo-item').dataset.id
    removeTodo(id)
  }

  todoTextSpan.prepend(todoInputCheckbox)
  todosDiv.append(todoTextSpan)
  todosDiv.appendChild(todoRemoveBtn)

  return todosDiv
}

writeTodo.addEventListener('submit', e => {
  e.preventDefault()

  const inputValue = e.target.addTodo.value.trim()

  if (inputValue) {
    addTodo(inputValue)

    e.target.reset()
  }
})

todosContainer.addEventListener('click', e => {
  const clickedElement = e.target

  removeTodo(clickedElement)
})

window.onload = () => getLocalStorageItems()