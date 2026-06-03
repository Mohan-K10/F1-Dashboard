export const raceWinner = async (req ,res) => {
    try {
        const jolpi_api = process.env.JOLPI_API
        const { year } = req.params
        if(!year) {
            return res.json({message : "Year is required"})
        }

        const response = await fetch(`${jolpi_api}/ergast/f1/${year}/results/1.json`)

        const data = await response.json()

        const races  = data?.MRData?.RaceTable?.Races

        const winners = races.map((race)=> ({
            round : race.round,
            raceName : race.raceName,
            winner : `${race.Results?.[0]?.Driver?.givenName}  ${race.Results?.[0]?.Driver?.familyName}`,
            team : race.Results?.[0]?.Constructor?.name
        }))

        return res.json(winners)

    } catch (error) {
        res.status(500).json({message : "Something went wrong in racewinner api"})
    }
}