function FilterButtons({
  filter,
  setFilter,
  remainingCount,
  completeAll
}) {
  return (
    <div className="task-controls">
      <div className="filter-buttons">
        <button
          type="button"
          className={
            filter === 'all'
              ? 'active-filter'
              : ''
          }
          onClick={() => setFilter('all')}
        >
          All
        </button>

        <button
          type="button"
          className={
            filter === 'active'
              ? 'active-filter'
              : ''
          }
          onClick={() =>
            setFilter('active')
          }
        >
          Active
        </button>

        <button
          type="button"
          className={
            filter === 'completed'
              ? 'active-filter'
              : ''
          }
          onClick={() =>
            setFilter('completed')
          }
        >
          Completed
        </button>
      </div>

      {remainingCount > 0 && (
        <button
          type="button"
          className="complete-all-button"
          onClick={completeAll}
        >
          Complete all
        </button>
      )}
    </div>
  )
}

export default FilterButtons