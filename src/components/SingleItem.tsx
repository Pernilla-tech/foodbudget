import React, { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { AdjustItemQuantity, ItemModel, RemoveItems } from "../models/Model";
import EditIcon from "@mui/icons-material/Edit";
import {
	SettingsRemoteSharp,
	SettingsSystemDaydreamSharp,
} from "@mui/icons-material";

const SingleItem: React.FC<{
	item: ItemModel;
	items: Array<ItemModel>;
	setItems: React.Dispatch<React.SetStateAction<Array<ItemModel>>>;
	adjustItemQuantity: AdjustItemQuantity;
	removeItems: RemoveItems;
}> = ({ item, setItems, items, adjustItemQuantity, removeItems }) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editItem, setEditItem] = useState<string>(item.item);

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();

		setItems(
			items.map((item) => (item.id === id ? { ...item, item: editItem } : item))
		);
		setEdit(false);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	});

	return (
		<form onSubmit={(e) => handleEdit(e, item.id)}>
			<Card className="h-100">
				<Card.Body className="d-flex flex-column">
					<Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
						<span
							onClick={() => {
								if (!edit) {
									setEdit(!edit);
								}
							}}
						>
							{edit ? (
								<input
									ref={inputRef}
									value={editItem}
									onChange={(e) => setEditItem(e.target.value)}
								/>
							) : (
								<span>{item.item}</span>
							)}

							<EditIcon />
						</span>
						<span className="align-items-baseline mb-2 ml-10">
							Kategori: {item.category} Pris: {item.price} kr
						</span>
					</Card.Title>
					<div>
						<div>
							<div>
								<Button
									style={{ margin: ".5rem", marginLeft: "0" }}
									onClick={() => adjustItemQuantity(item.id, -1)}
								>
									-
								</Button>
								<Button
									style={{ margin: ".5rem" }}
									onClick={() => adjustItemQuantity(item.id, +1)}
								>
									+
								</Button>
								<Button
									style={{ margin: ".5rem" }}
									variant="danger"
									onClick={() => removeItems(item.id)}
								>
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
		</form>
	);
};

export default SingleItem;
