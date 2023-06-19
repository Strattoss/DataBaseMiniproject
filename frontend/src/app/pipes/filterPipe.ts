import { Pipe, PipeTransform } from "@angular/core";
import { min } from "rxjs";
import { Trip } from "../models/trip";

@Pipe({ name: 'filterPipe', pure: false })
export class FilterPipe implements PipeTransform {
    transform(travels: Trip[], filteredLocations: string[], filteredPrice: number, minDate: Date | undefined, maxDate: Date | undefined, filteredStars: number[]): Trip[] {
    if (!travels)
        return []
    if(filteredLocations && filteredLocations.length != 0) {
        travels = travels.filter(travel => {
            return filteredLocations.includes(travel.destination)
        })
    }
    if(filteredPrice != -1) {
        travels = travels.filter(travel => {
            return travel.unitPrice <= filteredPrice
        })
    }
    if(!(minDate === undefined) && !isNaN(minDate.getTime())) {
        travels = travels.filter(travel => {
            let startDate = new Date(travel.startDate)                  
            return startDate >= minDate
        })
    }
    if(!(maxDate === undefined) && !isNaN(maxDate.getTime())) {
        travels = travels.filter(travel => {
            let endDate = new Date(travel.endDate)                  
            return endDate <= maxDate
        })
    }
    if(filteredStars && filteredStars.length != 0) {
        travels = travels.filter(travel => {
            return filteredStars.includes(Math.round(travel.avgRating))
        })
    }
    return travels
 }
}