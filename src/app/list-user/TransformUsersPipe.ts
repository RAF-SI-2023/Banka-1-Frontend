import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { User } from '../model/model'; // Adjust the import path according to your project structure

@Pipe({
  name: 'transformUsers'
})
export class TransformUsersPipe implements PipeTransform {
  transform(users: User[]): any[] {
    return users.map(user => ({
      NAME: (user.firstName || '') + ' ' + (user.lastName || ''),
      EMAIL: user.email,
      JMBG: user.jmbg || 'N/A',
      POSITION: user.position,
      'PHONE NUMBER': user.phoneNumber || 'N/A',
      ACTIVITY: user.active ? 'Active' : 'Inactive',
      originalUser: user // Include the entire original user object for internal use
    })).filter(user => user.ACTIVITY === 'Active');
  }
}
@NgModule({
  declarations: [
    // other components
    TransformUsersPipe
  ],
  exports: [
    TransformUsersPipe
  ],
  // other module properties
})
export class TransformUsersPipeModule { }
