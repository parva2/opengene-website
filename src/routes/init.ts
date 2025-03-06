import { DialogsState } from '$lib/state/dialogs/dialogs.svelte';
import { MobileMenuState } from '$lib/state/mobileMenu.svelte';
import { TitleState } from '$lib/state/pageTitle.svelte';

export function init() {
	new TitleState({ hidden: true });
	new MobileMenuState();
	new DialogsState();
}
