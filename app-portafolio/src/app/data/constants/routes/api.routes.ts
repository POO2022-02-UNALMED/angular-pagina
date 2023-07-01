import { environment as ENV } from 'environments/environment';

export const API_ROUTES = {
    DATA_USERS: {
        USERS: `${ENV.url}auth`
    },

    DATA_PROYECTS: {
        PROYECTS: `${ENV.url}proyects`
    },
    DATA_TASK: {
        TASKS: `${ENV.url}tasks`
    }
};
