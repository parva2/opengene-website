import type { ButtonVariant } from '$ui/button';
import type { Component } from 'svelte';

export type State = {
	isOpen: boolean;
	props: {};
};

type Base = {
	title?: string;
	description?: string;
};

type ComponentProps<T> = T extends Component<infer P> ? P : never;

type Content<T extends Component<any> = any> = {
	content: {
		component: T;
		props?: ComponentProps<T>;
	};
};

export type ModalProps = Base & Content;
export type Modal = State & { props: ModalProps };

export type SheetProps = Base &
	Content & {
		side: 'bottom' | 'left' | 'right';
	};
export type Sheet = State & { props: SheetProps };

export type AlertProps = Base & {
	onConfirm: () => void;
	confirmBtn?: {
		variant: ButtonVariant;
		text: string;
	};
};
export type Alert = State & { userConfirmed: boolean } & { props: AlertProps };

type OpenSheet = { dialog: 'sheet'; props: SheetProps };
type OpenAlert = { dialog: 'alert'; props: AlertProps };
type OpenModal = { dialog: 'modal'; props: ModalProps };

export type OpenParams = OpenSheet | OpenAlert | OpenModal;
