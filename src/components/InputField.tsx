import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ItemModel } from "../models/Model";

interface Props {
	handleAdd: (item: ItemModel) => void;
}

const InputField = ({ handleAdd }: Props) => {
	const [item, setItem] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	const onSubmit = (e: React.FormEvent) => {
		handleAdd({
			id: Date.now(),
			item,
			price: parseFloat(price),
			quantity: 1,
			category,
		});
		e.preventDefault();
		setItem("");
		setPrice("");
		setCategory("");
	};

	return (
		<form
			onSubmit={onSubmit}
			style={{ display: "flex", flexDirection: "column" }}
		>
			<InputGroup>
				<Form.Control
					placeholder="Lägg till livsmedel eller rabatt"
					aria-label="livsmedel"
					aria-describedby="basic-addon1"
					value={item}
					type="text"
					onChange={(e) => setItem(e.target.value)}
				/>
			</InputGroup>

			<InputGroup>
				<Form.Control
					placeholder="Varans pris eller rabattens värde"
					aria-label="price"
					aria-describedby="basic-addon1"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
			</InputGroup>

			<Form.Select
				aria-label="Default select example"
				value={category}
				onChange={(e) => setCategory(e.target.value)}
			>
				<option>Välj kategori</option>
				<option value="Bröd">Bröd</option>
				<option value="Drycker">Drycker</option>
				<option value="Fisk och skaldjur">Fisk och skaldjur</option>
				<option value="Frukt/grönt/bär">Frukt/grönt/bär</option>
				<option value="Kyckling">Kyckling</option>
				<option value="Köksartiklar">Köksartiklar</option>
				<option value="Kött">Kött</option>
				<option value="Mejeriprodukter">Mejeriprodukter</option>
				<option value="Rabatt">Rabatt</option>
				<option value="Skafferi">Skafferi</option>
				<option value="Snacks">Snacks</option>
				<option value="Såser">Såser</option>
				<option value="Toalettartiklar">Toalettartiklar</option>
				<option value="Vegetariskt">Vegetariskt</option>
				<option value="Övrigt">Övrigt</option>
			</Form.Select>

			<Button
				type="submit"
				style={{
					margin: "16px",
					width: "50%",
					height: "3rem",
					backgroundColor: "#ff6b35",
					alignSelf: "center",
				}}
				disabled={!item || !price || !category}
			>
				+
			</Button>
		</form>
	);
};

export default InputField;
