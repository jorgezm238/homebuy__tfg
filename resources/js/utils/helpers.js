export function getFormatDate(formatDate) {
    const date = new Date(formatDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDay()

    const addZeroDate = (date) => (
        date <= 10 ? `0${date}` : date
    )

    return `${addZeroDate(day)}-${addZeroDate(month)}-${year}`
}
