import todoGif from '../assets/todo.gif'

function Header({ greeting, petMessage }) {
  return (
    <header className="hero-section">
      <img
        src={todoGif}
        alt="Cute strawberry bunny animation"
        className="todo-gif"
      />

      <div className="speech-bubble">
        {petMessage}
      </div>

      <p className="greeting">
        {greeting.title} {greeting.emoji}
      </p>

      <h1>My Strawberry Todo List 🍓</h1>

      <p className="subtitle">
        Sweet little steps for a lovely day ✨
      </p>
    </header>
  )
}

export default Header