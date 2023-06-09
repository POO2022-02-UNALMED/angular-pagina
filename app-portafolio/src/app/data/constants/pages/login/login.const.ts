import { ENUM_VALIDATION_OPTION } from "@data/enum";
import { Ifield } from "@data/interfaces/forms/ifield.metadata";
import { ValidationsService } from "@shared/services/validations/validations.service";

export const CONST_LOGIN_PAGE: {
    FORM: {
        email: Ifield;
        password: Ifield;
    }
} = {
    FORM: {
        email: {    
            val: '',
            error: '*El email es requerido',
            isValid() {
                const validationsService = new ValidationsService();
                const validateEmail = validationsService.validateField(this.val, ENUM_VALIDATION_OPTION.EMAIL);
                this.error = validateEmail!.msg;
                return validateEmail!.isValid
            }

        },
        password: {
            val: '',
            error: '*La contraseña es requerida',
            isValid() {
                const validationsService = new ValidationsService();
                const validatePassword = validationsService.validateField(this.val, ENUM_VALIDATION_OPTION.PASSWORD);
                this.error = validatePassword!.msg;
                return validatePassword!.isValid
            },
        }
    }
}