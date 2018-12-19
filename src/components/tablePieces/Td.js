import React from 'react'
import PropTypes from 'prop-types'
import { padZero } from '../../helpers/padZero'

class Td extends React.Component {
    state = {
        isActive: false
    }

    getToday = () => {
        return new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate() + '.'
    }

    isHoliday = () => {
        let year  = new Date(this.props.thisDate).getFullYear();
        let month = new Date(this.props.thisDate).getMonth() + 1;
        let date  = new Date(this.props.thisDate).getDate();

        month = padZero(month)
        date  = padZero(date)

        let fullDate = year + '' + month + '' + date
        
        return { fullDate, year, month }
    }

    checkClassName = () => {
        let lastClassName = ''
        
        this.props.className !== undefined
            ? lastClassName = lastClassName + this.props.className 
            : lastClassName = ''
     
        this.props.thisDate === this.getToday() 
            ? lastClassName = lastClassName + ' calendar_today' 
            : lastClassName = lastClassName + ''
        
        if (this.props.isHoliday) lastClassName = lastClassName + ' holiday'
        if (this.state.isActive) lastClassName = lastClassName + ' calendar_select'
        
        return lastClassName
    }
    
    handleOnClick = () => {
        const currentState = this.state.isActive
        this.setState({
            isActive: !currentState
        })
    }

    render() {
        const { thisDate, tableDataIdx, value, isHoliday } = this.props
        return (
            <td 
                className={ this.checkClassName() }
                data-date={ thisDate }
                key={ tableDataIdx }
                onClick={ this.handleOnClick }
                data-holiday={ isHoliday }
            >
            { value }
            <br/>

            {/* {
                thisDate === this.getToday() && isActive === true
                    ? <span>select</span>
                    : thisDate === this.getToday() && isActive !== true
                        ? <span>오늘</span>
                        : isActive === true
                            ? <span>select</span>
                            : null
            } */}
            </td>
        )
    }
}

Td.propTypes = {
    thisDate: PropTypes.string,
    value: PropTypes.number,
    isHoliday: PropTypes.bool
}

export default Td;