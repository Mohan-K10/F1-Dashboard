export const  constructionstandings = async (req ,res)=> {
    
    try {
        //constructor standings
        const constStandings = await fetch( `https://api.jolpi.ca/ergast/f1/2025/constructorstandings.json`)
        const data =await constStandings.json()
        res.json(data)
        
    } catch (error) {
        res.status(500).json({message : "something is wrong with this api"})
    }
}

