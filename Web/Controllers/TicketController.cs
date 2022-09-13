using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Web.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly TigetsContext _tigetsContext;
        private readonly IMapper _mapper;
        public TicketController(
            TigetsContext tigetsContext,
            IMapper mapper
        )
        {
            _tigetsContext = tigetsContext;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task Post([FromBody] TicketPostModel ticketPostModel)
        {
            
        }
    }
}
