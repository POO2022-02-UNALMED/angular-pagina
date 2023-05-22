import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'greeting'
})
export class GreetingPipe implements PipeTransform {

  transform(name: string, gender: string, role: string = 'Usuario'): any {
    const grt = (gender === 'F')? 'Bienvenida' : 'Bienvenido'
    return `${grt} ${name}, tienes permisos de ${role}`
  }

}
