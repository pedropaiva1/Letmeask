import { ButtonHTMLAttributes } from 'react'
import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

import toast, { Toaster } from 'react-hot-toast'


type ButtomProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  code: string;
}

export function RoomCode(props: ButtomProps){

  function copyRoomCodeToClipBoard(){
    navigator.clipboard.writeText(`https://letmeask-pedro.web.app/rooms/${props.code}`)
    toast.success('Copy to click board.')
  }

  return (
    <>
      <button className="room-code" onClick={copyRoomCodeToClipBoard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala # {props.code}</span>
      </button>
      <Toaster />
    </>
    
  )
}