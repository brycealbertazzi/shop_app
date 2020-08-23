import moment from 'moment/src/moment'

class Order {
    constructor(
        id,
        items,
        total,
        date
    ) {
        this.id = id;
        this.items = items;
        this.total = total;
        this.date = date;
    }

    get readableDate() {
        // Converts the date into a readable string
        // return this.date.toLocaleDateString('en-EN', {
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // });

        // Use the moment library so the date formats correctly on android
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }

}

export default Order;