using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Repositories;
using Tigets.Infrastructure.Data;

namespace Tigets.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IMapper _mapper;
        private readonly ITransferRepository _transferRepository;
        public TicketController(
            ITicketRepository ticketRepository,
            IMapper mapper,
            ITransferRepository transferRepository
        )
        {
            _ticketRepository = ticketRepository;
            _mapper = mapper;
            _transferRepository = transferRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Post(TicketPostModel model)
        {
            var ticket = _mapper.Map<Ticket>(model);
            ticket.Id = Guid.NewGuid().ToString();
            ticket.UserId = "some user";
            await _ticketRepository.AddAsync(ticket);
            var transfer = new Transfer { Cost = 1, FromId = "user1", Id = "123", TicketId = "5020719", Time = DateTime.Now, ToId = "User2" };
            await _transferRepository.AddAsync(transfer);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public async Task<string> Get()
        {
            return "This is a secret";
        }
    }
}