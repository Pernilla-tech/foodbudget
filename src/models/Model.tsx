export interface ItemModel {
	id: number;
	item: string;
	quantity: number;
	price: number;
	category: string;
}

export type AdjustItemQuantity = (id: number, delta: number) => void;

export type RemoveItems = (id: number) => void;
