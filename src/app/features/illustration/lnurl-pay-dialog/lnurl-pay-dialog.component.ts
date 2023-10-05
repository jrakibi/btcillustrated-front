import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { EventService } from 'src/app/services/event';
// import { NostrService } from 'src/app/services/nostr';
// import { ZapQrCodeComponent } from '../zap-qr-code/zap-qr-code.component';
import { NostrProfileDocument, LNURLPayRequest, LNURLInvoice } from 'src/app/core/model/interfaces';
import { Utilities } from 'src/app/core/service/utilities';
import { InvoiceQrCodeComponent } from '../invoice-qr-code/invoice-qr-code.component';

export interface ZapDialogData {
  profile: NostrProfileDocument;
}

@Component({
  selector: 'app-lnurl-pay-dialog',
  templateUrl: './lnurl-pay-dialog.component.html',
  styleUrls: ['./lnurl-pay-dialog.component.scss']
})
export class LnurlPayDialogComponent implements OnInit  {
  sendZapForm!: FormGroup;
  minSendable: number = 0;
  maxSendable: number = 0;
  // profile!: NostrProfileDocument
  profile!: any
  amount: number = 0;
  comment = "";
  payRequest: LNURLPayRequest | null = null
  invoice: LNURLInvoice = {
    pr: ""
  }

  imagePath = '/assets/profile.png';
  tooltip = '';
  tooltipName = '';
  profileName = '';
  error: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: ZapDialogData, 
    private formBuilder: FormBuilder,
    // private eventService: EventService,
    // private nostr: NostrService,
    private util: Utilities,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LnurlPayDialogComponent>
  ) {


  }

  async ngOnInit() {
    this.profile = this.data?.profile
    this.profile = {
      lud16: "globaltadpole21@walletofsatoshi.com",
      // lud06: "lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhkwmr0vfskcarpv3cx7mr9xgcs0q2ec0"
    }
    this.sendZapForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
      comment: ['']
    })

    this.fetchPayReq()
    await this.updateProfileDetails();
  }

  async fetchPayReq(): Promise<void> {
    this.payRequest = await this.fetchZapper() 
    this.recofigureFormValidators()
  }


  async fetchZapper(): Promise<LNURLPayRequest | null> {
    let staticPayReq = ""
    if(this.profile.lud16) {
      const parts = this.profile.lud16.split("@")
      staticPayReq = `https://${parts[1]}/.well-known/lnurlp/${parts[0]}`;
    } else if (this.profile.lud06 && this.profile.lud06.toLowerCase().startsWith("lnurl")) {
      staticPayReq = this.util.convertBech32ToText(this.profile.lud06).toString()
    }

    if(staticPayReq.length !== 0) {
      try {
        const resp = await fetch(staticPayReq);
        if(resp.ok) {
          const payReq = await resp.json();
          if(payReq.status === "ERROR") {
            this.error = payReq.reason ? payReq.reason : "Error fetching the invoice - please try again later"
          } else {
            return payReq
          }
        }
      } catch (err) {
        this.error = "Error fetching the invoice - please try again later"
      }
    }

    return null
  }

  async onSubmit() {
    debugger
    if (this.sendZapForm.valid) {
      let comment = this.sendZapForm.get('comment')?.value
      let amount = this.sendZapForm.get('amount')?.value
      if(!amount || !this.payRequest) {
        console.log( "error: please enter an amount and  a valid pay request")
      } else {
        const callback = new URL(this.payRequest.callback)
        const query = new Map<string, string>()
        query.set("amount", Math.floor(amount * 1000).toString())
        if(comment && this.payRequest?.commentAllowed) {
          query.set("comment", comment)
        }
      
        let event; 
        if(this.payRequest.nostrPubkey)
        if(this.profile.pubkey) {
          // event = await this.createZapEvent(this.profile.pubkey, null, comment);
          query.set("nostr", JSON.stringify(event))
        }
      
        const baseUrl = `${callback.protocol}//${callback.host}${callback.pathname}`;
        const queryJoined = [...query.entries()].map(val => `${val[0]}=${encodeURIComponent(val[1])}`).join("&");
      
        try {
          const response = await fetch(`${baseUrl}?${queryJoined}`)
          if(response.ok) {
            const result = await response.json()
            if(result.status === "ERROR") {
              this.error = result.reason ? result.reason : "Error fetching the invoice - please try again later"
            } else {
              this.invoice = result
              this.dialog.open(InvoiceQrCodeComponent, {
                width: '400px',
                data: { 
                  invoice: this.invoice,
                  profile: this.profile
                }
              })
              this.dialogRef.close(LnurlPayDialogComponent);
            }
          } else {
            this.error = "Error fetching the invoice - please try again later"
          }
        } catch (err) {
          this.error = "Error fetching the invoice - please try again later"
        }
      }
    }
  }
  
  private recofigureFormValidators() {
    this.minSendable = (this.payRequest?.minSendable || 1000) / 1000
    this.maxSendable = (this.payRequest?.maxSendable || 21_000_000_000) / 1000
    this.sendZapForm.get('amount')?.setValidators([
      Validators.min((this.payRequest?.minSendable || 1000) / 1000), 
      Validators.max((this.payRequest?.maxSendable || 21_000_000_000) / 1000), 
      Validators.required
    ])
  }

  private async updateProfileDetails() {
    if (!this.profile) {
      return;
    }
    if (this.profile.picture) {
      this.imagePath = this.profile.picture;
    }
    this.tooltip = this.profile.about;
    this.tooltipName = this.profileName;
    // this.profileName = this.profile.display_name || this.profile.name || this.util.getNostrIdentifier(this.profile.pubkey);
  }

  setAmount(amount: number) {
    this.sendZapForm.get('amount')?.setValue(amount)
  }
}