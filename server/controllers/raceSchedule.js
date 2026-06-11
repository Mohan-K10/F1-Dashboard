export const  raceSchedule= async (req ,res)=> {
    try {
        const raceschedule = await fetch(`https://api.openf1.org/v1/meetings?year=2025`)
        const data = await raceschedule.json()
        res.json(data)
    } catch (error) {
       res.status(500).json({message : "something is wrong with this api"})
    }

}
