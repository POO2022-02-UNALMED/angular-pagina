// Import components
import { TitleH1Component } from "./titles/title-h1/title-h1.component";
import { TitleH2Component } from "./titles/title-h2/title-h2.component";
import { CardUserComponent } from "./cards/card-user/card-user.component"; 

export const components: any[] = [
    TitleH1Component,
    TitleH2Component,
    CardUserComponent
];

// Export all components

export * from './titles/title-h1/title-h1.component'
export * from './titles/title-h2/title-h2.component'
export * from './cards/card-user/card-user.component'
