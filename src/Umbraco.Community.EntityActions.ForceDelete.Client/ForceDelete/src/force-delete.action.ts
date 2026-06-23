import { UmbEntityActionBase, UmbRequestReloadStructureForEntityEvent} from '@umbraco-cms/backoffice/entity-action';
import { umbConfirmModal } from '@umbraco-cms/backoffice/modal';
import { UmbLocalizationController } from '@umbraco-cms/backoffice/localization-api';
import { DocumentService } from '@umbraco-cms/backoffice/external/backend-api';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_ACTION_EVENT_CONTEXT } from '@umbraco-cms/backoffice/action';

import type { UmbEntityActionArgs  } from '@umbraco-cms/backoffice/entity-action';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class ForceDeleteEntityAction extends UmbEntityActionBase<never> {
  #localize = new UmbLocalizationController(this);
  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

  constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
    super(host, args);

    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (instance) => {
      this.#notificationContext = instance;
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

    const unique = this.args.unique!;

 
    try {
      await DocumentService.deleteDocumentById({
        path: {
          id: unique!,
        },
      });

      const entityType = 'document';

      const eventContext = await this.getContext(UMB_ACTION_EVENT_CONTEXT);

      if (!eventContext) {
			  throw new Error('Event context is missing');
		  }
    
      const structureEvent = new UmbRequestReloadStructureForEntityEvent({ unique, entityType });
      eventContext.dispatchEvent(structureEvent);


      this.#notificationContext?.peek('positive', {
        data: {
          headline: this.#localize.term('forceDelete_notificationSuccessHeadline'),
          message: this.#localize.term('forceDelete_notificationSuccessMessage'),
        },
      });

    } catch (error) {

      this.#notificationContext?.peek('danger', {
        data: {
          headline: this.#localize.term('forceDelete_notificationFailedHeadline'),
          message: this.#localize.term('forceDelete_notificationFailedMessage'),
        },
      });

    }

  }
}

export { ForceDeleteEntityAction as api };