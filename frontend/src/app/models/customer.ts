import { Adress } from "./adress";
export interface Customer {
    _id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: Adress,
    numberOfReservations: number,
    reservations: {
        reservationId: string,
        tripId: string
    }[]
}