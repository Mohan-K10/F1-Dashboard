export const driverdetail = async (req ,res) => {
    try {
        const { year ,teamId } = req.params
        if(!year || !teamId) {
            return res.json({message : "Year and teamId are required"})
        }
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructors/${teamId}/constructorStandings.json`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({message : "something is wrong in driverdetail api"})
    }
}