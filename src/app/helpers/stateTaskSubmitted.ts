class StateTaskSubmitted {

    getStateMessage(state) {

        switch(state) { 
            case "none": { 
                return "Sin formulario de revisión asignado";
            } 

            case "checked": { 
                return "Revisado";
            } 

            case "rejected": { 
                return "Rechazado"; 
            }

            case "reviewersAssigned": {
                return "Formulario de revisión asignado"; 
            }

            default: { 
                return "error";
            } 
            
         } 
    }
}

export const stateTaskSubmitted = new StateTaskSubmitted();