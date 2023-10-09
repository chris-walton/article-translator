import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@at/app.config';
import { AppComponent } from '@at/app.component';

//@ts-ignore
Notiflix.Loading.standard();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
