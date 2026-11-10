import { ChangeEvent, useState } from "react";
import { SOURCE_CODE_URL } from "../links";
import { MAX_SLUGS } from "../lists/customStore";
import { parseListInput } from "../lists/parseList";
import { useActiveList } from "../lists/useActiveList";
import { useLists } from "../lists/useLists";
import { problemFromSlug, problemName } from "../lists/catalog";
import { dueLabel, lastLabel } from "../progress/format";
import { parseBackup, serializeBackup } from "../progress/backup";
import {
  dueSlugs,
  markForRevisit,
  queuedSlugs,
  removeFromQueue,
  setSolved,
  today,
} from "../progress/records";
import { useProgress } from "../progress/useProgress";
import { storageSet } from "../storage/storage";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useStreak } from "../streak/useStreak";
import "./dashboard.css";

type Filter = "all" | "unsolved" | "solved" | "queued";

const LAST_OPENED_KEY = "lastOpened";

const wantsNeetCode = () => localStorage.getItem("useNeetCode") === "true";

const hrefFor = (slug: string): string => {
  const p = problemFromSlug(slug);
  return wantsNeetCode() && p.neetcode ? p.neetcode : p.leetcode;
};

// So the popup asks "how did it go?" when the user comes back to it.
const rememberOpened = (slug: string) =>
  storageSet({ [LAST_OPENED_KEY]: slug }, "local");

function ProblemLink({ slug }: { slug: string }) {
  return (
    <a
      href={hrefFor(slug)}
      target="_blank"
      rel="noreferrer"
      onClick={() => rememberOpened(slug)}
    >
      {problemName(slug)}
    </a>
  );
}

