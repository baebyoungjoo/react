import axios from 'axios';

const Axios = (solYear, solMonth) => {

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
            crossdomain: true
        })
        .then( (response) => {
            console.log(response.data.response.body.items.item)
        })
        .catch( (response) => {
            console.log(response)
        })
    );
}

export default Axios;