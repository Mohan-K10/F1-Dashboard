export const  standings = async(req ,res)=> {
    try {
        const driverstandings = await fetch('https://api.openf1.org/v1/drivers?session_key=9158')
        const data = await driverstandings.json()
        res.json(data)
    } catch (error) {
       res.status(500).json({message : "something is wrong with this api"})
    }
}

