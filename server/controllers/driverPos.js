export const driverPosition = async (req ,res)=> {
    const { year } = req.params
    if(!year) return
    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructorstandings.json`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({message : "something is wrong with driverposition api "})
    }
}