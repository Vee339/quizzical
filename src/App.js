   import React from 'react';
    import HomePage from './components/Home.js';
    import Questionnaire from './components/Questionnaire.js';
    import './index.css';
    


    export default function App(){

        const [started, setStarted] = React.useState(false)
        const [completed, setCompleted] = React.useState(false)
        const [questions, setQuestions] = React.useState([])
        const [score, setScore] = React.useState(0)
        const [resetGame, setResetGame] = React.useState(0)
        const [checked, setChecked] = React.useState(false)


        React.useEffect(() =>{
            fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data =>{
                const questions = data.results.map((question) => ({
                    question: question.question,
                    correct_answer: question.correct_answer,
                    selected_answer: null,
                    answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
                }))

                setQuestions(questions)
            })
            
        },[resetGame])

        

        function startQuiz(){
            setStarted(true)
        }

       

        
    
    

        function incrScore(ans,id){

            questions[id].selected_answer = [ans] 
            questions[id].selected_answer = [ans]

            if(questions[id].correct_answer == questions[id].selected_answer){
                setScore(score + 1)
            }
            
        }
        
        function calculateScore(){
            setCompleted(true)     
            setChecked(true)
        }
        
        function reset(){
            setResetGame(resetGame + 1)
            setCompleted(false)
            setChecked(false)
            setScore(0)
        }
        
        
    
        const loadQuestions = questions.map((data,index) =>{
            return <Questionnaire 
                        id = {index} 
                        ques={data.question} 
                        ans={data.answers} 
                        corrAns={data.correct_answer} 
                        selectedAns={data.selected_answer}
                        incrScore={(ans, id) => incrScore(ans, id)}
                        checked={checked}
                    />
        })
            
        return(
            <main>
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