import React from "react";
import { Button, Card } from "react-bootstrap";
import { AdjustItemQuantity, ItemModel, RemoveItems } from "../models/Model";

const SingleItem: React.FC<{
	item: ItemModel;
	items: Array<ItemModel>;
	setItems: React.Dispatch<React.SetStateAction<Array<ItemModel>>>;
	adjustItemQuantity: AdjustItemQuantity;
	removeItems: RemoveItems;
}> = ({ item, items, setItems, adjustItemQuantity, removeItems }) => {
	return (
		<Card className="h-100">
			<Card.Body className="d-flex flex-column">
				<Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
					<span>{item.item}</span>
					<span className="mr-10 text-muted">
						Kategori: {item.category} Pris: {item.price} kr
					</span>
				</Card.Title>
				<div className="mt-auto">
					<div
						className="d-flex align-items-center flex-column"
						style={{ gap: ".5rem" }}
					>
						<div
							className="d-flex align-items-end justify-content-center"
							style={{ gap: ".5rem" }}
						>
							<Button onClick={() => adjustItemQuantity(item.id, -1)}>-</Button>
							<Button onClick={() => adjustItemQuantity(item.id, +1)}>+</Button>
							<Button variant="danger" onClick={() => removeItems(item.id)}>
								x
							</Button>
						</div>
						<div>
							<span className="fs-3">{item.quantity} st</span>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default SingleItem;
