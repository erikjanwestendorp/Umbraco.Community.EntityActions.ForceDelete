import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { umbConfirmModal } from '@umbraco-cms/backoffice/modal';

import type { UmbEntityActionArgs } from '@umbraco-cms/backoffice/entity-action';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class ForceDeleteEntityAction extends UmbEntityActionBase<never> {
  #authContext: any;

  constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
    super(host, args);

    this.consumeContext(UMB_AUTH_CONTEXT, (ctx) => {
      this.#authContext = ctx;
    });
  }

  override async execute() {
    try {
      await umbConfirmModal(this, {
        headline: 'Force Delete',
        content: 'Weet je zeker dat je dit item permanent wilt verwijderen?',
        color: 'danger',
        confirmLabel: 'Force Delete',
        cancelLabel: 'Annuleren',
      });
    } catch {
      console.log('delete cancelled');
      return;
    }

    const token = await this.#authContext?.getLatestToken();

    if (!token) {
      console.error('No auth token available');
      return;
    }

    const response = await fetch(`/umbraco/management/api/v1/document/${this.args.unique}`, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Force delete failed', response.status, await response.text());
      return;
    }

    console.log('deleted');
  }
}

export { ForceDeleteEntityAction as api };