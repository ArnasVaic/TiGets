using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Services;

namespace Tigets.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public TicketController(
            ITicketService ticketService,
            UserManager<User> userManager,
            IMapper mapper
        )
        {
            _ticketService = ticketService;
            _userManager = userManager;
            _mapper = mapper;
        }

        [Authorize]
        [HttpPost("Import")]
        public async Task<IActionResult> ImportTicket(TicketPostModel ticketPostModel)
        {
            try
            {
                var username = User.Identity?.Name ?? throw new Exception("User does not exist");
                await _ticketService.Import(username, ticketPostModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            var view = _mapper.Map<TicketViewModel>(ticketPostModel);
            return Ok(view);
        }

        [Authorize]
        [HttpGet("GetMarketTickets")]
        public async Task<IActionResult> GetTicketsOnTheMarket()
        {
            IEnumerable<Ticket> tickets;
            try
            {
                var username = User.Identity?.Name ?? throw new Exception("User does not exist");
                tickets = await _ticketService.GetTicketsOnTheMarket(username);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(tickets);
        }

        [Authorize]
        [HttpGet("GetUserTickets")]
        public async Task<IActionResult> GetUserTickets()
        {
            IEnumerable<Ticket> tickets;
            try
            {
                var username = User.Identity?.Name ?? throw new Exception("User does not exist");
                tickets = await _ticketService.GetUserTickets(username);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(tickets);
        }

        [Authorize]
        [HttpPatch("Buy")]
        public async Task<IActionResult> Buy(string ticketId)
        {
            try
            {
                var username = User.Identity?.Name ?? throw new Exception("User does not exist");
                await _ticketService.Buy(username, ticketId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [Authorize]
        [HttpPatch("Move")]
        public async Task<IActionResult> Move([FromQuery] string ticketId, [FromQuery] TicketState state)
        {
            try
            {
                var username = User.Identity?.Name ?? throw new Exception("User does not exist");
                await _ticketService.Move(username, ticketId, state);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }
    }
}