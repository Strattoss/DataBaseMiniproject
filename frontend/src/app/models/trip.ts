import { Review } from "./review";

export interface Trip {
    _id: string,
    description: string,
    destination: string, 
    startDate: Date,
    endDate: Date,
    availableSeats: number,
    title: string, 
    unitPrice: number,
    avgRating: number,
    canBeDeleted: boolean,
    reviews: Review[]
}
