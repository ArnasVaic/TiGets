using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Utilities;

namespace Tigets.Tests
{
    public class TestsHelper
    {
        public static Mapper CreateDefaultMapper()
        {
            var myProfile = new DefaultProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(myProfile));
            return new Mapper(configuration);
        }
    }
}