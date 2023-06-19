import { Adress } from "./adress";
export interface Customer {
    _id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    adress: Adress,
    reservations: {
        reservationId: string,
        tripId: string
    }[]
}