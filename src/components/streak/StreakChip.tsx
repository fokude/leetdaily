interface IStreakChipProps {
  days: number;
  doneToday: boolean;
}

/** Flame and day count. Filled once today's attempt is in, outlined when the streak is still at risk. */
const StreakChip = ({ days, doneToday }: IStreakChipProps) => {
  if (days === 0) return null;

  return (
    <div
      className={`streak-chip ${doneToday ? "done" : ""}`}
      data-testid="streak_chip"
      title={
        doneToday
          ? `${days} day streak`
          : `${days} day streak, rate a problem today to keep it`
      }
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
      <span>{days}</span>
    </div>
  );
};

export default StreakChip;
