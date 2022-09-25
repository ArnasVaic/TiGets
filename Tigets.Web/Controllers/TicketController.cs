using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Constants;
using Tigets.Core.Models;
using Tigets.Infrastructure.Data;

namespace Tigets.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [Authorize]
        [HttpGet]
        public async Task<string> Get()
        {
            return "This is a secret";
        }
    }
}
