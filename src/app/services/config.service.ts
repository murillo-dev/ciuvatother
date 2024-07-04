import { Injectable } from '@angular/core';
import { enviroment } from '../../asset/config/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiUrl(): string {
    return enviroment.apiUrl;
  }

  keyMapBox(): string {
    return enviroment.mapBoxKey;
  }
}
