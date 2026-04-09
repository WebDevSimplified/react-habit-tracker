import { format, isToday } from "date-fns"
import { useHabits } from "../context/useHabits"
import { Button } from "./Button"

type HeaderProps = {
  visibleDates: Date[]
  onPrev: () => void
  onNext: () => void
}

export function Header({ visibleDates, onNext, onPrev }: HeaderProps) {
  const { habits } = useHabits()

  const doneToday = habits.filter(h =>
    h.completions.some(c => isToday(c)),
  ).length

  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm">
          {doneToday} / {habits.length} done today
        </span>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm">{dateRange}</span>
        <div className="flex items-center gap-3">
          <Button onClick={onPrev}>Prev</Button>
          <Button
            onClick={onNext}
            disabled={visibleDates.some(d => isToday(d))}
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  )
}
