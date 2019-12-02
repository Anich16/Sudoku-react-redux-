import React from 'react';
import './../App.css';

let buttons = [
	{
		name: 'Undo',
		description: 'will return one turn back'
	},
	{
		name: 'Clear',
		description: 'will clear the field of all your fillings'
	},
	{
		name: 'Check',
		description: 'will check the correctness of your fillings'
	},
	{
		name: 'Solve',
		description: 'will show the answer to this puzzle'
	},
];

function ModalWindow() {
	return (
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
			{ buttons.map((el, index) => {
				return <p className='rules' key={index}>
					<span className='ruleButton'>'{el.name}' </span>
					{el.description}
				</p>
			})}
		</div>
	)
}

export default ModalWindow;
