const useDateFormat = (date: Date) => {
    return new Date(date).toLocaleDateString()
}

export default useDateFormat