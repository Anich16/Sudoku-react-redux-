import {connect} from "react-redux";
import App from "../App";
import {
	changeValueAC,
	checkAC, checkErrorAC,
	clearAC,
	closeModalWindowAC,
	continueGameAC,
	solveAC,
	undoAC
} from "./SudokuReducer";

let mapStateToProps = (state) => {
	return {
		sudoku: state.sudoku,
		history: state.history,
		correctSudoku: state.correctSudoku,
		isVictory: state.isVictory,
		isChecked: state.isChecked,
		isModalWindow: state.isModalWindow,
		isError: state.isError,
		errorMessage: state.errorMessage
	}
};

let mapDispatchToProps = (dispatch) => {
	return {
		changeValue: (row, col, value) => {
			return dispatch(changeValueAC(row, col, value))
		},
		undo: () => {
			return dispatch(undoAC())
		},
		clear: () => {
			return dispatch(clearAC())
		},
		solve: () => {
			return dispatch(solveAC())
		},
		check: () => {
			return dispatch(checkAC())
		},
		continueGame: () => {
			return dispatch(continueGameAC())
		},
		closeModalWindow: () => {
			return dispatch(closeModalWindowAC())
		},
		checkError: (row, col, value) => {
			return dispatch(checkErrorAC(row, col, value))
		}
	}
};

export let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
