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


    const runOptions = props.ans.map((answer) => {
        let id = null

        if(props.checked){
            if(props.corrAns == answer){
                id="correct-answer"
            }else if(props.selectedAns == answer){
                id="incorrect-answer"
            }else{
                id="not-selected"
            }
        }
        
        return <li dangerouslySetInnerHTML={{__html:answer}} 
            id={id}
            className={answer === selectedAnswer ? "answer selected" : "answer"} 
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