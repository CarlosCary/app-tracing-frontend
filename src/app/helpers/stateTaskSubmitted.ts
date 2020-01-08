class StateTaskSubmitted {

    getStateMessage(state) {

        switch(state) { 
            case "none": { 
                return "Sin revisar";
            } 

            case "checked": { 
                return "Revisado";
            } 

            case "rejected": { 
                return "Rechazado"; 
            } 

            default: { 
                return "error";
            } 
            
         } 
    }
}

export const stateTaskSubmitted = new StateTaskSubmitted();