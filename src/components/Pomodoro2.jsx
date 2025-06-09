import { useState, useEffect } from 'react'

const Pomodoro2 = () => {
  // Variables
  const [inputValue, setInputValue] = useState(0)
  const [inputConv, setInputConv] = useState(0)
  const [mil, setMil] = useState(0)
  const [convHour, setConvHour] = useState("")
  const [timerOn, setTimerOn] = useState(false)

  // Conversores
  const minToMil = (event) => {
    const input = event.target.value
    setInputValue(input)
    const converted = input * 60000
    setInputConv(converted)
    return
  }

  const milToHour = (mil) => {
    const milliseconds = mil.target.value

    const seconds = milliseconds / 1000
    const minutes = seconds / 60

    const secLeft = Math.floor(seconds % 60)
    const minLeft = Math.floor(minutes % 60)

    const convHourTemp= (minLeft.toString().padStart(2, "00")) + ":" + (secLeft.toString().padStart(2, "00"))
    setConvHour(convHourTemp)
  }

  // Timer Play
  const timerPlay = () => {
    setTimerOn((prev) => !prev)

  }

  // useEffect
  useEffect(() => {
    if (!timerOn) { return }
    const interval = setInterval(() => {
      
    }, 1000)
  }, [timerOn])

  return (
    <div>
      {/* Mostrar convHour */}
      {/* Boton play */}
      <input type="number" onChange={minToMil} value={inputValue} placeholder='Introduzca mins' />
    </div>
  )
}

export default Pomodoro2
