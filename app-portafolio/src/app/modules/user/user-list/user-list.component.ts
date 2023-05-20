import { Component } from '@angular/core';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  public users: ICardUser[] = [
    {
      id: 1,
      name: 'Paula Misas',
      age: 22,
      description: 'Estudiante de ingenieria de sistemas. aprendiendo angular',
      avatar: 'https://as01.epimg.net/diarioas/imagenes/2022/04/20/actualidad/1650466413_240889_1650466661_noticia_normal_recorte1.jpg'
  
    },
    {
      id: 2,
      name: 'Juan',
      age: 25,
      description: 'Estudiante de ingenieria de sistemas. full stack',
      avatar: 'https://as01.epimg.net/diarioas/imagenes/2022/04/20/actualidad/1650466413_240889_1650466661_noticia_normal_recorte1.jpg'
  
    },
    {
      id: 3,
      name: 'Luza',
      age: 60,
      description: 'Master. arquitecta',
      avatar: 'https://as01.epimg.net/diarioas/imagenes/2022/04/20/actualidad/1650466413_240889_1650466661_noticia_normal_recorte1.jpg'
  
    },
    {
      id: 4,
      name: 'Juan',
      age: 25,
      description: 'Estudiante de ingenieria de sistemas. full stack',
      avatar: 'https://as01.epimg.net/diarioas/imagenes/2022/04/20/actualidad/1650466413_240889_1650466661_noticia_normal_recorte1.jpg'
  
    },
    {
      id: 5,
      name: 'Juan',
      age: 25,
      description: 'Estudiante de ingenieria de sistemas. full stack',
      avatar: 'https://as01.epimg.net/diarioas/imagenes/2022/04/20/actualidad/1650466413_240889_1650466661_noticia_normal_recorte1.jpg'
  
    },
    {
      id: 6,
      name: 'Juan',
      age: 25,
      description: 'Estudiante de ingenieria de sistemas. full stack',
      avatar: 'https://as01.epimg.net/diarioas/imagenes/2022/04/20/actualidad/1650466413_240889_1650466661_noticia_normal_recorte1.jpg'
  
    },
    {
      id: 7,
      name: 'Juan',
      age: 25,
      description: 'Estudiante de ingenieria de sistemas. full stack',
      avatar: 'https://as01.epimg.net/diarioas/imagenes/2022/04/20/actualidad/1650466413_240889_1650466661_noticia_normal_recorte1.jpg'
  
    },
    {
      id: 8,
      name: 'Juan',
      age: 25,
      description: 'Estudiante de ingenieria de sistemas. full stack',
      avatar: 'https://as01.epimg.net/diarioas/imagenes/2022/04/20/actualidad/1650466413_240889_1650466661_noticia_normal_recorte1.jpg'
  
    },
    
  ]

}
