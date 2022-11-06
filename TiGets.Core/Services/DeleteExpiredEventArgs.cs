using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tigets.Core.Services
{
    public class DeleteExpiredEventArgs : EventArgs
    {
        public string Id;

        public DeleteExpiredEventArgs(string id)
        {  
            Id = id;
        }
    }
}
