import { useState, useMemo } from "react";

export default function Combobox({ list }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return list;
    const lower = query.toLowerCase();
    return list.filter((listItem) =>
      listItem.name.toLowerCase().includes(lower)
    );
  }, [query, list]);

  const handleSelect = (item) => {
    console.log("User clicked:", item.name);
    setQuery(item.name);
    setIsOpen(false);
  };

  return (
    <div>
      <input
        text="text"
        value={query}
        placeholder="Enter Foodtruck..."
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 100);
        }}
      />

      {isOpen && filtered.length > 0 && (
        <ul>
          {filtered.map((item) => (
            <li
              key={item}
              onClick={() => handleSelect(item)}
              onMouseDown={(event) => event.preventDefault()}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
