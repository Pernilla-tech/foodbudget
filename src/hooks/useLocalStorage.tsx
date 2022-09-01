import { useEffect, useState } from "react";
import { ItemModel } from "../models/Model";

interface Props {
	items: Array<ItemModel>;
}

export function useLocalStorage({ items }: Props) {
	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items));
	}, [items]);
}

export function readLocalstorage(): Array<ItemModel> {
	const value = localStorage.getItem("items");
	if (value) {
		return JSON.parse(value);
	}
	return [];
}
