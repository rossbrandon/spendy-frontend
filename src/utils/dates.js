const getFirstDayOfCurrentMonth = () => {
    const currentDate = new Date()
    const firstDayOfCurrentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
    )
    return firstDayOfCurrentMonth.toISOString()
}

const getLastDayOfCurrentMonth = () => {
    const currentDate = new Date()
    const lastDayOfCurrentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
    )
    return lastDayOfCurrentMonth.toISOString()
}

const getFirstDayOfMonth = date => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    firstDayOfMonth.setUTCHours(0, 0, 0, 0)
    return firstDayOfMonth.toISOString()
}

const getLastDayOfMonth = date => {
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    lastDayOfMonth.setUTCHours(0, 0, 0, 0)
    return lastDayOfMonth.toISOString()
}

export {
    getFirstDayOfCurrentMonth,
    getLastDayOfCurrentMonth,
    getFirstDayOfMonth,
    getLastDayOfMonth,
}
