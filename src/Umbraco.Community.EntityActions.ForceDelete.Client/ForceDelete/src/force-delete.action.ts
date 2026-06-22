import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { umbConfirmModal } from '@umbraco-cms/backoffice/modal';
import { UmbLocalizationController } from '@umbraco-cms/backoffice/localization-api';

import type { UmbEntityActionArgs } from '@umbraco-cms/backoffice/entity-action';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class ForceDeleteEntityAction extends UmbEntityActionBase<never> {
  #authContext: any;
  #localize = new UmbLocalizationController(this);

  constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
    super(host, args);

    this.consumeContext(UMB_AUTH_CONTEXT, (ctx) => {
      this.#authContext = ctx;
    });
  }

  override async execute() {
    try {
      await umbConfirmModal(this, {
        headline: this.#localize.term('forceDelete_headline'),
        content: this.#localize.term('forceDelete_content'),
        color: 'danger',
        confirmLabel: this.#localize.term('forceDelete_confirmLabel'),
        cancelLabel: this.#localize.term('forceDelete_cancelLabel'),
      });
    } catch {
      return;
    }

    const token = await this.#authContext?.getLatestToken();

    if (!token) {
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