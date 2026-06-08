export const  constructionstandings = async (req ,res)=> {
    
    try {
        //constructor standings
        const jolpi_api = process.env.JOLPI_API
        const constStandings = await fetch( `${jolpi_api}/ergast/f1/2025/constructorstandings.json`)
        const data =await constStandings.json()
        res.json(data)
        
    } catch (error) {
        res.status(500).json({message : "something is wrong with this api"})
    }
}

