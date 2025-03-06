import { setContext, getContext } from 'svelte';

const KEY = Symbol();

type Title = { hidden: boolean };

export class TitleState {
	hidden: Title['hidden'] = $state(false);

	constructor(initState: Title) {
		this.hidden = initState.hidden;
		setContext(KEY, this);
	}

	static get(): TitleState {
		return getContext<TitleState>(KEY);
	}

	show(): void {
		this.hidden = false;
	}

	hide(): void {
		this.hidden = true;
	}
}