function Dashboard() {
  const { progress, loaded, update, replaceAll } = useProgress();
  const streak = useStreak();
  const { lists, custom, addList, removeList, replaceCustom } = useLists();
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newInput, setNewInput] = useState("");
  const { active: list, setActiveId } = useActiveList(lists);
  const [filter, setFilter] = useState<Filter>("all");
  const [message, setMessage] = useState("");

  const now = today();
  const queued = queuedSlugs(progress);
  const dueCount = dueSlugs(progress, now).length;
  const solvedInList = list.slugs.filter((s) => progress[s]?.solved).length;
  const percent = Math.round((solvedInList / list.slugs.length) * 100);

  const visible = list.slugs.filter((slug) => {
    const rec = progress[slug];
    if (filter === "solved") return rec?.solved;
    if (filter === "unsolved") return !rec?.solved;
    if (filter === "queued") return (rec?.box ?? 0) > 0;
    return true;
  });

  const resetListProgress = () => {
    if (
      !window.confirm(
        `Clear solved marks for all ${list.slugs.length} problems in ${list.name}? Problems shared with other lists are cleared there too. Your revisit schedule is kept.`,
      )
    ) {
      return;
    }
    update(list.slugs, (rec) =>
      rec && rec.box > 0 ? { ...rec, solved: false } : undefined,
    );
  };

  const resetQueue = () => {
    if (!window.confirm("Empty the revisit queue? Solved marks are kept.")) {
      return;
    }
    update(queued, (rec) => (rec?.solved ? removeFromQueue(rec) : undefined));
  };

  const exportBackup = () => {
    const blob = new Blob([serializeBackup(progress, custom)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `leetdaily-backup-${now}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const parsedInput = parseListInput(newInput);

  const createList = async () => {
    try {
      const id = await addList(newName.trim(), parsedInput.slugs);
      setActiveId(id);
      setCreating(false);
      setMessage(`Created ${newName.trim()}.`);
      setNewName("");
      setNewInput("");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not save list.");
    }
  };

  const deleteList = async () => {
    if (
      !window.confirm(
        `Delete the list "${list.name}"? Progress on its problems is kept.`,
      )
    ) {
      return;
    }
    await removeList(list.id);
    setActiveId(lists[0].id);
  };

  const importBackup = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const imported = parseBackup(await file.text());
      if (!window.confirm("Replace all current progress with this backup?")) {
        return;
      }
      await replaceAll(imported.progress);
      await replaceCustom(imported.lists);
      setMessage(
        `Imported ${Object.keys(imported.progress).length} problems and ${imported.lists.length} custom lists.`,
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Import failed.");
    }
  };

  return (
    <div className="dash">
      <header className="dash-header">
        <div>
          <h1>LeetDaily</h1>
          <p className="muted">
            {streak.days > 0 &&
              `${streak.days} day streak (best ${streak.best}), `}
            {queued.length} in revisit queue, {dueCount} due today
          </p>
        </div>
        <div className="dash-actions">
          <button className="dash-btn" onClick={exportBackup}>
            Export
          </button>
          <label className="dash-btn">
            Import
            <input
              type="file"
              accept="application/json"
              hidden
              data-testid="import_input"
              onChange={importBackup}
            />
          </label>
          <ThemeToggle className="dash-btn dash-icon-btn" />
        </div>
      </header>

      {message && <p className="dash-message">{message}</p>}

      <nav className="dash-tabs">
        {lists.map((l) => (
          <button
            key={l.id}
            data-testid={`tab_${l.id}`}
            className={`dash-tab ${l.id === list.id ? "active" : ""}`}
            onClick={() => setActiveId(l.id)}
          >
            {l.name}
          </button>
        ))}
        <button
          className="dash-tab"
          data-testid="new_list_button"
          onClick={() => setCreating(!creating)}
        >
          + New list
        </button>
      </nav>

      {creating && (
        <section className="dash-card dash-form">
          <h2>New list</h2>
          <input
            className="dash-input"
            placeholder="List name"
            data-testid="list_name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <textarea
            className="dash-input"
            rows={6}
            placeholder="Paste LeetCode URLs or slugs, one per line"
            data-testid="list_input"
            value={newInput}
            onChange={(e) => setNewInput(e.target.value)}
          />
          <p className="muted" data-testid="list_preview">
            {parsedInput.slugs.length} problems found
            {parsedInput.skipped.length > 0 &&
              `, ${parsedInput.skipped.length} skipped (${parsedInput.skipped
                .slice(0, 3)
                .join(", ")}${parsedInput.skipped.length > 3 ? ", ..." : ""})`}
            . Max {MAX_SLUGS} per list.
          </p>
          <button
            className="dash-btn"
            data-testid="create_list_button"
            disabled={
              !newName.trim() ||
              parsedInput.slugs.length === 0 ||
              parsedInput.slugs.length > MAX_SLUGS
            }
            onClick={createList}
          >
            Create list
          </button>
        </section>
      )}

      <section className="dash-card">
        <div className="dash-progress-row">
          <strong data-testid="list_progress">
            {solvedInList} / {list.slugs.length} solved
          </strong>
          <select
            className="dash-select"
            value={filter}
            data-testid="filter_select"
            onChange={(e) => setFilter(e.target.value as Filter)}
          >
            <option value="all">All</option>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
            <option value="queued">In revisit queue</option>
          </select>
        </div>
        <div className="dash-bar">
          <div className="dash-bar-fill" style={{ width: `${percent}%` }} />
        </div>

        {!loaded ? (
          <p className="muted">Loading...</p>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Solved</th>
                <th>Problem</th>
                <th>Last attempt</th>
                <th>Revisit</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((slug) => {
                const rec = progress[slug];
                const inQueue = (rec?.box ?? 0) > 0;
                return (
                  <tr
                    key={slug}
                    data-testid={`row_${slug}`}
                    className={`${rec?.solved ? "solved" : ""} ${inQueue ? "queued" : ""}`}
                  >
                    <td>
                      <input
                        type="checkbox"
                        aria-label={`Mark ${problemName(slug)} solved`}
                        data-testid={`solved_${slug}`}
                        checked={rec?.solved ?? false}
                        onChange={(e) =>
                          update([slug], (r) => setSolved(r, e.target.checked))
                        }
                      />
                    </td>
                    <td>
                      <ProblemLink slug={slug} />
                    </td>
                    <td className="muted">{lastLabel(rec)}</td>
                    <td>
                      <button
                        className="dash-link"
                        data-testid={`queue_${slug}`}
                        onClick={() =>
                          update([slug], (r) =>
                            inQueue && r
                              ? removeFromQueue(r)
                              : markForRevisit(r, now),
                          )
                        }
                      >
                        {inQueue ? dueLabel(rec, now) + " (remove)" : "Add"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      <section className="dash-card">
        <h2>Revisit queue</h2>
        {queued.length === 0 ? (
          <p className="muted">
            Nothing queued. Mark problems as shaky or missed from the popup.
          </p>
        ) : (
          <table className="dash-table" data-testid="queue_table">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Last attempt</th>
                <th>Due</th>
                <th>Box</th>
              </tr>
            </thead>
            <tbody>
              {queued.map((slug) => (
                <tr
                  key={slug}
                  className={progress[slug].due <= now ? "queued" : ""}
                >
                  <td>
                    <ProblemLink slug={slug} />
                  </td>
                  <td className="muted">{lastLabel(progress[slug])}</td>
                  <td>{dueLabel(progress[slug], now)}</td>
                  <td className="muted">{progress[slug].box}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="dash-card dash-danger">
        <h2>Reset</h2>
        <div className="dash-actions">
          <button
            className="dash-btn"
            data-testid="reset_list"
            onClick={resetListProgress}
          >
            Reset {list.name} progress
          </button>
          <button
            className="dash-btn"
            data-testid="reset_queue"
            onClick={resetQueue}
          >
            Reset revisit queue
          </button>
          {!list.builtIn && (
            <button
              className="dash-btn"
              data-testid="delete_list"
              onClick={deleteList}
            >
              Delete {list.name}
            </button>
          )}
        </div>
      </section>

      <footer className="dash-footer">
        <a href={SOURCE_CODE_URL} target="_blank" rel="noreferrer">
          Source code
        </a>
      </footer>
    </div>
  );
}

export default Dashboard;
