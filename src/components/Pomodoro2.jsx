import { useState, useEffect } from 'react'

const Pomodoro2 = () => {
  // Variables
  const [inputValue, setInputValue] = useState(10)
  const [inputConv, setInputConv] = useState(0)
  const [countUp, setCountUp] = useState(59000)
  const [convHour, setConvHour] = useState("")
  const [timerOn, setTimerOn] = useState(false)
  const [mensaje, setMensaje] = useState("")

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
          setCountUp(0)
          setMensaje("¡Pomodoro terminado!")
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
  }, [countUp])

  return (
    <div id='render'>
      <h2>{mensaje && mensaje}</h2>
      {/* Mostrar convHour */}
      <h3>{convHour && convHour}</h3>
      {/* Boton play timerPlay*/}
      <button id='btn-min' onClick={timerPlay} style={{ fontSize: "60px", padding: "0px" }}>{timerOn ? timerOffEmoji : timerOnEmoji}</button>
      <input id='input-min' type="number" onChange={minToMil} value={inputValue} placeholder='Introduzca mins' />
    </div>
  )
}

export default Pomodoro2
