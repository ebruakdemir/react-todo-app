function formatDueDate(dueDate) {
  if (!dueDate) {
    return ''
  }

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  ).format(
    new Date(`${dueDate}T00:00:00`)
  )
}

function TodoItem({
  item,
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
  const isEditing = editingId === item.id

  const today = new Date()
    .toISOString()
    .split('T')[0]

  const isOverdue =
    item.dueDate &&
    item.dueDate < today &&
    !item.completed

  const priorityLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  }

  return (
    <li
      className={[
        'todo-item',
        item.completed ? 'done' : '',
        isOverdue ? 'overdue-item' : '',
        draggedTodoId === item.id
          ? 'dragging'
          : ''
      ]
        .filter(Boolean)
        .join(' ')}
      draggable={dragEnabled && !isEditing}
      onDragStart={() =>
        handleDragStart(item.id)
      }
      onDragOver={(event) =>
        event.preventDefault()
      }
      onDrop={() => handleDrop(item.id)}
    >
      {isEditing ? (
        <form
          className="edit-form"
          onSubmit={(event) =>
            handleEditingSubmit(
              event,
              item.id
            )
          }
        >
          <input
            type="text"
            value={editingText}
            onChange={(event) =>
              setEditingText(
                event.target.value
              )
            }
            className="edit-input"
            autoFocus
          />

          <div className="edit-options">
            <select
              value={editingPriority}
              onChange={(event) =>
                setEditingPriority(
                  event.target.value
                )
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

            <input
              type="date"
              value={editingDueDate}
              onChange={(event) =>
                setEditingDueDate(
                  event.target.value
                )
              }
            />
          </div>

          <div className="edit-actions">
            <button
              type="submit"
              className="save-button"
            >
              Save
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <span
            className={
              dragEnabled
                ? 'drag-handle'
                : 'drag-handle disabled'
            }
            title={
              dragEnabled
                ? 'Drag to reorder'
                : 'Choose manual order to drag'
            }
          >
            ⋮⋮
          </span>

          <label className="todo-left">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() =>
                toggleTodo(item.id)
              }
            />

            <span className="custom-checkbox">
              {item.completed ? '✓' : ''}
            </span>

            <span className="todo-content">
              <span className="todo-text">
                {item.text}
              </span>

              <span className="todo-metadata">
                <span
                  className={`priority-badge priority-${item.priority}`}
                >
                  {priorityLabels[
                    item.priority
                  ]}
                </span>

                {item.dueDate && (
                  <span
                    className={
                      isOverdue
                        ? 'due-date overdue'
                        : 'due-date'
                    }
                  >
                    📅{' '}
                    {formatDueDate(
                      item.dueDate
                    )}

                    {isOverdue &&
                      ' · Overdue'}
                  </span>
                )}
              </span>
            </span>
          </label>

          <div className="todo-actions">
            <button
              type="button"
              className="edit-button"
              onClick={() =>
                startEditing(item)
              }
              aria-label={`Edit ${item.text}`}
            >
              ✏️
            </button>

            <button
              type="button"
              className="delete-button"
              onClick={() =>
                deleteTodo(item.id)
              }
              aria-label={`Delete ${item.text}`}
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem