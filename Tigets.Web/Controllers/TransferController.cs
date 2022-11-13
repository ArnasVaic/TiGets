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
    public class TransferController : ControllerBase
    {
        private readonly ITransferService _transferService;
        private readonly IMapper _mapper;

        public TransferController(
            ITransferService transferService,
            IMapper mapper
        )
        {
            _transferService = transferService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet("GetTransfers")]
        public async Task<IActionResult> GetTransfers([FromQuery] string ticketId)
        {
            var transfers = await _transferService.GetTransfers(ticketId);
            return Ok(transfers);
        }

    }
}