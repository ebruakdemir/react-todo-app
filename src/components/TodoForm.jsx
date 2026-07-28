function TodoForm({
  todo,
  setTodo,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  addTodo
}) {
  return (
    <form
      className="add-form"
      onSubmit={addTodo}
    >
      <div className="main-input-row">
        <input
          type="text"
          value={todo}
          onChange={(event) =>
            setTodo(event.target.value)
          }
          placeholder="What do you need to do today?"
          aria-label="New task"
        />

        <button
          type="submit"
          className="add-button"
        >
          <span>＋</span>
          Add
        </button>
      </div>

      <div className="task-options">
        <label>
          <span>Priority</span>

          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
          >
            <option value="high">
              🔴 High
            </option>
            <option value="medium">
              🟡 Medium
            </option>
            <option value="low">
              🟢 Low
            </option>
          </select>
        </label>

        <label>
          <span>Due date</span>

          <input
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
          />
        </label>
      </div>
    </form>
  )
}

export default TodoForm