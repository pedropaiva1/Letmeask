import logoImg from '../assets/images/logo.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import noQuestionsImg from '../assets/images/no-questions.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useHistory, useParams } from 'react-router-dom'

import '../styles/room.scss'
import { database } from '../services/firebase'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import deleteImg from '../assets/images/delete.svg'

type RoomParams = {
  id: string;
}

export function AdminRoom(){

  const params = useParams<RoomParams>()

  const history = useHistory()

  const roomId = params.id

  const { title, questions } = useRoom(roomId)  

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push(`/`)
  }

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que deseja remover essa pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  console.log(questions)

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>
            <RoomCode code={roomId}/> 
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.length === 0 ? 
          <div className="no-questions">
            <img src={noQuestionsImg} alt="Nenhuma pergunta por aqui" />
            <h1>Nenhuma pergunta por aqui.</h1>
            <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
          </div>
          : questions.map(question => {

            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
        
      </main>
    </div>
  )
}