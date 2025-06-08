import { useEffect, useState } from "react"

const Timer = () => {
    const [time, setTime] = useState(4000)
    let [timerOn, setTimerOn] = useState(false)

    const timerOnEmoji = "▶️"
    const timerOffEmoji = "⏸️"

    const timePlay = () => { 
        setTimerOn(prev => !prev) 
        console.log(Boolean(timerOn))}

    useEffect(() => {
        if (!timerOn) { return }
        const intervalo = setInterval(() => {
            if (time < 0) { return
       
        } else {
             setTime( (prev) => prev - 1000 )
        console.log(time)
        }
        }, 1000);
        return () => {clearInterval(intervalo)}

    }, [timerOn])

    return (
        <div>
            <h1>Tiempo restante: {parseFloat(time / 1000)} segundos</h1>
            <button onClick={timePlay} style={{ fontSize: "60px", padding: "0px" }}>{timerOn ? timerOffEmoji : timerOnEmoji}</button>
        </div>
    )
}

export default Timer
