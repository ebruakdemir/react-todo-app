function SearchAndSort({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy
  }) {
    return (
      <section className="search-sort-section">
        <label className="search-box">
          <span>🔍</span>
  
          <input
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search tasks..."
          />
        </label>
  
        <label className="sort-box">
          <span>Sort</span>
  
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="manual">
              Manual order
            </option>
            <option value="newest">
              Newest first
            </option>
            <option value="oldest">
              Oldest first
            </option>
            <option value="priority">
              Priority
            </option>
            <option value="dueDate">
              Due date
            </option>
          </select>
        </label>
      </section>
    )
  }
  
  export default SearchAndSort