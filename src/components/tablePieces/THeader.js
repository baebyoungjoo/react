import React, { Component } from 'react'

const week = [ '일', '월', '화', '수', '목', '금', '토' ]
const tableHeader = (
    <thead className='calendar_table_header'><tr>
        { week.map((column, idx) => {
            return (
                <th key={ idx } className={ idx === 0 || idx === 6 ? 'weekend' : '' }>{ column }</th>
            )
        }) }
    </tr></thead>
)

class Th extends Component {
    render() {
        return (
            <React.Fragment>
                { tableHeader }
            </React.Fragment>
        )
    }
}

export default Th;