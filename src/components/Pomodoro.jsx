import { useState, useEffect } from 'react'

const Pomodoro = () => {
    const [time, setTime] = useState(0)
    let [timerOn, setTimerOn] = useState(false)
    const [convertedTime, setConvertedTime] = useState("")
    // Inputs
    const [inputValue, setInputValue] = useState("")
    const [inputMin, setInputMin] = useState("")

    const convMinToMil = (event) => {
        const toConvert = event.target.value
        const mins = toConvert * 60000
        setTime(mins)
    }

    const timerOnEmoji = "▶️"
    const timerOffEmoji = "⏸️"

    const timePlay = () => {
        setTimerOn(prev => !prev)
        console.log(Boolean(timerOn))
    }

    const addTime = () => {
        setTime((prev) => (prev + 1000))
    }

    const milToMin = (event) => {
        const toConvert = event.target.value
        setInputValue(toConvert)

        const seconds = toConvert / 1000
        const minutes = seconds / 60
        const hours = minutes / 60

        const secLeft = Math.floor(seconds % 60)
        const minLeft = Math.floor(minutes % 60)

        const convTime = (minLeft.toString().padStart(2, "00")) + ":" + (secLeft.toString().padStart(2, "00"))
        setConvertedTime(convTime)
    }

    useEffect(() => {
        if (!timerOn) { return }

        const intervalo = setInterval(() => {
            setTime((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalo)
                    setTimerOn(false)
                    return 0
                }
                return prev - 1000
            })
        }, 1000)
        return () => { clearInterval(intervalo) }
    }, [timerOn])
  return (
    <div>
      <h1>Tiempo restante: {convertedTime && convertedTime}</h1>
        <h3>Tiempo en milisegundos {time}</h3>
            
            <button onClick={timePlay} style={{ fontSize: "60px", padding: "0px" }}>{timerOn ? timerOffEmoji : timerOnEmoji}</button>
            <br />
            <button onClick={addTime} style={{ backgroundColor: "chocolate" }}>Añadir 1 segundo</button>
            <br />
            <input type="number" id="convert-milsec" value={inputValue} onChange={milToMin} placeholder="Ingresa milisegundos" />
            <br />
            <input type="number" id='convert-to-milsec' placeholder='Min' value={inputMin} onChange={convMinToMil}/>
    </div>
  )
}

export default Pomodoro
