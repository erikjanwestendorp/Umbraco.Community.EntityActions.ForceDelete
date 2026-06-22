import { UmbEntityActionBase as e } from "@umbraco-cms/backoffice/entity-action";
import { UMB_AUTH_CONTEXT as t } from "@umbraco-cms/backoffice/auth";
import { umbConfirmModal as n } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as r } from "@umbraco-cms/backoffice/localization-api";
//#region src/force-delete.action.ts
var i = class extends e {
	#e;
	#t = new r(this);
	constructor(e, n) {
		super(e, n), this.consumeContext(t, (e) => {
			this.#e = e;
		});
	}
	async execute() {
		try {
			await n(this, {
				headline: this.#t.term("forceDelete_headline"),
				content: this.#t.term("forceDelete_content"),
				color: "danger",
				confirmLabel: this.#t.term("forceDelete_confirmLabel"),
				cancelLabel: this.#t.term("forceDelete_cancelLabel")
			});
		} catch {
			return;
		}
		let e = await this.#e?.getLatestToken();
		if (!e) return;
		let t = await fetch(`/umbraco/management/api/v1/document/${this.args.unique}`, {
			method: "DELETE",
			headers: {
				Accept: "*/*",
				Authorization: `Bearer ${e}`
			}
		});
		if (!t.ok) {
			console.error("Force delete failed", t.status, await t.text());
			return;
		}
		console.log("deleted");
	}
};
//#endregion
export { i as ForceDeleteEntityAction, i as api };

//# sourceMappingURL=force-delete.action-kv5BaqKG.js.map