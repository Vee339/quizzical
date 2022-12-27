import React from "react"

function Questionnaire(props){
    
    const [selectedAnswer, setSelectedAnswer] = React.useState("")

    var id

function handleClick(answer){
        if(answer !== selectedAnswer){
            setSelectedAnswer(answer)
        }else{
            setSelectedAnswer("")
        }
        id = props.id
        props.incrScore(answer,id)
    }


    const runOptions = props.ans.map((answer, index) => {
        return <li dangerouslySetInnerHTML={{__html:answer}} 
            className={answer === selectedAnswer ? "selected" : ""} 
            key={index} 
            onClick={() => handleClick(answer)}
        />
    })

    return(
        <div className="question">
                    <div className="ques" dangerouslySetInnerHTML={{__html:props.ques}} />
                    <ul className="options">
                        {runOptions}
                    </ul>
            </div>          
    )
}

export default Questionnaire