function Achievements({
    achievements,
    unlockedAchievements,
    showAchievements,
    setShowAchievements
  }) {
    return (
      <section className="achievements-section">
        <button
          type="button"
          className="achievements-header"
          onClick={() =>
            setShowAchievements(
              (currentValue) => !currentValue
            )
          }
        >
          <div>
            <span className="eyebrow">
              Rewards
            </span>
  
            <h2>Achievements</h2>
          </div>
  
          <span className="achievement-counter">
            {unlockedAchievements} /{' '}
            {achievements.length}
          </span>
        </button>
  
        {showAchievements && (
          <div className="achievement-grid">
            {achievements.map(
              (achievement) => (
                <article
                  key={achievement.id}
                  className={
                    achievement.unlocked
                      ? 'achievement-card unlocked'
                      : 'achievement-card locked'
                  }
                >
                  <span className="achievement-icon">
                    {achievement.unlocked
                      ? achievement.icon
                      : '🔒'}
                  </span>
  
                  <div>
                    <strong>
                      {achievement.title}
                    </strong>
  
                    <span>
                      {achievement.description}
                    </span>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>
    )
  }
  
  export default Achievements