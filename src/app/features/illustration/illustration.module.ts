import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IllustrationComponent } from './illustration.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { SlideShowComponent } from './slideshow/slideshow.component';
import { IllustrationRoutingModule } from './illustration.routing.module';
import { IllustrationListComponent } from './illustration-list/illustration-list.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IllustrationResourcesComponent } from './illustration-resources/illustration-resources.component';
import { IllustrationGptComponent } from './illustration-gpt/illustration-gpt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LnurlPayDialogComponent } from 'src/app/features/illustration/lnurl-pay-dialog/lnurl-pay-dialog.component';
import { InvoiceQrCodeComponent } from './invoice-qr-code/invoice-qr-code.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QRCodeModule } from 'angularx-qrcode';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IllustrationCreateComponent } from './illustration-create/illustration-create.component';
@NgModule({
  declarations: [
    IllustrationComponent,
    SlideShowComponent,
    IllustrationListComponent,
    IllustrationResourcesComponent,
    IllustrationGptComponent,
    
    LnurlPayDialogComponent,
    InvoiceQrCodeComponent,
    IllustrationCreateComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    IllustrationRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    QRCodeModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [LnurlPayDialogComponent],
})
export class IllustrationModule { }
