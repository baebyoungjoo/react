import React, { Component } from 'react'

class Th extends Component {
    createCalendarTableHeader = () => {
        const week = [ '일', '월', '화', '수', '목', '금', '토' ]
        const tableHeader = (
            <thead className='calendar_table_header'><tr>
                { week.map((column, idx) => {
                    return (
                        <th key={ idx }>{ column }</th>
                    )
                }) }
            </tr></thead>
        )

        return tableHeader
    }

    render() {
        return (
            <React.Fragment>
                { this.createCalendarTableHeader() }
            </React.Fragment>
        )
    }
}

export default Th;