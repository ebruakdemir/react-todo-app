function Celebration({ allCompleted }) {
  if (!allCompleted) {
    return null
  }

  return (
    <div className="celebration">
      <div className="confetti">
        🍓 ✨ 🌸 🎊 ⭐ 💖
      </div>

      <h2>Berry amazing!</h2>

      <p>
        You completed every task. Enjoy
        your well-earned rest 🌷
      </p>
    </div>
  )
}

export default Celebration