// Import components
import { TitleH1Component } from "./titles/title-h1/title-h1.component";
import { TitleH2Component } from "./titles/title-h2/title-h2.component";
import { CardUserComponent } from "./cards/card-user/card-user.component"; 
import { CarouselComponent } from "./carousel/carousel.component";
import { CardLoaderComponent } from "./loaders/card-loader/card-loader.component";
import { TableComponent } from "./table/table.component";
import { CardTasksComponent } from "./cards/card-tasks/card-tasks.component";

export const components: any[] = [
    TitleH1Component,
    TitleH2Component,
    CardUserComponent,
    CarouselComponent,
    CardLoaderComponent,
    TableComponent,
    CardTasksComponent 
];

// Export all components

export * from './titles/title-h1/title-h1.component'
export * from './titles/title-h2/title-h2.component'
export * from './cards/card-user/card-user.component'
export * from './carousel/carousel.component'
export * from './loaders/card-loader/card-loader.component'
export * from './table/table.component'
export * from './cards/card-tasks/card-tasks.component'
