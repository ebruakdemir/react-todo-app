function PlayerCard({
  level,
  strawberries,
  currentLevelXp,
  quote,
  streak
}) {
  return (
    <section className="player-card">
      <div className="player-card-top">
        <div className="level-badge">
          <span>Level</span>
          <strong>{level}</strong>
        </div>

        <div className="strawberry-score">
          <span className="score-icon">🍓</span>

          <div>
            <strong>{strawberries}</strong>
            <span>Strawberries</span>
          </div>
        </div>

        <div className="streak-score">
          <span className="score-icon">🔥</span>

          <div>
            <strong>{streak}</strong>
            <span>Day streak</span>
          </div>
        </div>
      </div>

      <div className="xp-information">
        <span>Experience</span>
        <strong>
          {currentLevelXp} / 100 XP
        </strong>
      </div>

      <div className="xp-bar">
        <div
          className="xp-fill"
          style={{
            width: `${currentLevelXp}%`
          }}
        />
      </div>

      <p className="quote">“{quote}”</p>
    </section>
  )
}

export default PlayerCard