import { UmbEntityActionBase as e } from "@umbraco-cms/backoffice/entity-action";
import { UMB_AUTH_CONTEXT as t } from "@umbraco-cms/backoffice/auth";
import { umbConfirmModal as n } from "@umbraco-cms/backoffice/modal";
//#region src/force-delete.action.ts
var r = class extends e {
	#e;
	constructor(e, n) {
		super(e, n), this.consumeContext(t, (e) => {
			this.#e = e;
		});
	}
	async execute() {
		try {
			await n(this, {
				headline: "Force Delete",
				content: "Weet je zeker dat je dit item permanent wilt verwijderen?",
				color: "danger",
				confirmLabel: "Force Delete",
				cancelLabel: "Annuleren"
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
export { r as ForceDeleteEntityAction, r as api };

//# sourceMappingURL=force-delete.action-Be9riZib.js.map