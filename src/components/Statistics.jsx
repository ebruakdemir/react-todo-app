function Statistics({
    totalTodos,
    completedCount,
    remainingCount,
    overdueCount,
    highPriorityCount,
    lifetimeCompleted
  }) {
    const statistics = [
      {
        icon: '📋',
        label: 'Total',
        value: totalTodos
      },
      {
        icon: '✅',
        label: 'Completed',
        value: completedCount
      },
      {
        icon: '🌷',
        label: 'Remaining',
        value: remainingCount
      },
      {
        icon: '⚠️',
        label: 'Overdue',
        value: overdueCount
      },
      {
        icon: '🔴',
        label: 'High priority',
        value: highPriorityCount
      },
      {
        icon: '🏆',
        label: 'All-time',
        value: lifetimeCompleted
      }
    ]
  
    return (
      <section className="statistics-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              Your productivity
            </span>
  
            <h2>Statistics</h2>
          </div>
  
          <span>📊</span>
        </div>
  
        <div className="statistics-grid">
          {statistics.map((statistic) => (
            <article
              className="stat-card"
              key={statistic.label}
            >
              <span className="stat-icon">
                {statistic.icon}
              </span>
  
              <strong>{statistic.value}</strong>
  
              <span>{statistic.label}</span>
            </article>
          ))}
        </div>
      </section>
    )
  }
  
  export default Statistics