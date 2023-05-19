export default class Dates{
    static compareDates(event){
        return event.start.getDate() === event.end.getDate()
    }

    static getTime(date){
        if(typeof date==='string'){
            date = new Date(date)
        }
        return date.getHours() + ':' + (date.getMinutes() === 0 ? '00' : date.getMinutes())
    }

    static getMonth(date){
        if(typeof date==='string'){
            date = new Date(date)
        }
        return (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    }

    static getDate(date){
        if(typeof date==='string'){
            date = new Date(date)
        }
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }
}