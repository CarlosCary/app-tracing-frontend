class StateTaskSubmitted {

    getStateMessage(state) {

        switch(state) { 
            case "none": { 
                return "Sin tribunal asignado";
            } 

            case "checked": { 
                return "Revisado";
            } 

            case "rejected": { 
                return "Rechazado"; 
            } 

            case "reviewersAssigned": {
                return "Tribunal asignado"; 
            }

            default: { 
                return "error";
            } 
            
         } 
    }
}

export const stateTaskSubmitted = new StateTaskSubmitted();