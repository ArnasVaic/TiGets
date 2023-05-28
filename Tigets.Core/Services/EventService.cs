using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;
using Tigets.Core.Models;
using Tigets.Core.Services;
using Tigets.Core.Repositories;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly IMapper _mapper;

    public EventService(IEventRepository eventRepository, IMapper mapper)
    {
        _eventRepository = eventRepository;
        _mapper = mapper;
    }

    public async Task AddEvent(Event newEvent)
    {
        if (newEvent == null)
            throw new ArgumentNullException(nameof(newEvent));

        ValidateEvent(newEvent);

        // Map the new event to the Event entity and set the Id.
        var eventEntity = _mapper.Map<Event>(newEvent);
        eventEntity.EventId = Guid.NewGuid().ToString();

        await _eventRepository.AddAsync(eventEntity);
    }

    private void ValidateEvent(Event newEvent)
    {
        if (string.IsNullOrEmpty(newEvent.Name))
            throw new ArgumentException("Event name cannot be null or empty.");

        if (string.IsNullOrEmpty(newEvent.Description))
            throw new ArgumentException("Event description cannot be null or empty.");

        if (string.IsNullOrEmpty(newEvent.Venue))
            throw new ArgumentException("Event venue cannot be null or empty.");

        if (newEvent.Date < DateTime.UtcNow)
            throw new ArgumentException("Event date cannot be in the past.");
    }
}
