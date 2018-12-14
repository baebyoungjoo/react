import axios from 'axios';

const Axios = () => {
    return (
        axios.get('http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=UOPcUrQ9YWC6H0naThrbeNKlJL9bkqrsLIq0XBTn1reg8U1I4T9dTIFHGDIt%2FDad9mtU0s3qaN3KzX2kTHunnw%3D%3D&solYear=2018&solMonth=01', {
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json'
            }
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