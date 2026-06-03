export const driverPosition = async (req ,res)=> {
    const { year } = req.params
    if(!year) return
    try {
        const jolpi_api = process.env.JOLPI_API
        const response = await fetch(`${jolpi_api}/ergast/f1/${year}/constructorstandings/1.json`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({message : "something is wrong with driverposition api "})
    }
}