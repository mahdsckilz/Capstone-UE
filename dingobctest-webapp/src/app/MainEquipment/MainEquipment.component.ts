/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MainEquipmentService } from './MainEquipment.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-MainEquipment',
	templateUrl: './MainEquipment.component.html',
	styleUrls: ['./MainEquipment.component.css'],
  providers: [MainEquipmentService]
})
export class MainEquipmentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          name = new FormControl("", Validators.required);
        
  
      
          serial = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          components = new FormControl("", Validators.required);
        
  
      
          HistComponents = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceMainEquipment:MainEquipmentService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          name:this.name,
        
    
        
          serial:this.serial,
        
    
        
          description:this.description,
        
    
        
          components:this.components,
        
    
        
          HistComponents:this.HistComponents,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceMainEquipment.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.dingo.clientA.MainEquipment",
      
        
          "name":this.name.value,
        
      
        
          "serial":this.serial.value,
        
      
        
          "description":this.description.value,
        
      
        
          "components":this.components.value,
        
      
        
          "HistComponents":this.HistComponents.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "name":null,
        
      
        
          "serial":null,
        
      
        
          "description":null,
        
      
        
          "components":null,
        
      
        
          "HistComponents":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceMainEquipment.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "name":null,
        
      
        
          "serial":null,
        
      
        
          "description":null,
        
      
        
          "components":null,
        
      
        
          "HistComponents":null,
        
      
        
          "owner":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.dingo.clientA.MainEquipment",
      
        
          
            "name":this.name.value,
          
        
    
        
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "components":this.components.value,
          
        
    
        
          
            "HistComponents":this.HistComponents.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceMainEquipment.updateAsset(form.get("serial").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceMainEquipment.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceMainEquipment.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "name":null,
          
        
          
            "serial":null,
          
        
          
            "description":null,
          
        
          
            "components":null,
          
        
          
            "HistComponents":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.name){
          
            formObject.name = result.name;
          
        }else{
          formObject.name = null;
        }
      
        if(result.serial){
          
            formObject.serial = result.serial;
          
        }else{
          formObject.serial = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.components){
          
            formObject.components = result.components;
          
        }else{
          formObject.components = null;
        }
      
        if(result.HistComponents){
          
            formObject.HistComponents = result.HistComponents;
          
        }else{
          formObject.HistComponents = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "name":null,
        
      
        
          "serial":null,
        
      
        
          "description":null,
        
      
        
          "components":null,
        
      
        
          "HistComponents":null,
        
      
        
          "owner":null 
        
      
      });
  }

}