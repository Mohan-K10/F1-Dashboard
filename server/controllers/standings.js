export const  standings = async(req ,res)=> {
    try {
        const apiBase = process.env.OPENF1_API
        const sessionKey = process.env.SESSION_KEY

        const driverstandings = await fetch(`${apiBase}/v1/drivers?session_key=${sessionKey}`)
        const data = await driverstandings.json()
        res.json(data)
    } catch (error) {
       res.status(500).json({message : "something is wrong with this api"})
    }
}

