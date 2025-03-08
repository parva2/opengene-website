export function focusFirstInput(element: HTMLElement): boolean {
	if (!element) return false;
	// Check if the current element is one of the desired types and focusable
	if (
		(element instanceof HTMLInputElement ||
			element instanceof HTMLSelectElement ||
			element instanceof HTMLTextAreaElement) &&
		!element.hidden &&
		!element.disabled
	) {
		setTimeout(() => {
			element.focus();
		}, 0);
		return true;
	}

	// Recursively check the children
	const children = Array.from(element.children) as HTMLElement[];
	for (const child of children) {
		if (focusFirstInput(child)) {
			return true;
		}
	}

	return false;
}
