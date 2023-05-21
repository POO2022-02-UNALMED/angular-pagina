import { ICarouselItem } from "@shared/components/carousel/Icarousel-item.metadata";

export const CAROUSEL_DATA: ICarouselItem[] = [
    {
        id: 1,
        title: {
            first: 'TITULO',
            second: 'Principal'
        },
        subtitle: 'este es el subtitulo 1!',
        image: 'assets/images/1.png',
        marginLeft:0
    },
    {
        id: 2,
        image: 'assets/images/2.png',
        marginLeft:200
    },
    {
        id: 3,
        title: {
            first: 'TITULO',
            second: 'Tercero'
        },
        subtitle: 'este es el subtitulo 3',
        image: 'assets/images/3.png',
        marginLeft:100
    },
    {
        id: 4,
        title: {
            first: 'TITULO',
            second: 'Cuarto'
        },
        subtitle: 'este es el subtitulo 4',
        image: 'assets/images/4.png'
    },
]
