    import React from 'react'
    import HomePage from './components/Home.js'
    import Questionnaire from './components/Questionnaire.js'
    import './index.css'


    export default function App(){

        const [started, setStarted] = React.useState(false)
        const [completed, setCompleted] = React.useState(false)
        const [questions, setQuestions] = React.useState([])
        const [score, setScore] = React.useState(0)
        const [resetGame, setResetGame] = React.useState(false)


        React.useEffect(() =>{
            fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data =>{
                const questions = data.results.map((question) => ({
                    question: question.question,
                    correct_answer: question.correct_answer,
                    answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
                }))

                setQuestions(questions)
            })
            setResetGame(false)
        },[resetGame])

        

        function startQuiz(){
            setStarted(true)
        }

        const styles = {
            backgroundImage : "url(/images/background.svg)",
            backgroundPosition: "center center",
            backgroundSize: "cover"
        }

        
    var chosenAns
    

        function incrScore(ans,id){
            
            questions[id].chosenAns = [ans]

            if(questions[id].correct_answer == questions[id].chosenAns){
                setScore(score + 1)
            }
        
            
        }
        
        function calculateScore(){
            setCompleted(true)  
            questions.map(ques => {
                if(ques.chosenAns == ques.correct_answer){
                    console.log("correct answer")
                }else{
                    console.log("incorrect answer")
                }
            })     
        }
        
        function reset(){
            setCompleted(false)
            setScore(0)
            setResetGame(true)
        }
        
        
    
        const loadQuestions = questions.map((data,index) =>{
            return <Questionnaire 
                        id = {index} 
                        ques={data.question} 
                        ans={data.answers} 
                        corrAns={data.correct_answer} 
                        incrScore={(ans, id) => incrScore(ans, id)}
                    />
        })
            
        return(
            <main style={styles}>
                {started ? 
                <div className="content">
                    <div id="questions">
                        {questions.length > 0 ? loadQuestions : "Loading...."}
                    </div>
                    {completed ? <div className='score'>Your Score is {score}/5   
                                <button onClick={reset}>Play Again</button></div> 
                    : <button onClick={calculateScore}>Check answers</button>}
                    
                </div> 
                : <HomePage startQuiz={startQuiz}/>}
            
            
            </main>
        )
    }