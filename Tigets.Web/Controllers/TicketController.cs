using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }
    }
}
