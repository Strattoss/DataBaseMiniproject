import { Reservation } from "./reservation";

export interface Purchase extends Reservation {
    purchaseDate: Date,
    review: boolean
}
