using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PdfMagikWeb.Entities {
    
    public interface IDocument : IDisposable {
        string ID { get; }
        string Filename { get; set; }
        string Password { get; set; }
        string Fullpath { get; }
        byte[] Data { get; }
    }
}
