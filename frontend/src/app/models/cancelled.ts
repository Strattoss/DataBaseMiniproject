import { Reservation } from "./reservation";

export interface Cancelled extends Reservation {
    cancelationDate: Date
}
