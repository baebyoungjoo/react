import axios from 'axios';

// const Axios = (solYear, solMonth) => {
export function Axios(solYear, solMonth) {
    
    const url = 
        'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?'
        + 'serviceKey='
        + 'UOPcUrQ9YWC6H0naThrbeNKlJL9bkqrsLIq0XBTn1reg8U1I4T9dTIFHGDIt%2FDad9mtU0s3qaN3KzX2kTHunnw%3D%3D'
        + '&solYear='
        + solYear
        + '&solMonth='
        + solMonth

    return (
        axios.get(url, {
            crossdomain: true,
            headers: {
                'Content-Type': 'application/xml'
            }
        })
        .then( (response) => {
            console.log(response)
            return response.data.response.body.totalCount
        })
        .catch( (error) => {
            console.log(error)
            return error
        })
    )
}

// export default Axios;