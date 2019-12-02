import React from 'react';
import './../App.css';
import {disabledNum} from "../redux/SudokuReducer";

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

function SudokuTable({props}) {
	let changeValue = (e, id) => {
		let value = e.target.value;
		props.checkError(id.row, id.col, value);
		props.changeValue(id.row, id.col, value);
	};

	return (
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
											   style={{backgroundColor: props.isError ? getBoxColor(rowNum, index, true) : getBoxColor(rowNum, index)}}
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
	)
}

export default SudokuTable;
