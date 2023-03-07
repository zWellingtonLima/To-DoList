const writeTodo = document.querySelector('[data-writeTodo="write-todo"]')
const uncompletedTodo = document.querySelector('.uncompleted-todos')
// const trashRemoveTodo = document.querySelectorAll('[data-trash="removeTodo"]')
const todos = document.querySelector('.todos')

const addTodo = (inputValue, whichTodo) => {
  if (inputValue.length) {
    whichTodo.innerHTML += `
    <div class="todo-item" data-todo="${inputValue}">
      <span>
        <input type="checkbox"> ${inputValue}
      </span>
      <a href="#" data-trash="${inputValue}">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 96 960 960" ><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>
      </a>
    </div>
    `
  }
}

const removeTodo = (clickedElement) => {
  const trashDataValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

  if (trashDataValue) {
    todo.remove()
  }
}

writeTodo.addEventListener('submit', e => {
  e.preventDefault()

  const inputValue = e.target.addTodo.value.trim()

  addTodo(inputValue, uncompletedTodo)
  e.target.reset()
  
})

todos.addEventListener('click', e => {
  const clickedElement = e.target

  removeTodo(clickedElement)

  // if (clickedElement.dataset) {
  //   removeTodo(clickedElement)    
  // }

  // console.log(clickedElement);
})