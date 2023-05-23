import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'greeting'
})
export class GreetingPipe implements PipeTransform {

  transform(name: string, gender: string, role: string = 'Usuario'): any {
    let gtr = ''
    switch (gender) {
      case 'F':
        gtr = 'Bienvenida';
        break;
      case 'M':
        gtr = 'Bienvenido';
        break;
      default:
        gtr = 'Bienvenid@'
        break
    }
    const grt = (gender === 'F')? 'Bienvenida' : 'Bienvenido'
    return `${grt} ${name}, tienes permisos de ${role}`
  }

}
