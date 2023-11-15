// injection-tokens.ts
import { InjectionToken } from '@angular/core';
import { ICocktailService } from '../_interfaces/ICocktail.service';
import { IStateService } from '../_interfaces/IState.service';

export const COCKTAIL_SERVICE_TOKEN = new InjectionToken<ICocktailService>('CocktailService');
export const STATE_SERVICE_TOKEN = new InjectionToken<IStateService>('StateService');
