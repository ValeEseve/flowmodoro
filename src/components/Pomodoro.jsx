import { useState, useEffect } from 'react'

const Pomodoro = () => {
    // Variables
    const [time, setTime] = useState(0)
    let [timerOn, setTimerOn] = useState(false)
    const [convertedTime, setConvertedTime] = useState("")
    const [countUp, setCountUp] = useState(0)
    const [countUp2, setCountUp2] = useState(0)
    const [timeUpConverted, setTimeUpConverted] = useState("")

    // Emojis
    const timerOnEmoji = "▶️"
    const timerOffEmoji = "⏸️"

    // Inputs
    const [inputValue, setInputValue] = useState("")
    const [inputMin, setInputMin] = useState("")

    // Conversores
    const convMinToMil = (event) => {
        const toConvert = event.target.value
        setInputMin(toConvert)
        const mins = toConvert * 60000
        setTime(mins)
    }

    const milToMin = (event) => {
        const toConvert = event.target.value
        setInputValue(toConvert)

        const seconds = toConvert / 1000
        const minutes = seconds / 60

        const secLeft = Math.floor(seconds % 60)
        const minLeft = Math.floor(minutes % 60)

        const convTime = (minLeft.toString().padStart(2, "00")) + ":" + (secLeft.toString().padStart(2, "00"))
        setConvertedTime(convTime)
    }

     const milToMin2 = (miliseconds) => {
        const toConvert = miliseconds

        const seconds = toConvert / 1000
        const minutes = seconds / 60

        const secLeft = Math.floor(seconds % 60)
        const minLeft = Math.floor(minutes % 60)

        const convTime = (minLeft.toString().padStart(2, "00")) + ":" + (secLeft.toString().padStart(2, "00"))
        return setConvertedTime(convTime)
    }

    // Switch para inciar cronómetro

    const timePlay = () => {
        setTimerOn(prev => !prev)
        console.log(Boolean(timerOn))
    }

    const addTime = () => {
        setTime((prev) => (prev + 1000))
    }



useEffect(() => {
    if (!timerOn) { return }

    const intervalo = setInterval(() => {
        setCountUp((prev) => {
            if (prev >= time){
                clearInterval(intervalo)
                setTimerOn(false)
                return 0
            }
            setCountUp2(prev + 1000)
            const countUpTemp = milToMin2(countUp)
            setCountUp2(countUpTemp)
            return setCountUp(prev + 1000)
        
        })
    }, 1000)
    return () => {
        { clearInterval(intervalo) }
    }

}, [timerOn])

    return (
        <div>
            <h1>Tiempo: {countUp2 && <p>{countUp2}</p>}</h1>
            <h3>Tiempo en milisegundos {time}</h3>

            <button onClick={timePlay} style={{ fontSize: "60px", padding: "0px" }}>{timerOn ? timerOffEmoji : timerOnEmoji}</button>
            <br />
            <button onClick={addTime} style={{ backgroundColor: "chocolate" }}>Añadir 1 segundo</button>
            <br />
            <input type="number" id="convert-milsec" value={inputValue} onChange={milToMin} placeholder="Ingresa milisegundos" />
            <br />
            <input type="number" id='convert-to-milsec' placeholder='Min' value={inputMin} onChange={convMinToMil} />
        </div>
    )
}

export default Pomodoro
