const THEMES = [
    {
      id: 'strawberry',
      label: 'Strawberry',
      icon: '🍓'
    },
    {
      id: 'sakura',
      label: 'Sakura',
      icon: '🌸'
    },
    {
      id: 'cloud',
      label: 'Cloud',
      icon: '☁️'
    },
    {
      id: 'matcha',
      label: 'Matcha',
      icon: '🍵'
    },
    {
      id: 'night',
      label: 'Night',
      icon: '🌙'
    }
  ]
  
  function ThemeSwitcher({
    theme,
    setTheme
  }) {
    return (
      <div className="theme-switcher">
        <span className="theme-title">
          Theme
        </span>
  
        <div className="theme-buttons">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.id}
              type="button"
              className={
                theme === themeOption.id
                  ? 'theme-button active-theme'
                  : 'theme-button'
              }
              onClick={() =>
                setTheme(themeOption.id)
              }
              title={themeOption.label}
              aria-label={`${themeOption.label} theme`}
            >
              {themeOption.icon}
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  export default ThemeSwitcher