import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Td from './Td'
import { padZero } from '../../helpers/padZero'

/* create TBody component
    prop: firstDay, lastDate, currentYear, currentMonth

    firstDay = First(start) day of the month. 
    lastDate = last day of the month
*/

class TBody extends Component {
    
    /* output 2018.01.01 */
    makeThisDay = (dayCount) => {
        const { currentYear, currentMonth } = this.props

        let month = currentMonth + 1

        month = padZero(month)
        dayCount  = padZero(dayCount)

        let thisDay = currentYear + '.' + month + '.' + dayCount + '.'

        return thisDay
    }

    /* output 0(sun)-6(sat) */
    getWeekend = (dayCount) => {
        let weekend = new Date(this.props.currentYear, this.props.currentMonth, dayCount).getDay();
        
        return weekend
    }
    
    /* output <tbody><tr><td></td></tr></tbody> */
    createCalendarTableBody = (firstDay, lastDate) => {
        
        const oneWeek = 7;
        const remain  = lastDate - (oneWeek - firstDay);
        const remainWeek = Number.parseInt(remain/oneWeek);
        let totalWeek = 0;

        (remain % oneWeek === 0) 
            ? totalWeek = remainWeek + 1 
            : totalWeek = remainWeek + 2;
        
        let tableBody = [];
        let tableBodyTr = [];
        let dayCount = 1;

        for (let idx = 0; idx < totalWeek; idx++) {
            let tableBodyTd = []

            for (let innerIdx = 0; innerIdx < oneWeek; innerIdx++) {
                if (idx === 0 && innerIdx < firstDay) {
                    tableBodyTd.push(<td key={ innerIdx }></td>)
                    continue
                }

                if (dayCount <= lastDate && this.getWeekend(dayCount) === 6) {
                    tableBodyTd.push(
                        <Td className={'sat'} thisDate={ this.makeThisDay(dayCount) } 
                            key={ innerIdx } value = { dayCount++ }/>
                    )
                    continue
                }

                if (dayCount <= lastDate && this.getWeekend(dayCount) === 0) {
                    tableBodyTd.push(
                        <Td className={ 'sun' } thisDate={ this.makeThisDay(dayCount) } 
                            key={ innerIdx } value = { dayCount++ }/>
                    )
                    continue
                }

                if (dayCount <= lastDate) {
                    tableBodyTd.push(
                        <Td thisDate={ this.makeThisDay(dayCount) } 
                            key={ innerIdx } value = { dayCount++ }/>
                    )
                    continue
                } 
                
                tableBodyTd.push(<td key={ innerIdx }></td>)
            }
            tableBodyTr.push(<tr key= { idx }>{ tableBodyTd }</tr>)
        }
        tableBody.push(<tbody key={ dayCount } className='calendar_table_body'>{ tableBodyTr }</tbody>)
        return tableBody;
    }

    render () {
        const { firstDay, lastDate } = this.props;
        return (
            <React.Fragment>
                { this.createCalendarTableBody(firstDay, lastDate) }
            </React.Fragment>
        )
    }
}

TBody.propTypes = {
    currentYear: PropTypes.number,
    currentMonth: PropTypes.number,
    firstDay: PropTypes.number,
    lastDate: PropTypes.number
}

export default TBody;