import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {doc, Firestore, setDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  /**
   * Contact form group
   *
   * @type FormGroup
   */
  contactFormGroup: FormGroup = new FormGroup<any>({
    guardianName1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    guardianName2: new FormControl('', [Validators.maxLength(100)]),
    emailAddress1: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    emailAddress2: new FormControl('', [Validators.email, Validators.maxLength(100)]),
    phoneNumber1: new FormControl('', [Validators.required]),
    phoneNumber2: new FormControl('', []),
    maritalStatus: new FormControl(null, [Validators.required]),
    clientDescription: new FormControl('', [Validators.required, Validators.maxLength(300)])
  });

  /**
   * Marital status options
   *
   * @type {name: string, value: string}[]
   */
  maritalStatusOptions: { name: string, value: string }[] = [
    {name: 'Married or Together', value: 'married/together'},
    {name: 'Divorced or Seperated', value: 'divorced/seperated'},
    {name: 'Single', value: 'single'},
    {name: 'Other', value: 'other'}
  ];

  constructor(private _apiService: ApiService, private _firestore: Firestore) {
  }

  /**
   * Client description length
   *
   * @return number | null
   */
  get clientDescriptionLength(): number | null {
    return this.contactFormGroup.get('clientDescription')?.value?.length;
  }

  /**
   * Submit contact info
   */
  submitContact(): void {
    const submitDoc = doc(this._firestore, `form-data/${this.contactFormGroup.get('emailAddress1')!.value}`);

    setDoc(submitDoc, this.contactFormGroup.value).then((res) => {
      console.log('submitted', res);
    });
  }
}
