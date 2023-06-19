export interface Reservation {
    _id: string,
    tripId: string,
    title: string,
    destination: string,
    startDate: Date,
    endDate: Date,
    reservationDate: Date,
    tickets: number,
    price: number,
    state: string,
    customer_id: string,
}
