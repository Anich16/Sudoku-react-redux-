let initialState = {
	sudoku: [
		['8', '0', '0', '4', '0', '6', '0', '0', '7'],
		['0', '0', '0', '0', '0', '0', '4', '0', '0'],
		['0', '1', '0', '0', '0', '0', '6', '5', '0'],
		['5', '0', '9', '0', '3', '0', '7', '8', '0'],
		['0', '0', '0', '0', '7', '0', '0', '0', '0'],
		['0', '4', '8', '0', '2', '0', '1', '0', '3'],
		['0', '5', '2', '0', '0', '0', '0', '9', '0'],
		['0', '0', '1', '0', '0', '0', '0', '0', '0'],
		['3', '0', '0', '9', '0', '2', '0', '0', '5']
	],
	correctSudoku: [
		['8', '3', '5', '4', '1', '6', '9', '2', '7'],
		['2', '9', '6', '8', '5', '7', '4', '3', '1'],
		['4', '1', '7', '2', '9', '3', '6', '5', '8'],
		['5', '6', '9', '1', '3', '4', '7', '8', '2'],
		['1', '2', '3', '6', '7', '8', '5', '4', '9'],
		['7', '4', '8', '5', '2', '9', '1', '6', '3'],
		['6', '5', '2', '7', '8', '1', '3', '9', '4'],
		['9', '8', '1', '3', '4', '5', '2', '7', '6'],
		['3', '7', '4', '9', '6', '2', '8', '1', '5']
	],
	history: [],
	isVictory: false,
	isChecked: false,
	isModalWindow: false,
	isError: false,
	errorMessage: ''
};
const errorObj = {
	row: 'This number already exists in this row.',
	col: 'This number already exists in this col.',
	square: 'This number already exists in this square.'
};

window.sudokuHistory = window.sudokuHistory || [];

let SudokuReduser = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_VALUE': {
			let newHistory = JSON.parse(JSON.stringify(!state.history.length ? [state.sudoku] : state.history));
			let newState = JSON.parse(JSON.stringify(state.sudoku));
			newState[action.row][action.col] = action.value;
			newHistory = [...newHistory, newState];
			return {...state, sudoku: newState, history: newHistory, isChecked: true}
		}
		case 'UNDO': {
			let newHistory = JSON.parse(JSON.stringify(state.history));
			if (newHistory.length === 1) {
				return {...state, sudoku: newHistory.length, history: newHistory, isError: false, errorMessage: []};
			} else {
				newHistory.pop();
				return {...state, sudoku: newHistory[newHistory.length - 1], history: newHistory, isChecked: true, isError: false, errorMessage: []};
			}
		}
		case 'SOLVE': {
			let newHistory = JSON.parse(JSON.stringify(!state.history.length ? [state.sudoku] : state.history));
			newHistory = [...newHistory, state.correctSudoku];
			return {...state, sudoku: state.correctSudoku, history: newHistory, isChecked: false, isModalWindow: false};
		}
		case 'CLEAR': {
			return {...state, sudoku: state.history[0], history: [], isChecked: false, isError: false, errorMessage: []};
		}
		case 'CHECK': {
			if(JSON.stringify(state.sudoku) === JSON.stringify(state.correctSudoku)){
				return {...state, isVictory: true}
			} else {
				return {...state, isModalWindow: true}
			}
		}
		case 'CONTINUE_GAME': {
			return {...state, isModalWindow: false}
		}
		case 'CLOSE_MODAL_WINDOW': {
			return {...state, isModalWindow: false}
		}
		case 'CHECK_ERROR': {
			let errorRow = false;
			let errorCol = false;
			let errorSquare = false;
			let errorMessage = [];
			errorCol = state.sudoku.find(el => {
				if (el[action.col] === action.value) {
					errorMessage = [...errorMessage, errorObj.col];
					return true;
				} else {
					return false
				}
			});
			errorRow = state.sudoku[action.row].find(el => {
					if (el === action.value) {
						errorMessage = [...errorMessage, errorObj.row];
						return true;
					} else {
						return false;
					}
			});
			// errorSquare = checkErrorSquare(state.sudoku, action.row, action.col, action.value);
			errorMessage = [...errorMessage, errorSquare && errorObj.square];
			return {...state, isError: errorRow || errorCol, errorMessage: errorMessage}
		}
		default:
			return state;
	}
};


export const changeValueAC = (row, col, value) => ({type: 'CHANGE_VALUE', row, col, value});
export const undoAC = () => ({type: 'UNDO'});
export const clearAC = () => ({type: 'CLEAR'});
export const solveAC = () => ({type: 'SOLVE'});
export const checkAC = () => ({type: 'CHECK'});
export const continueGameAC = () => ({type: 'CONTINUE_GAME'});
export const closeModalWindowAC = () => ({type: 'CLOSE_MODAL_WINDOW'});
export const checkErrorAC = (row, col, value) => ({type: 'CHECK_ERROR', row, col, value});

export const disabledNum = (row, col, value) => {
	let sudoku = JSON.parse(JSON.stringify(initialState.sudoku));
	if (sudoku[row][col] === value && sudoku[row][col] !== '0') {
		return true;
	}
};

// const checkErrorSquare = (arr, row, col, value) => {
// 	let start, end, arrElement;
// 	if (row < 3) {
// 		start = 0;
// 		end = 2;
// 	} else if (row > 5) {
// 		start = 6;
// 		end = 8;
// 	} else {
// 		start = 3;
// 		end = 5;
// 	}
// 	arrElement = arr.filter((el, index) => {
// 		if(start <= index && index <= end){
// 			console.log(index);
// 			return el;
// 		}
// 	});
// 	if (col < 3) {
// 		start = 0;
// 		end = 2;
// 	} else if (col > 5) {
// 		start = 6;
// 		end = 8;
// 	} else {
// 		start = 3;
// 		end = 5;
// 	}
// 	arrElement = arrElement.map(el => {
// 		debugger
// 		el.filter((element, index) => {
// 			debugger
// 			if(start <= index && index <= end){
// 				return element;
// 			}
// 		});
// 		return el;
// 	});
// 	arrElement.find(el => {
// 		return el !== value;
// 	});
// 	return arrElement;
// };

export default SudokuReduser;
