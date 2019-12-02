import React from 'react';
import './../App.css';
import questionImg from "./../images/question.png";
import ModalWindow from "./ModalWindow";

function Header(){
	return (
		<div className="titleBlock">
			<h1 className='title'>Sudoku</h1>
			<div className="helpBlock">
				<img alt="Icon" src={questionImg} width='30' className="helpImg"/>
				<ModalWindow/>
			</div>
		</div>
	)
}

export default Header;
