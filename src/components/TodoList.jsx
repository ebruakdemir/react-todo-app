import TodoItem from './TodoItem'

function TodoList({
  todos,
  totalTodos,
  editingId,
  editingText,
  setEditingText,
  editingPriority,
  setEditingPriority,
  editingDueDate,
  setEditingDueDate,
  toggleTodo,
  startEditing,
  deleteTodo,
  handleEditingSubmit,
  cancelEditing,
  draggedTodoId,
  handleDragStart,
  handleDrop,
  dragEnabled
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-message">
        <span>🌷</span>

        <p>
          {totalTodos === 0
            ? 'No tasks yet. Add your first one!'
            : 'No matching tasks in this section.'}
        </p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          editingPriority={
            editingPriority
          }
          setEditingPriority={
            setEditingPriority
          }
          editingDueDate={editingDueDate}
          setEditingDueDate={
            setEditingDueDate
          }
          toggleTodo={toggleTodo}
          startEditing={startEditing}
          deleteTodo={deleteTodo}
          handleEditingSubmit={
            handleEditingSubmit
          }
          cancelEditing={cancelEditing}
          draggedTodoId={draggedTodoId}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          dragEnabled={dragEnabled}
        />
      ))}
    </ul>
  )
}

export default TodoList