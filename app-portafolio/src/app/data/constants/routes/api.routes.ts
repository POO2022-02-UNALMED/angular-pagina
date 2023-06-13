import { environment as ENV } from 'environments/environment';

export const API_ROUTES = {
    DATA_USERS: {
        USERS: `${ENV.url}users`
    },

    DATA_LOGINS: {
        LOGINS: `${ENV.url}login`
    },
    DATA_PROYECTS: {
        PROYECTS: `${ENV.url}proyects`
    }
};
