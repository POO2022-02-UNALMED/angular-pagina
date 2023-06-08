import { ENUM_VALIDATION_OPTION } from "@data/enum";
import { Ifield } from "@data/interfaces/forms/ifield.metadata";
import { ValidationsService } from "@shared/services/validations/validations.service";

export const CONST_REGISTER_PAGE: {
    FORM: {
        name: Ifield;
        lastName: Ifield;
        email: Ifield;
        password: Ifield;
    }
} = {
    FORM: {
        name: {
            val: '',
            error: '*El nombre es requerido',
            isValid() {
                const validationsService = new ValidationsService();
                const validateName = validationsService.validateField(this.val, ENUM_VALIDATION_OPTION.NAME);
                this.error = validateName.msg;
                return validateName.isValid
            },
        },
        lastName: {
            val: '',
            error: '*El apellido es requerido',
            isValid() {
                const validationsService = new ValidationsService();
                const validateLastName = validationsService.validateField(this.val, ENUM_VALIDATION_OPTION.LASTNAME);
                this.error = validateLastName.msg;
                return validateLastName.isValid
            },
        },
        email: {    
            val: '',
            error: '*El email es requerido',
            isValid() {
                const validationsService = new ValidationsService();
                const validateEmail = validationsService.validateField(this.val, ENUM_VALIDATION_OPTION.EMAIL);
                this.error = validateEmail.msg;
                return validateEmail.isValid
            }

        },
        password: {
            val: '',
            error: '*La contraseña es requerida',
            isValid() {
                const validationsService = new ValidationsService();
                const validatePassword = validationsService.validateField(this.val, ENUM_VALIDATION_OPTION.PASSWORD);
                this.error = validatePassword.msg;
                return validatePassword.isValid
            },
        },
    }
}