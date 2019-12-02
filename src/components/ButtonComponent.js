import React from 'react';
import './../App.css';

function ButtonComponent(props) {
	return(
		<button type='button' className={`button ${props.className}`} onClick={props.eventButton}
				disabled={props.disabledButton}>
			{
				props.src && <img alt='Icon' src={props.src} className='icon' width='12'/>
			}
			{props.name}
		</button>
	)
}

export default ButtonComponent;
