import { useState, useMemo, useEffect } from "react";

export default function Combobox({
  query,
  setQuery,
  list,
  handleSelect,
  placeholderText,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleSelect(query);
  }, [query]);
  const filtered = useMemo(() => {
    if (!query) return list;
    const lower = query.toLowerCase();
    return list.filter((listItem) =>
      listItem.name.toLowerCase().includes(lower)
    );
  }, [query, list]);

  const handleClickOnListItem = (item) => {
    console.log("User clicked:", item.name);
    setQuery(item.name);
    setIsOpen(false);
  };

  return (
    <div>
      <input
        text="text"
        value={query}
        placeholder={placeholderText}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
        }}
        onBlur={(e) => {
          setTimeout(() => setIsOpen(false), 100);
          handleSelect(e.target.value);
        }}
      />

      {isOpen && filtered.length > 0 && (
        <ul>
          {filtered.map((item) => (
            <li
              key={item.name}
              onClick={() => handleClickOnListItem(item)}
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
