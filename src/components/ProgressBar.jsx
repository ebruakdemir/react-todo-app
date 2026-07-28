function ProgressBar({
  completedCount,
  totalTodos,
  progress
}) {
  return (
    <section className="progress-section">
      <div className="progress-info">
        <span>
          {completedCount} of {totalTodos}{' '}
          completed
        </span>

        <strong>{progress}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`
          }}
        />
      </div>
    </section>
  )
}

export default ProgressBar