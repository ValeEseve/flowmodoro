import { useEffect, useState } from "react"

const Timer = () => {
    const [time, setTime] = useState(4000)
    let [timerOn, setTimerOn] = useState(false)

    const timerOnEmoji = "▶️"
    const timerOffEmoji = "⏸️"

    const timePlay = () => {
        setTimerOn(prev => !prev)
        console.log(Boolean(timerOn))
    }

    const addTime=()=> {
        setTime((prev) => (prev + 1000))
    }

    useEffect(() => {
        

        if (!timerOn) { return }

        const intervalo = setInterval(() => { 
        setTime((prev) => {
            if (prev <= 0){
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
            <h1>Tiempo restante: {parseFloat(time / 1000)} segundos</h1>
            <button onClick={timePlay} style={{ fontSize: "60px", padding: "0px" }}>{timerOn ? timerOffEmoji : timerOnEmoji}</button>
            <button onClick={addTime} style={{backgroundColor:"chocolate"}}>Añadir 1 segundo</button>
        </div>
    )
}

export default Timer
