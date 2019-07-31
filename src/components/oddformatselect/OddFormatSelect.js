import React from 'react';
import './oddselect.css'
function OddFormatSelect(props) {

    function handleChange() {
        props.toggle()
    }

    return (
        <div className="odds-select">
            <label>view odds as:</label>
            <select onChange={(e) => handleChange()}>
                <option value="fractional">fractional</option>
                <option value="decimal">decimal</option>
            </select>
        </div>
    )
}

export default OddFormatSelect