const calculateStreak = (habit, activeDay) => {
	const history = habit.history;
	const goal = parseInt(habit.goal);
	let streak = 0;
	let currentDayIndex = history.findIndex(
		(entry) => entry.date === activeDay
	);

	if (currentDayIndex === -1) {
		return streak; 
	}

	if (history[currentDayIndex].value === goal) {
		streak = 1;
	} else {
		return streak;
	}

	for (let i = currentDayIndex - 1; i >= 0; i--) {
		const currentDate = history[i + 1].date;
		const previousDate = history[i].date;

		if (
			(currentDate - 1000 * 60 * 60 * 24 === previousDate) &&
			history[i].value === goal
		) {
			streak++
		} else {
			break; 
		}
	}

	return streak;
};

const data = {
    _id: "k-ovlXdXHbgJTX891uQqo",
    color: "neutral",
    createdAt: 1718830800000,
    description: "123",
    goal: 1,
    goalPeriod: "day",
    history: [
        {
            date: 1718830800000,
            value: 1,
        },
        {
            date: 1718917200000,
            value: 1,
        },
        {
            date: 1719003600000,
            value: 0,
        },
        {
            date: 1719090000000,
            value: 1,
        },
        {
            date:1719262800000,
            value:1
        }
    ],
    icon: "🎮",
    name: "123",
    reminderMessage: "",
    showMemo: false,
    tags: [""],
    units: "count",
    userId: "dDs3rAPB5lTuq6zOsab2X2ucgWu2",
};

describe("calculateStreak function", () => {
	test("test 1", () => {
		
		expect(calculateStreak(data, 1718830800000)).toBe(1);
	});

	test("test 2", () => {
		
		expect(calculateStreak(data, 1718917200000)).toBe(2);
	});

	test("test 3", () => {
		
		expect(calculateStreak(data, 1719003600000)).toBe(0);
	});
	test("test 4", () => {
		
		expect(calculateStreak(data, 1719090000000)).toBe(1);
	});
	test("test 5", () => {
		
		expect(calculateStreak(data, 1719262800000)).toBe(1);
	});
});
