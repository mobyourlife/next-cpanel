import { AppConfig } from './shared/app-config.model';

import { ENV_CONFIG as DEVELOP_CONFIG } from './config.develop';
import { ENV_CONFIG as PRODUCTION_CONFIG } from './config.production';

let config;

switch (process.env.ENV.toLowerCase()) {
  case 'production':
    config = PRODUCTION_CONFIG;
    break;
  
  default:
    config = DEVELOP_CONFIG;
    break;
}

export const ENV_CONFIG: AppConfig = config;
