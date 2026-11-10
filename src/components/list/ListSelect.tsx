import { useCallback, useRef, useState } from "react";
import { ProblemList } from "../../lists/builtin";
import { useDismiss } from "../dropdown/useDismiss";

interface IListSelectProps {
  lists: ProblemList[];
  value: string;
  onChange: (id: string) => void;
}

/** The yellow header badge, as a dropdown styled like the category one. */
const ListSelect = ({ lists, value, onChange }: IListSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);
  useDismiss(ref, close);

  const current = lists.find((l) => l.id === value) ?? lists[0];

  return (
    <div className="list-select-wrap" ref={ref}>
      <button
        type="button"
        className="badge list-select-trigger"
        data-testid="list_select"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{current.name}</span>
        <svg
          className={`list-select-chevron ${isOpen ? "open" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu list-select-menu" role="listbox">
          {lists.map((l) => {
            const isSelected = l.id === current.id;
            return (
              <button
                type="button"
                key={l.id}
                role="option"
                aria-selected={isSelected}
                data-testid={`list_option_${l.id}`}
                className={`custom-dropdown-item ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  onChange(l.id);
                  close();
                }}
              >
                <span>{l.name}</span>
                {isSelected && (
                  <svg
                    className="custom-dropdown-item-check"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListSelect;
