import React from 'react';
import './App.css';
import reloadImg from "./images/reload.png";
import undoImg from "./images/undo.png";

import Confetti from "react-confetti";
import Modal from 'react-responsive-modal';
import Header from "./components/Header";
import ButtonComponent from "./components/ButtonComponent";
import SudokuTable from "./components/SudokuTable";

function App(props) {
	return (
		<div className='sudokuApp'>
			<Confetti run={props.isVictory} height={3000}/>
			<Header/>
			<div className='buttonBlock'>
				<ButtonComponent name='Undo' className='buttonUndo' disabledButton={props.history.length <= 1} eventButton={props.undo} src={undoImg}/>
				<ButtonComponent name='Clear' className='buttonClear' disabledButton={props.history.length <= 1} eventButton={props.clear} src={reloadImg}/>
			</div>
			<SudokuTable props={props}/>
			<div className='buttonBlock'>
				<ButtonComponent name='Check' className={'buttonCheck' + (!props.isChecked ? 'disabled': '')} disabledButton={props.isChecked === false} eventButton={props.check}/>
				<ButtonComponent name='Solve' className='buttonSolve' eventButton={props.solve}/>
			</div>
			<Modal open={props.isModalWindow} onClose={props.closeModalWindow}>
				<h2>You did something wrong!!!</h2>
				<button onClick={props.continueGame}>Continue</button>
				<button onClick={props.solve}>Show answer</button>
			</Modal>
			{
				props.isVictory &&
				<div className='victoryBlock'>
					<p className='victoryText'>Great job!!!</p>
				</div>
			}
			{
				props.isError &&
					<div className='errorBlock'>
						{
							props.errorMessage.map((el, index) =>{
								return <p className="errorText" key={index}>{el}</p>
							})
						}
					</div>
			}
		</div>
	);
}

export default App;
