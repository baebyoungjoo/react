import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* Button component 
    prop: buttonValue is required
*/

class Button extends Component {

    render () {
        return (
            <React.Fragment>
                <button
                    className = { this.props.className }
                    onClick = { this.props.onClick }
                >
                { this.props.buttonValue }
                </button>
            </React.Fragment>
        )
    }
}

Button.propTypes = {
    buttonValue: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
}

Button.defaultProps = {
    className: 'btn btn-sm'
}

export default Button;