import { useEffect, useMemo, useState } from 'react'
import './App.css'

import Header from './components/Header'
import PlayerCard from './components/PlayerCard'
import TodoForm from './components/TodoForm'
import SearchAndSort from './components/SearchAndSort'
import ProgressBar from './components/ProgressBar'
import Statistics from './components/Statistics'
import Achievements from './components/Achievements'
import FilterButtons from './components/FilterButtons'
import TodoList from './components/TodoList'
import Celebration from './components/Celebration'
import ThemeSwitcher from './components/ThemeSwitcher'

const QUOTES = [
  'Small steps still move you forward 🌸',
  'You are doing berry well today 🍓',
  'Progress is prettier than perfection ✨',
  'One little task at a time 🎀',
  'Your future self will thank you 💗',
  'A productive day begins with one tiny step 🌷'
]

const PRIORITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) {
    return {
      title: 'Good morning',
      emoji: '☀️'
    }
  }

  if (hour < 18) {
    return {
      title: 'Good afternoon',
      emoji: '🌸'
    }
  }

  return {
    title: 'Good evening',
    emoji: '🌙'
  }
}

function createId() {
  if (
    typeof crypto !== 'undefined' &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random()}`
}

function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

function getDateDifference(firstDate, secondDate) {
  const first = new Date(`${firstDate}T00:00:00`)
  const second = new Date(`${secondDate}T00:00:00`)

  const difference = first.getTime() - second.getTime()

  return Math.round(
    difference / (1000 * 60 * 60 * 24)
  )
}

function normaliseTodo(item, index) {
  if (typeof item === 'string') {
    return {
      id: `${Date.now()}-${index}`,
      text: item,
      completed: false,
      priority: 'medium',
      dueDate: '',
      createdAt: Date.now() + index
    }
  }

  return {
    id: item.id ?? `${Date.now()}-${index}`,
    text: item.text ?? '',
    completed: Boolean(item.completed),
    priority: item.priority ?? 'medium',
    dueDate: item.dueDate ?? '',
    createdAt: item.createdAt ?? Date.now() + index
  }
}

function App() {
  const [todo, setTodo] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('manual')

  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [editingPriority, setEditingPriority] =
    useState('medium')
  const [editingDueDate, setEditingDueDate] =
    useState('')

  const [rewardMessage, setRewardMessage] =
    useState('')

  const [showAchievements, setShowAchievements] =
    useState(false)

  const [draggedTodoId, setDraggedTodoId] =
    useState(null)

  const [quote] = useState(() => {
    const randomIndex = Math.floor(
      Math.random() * QUOTES.length
    )

    return QUOTES[randomIndex]
  })

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')

    if (!savedTodos) {
      return []
    }

    try {
      const parsedTodos = JSON.parse(savedTodos)

      if (!Array.isArray(parsedTodos)) {
        return []
      }

      return parsedTodos.map(normaliseTodo)
    } catch {
      return []
    }
  })

  const [xp, setXp] = useState(() => {
    const savedXp = Number(
      localStorage.getItem('xp')
    )

    return Number.isFinite(savedXp) &&
      savedXp >= 0
      ? savedXp
      : 0
  })

  const [strawberries, setStrawberries] =
    useState(() => {
      const savedValue = Number(
        localStorage.getItem('strawberries')
      )

      return Number.isFinite(savedValue) &&
        savedValue >= 0
        ? savedValue
        : 0
    })

  const [streak, setStreak] = useState(() => {
    const savedValue = Number(
      localStorage.getItem('streak')
    )

    return Number.isFinite(savedValue) &&
      savedValue >= 0
      ? savedValue
      : 0
  })

  const [lastCompletedDate, setLastCompletedDate] =
    useState(
      () =>
        localStorage.getItem('lastCompletedDate') ||
        ''
    )

  const [lifetimeCompleted, setLifetimeCompleted] =
    useState(() => {
      const savedValue = Number(
        localStorage.getItem(
          'lifetimeCompleted'
        )
      )

      return Number.isFinite(savedValue) &&
        savedValue >= 0
        ? savedValue
        : 0
    })

  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('theme') ||
      'strawberry'
  )

  useEffect(() => {
    localStorage.setItem(
      'todos',
      JSON.stringify(todos)
    )
  }, [todos])

  useEffect(() => {
    localStorage.setItem('xp', String(xp))
  }, [xp])

  useEffect(() => {
    localStorage.setItem(
      'strawberries',
      String(strawberries)
    )
  }, [strawberries])

  useEffect(() => {
    localStorage.setItem(
      'streak',
      String(streak)
    )
  }, [streak])

  useEffect(() => {
    localStorage.setItem(
      'lastCompletedDate',
      lastCompletedDate
    )
  }, [lastCompletedDate])

  useEffect(() => {
    localStorage.setItem(
      'lifetimeCompleted',
      String(lifetimeCompleted)
    )
  }, [lifetimeCompleted])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (!rewardMessage) {
      return undefined
    }

    const timer = setTimeout(() => {
      setRewardMessage('')
    }, 2600)

    return () => clearTimeout(timer)
  }, [rewardMessage])

  function updateStreak() {
    const today = getTodayString()

    if (lastCompletedDate === today) {
      return
    }

    if (!lastCompletedDate) {
      setStreak(1)
    } else {
      const difference = getDateDifference(
        today,
        lastCompletedDate
      )

      if (difference === 1) {
        setStreak(
          (currentStreak) => currentStreak + 1
        )
      } else {
        setStreak(1)
      }
    }

    setLastCompletedDate(today)
  }

  function addTodo(event) {
    event.preventDefault()

    const trimmedTodo = todo.trim()

    if (!trimmedTodo) {
      setRewardMessage(
        'Please write a task first 🌷'
      )
      return
    }

    const newTodo = {
      id: createId(),
      text: trimmedTodo,
      completed: false,
      priority,
      dueDate,
      createdAt: Date.now()
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      newTodo
    ])

    setTodo('')
    setPriority('medium')
    setDueDate('')
    setRewardMessage('New task added 🌸')
  }

  function deleteTodo(idToDelete) {
    const selectedTodo = todos.find(
      (item) => item.id === idToDelete
    )

    setTodos((currentTodos) =>
      currentTodos.filter(
        (item) => item.id !== idToDelete
      )
    )

    if (selectedTodo?.completed) {
      setXp((currentXp) =>
        Math.max(0, currentXp - 10)
      )

      setStrawberries((currentAmount) =>
        Math.max(0, currentAmount - 1)
      )
    }

    if (editingId === idToDelete) {
      cancelEditing()
    }

    setRewardMessage('Task deleted 🗑️')
  }

  function toggleTodo(idToToggle) {
    const selectedTodo = todos.find(
      (item) => item.id === idToToggle
    )

    if (!selectedTodo) {
      return
    }

    const isCompleting =
      !selectedTodo.completed

    const previousLevel =
      Math.floor(xp / 100) + 1

    const nextXp = isCompleting
      ? xp + 10
      : Math.max(0, xp - 10)

    const nextLevel =
      Math.floor(nextXp / 100) + 1

    setTodos((currentTodos) =>
      currentTodos.map((item) =>
        item.id === idToToggle
          ? {
              ...item,
              completed: !item.completed
            }
          : item
      )
    )

    setXp(nextXp)

    if (isCompleting) {
      setStrawberries(
        (currentAmount) => currentAmount + 1
      )

      setLifetimeCompleted(
        (currentAmount) => currentAmount + 1
      )

      updateStreak()

      if (nextLevel > previousLevel) {
        setRewardMessage(
          `Level up! You reached level ${nextLevel} 🎉`
        )
      } else {
        setRewardMessage(
          '+10 XP and +1 strawberry 🍓'
        )
      }
    } else {
      setStrawberries((currentAmount) =>
        Math.max(0, currentAmount - 1)
      )

      setRewardMessage('Task reopened 🌷')
    }
  }

  function startEditing(item) {
    setEditingId(item.id)
    setEditingText(item.text)
    setEditingPriority(item.priority)
    setEditingDueDate(item.dueDate)
  }

  function saveEditing(idToEdit) {
    const trimmedText = editingText.trim()

    if (!trimmedText) {
      setRewardMessage(
        'Task text cannot be empty 🌷'
      )
      return
    }

    setTodos((currentTodos) =>
      currentTodos.map((item) =>
        item.id === idToEdit
          ? {
              ...item,
              text: trimmedText,
              priority: editingPriority,
              dueDate: editingDueDate
            }
          : item
      )
    )

    cancelEditing()
    setRewardMessage('Task updated ✨')
  }

  function handleEditingSubmit(
    event,
    idToEdit
  ) {
    event.preventDefault()
    saveEditing(idToEdit)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditingText('')
    setEditingPriority('medium')
    setEditingDueDate('')
  }

  function clearCompleted() {
    const completedAmount = todos.filter(
      (item) => item.completed
    ).length

    setTodos((currentTodos) =>
      currentTodos.filter(
        (item) => !item.completed
      )
    )

    setXp((currentXp) =>
      Math.max(
        0,
        currentXp - completedAmount * 10
      )
    )

    setStrawberries((currentAmount) =>
      Math.max(
        0,
        currentAmount - completedAmount
      )
    )

    cancelEditing()

    setRewardMessage(
      'Completed tasks cleared 🧹'
    )
  }

  function completeAll() {
    const incompleteTodos = todos.filter(
      (item) => !item.completed
    )

    if (incompleteTodos.length === 0) {
      return
    }

    const gainedXp =
      incompleteTodos.length * 10

    const previousLevel =
      Math.floor(xp / 100) + 1

    const nextXp = xp + gainedXp

    const nextLevel =
      Math.floor(nextXp / 100) + 1

    setTodos((currentTodos) =>
      currentTodos.map((item) => ({
        ...item,
        completed: true
      }))
    )

    setXp(nextXp)

    setStrawberries(
      (currentAmount) =>
        currentAmount +
        incompleteTodos.length
    )

    setLifetimeCompleted(
      (currentAmount) =>
        currentAmount +
        incompleteTodos.length
    )

    updateStreak()

    if (nextLevel > previousLevel) {
      setRewardMessage(
        `Amazing! You reached level ${nextLevel} 🎉`
      )
    } else {
      setRewardMessage(
        `All tasks completed! +${gainedXp} XP 🍓`
      )
    }
  }

  function handleDragStart(todoId) {
    if (sortBy !== 'manual') {
      setRewardMessage(
        'Choose Manual order to drag tasks 🌷'
      )
      return
    }

    setDraggedTodoId(todoId)
  }

  function handleDrop(targetTodoId) {
    if (
      !draggedTodoId ||
      draggedTodoId === targetTodoId ||
      sortBy !== 'manual'
    ) {
      setDraggedTodoId(null)
      return
    }

    setTodos((currentTodos) => {
      const updatedTodos = [...currentTodos]

      const draggedIndex =
        updatedTodos.findIndex(
          (item) => item.id === draggedTodoId
        )

      const targetIndex =
        updatedTodos.findIndex(
          (item) => item.id === targetTodoId
        )

      if (
        draggedIndex === -1 ||
        targetIndex === -1
      ) {
        return currentTodos
      }

      const [draggedItem] =
        updatedTodos.splice(draggedIndex, 1)

      updatedTodos.splice(
        targetIndex,
        0,
        draggedItem
      )

      return updatedTodos
    })

    setDraggedTodoId(null)
    setRewardMessage('Task order updated ✨')
  }

  const completedCount = todos.filter(
    (item) => item.completed
  ).length

  const remainingCount =
    todos.length - completedCount

  const progress =
    todos.length === 0
      ? 0
      : Math.round(
          (completedCount / todos.length) *
            100
        )

  const allCompleted =
    todos.length > 0 &&
    completedCount === todos.length

  const level = Math.floor(xp / 100) + 1
  const currentLevelXp = xp % 100

  const overdueCount = todos.filter(
    (item) =>
      !item.completed &&
      item.dueDate &&
      item.dueDate < getTodayString()
  ).length

  const highPriorityCount = todos.filter(
    (item) =>
      !item.completed &&
      item.priority === 'high'
  ).length

  const greeting = getGreeting()

  let petMessage =
    'Add a little task and let us begin! 🍓'

  if (todos.length > 0 && progress < 50) {
    petMessage =
      'You have started! Keep going, little star ✨'
  }

  if (progress >= 50 && progress < 100) {
    petMessage =
      'You are halfway there! I believe in you 💗'
  }

  if (allCompleted) {
    petMessage =
      'I am so proud of you! Time to celebrate 🎉'
  }

  const filteredAndSortedTodos = useMemo(() => {
    let result = todos.filter((item) => {
      const matchesSearch = item.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      if (!matchesSearch) {
        return false
      }

      if (filter === 'active') {
        return !item.completed
      }

      if (filter === 'completed') {
        return item.completed
      }

      return true
    })

    if (sortBy === 'newest') {
      result = [...result].sort(
        (first, second) =>
          second.createdAt - first.createdAt
      )
    }

    if (sortBy === 'oldest') {
      result = [...result].sort(
        (first, second) =>
          first.createdAt - second.createdAt
      )
    }

    if (sortBy === 'priority') {
      result = [...result].sort(
        (first, second) =>
          PRIORITY_ORDER[second.priority] -
          PRIORITY_ORDER[first.priority]
      )
    }

    if (sortBy === 'dueDate') {
      result = [...result].sort(
        (first, second) => {
          if (!first.dueDate) {
            return 1
          }

          if (!second.dueDate) {
            return -1
          }

          return first.dueDate.localeCompare(
            second.dueDate
          )
        }
      )
    }

    return result
  }, [todos, filter, searchTerm, sortBy])

  const achievements = [
    {
      id: 'first-task',
      icon: '🌱',
      title: 'First Step',
      description: 'Complete your first task',
      unlocked: lifetimeCompleted >= 1
    },
    {
      id: 'ten-tasks',
      icon: '🍓',
      title: 'Berry Productive',
      description: 'Complete 10 tasks',
      unlocked: lifetimeCompleted >= 10
    },
    {
      id: 'level-five',
      icon: '⭐',
      title: 'Rising Star',
      description: 'Reach level 5',
      unlocked: level >= 5
    },
    {
      id: 'three-streak',
      icon: '🔥',
      title: 'On a Roll',
      description: 'Reach a 3-day streak',
      unlocked: streak >= 3
    },
    {
      id: 'seven-streak',
      icon: '👑',
      title: 'Strawberry Master',
      description: 'Reach a 7-day streak',
      unlocked: streak >= 7
    },
    {
      id: 'fifty-tasks',
      icon: '🏆',
      title: 'Productivity Hero',
      description: 'Complete 50 tasks',
      unlocked: lifetimeCompleted >= 50
    }
  ]

  const unlockedAchievements =
    achievements.filter(
      (achievement) => achievement.unlocked
    ).length

  return (
    <main
      className="page"
      data-theme={theme}
    >
      <div className="decoration decoration-one" />
      <div className="decoration decoration-two" />
      <div className="decoration decoration-three" />

      <section className="container">
        <ThemeSwitcher
          theme={theme}
          setTheme={setTheme}
        />

        <Header
          greeting={greeting}
          petMessage={petMessage}
        />

        <PlayerCard
          level={level}
          strawberries={strawberries}
          currentLevelXp={currentLevelXp}
          quote={quote}
          streak={streak}
        />

        {rewardMessage && (
          <div className="reward-message">
            {rewardMessage}
          </div>
        )}

        <TodoForm
          todo={todo}
          setTodo={setTodo}
          priority={priority}
          setPriority={setPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
          addTodo={addTodo}
        />

        <SearchAndSort
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <ProgressBar
          completedCount={completedCount}
          totalTodos={todos.length}
          progress={progress}
        />

        <Statistics
          totalTodos={todos.length}
          completedCount={completedCount}
          remainingCount={remainingCount}
          overdueCount={overdueCount}
          highPriorityCount={highPriorityCount}
          lifetimeCompleted={lifetimeCompleted}
        />

        <Achievements
          achievements={achievements}
          unlockedAchievements={
            unlockedAchievements
          }
          showAchievements={showAchievements}
          setShowAchievements={
            setShowAchievements
          }
        />

        <Celebration
          allCompleted={allCompleted}
        />

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          remainingCount={remainingCount}
          completeAll={completeAll}
        />

        <TodoList
          todos={filteredAndSortedTodos}
          totalTodos={todos.length}
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          editingPriority={editingPriority}
          setEditingPriority={
            setEditingPriority
          }
          editingDueDate={editingDueDate}
          setEditingDueDate={
            setEditingDueDate
          }
          toggleTodo={toggleTodo}
          startEditing={startEditing}
          deleteTodo={deleteTodo}
          handleEditingSubmit={
            handleEditingSubmit
          }
          cancelEditing={cancelEditing}
          draggedTodoId={draggedTodoId}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          dragEnabled={sortBy === 'manual'}
        />

        <footer className="todo-footer">
          <span>
            {remainingCount} task
            {remainingCount !== 1 ? 's' : ''}{' '}
            left
          </span>

          {completedCount > 0 && (
            <button
              type="button"
              className="clear-button"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      </section>
    </main>
  )
}

export default App