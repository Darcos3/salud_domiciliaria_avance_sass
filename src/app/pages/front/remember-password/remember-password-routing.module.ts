import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RememberPasswordPage } from './remember-password.page';

const routes: Routes = [
  {
    path: '',
    component: RememberPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RememberPasswordPageRoutingModule {}
