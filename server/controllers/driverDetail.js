export const driverdetail = async (req ,res) => {
    try {
        const jolpi_api = process.env.JOLPI_API
        const { year ,teamId } = req.params
        if(!year || !teamId) {
            return res.json({message : "Year and teamId are required"})
        }
        const response = await fetch(`${jolpi_api}/ergast/f1/${year}/constructors/${teamId}/constructorStandings.json`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({message : "something is wrong in driverdetail api"})
    }
}