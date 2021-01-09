import {addDays, addHours, addMinutes, addMonths, addWeeks, addYears} from 'date-fns';

export declare type timeUnit ='YEAR'|'MONTH'|'WEEK'|'DAY'|'HOUR'|'MINUTE';

const util = {
    getLocaleString(timezone: string): 'es_ES'|'en_US' {
        switch (timezone) {
            case "Africa/Ceuta":
            case "America/Argentina":
            case "America/Cancun":
            case "America/Caracas":
            case "America/Costa_Rica":
            case "America/Cordoba":
            case "America/Dominica":
            case "America/El_Salvador":
            case "America/Guatemala":
            case "America/Guayaquil":
            case "America/La_Paz":
            case "America/Lima":
            case "America/Managua":
            case "America/Mendoza":
            case "America/Merida":
            case "America/Mexico_City":
            case "America/Monterrey":
            case "America/Montevideo":
            case "America/Panama":
            case "America/Puerto_Rico":
            case "America/Rosario":
            case "America/Santa_Isabel":
            case "America/Santiago":
            case "America/Santo_Domingo":
            case "America/Tegucigalpa":
            case "America/Tijuana":
            case "Europe/Madrid":
            case "America/Havana":
            case "Europe/Andorra":
                return "es_ES"
            default:
                return "en_US"
        }
    },
    getNextDate(startDate: Date, qty: number, unit: timeUnit, offset: number) {
        const localDate = addMinutes(new Date(), offset);
        switch (unit) {
            case "YEAR":
                return addYears(localDate, qty);
            case "MONTH":
                return  addMonths(localDate, qty);
            case "WEEK":
                return  addWeeks(localDate, qty);
            case "DAY":
                return  addDays(localDate, qty);
            case "HOUR":
                return  addHours(localDate, qty);
            case "MINUTE":
                return  addMinutes(localDate, qty);
        }
    }
}

export default util;
