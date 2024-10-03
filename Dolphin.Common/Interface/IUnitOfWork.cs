using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.Common.Interface
{
    public interface IUnitOfWork:IDisposable
    {
        ITaskRepository Tasks { get; }
        int Save();
    }
}
