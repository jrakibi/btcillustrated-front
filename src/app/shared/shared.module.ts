import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LnurlPayDialogComponent } from "../features/illustration/lnurl-pay-dialog/lnurl-pay-dialog.component";
import { InvoiceQrCodeComponent } from "../features/illustration/invoice-qr-code/invoice-qr-code.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { QRCodeModule } from "angularx-qrcode";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from "../core/pipe/truncate-pipe";

@NgModule({
    declarations: [
        HeaderComponent,


    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatSnackBarModule
    ],
    exports: [
        HeaderComponent,
    ],

})
export class SharedModule { }
