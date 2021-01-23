const getFirstDayOfCurrentMonth = () => {
    const currentDate = new Date()
    const firstDayOfCurrentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
    )
    firstDayOfCurrentMonth.setUTCHours(0, 0, 0, 0)
    return firstDayOfCurrentMonth.toISOString()
}

const getLastDayOfCurrentMonth = () => {
    const currentDate = new Date()
    const lastDayOfCurrentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
    )
    lastDayOfCurrentMonth.setUTCHours(0, 0, 0, 0)
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

const getPreviousYearFirstDayOfMonth = date => {
    date.setMonth(date.getMonth() - 1)
    date.setFullYear(date.getFullYear() - 1)
    return getFirstDayOfMonth(date)
}

const getDateOrdinal = date => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    const dom = utcDate.getDate()
    if (dom == 31 || dom == 21 || dom == 1) return dom + 'st'
    else if (dom == 22 || dom == 2) return dom + 'nd'
    else if (dom == 23 || dom == 3) return dom + 'rd'
    else return dom + 'th'
}

const getYearMonthDayString = date => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    utcDate.setDate(utcDate.getDate())
    const dayNum = ('0' + utcDate.getDate()).slice(-2)
    const monthNum = ('0' + (utcDate.getMonth() + 1)).slice(-2)
    return `${utcDate.getFullYear()}-${monthNum}-${dayNum}`
}

export {
    getDateOrdinal,
    getFirstDayOfCurrentMonth,
    getFirstDayOfMonth,
    getLastDayOfCurrentMonth,
    getLastDayOfMonth,
    getPreviousYearFirstDayOfMonth,
    getYearMonthDayString,
}
