import { Injectable, signal } from '@angular/core';
import { APP_MODULES } from '../../core/navigation.registry';
import { AppModuleCard } from '../../shared/ui-models';

@Injectable({ providedIn: 'root' })
export class AppModulesService {
  readonly modules = signal<AppModuleCard[]>(APP_MODULES);
}
