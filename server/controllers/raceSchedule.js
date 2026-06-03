export const  raceSchedule= async (req ,res)=> {
    try {
        const apiBase = process.env.OPENF1_API
        const raceschedule = await fetch(`${apiBase}/v1/meetings?year=2025`)
        const data = await raceschedule.json()
        res.json(data)
    } catch (error) {
       res.status(500).json({message : "something is wrong with this api"})
    }

}
