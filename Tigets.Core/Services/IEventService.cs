using Tigets.Core.Models;

namespace Tigets.Core.Services
{
    public interface IEventService
    {
        Task AddEvent(Event eventObj);
        //Task<IEnumerable<Event>> GetEvents();
    }
}