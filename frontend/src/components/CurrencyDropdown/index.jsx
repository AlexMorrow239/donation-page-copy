import React, { useState } from "react";
import data from "../../assets/currencies.json";
import { Dropdown, FormControl } from "react-bootstrap";

export default function CurrencyDropdown({ onChange }) {
  const [symbol, setSymbol] = useState("EUR");
  const [search, setSearch] = useState("");

  const handleSelect = (currencyCode) => {
    setSymbol(currencyCode);
    onChange(currencyCode);
  };

  // Sort the keys based on the 'name' attribute of each currency
  const sortedKeys = Object.keys(data).sort((a, b) => {
    const nameA = data[a]?.name?.toUpperCase() || data[a].code.toUpperCase();
    const nameB = data[b]?.name?.toUpperCase() || data[b].code.toUpperCase();
    return nameA.localeCompare(nameB);
  });

  // Filter keys based on search input
  const filteredKeys = sortedKeys.filter((key) => {
    const currencyName = data[key].name || data[key].code;
    return currencyName.toUpperCase().includes(search.toUpperCase());
  });

  return (
    <Dropdown className="my-1">
      <Dropdown.Toggle
        variant="outline-secondary"
        id="dropdown-basic"
        className="btn-inspire-green btn-sm"
        aria-label="Select Currency"
      >
        {symbol}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-scroll">
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {filteredKeys.length ? (
          filteredKeys.map((key, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => handleSelect(data[key].code)}
            >
              {data[key].name || data[key].code}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>No results</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
