import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { ItemModel } from "../models/Model";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Table from "react-bootstrap/Table";

type SearchBarProps = {
	placeholder: string;
	data: ItemModel[];
};

const SearchBar = ({ placeholder, data }: SearchBarProps) => {
	const [filterData, setFilterData] = useState<ItemModel[]>([]);

	const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchInput = e.target.value.toLowerCase();
		const newFilter = data.filter((value) => {
			return value.item.toLowerCase().includes(searchInput);
		});

		if (searchInput === "") {
			setFilterData([]);
		} else {
			setFilterData(newFilter);
		}
	};

	const handleClearInput = () => {
		setFilterData([]);
	};

	// let total = 0;

	// filterData.forEach((item) => {
	// 	total = total + item.price * item.quantity;
	// });

	const totalSum = filterData.reduce((total, item) => {
		return total + item.price * item.quantity;
	}, 0);

	console.log(totalSum);

	return (
		<Card>
			<Card.Body>
				<input
					type="text"
					placeholder={placeholder}
					onChange={(e) => handleFilter(e)}
				/>
				{filterData.length === 0 ? (
					<SearchIcon />
				) : (
					<CloseIcon style={{ cursor: "pointer" }} onClick={handleClearInput} />
				)}

				{filterData.length != 0 && (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Vara</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								{filterData.slice(0, 10).map((item) => {
									return (
										<div key={item.id}>
											<Card.Title>
												<tr>
													<td>{item.item}:</td>
												</tr>
												<tr>
													<td>{item.price} kr,</td>
												</tr>
												<tr>
													<td>{item.quantity} st</td>
												</tr>
											</Card.Title>
										</div>
									);
								})}
							</tr>
							<span>Totalt: {totalSum} kr</span>
						</tbody>
					</Table>
				)}
			</Card.Body>
		</Card>
	);
};

export default SearchBar;
