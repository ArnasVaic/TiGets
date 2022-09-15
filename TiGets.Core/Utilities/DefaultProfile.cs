using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Web.Models;

namespace Core.Utilities
{
    public class DefaultProfile : Profile
    {
        public DefaultProfile()
        {
            CreateMap<TicketPostModel, Ticket>();
        }
    }
}
