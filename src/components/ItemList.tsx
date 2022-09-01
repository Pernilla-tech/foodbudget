import React from "react";
import { AdjustItemQuantity, ItemModel, RemoveItems } from "../models/Model";
import SingleItem from "./SingleItem";

interface Props {
	items: Array<ItemModel>;
	setItems: React.Dispatch<React.SetStateAction<ItemModel[]>>;
	adjustItemQuantity: AdjustItemQuantity;
	removeItems: RemoveItems;
}
const ItemList = ({
	items,
	setItems,
	adjustItemQuantity,
	removeItems,
}: Props) => {
	return (
		<div className="mt-4">
			{items.map((item) => (
				<SingleItem
					items={items}
					item={item}
					key={item.id}
					setItems={setItems}
					adjustItemQuantity={adjustItemQuantity}
					removeItems={removeItems}
				/>
			))}
		</div>
	);
};

export default ItemList;
