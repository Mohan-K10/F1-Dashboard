export const drivers =  async(req ,res)=> {
    console.log("driver standings")
    try {
        //driver standings
        const drivers = await fetch(`https://api.openf1.org/v1/drivers?session_key=latest`)
        const data = await drivers.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({message : "something is wrong with this api"})
    }
}




