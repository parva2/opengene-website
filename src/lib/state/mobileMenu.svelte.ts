import { setContext, getContext } from 'svelte';

const KEY = Symbol();

type MobileMenu = {
	isOpen: boolean;
};

export class MobileMenuState {
	isOpen: MobileMenu['isOpen'] = $state(false);

	constructor(initState?: MobileMenu) {
		if (initState) {
			this.isOpen = initState.isOpen;
		}
		setContext(KEY, this);
	}

	static get(): MobileMenuState {
		return getContext<MobileMenuState>(KEY);
	}

	toggle(): void {
		this.isOpen = !this.isOpen;
	}

	open(): void {
		this.isOpen = true;
	}

	close(): void {
		this.isOpen = false;
	}
}
