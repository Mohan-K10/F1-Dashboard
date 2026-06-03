export const drivers =  async(req ,res)=> {
    console.log("driver standings")
    try {
        //driver standings
        const apiBase = process.env.OPENF1_API
        const drivers = await fetch(`${apiBase}/v1/drivers?session_key=latest`)
        const data = await drivers.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({message : "something is wrong with this api"})
    }
}




