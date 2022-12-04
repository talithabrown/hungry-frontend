import PurchaseOrderItem from "./PurchaseOrderItem";

const PurchaseOrder = ({ order }) => {

    const getDateTime = (datetime) => {
        const readydate = new Date(datetime);
        const todaysDate = new Date().setHours(0,0,0,0);

        // let weekday = '';
        // if (readydate.setHours(0,0,0,0) === todaysDate) {
        //     weekday = 'Today'
        // }
        // else {
        //     let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        //     weekday = weekdays[readydate.getDay()];
        // }

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
        if (hour === '00') {
            time = `12:${minutes}`
        }

        return `${short_date}`

    }
  
    if (order) {

        const orderDateTime = getDateTime(order.placed_at)

        return (
        <div className='order-div'>

            {order.items.map((item) => (
                <PurchaseOrderItem orderItem={item} key={item.id} datetime={orderDateTime} />
            ))}

        </div>
        )
    }
}

export default PurchaseOrder