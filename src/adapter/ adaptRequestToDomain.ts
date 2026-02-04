export const adaptRequestToDomain = (request: any) => {
    return {
        name: request.name,
        description: request.description,
        host: request.host,
        exchange_date: request.exchange_date,
        budget: request.budget,
        players: request.players,
    }
}