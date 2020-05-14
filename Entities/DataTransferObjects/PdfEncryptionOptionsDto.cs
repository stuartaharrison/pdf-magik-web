using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PdfMagikWeb.Entities.DataTransferObjects {
    
    public sealed class PdfEncryptionOptionsDto {
    
        public EncryptionOptions EncryptionOptions { get; set; }

        public string Filename { get; set; }

        public string CurrentPassword { get; set; }

        public string NewPassword { get; set; }

        public string Base64Data { get; set; }
    }
}
