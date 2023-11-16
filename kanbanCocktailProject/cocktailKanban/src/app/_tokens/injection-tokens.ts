// injection-tokens.ts
import { InjectionToken } from '@angular/core';
import { ICocktailService } from '../_interfaces/ICocktail.service';
import { IStateMediatorService } from '../_interfaces/IStateMediator.service';

export const COCKTAIL_SERVICE_TOKEN = new InjectionToken<ICocktailService>('CocktailService');
export const STATE_SERVICE_TOKEN = new InjectionToken<IStateMediatorService>('StateService');
