const writeTodo = document.querySelector('[data-writeTodo="write-todo"]')


writeTodo.addEventListener('submit', e => {
  e.preventDefault()

  console.log(e.target.writeTodo.value.trim())
})