import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [HeaderComponent]
})
export class SharedModule {}
  