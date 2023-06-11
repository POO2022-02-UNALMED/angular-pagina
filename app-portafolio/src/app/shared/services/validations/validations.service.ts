//import { Injectable } from '@angular/core';
//import { ERROS_VALIDATIONS } from '@data/constants';
//import { ENUM_VALIDATION_OPTION } from '@data/enum';
//import { IresponseValidation } from '@data/services/iresponse-validation.metadata';
//
//@Injectable({
//  providedIn: 'root'
//})
//export class ValidationsService {
//
//  constructor() { }
//
//  validateField(value: any, type: ENUM_VALIDATION_OPTION) {
//    switch (type) {
//      case ENUM_VALIDATION_OPTION.EMAIL:
//        
//        return this.validateEmail(value);
//    
//      case ENUM_VALIDATION_OPTION.PASSWORD:
//
//        return this.validatePassword(value);
//    }
//  }
//
//  private validateEmail(v: any):IresponseValidation {
//    const r:IresponseValidation = {msg: '', isValid: true}
//    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
//    r.isValid = pattern.test(v);
//    r.msg = (v === '')? ERROS_VALIDATIONS.EMAIL_REQUIRED_FIELD : ERROS_VALIDATIONS.EMAIL_INVALID;
//    return r;
//  }
//
//  private validatePassword(v: any):IresponseValidation {
//    const r:IresponseValidation = {msg: '', isValid: true}
//    const pattern = /^(?=.*[!@#$%*])(?=.*[0-9]).{2,20}$/;
//    r.isValid = pattern.test(v);
//    r.msg = (v === '')? ERROS_VALIDATIONS.PASSWORD_REQUIRED_FIELD : ERROS_VALIDATIONS.PASSWORD_INVALID;
//    return r;
//  }
//}