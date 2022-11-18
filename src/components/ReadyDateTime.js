

const ReadyDateTime = ({ datetime }) => {

    if (datetime) {
        const readydate = new Date(datetime);
        const todaysDate = new Date().setHours(0,0,0,0);

        let weekday = '';
        if (readydate.setHours(0,0,0,0) === todaysDate) {
            weekday = 'Today'
        }
        else {
            let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            weekday = weekdays[readydate.getDay()];
        }

        let short_date = readydate.toString().substring(4, 10)

        let time = datetime.toString().substring(11, 16)

        let hour = time.substring(0, 2)
        let minutes = time.substring(3, 5)
        let am_or_pm = 'AM'
        if (hour > 12){
            hour = hour - 12
            am_or_pm = 'PM'
            time = `${hour}:${minutes}`
        }

        return (
        <p>Ready {weekday} {short_date} at {time} {am_or_pm}</p>
        )
    }
}
  
export default ReadyDateTime