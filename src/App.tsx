import { Routes, Route } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import History from "./pages/History";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import InputField from "./components/InputField";
import { useState } from "react";
import ItemList from "./components/ItemList";
import { AdjustItemQuantity, ItemModel, RemoveItems } from "./models/Model";
import { readLocalstorage, useLocalStorage } from "./hooks/useLocalStorage";
import SearchBar from "./components/SearchBar";
import Accordion from "react-bootstrap/Accordion";

function App() {
	const [items, setItems] = useState<Array<ItemModel>>(readLocalstorage);

	useLocalStorage({ items });

	const handleAdd = (item: ItemModel) => {
		console.log(item);

		if (item) {
			setItems([...items, item]);
		}
	};

	const adjustItemQuantity: AdjustItemQuantity = (id, delta) => {
		setItems((currItems) => {
			//om antal varor är minst 1 moch id matchar kan man minska.
			if (
				currItems.find((item) => item.id === id)?.quantity === 1 &&
				delta === -1
			) {
				//kollar currItems om id inte är lika med id vi skickar med. Dom som inte matchar kommer vara kvar och det som matchar tas bort.
				return currItems.filter((item) => item.id !== id);
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + delta };
					} else {
						return item;
					}
				});
			}
		});
	};

	const removeItems: RemoveItems = (id) => {
		setItems((currItems) => {
			return currItems.filter((item) => item.id !== id);
		});
	};

	type CategoryTotals = { [key: string]: number }; //ett objekt där nycklarna är strängar och värdet är ett nummer.

	type CategoryTotalsArray = { category: string; total: number }[];

	const categoryTotals = items.reduce<CategoryTotals>((totals, item) => {
		if (!totals[item.category]) {
			//om items.category inte finns än så sätts den till 0
			totals[item.category] = 0;
		}

		totals[item.category] += item.price * item.quantity;

		return totals;
	}, {});

	items.sort((firstItem, secondItem) => firstItem.price - secondItem.price); //sorterar minsta priset för en vara - högsta priset för en vara

	// categoryTotals = { mejeri: 123, hushall: 456, ... };
	// -> [ {category: 'mejeri', total: 123}, { category: 'hushall', total: 456 }, ..... ]
	// Object.keys(categoryyTotals) --> ['mejeri','hushall',......]
	//
	const categoryTotalsArray: CategoryTotalsArray = Object.keys(
		categoryTotals
	).map((key) => {
		// key = 'mejeri', andra varv 'hushall', tredje varv ...
		const value = categoryTotals[key];
		return { category: key, total: value };
	});
	categoryTotalsArray.sort((a, b) => b.total - a.total);

	const totalTotals = Object.values(categoryTotals).reduce((total, item) => {
		return total + item;
	}, 0); //hämtar alla värden från kategorierna.

	return (
		<div>
			<Navbar />
			<Container style={{ background: "white" }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/history" element={<History />} />
				</Routes>

				<InputField handleAdd={handleAdd} />

				<Accordion defaultActiveKey="0">
					<Accordion.Item eventKey="0">
						<Accordion.Header>Lista på alla tillagda varor</Accordion.Header>
						<Accordion.Body>
							<ItemList
								items={items}
								setItems={setItems}
								adjustItemQuantity={adjustItemQuantity}
								removeItems={removeItems}
							/>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>

				<Accordion defaultActiveKey="0">
					<Accordion.Item eventKey="1">
						<Accordion.Header>Lista på katergorier och priser</Accordion.Header>
						<Accordion.Body>
							{categoryTotalsArray.map((categoryTotal) => {
								return (
									<div className="mb-2" style={{ background: "lightGray" }}>
										{categoryTotal.category} Totalt: {categoryTotal.total} kr
									</div>
								);
							})}
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
				<SearchBar placeholder="Sök efter varor" data={items} />
				<Card>
					<Card.Body>
						<Card.Title>Totalt: {totalTotals} kr</Card.Title>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}

export default App;
