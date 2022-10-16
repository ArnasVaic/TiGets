namespace Tigets.Core.Services
{
    public interface ITicketService
    {
        Task Import(string username, TicketPostModel ticketPostModel);
        Task Buy(string buyerId, string ticketId);
        Task<IEnumerable<Ticket>> GetTicketsOnTheMarket(string username);
        Task<IEnumerable<Ticket>> GetUserTickets(string username);
        Task Move(string username, string ticketId, TicketState state);
    }
}
