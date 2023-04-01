import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/modules/product.module';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  formGroup: FormGroup = new FormGroup({
    InstallDate: new FormControl(new Date(), [Validators.required]),
    ComponentOk: new FormControl("", [Validators.required]),
    DeviceTypeHebrew: new FormControl("", [Validators.required]),
    DeviceId: new FormControl("", [Validators.required]),
    DeviceType: new FormControl("", [Validators.required]),
    WebSiteDeviceName: new FormControl("", [Validators.required]),
    LastReportDate: new FormControl(new Date(), [Validators.required]),
    Picture: new FormControl("", [Validators.required]),
    ManufacturerName: new FormControl(""),
    ReceptionLevel: new FormControl(""),
  });
  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public productToUpdate: Product | null) {
    if (this.productToUpdate) {
      this.formGroup.patchValue(this.productToUpdate);
    }
  }


  submit(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.getRawValue() as Product);
    }
    else{
      this.formGroup.markAllAsTouched();
    }
  }

  exit() {
    this.dialogRef.close(null);
  }

}
