import React from 'react'
import { Axios } from '../Axios'
import PropTypes from 'prop-types'
import { padZero } from '../../helpers/padZero'

class Td extends React.Component {
    state = {
        isActive: false,
        isHoliday: false,
        holidayList: {},
        totalCount: 0
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

    componentDidMount() {
        const holiday = this.isHoliday()

        Axios(holiday.year, holiday.month)
            .then(response => {
                this.setState({
                    holidayList: response.items.item,
                    totalCount : response.totalCount
                }
            )
            }).catch(error => {
                console.log(error)
            })
    }

    checkClassName = () => {
        let lastClassName = '';
        
        this.props.className !== undefined
            ? lastClassName = lastClassName + this.props.className 
            : lastClassName = '';
     
        this.props.thisDate === this.getToday() 
            ? lastClassName = lastClassName + ' calendar_today' 
            : lastClassName = lastClassName + '';
            
        if (this.state.isActive) lastClassName = lastClassName + ' calendar_select';
        
        return lastClassName
    }
    
    handleOnClick = () => {
        const currentState = this.state.isActive;
        this.setState({
            isActive: !currentState
        })
    }

    replace = () => {
        let sx = this.props.thisDate.replace(/\./gi,'')
        return sx
    }

    render() {
        const { thisDate, tableDataIdx, value } = this.props
        const { isActive } = this.state
        return (
            <td 
                className={ this.checkClassName() }
                data-date={ thisDate }
                key={ tableDataIdx }
                onClick={ this.handleOnClick }
            >
            { value }
            <br/>

            {
                thisDate === this.getToday() && isActive === true
                    ? <span>select</span>
                    : thisDate === this.getToday() && isActive !== true
                        ? <span>오늘</span>
                        : isActive === true
                            ? <span>select</span>
                            : null
            }
            </td>
        )
    }
}

Td.propTypes = {
    thisDate: PropTypes.string,
    value: PropTypes.number
}

export default Td;