class CurrentDate {

    getCurrentSemester() {
        const currentDate = new Date;
        const month = currentDate.getMonth();
        
        if(month < 6)
            return 'Primero';
        else 
            return 'Segundo';
    }

    getCurrentYear() {
        const currentDate = new Date;
        const year = currentDate.getFullYear();
        
        return year.toString();
    }
}

export const currentDate = new CurrentDate();