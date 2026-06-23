import { UmbEntityActionBase as e, UmbRequestReloadStructureForEntityEvent as t } from "@umbraco-cms/backoffice/entity-action";
import { umbConfirmModal as n } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as r } from "@umbraco-cms/backoffice/localization-api";
import { DocumentService as i } from "@umbraco-cms/backoffice/external/backend-api";
import { UMB_NOTIFICATION_CONTEXT as a } from "@umbraco-cms/backoffice/notification";
import { UMB_ACTION_EVENT_CONTEXT as o } from "@umbraco-cms/backoffice/action";
//#region src/force-delete.action.ts
var s = class extends e {
	#e = new r(this);
	#t;
	constructor(e, t) {
		super(e, t), this.consumeContext(a, (e) => {
			this.#t = e;
		});
	}
	async execute() {
		try {
			await n(this, {
				headline: this.#e.term("forceDelete_headline"),
				content: this.#e.term("forceDelete_content"),
				color: "danger",
				confirmLabel: this.#e.term("forceDelete_confirmLabel"),
				cancelLabel: this.#e.term("forceDelete_cancelLabel")
			});
		} catch {
			return;
		}
		let e = this.args.unique;
		try {
			await i.deleteDocumentById({ path: { id: e } });
			let n = await this.getContext(o);
			if (!n) throw Error("Event context is missing");
			let r = new t({
				unique: e,
				entityType: "document"
			});
			n.dispatchEvent(r), this.#t?.peek("positive", { data: {
				headline: this.#e.term("forceDelete_notificationSuccessHeadline"),
				message: this.#e.term("forceDelete_notificationSuccessMessage")
			} });
		} catch {
			this.#t?.peek("danger", { data: {
				headline: this.#e.term("forceDelete_notificationFailedHeadline"),
				message: this.#e.term("forceDelete_notificationFailedMessage")
			} });
		}
	}
};
//#endregion
export { s as ForceDeleteEntityAction, s as api };

//# sourceMappingURL=force-delete.action-B1bFv6rN.js.map