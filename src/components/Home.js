import React from 'react'

function HomePage(props){
       return(
           <div className="home-page">
               <h1>Quizzical</h1>
               <p>Take this quiz and you'll love it. For sure.</p>
               <button onClick={props.startQuiz}>Start Quiz</button>
           </div>
       )
}

export default HomePage