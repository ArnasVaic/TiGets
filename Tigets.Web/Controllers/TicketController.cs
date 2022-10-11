using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Repositories;
using Tigets.Core.Services;
using Tigets.Infrastructure.Data;

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
            var username = User.Identity?.Name ?? throw new Exception("User does not exist");
            await _ticketService.Import(username, ticketPostModel);
            var view = _mapper.Map<TicketViewModel>(ticketPostModel);
            return Ok(view);
        }

        [Authorize]
        [HttpGet("GetTickets")]
        public async Task<IActionResult> GetTicketsOnTheMarket()
        {
            var username = User.Identity?.Name ?? throw new Exception("User does not exist");
            await _ticketService.Import(username, ticketPostModel);
            var view = _mapper.Map<TicketViewModel>(ticketPostModel);
            return Ok(view);
        }

        [Authorize]
        [HttpPatch("Buy")]
        public async Task<IActionResult> Buy(string ticketId)
        {
            var username = User.Identity?.Name ?? throw new Exception("User does not exist");
            await _ticketService.Buy(username, ticketId);
            return NoContent();
        }
    }
}