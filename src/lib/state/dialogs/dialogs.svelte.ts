import { getContext, setContext } from 'svelte';
import type * as T from './types';

const KEY = Symbol();

const init = { isOpen: false, props: {} };

export class DialogsState {
	modal: T.Modal = $state(init) as T.Modal;
	sheet: T.Sheet = $state(init) as T.Sheet;
	alert: T.Alert = $state({ ...init }) as T.Alert;

	constructor() {
		setContext(KEY, this);
	}

	static get(): DialogsState {
		return getContext<DialogsState>(KEY);
	}

	open(params: T.OpenParams): void {
		const dialog = this[params.dialog];
		dialog.props = params.props;
		dialog.isOpen = true;
	}

	close(dialogType: 'modal' | 'alert' | 'sheet'): void {
		const dialog = this[dialogType];
		dialog.isOpen = false;
	}
}
