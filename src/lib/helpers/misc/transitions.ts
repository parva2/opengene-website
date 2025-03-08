import { cubicInOut } from 'svelte/easing';
import type { FlyParams, BlurParams, FadeParams } from 'svelte/transition';

export function getTransitions(window?: Window) {
	const height = window ? window.innerHeight : 300;
	const duration = 250;
	const easing = cubicInOut;
	const backdrop: BlurParams = { duration, easing };
	const dialogIn: FlyParams = { y: height, duration, easing };
	const dialogOut: FlyParams = { y: -height, duration, easing };
	const alertOut: BlurParams = { duration, easing };
	const popover: FadeParams = { duration: 50, easing };
	return {
		duration,
		backdrop,
		dialogIn,
		dialogOut,
		alertOut,
		easing,
		popover
	};
}
