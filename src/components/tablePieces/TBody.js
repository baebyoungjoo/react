import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Td from './Td'
import { padZero } from '../../helpers/padZero'
import { replaceDotToSpace } from '../../helpers/replaceDotToSpace'
import { Axios } from '../../helpers/Axios'

/* create TBody component
    prop: firstDay, lastDate, currentYear, currentMonth

    firstDay = First(start) day of the month. 
    lastDate = last day of the month
*/

class TBody extends Component {
    
    state = {
        holidayList: {},
        holidayTotalCountOfMonth: 0
    }
    /* output 2018.01.01 */
    makeThisDate = (dayCount) => {
        const { currentYear, currentMonth } = this.props

        let month = currentMonth + 1

        month = padZero(month)
        dayCount  = padZero(dayCount)

        let thisDate = currentYear + '.' + month + '.' + dayCount + '.'

        return thisDate
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

        for (let tableRowIdx = 0; tableRowIdx < totalWeek; tableRowIdx++) {
            let tableBodyTd = []

            for (let tableDataIdx = 0; tableDataIdx < oneWeek; tableDataIdx++) {
                if (tableRowIdx === 0 && tableDataIdx < firstDay) {
                    tableBodyTd.push(<td key={ tableDataIdx }></td>)
                    continue
                }

                if (dayCount <= lastDate && this.getWeekend(dayCount) === 6) {
                    tableBodyTd.push(
                        <Td className={ 'sat' } thisDate={ this.makeThisDate(dayCount) }
                            isHoliday={ this.holidayCheck(dayCount) }
                            key={ tableDataIdx } value = { dayCount++ }/>
                    )
                    continue
                }

                if (dayCount <= lastDate && this.getWeekend(dayCount) === 0) {
                    tableBodyTd.push(
                        <Td className={ 'sun' } thisDate={ this.makeThisDate(dayCount) } 
                            isHoliday={ this.holidayCheck(dayCount) }
                            key={ tableDataIdx } value = { dayCount++ }/>
                    )
                    continue
                }

                if (dayCount <= lastDate) {
                    tableBodyTd.push(
                        <Td thisDate={ this.makeThisDate(dayCount) } 
                            isHoliday={ this.holidayCheck(dayCount) }
                            key={ tableDataIdx } value = { dayCount++ }/>
                    )
                    continue
                } 
                
                tableBodyTd.push(<td key={ tableDataIdx }></td>)
            }
            tableBodyTr.push(<tr key= { tableRowIdx }>{ tableBodyTd }</tr>)
        }
        tableBody.push(<tbody key={ dayCount } className='calendar_table_body'>{ tableBodyTr }</tbody>)
        return tableBody;
    }

    // componentDidMount() {
    componentWillMount() {
        Axios(this.props.currentYear, padZero(this.props.currentMonth+1))
        .then( (response) => 
            this.setState({
                holidayList: response.items.item,
                holidayTotalCountOfMonth: response.totalCount
            }
            // , () => {console.log('componentDidMount =>', this.state.holidayList)}
            )
        ).catch( (error) => {
            console.log('error', error)
        })
    }

    componentWillReceiveProps(nextProps, nextState) {
        Axios(nextProps.currentYear, padZero(nextProps.currentMonth+1))
        .then( (response) => 
            this.setState({
                holidayList: response.items.item,
                holidayTotalCountOfMonth: response.totalCount
            }
            // , () => {console.log('shouldComponentUpdate =>', this.state.holidayList)}
            )
        ).catch( (error) => {
            console.log('error', error)
        })
        return true
    }

    holidayCheck = (dayCount) => {
        const { holidayList, holidayTotalCountOfMonth } = this.state
        let success = false
        let parseThisDay = Number.parseInt(replaceDotToSpace(this.makeThisDate(dayCount)))
        
        if (holidayTotalCountOfMonth === 1) {
            return parseThisDay === holidayList.locdate ? true : false
        } else if (holidayTotalCountOfMonth > 1) {
            for (let idx = 0; idx < holidayTotalCountOfMonth; idx++) {
                if (parseThisDay === holidayList[idx].locdate) {
                    success = true
                }
            }
            return success
        }
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