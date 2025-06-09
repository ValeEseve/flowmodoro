import { useState, useEffect } from 'react'

const Pomodoro2 = () => {
  // Variables
  const [inputValue, setInputValue] = useState(10)
  const [inputConv, setInputConv] = useState(0)
  const [countUp, setCountUp] = useState(0)
  const [convHour, setConvHour] = useState("")
  const [timerOn, setTimerOn] = useState(false)

  // Emojis
  const timerOnEmoji = "▶️"
  const timerOffEmoji = "⏸️"

  // Conversores
  const minToMil = (event) => {
    const input = event.target.value
    setInputValue(input)
    const converted = parseFloat(input) * 60000
    setInputConv(converted)
    return
  }

  const milToHour = (mil) => {
    const seconds = mil / 1000
    const minutes = seconds / 60

    const secLeft = Math.floor(seconds % 60)
    const minLeft = Math.floor(minutes % 60)

    return minLeft.toString().padStart(2, "0") + ":" + secLeft.toString().padStart(2, "0")
  }

  // Timer Play
  const timerPlay = () => {
    setTimerOn((prev) => !prev)
  }

  // useEffect

  useEffect(() => {
    if (!timerOn) { return }
    const interval = setInterval(() => {
      setCountUp((prev) => {
        if (prev >= inputConv) {
          setTimerOn(false)
          clearInterval(interval)
          setCountUp(0)
          console.log(countUp)
          return prev
        }
        return (prev + 1000)
      })

    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [timerOn])

  useEffect(() => {
    setConvHour(milToHour(countUp))
    console.log(countUp+"countUp dentro del segundo useEffect")
  }, [countUp])

  return (
    <div>
      {/* Mostrar convHour */}
      <h3>{convHour && convHour}</h3>
      {/* Boton play timerPlay*/}
      <button onClick={timerPlay} style={{ fontSize: "60px", padding: "0px" }}>{timerOn ? timerOffEmoji : timerOnEmoji}</button>
      <input type="number" onChange={minToMil} value={inputValue} placeholder='Introduzca mins' />
    </div>
  )
}

export default Pomodoro2
