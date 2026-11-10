import { ProblemList } from "../../lists/builtin";

interface IListSelectProps {
  lists: ProblemList[];
  value: string;
  onChange: (id: string) => void;
}

/** The yellow header badge, as a native select. */
const ListSelect = ({ lists, value, onChange }: IListSelectProps) => (
  <div className="badge list-select-wrap">
    <select
      className="list-select"
      data-testid="list_select"
      aria-label="Problem list"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {lists.map((l) => (
        <option key={l.id} value={l.id}>
          {l.name}
        </option>
      ))}
    </select>
    <svg
      className="list-select-chevron"
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
  </div>
);

export default ListSelect;
