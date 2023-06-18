// Import components
import { TitleH1Component } from "./titles/title-h1/title-h1.component";
import { TitleH2Component } from "./titles/title-h2/title-h2.component";
import { CardUserComponent } from "./cards/card-user/card-user.component"; 
import { CardLoaderComponent } from "./loaders/card-loader/card-loader.component";
import { CardTasksComponent } from "./cards/card-tasks/card-tasks.component";
import { ModalTaskComponent } from "./modal/modal-task/modal-task.component";
import { ModalEditComponent } from "./modal/modal-edit/modal-edit.component";
import { ModalCreateComponent } from "./modal/modal-create/modal-create.component";
import { SelectCoworkerComponent } from "./select/select-coworker/select-coworker.component";
import { ScrollableMenuComponent } from "./menu/scrollable-menu/scrollable-menu.component";
import { CarouselUsersComponent } from "./carousel/carousel-users/carousel-users.component";
import { CarouselComponent } from "./carousel/carousel-edit/carousel.component";

export const components: any[] = [
    TitleH1Component,
    TitleH2Component,
    CardUserComponent,
    CardLoaderComponent,
    CardTasksComponent,
    ModalTaskComponent,
    ModalEditComponent,
    ModalCreateComponent,
    SelectCoworkerComponent,
    ScrollableMenuComponent,
    CarouselUsersComponent,
    CarouselComponent 
];

// Export all components

export * from './titles/title-h1/title-h1.component'
export * from './titles/title-h2/title-h2.component'
export * from './cards/card-user/card-user.component'
export * from './loaders/card-loader/card-loader.component'
export * from './cards/card-tasks/card-tasks.component'
export * from './modal/modal-task/modal-task.component'
export * from './modal/modal-edit/modal-edit.component'
export * from './modal/modal-create/modal-create.component'
export * from './select/select-coworker/select-coworker.component'
export * from './menu/scrollable-menu/scrollable-menu.component'
export * from './carousel/carousel-users/carousel-users.component'
export * from './carousel/carousel-edit/carousel.component'
