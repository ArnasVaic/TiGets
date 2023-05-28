using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Services;
using Microsoft.AspNetCore.Authorization;

namespace Tigets.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IMapper _mapper;

        public EventController(IEventService eventService, IMapper mapper)
        {
            _eventService = eventService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] Event createEventDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newEvent = new Event
            {
                EventId = Guid.NewGuid().ToString(),
                Name = createEventDto.Name,
                Date = createEventDto.Date,
                Description = createEventDto.Description,
                Venue = createEventDto.Venue
            };

            try
            {
                await _eventService.AddEvent(newEvent);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            var view = _mapper.Map<EventViewModel>(createEventDto);
            return Ok(view);
        }
    }
}