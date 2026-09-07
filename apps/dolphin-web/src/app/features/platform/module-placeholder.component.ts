import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MODULE_ROUTES } from '../../core/navigation.registry';
import { EmptyStateComponent } from '../../shared/empty-state.component';

@Component({
  selector: 'app-module-placeholder',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <app-empty-state
      [icon]="module().icon"
      [title]="module().placeholder?.title ?? module().label + ' workspace'"
      [description]="module().placeholder?.description ?? 'This workspace is ready for connected APIs, approvals, reporting and automation.'"
      [actionLabel]="module().placeholder?.actionLabel ?? 'Configure workflow'">
    </app-empty-state>
  `
})
export class ModulePlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly moduleId = this.route.snapshot.data['moduleId'] as string;

  readonly module = computed(() =>
    MODULE_ROUTES.find(item => item.id === this.moduleId) ?? MODULE_ROUTES[0]);
}
