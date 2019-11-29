import React from 'react';
import './App.css';
import reloadImg from "./images/reload.png";
import undoImg from "./images/undo.png";
import questionImg from "./images/question.png";
import {disabledNum} from "./redux/SudokuReducer";
import Confetti from "react-confetti";
import Modal from 'react-responsive-modal';

const pallet = {
	'0': '#90CAF9', // Box 1
	'30': '#1DE9B6', // Box 2
	'60': '#FFAB91', // Box 3
	'3': '#D1C4E9', // Box 4
	'33': '#FFF59D', // Box 5
	'63': '#A5D6A7', // Box 6
	'6': '#80CBC4', // Box 7
	'36': '#F48FB1', // Box 8
	'66': '#81D4FA', // Box 9
};

const getBoxColor = (row, col) => {
	let rowGroup = row - (row % 3); // uppermost row index of the box
	let colGroup = (col - (col % 3)) * 10; // leftmost col index of the box * 10
	/*
		r\c| 0   30   60
		----------------
		 0 | 0   30   60
		 3 | 3   33   63
		 6 | 5   36   66
	*/
	return pallet[rowGroup + colGroup];
};

function App(props) {
	let changeValue = (e, id) => {
		let value = e.target.value;
		// if (isNaN(parseInt(value))) {
		// 	return;
		// }
		props.changeValue(id.row, id.col, value)
	};

	return (
		<div className='sudokuApp'>
			<Confetti run={props.isVictory} height={3000}/>
			<div className="titleBlock">
				<h1 className='title'>Sudoku</h1>
				<div className="helpBlock">
					<img alt="Icon" src={questionImg} width='30' className="helpImg"/>
					<div className="help">
						<h2 className="helpTitle">Help Block</h2>
						<p className='rules'>A Sudoku puzzle is defined as a logic-based, number-placement puzzle. The
							objective is to fill a 9×9 grid with digits in such a
							way that each column, each row, and each of the nine 3×3 grids that make up the larger 9×9
							grid contains all of the digits from
							1 to 9. Each Sudoku puzzle begins with some cells filled in. The player uses these seed
							numbers as a launching point toward finding
							the unique solution.
						</p>
						<p className='rules'>It is important to stress the fact that no number from 1 to 9 can be
							repeated in any row or column (although, the can be repeated
							along the diagonals).
						</p>
						<p className='rules'>
							<span className='ruleButton'>Button 'Undo' </span>
							will return one turn back.
						</p>
						<p className='rules'>
							<span className='ruleButton'>Button 'Clear' </span>
							will clear the field of all your fillings.
						</p>
						<p className='rules'>
							<span className='ruleButton'>Button 'Check '</span>
							will check the correctness of your fillings.
						</p>
						<p className='rules'>
							<span className='ruleButton'>Button 'Solve' </span>
							will show the answer to this puzzle.
						</p>
					</div>
				</div>
			</div>
			<div className='buttonBlock'>
				<button type='button' className='button buttonUndo' onClick={props.undo}
						disabled={props.history.length <= 1}>
					<img alt='Icon' src={undoImg} className='icon' width='12'/>
					Undo
				</button>
				<button type='button' className='button buttonClear' onClick={props.clear}
						disabled={props.history.length <= 1}>
					<img alt='Icon' src={reloadImg} className='icon iconRotate' width='12'/>
					Clear
				</button>
			</div>
			<div className='tableBlock'>
				<table border='2' cellSpacing='0' frame='void'>
					<tbody>
					{
						props.sudoku.map((row, index) => {
							let rowNum = index;
							return <tr key={index}>
								{
									row.map((col, index) => {
										let id = {row: rowNum, col: index};
										return <td key={index} style={{width: '35px', height: '35px'}} align='center'>
											<input type='text' className='cell' value={col !== '0' ? col : ''} id={id}
												   style={{backgroundColor: getBoxColor(rowNum, index)}}
												   onChange={(e) => changeValue(e, id)}
												   disabled={disabledNum(id.row, id.col, col)}/>
										</td>
									})
								}
							</tr>
						})
					}
					</tbody>
				</table>
			</div>
			<div className='buttonBlock'>
				<button type='button' className={'button buttonCheck' + (!props.isChecked ? 'disabled': '')} onClick={props.check}
						disabled={props.isChecked === false}>Check</button>
				<button type='button' className='button buttonSolve' onClick={props.solve}>Solve</button>
			</div>
			<Modal open={props.isModalWindow} onClose={props.closeModalWindow}>
				<h2>You did something wrong!!!</h2>
				<button onClick={props.continueGame}>Continue</button>
				<button onClick={props.solve}>Show answer</button>
			</Modal>
		</div>
	);
}

export default App;
