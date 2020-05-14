using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PdfMagikWeb.Entities {
    
    public sealed class PdfConversionOptions : IPdfConversionOptions {

        public bool Accessibility { get; set; } = true;

        public bool TextGraphicExtraction { get; set; } = false;

        public int Timeout { get; set; } = 60000;

        public int EncryptionKeyLength { get; set; } = 128;

        public int PageStart { get; set; }

        public int PageEnd { get; set; }

        public string MasterPassword { get; set; }

        public EncryptionOptions Encryption { get; set; } = EncryptionOptions.none;

        public EncryptionModification EncryptionModification { get; set; } = EncryptionModification.none;

        public PagingOptions Paging { get; set; } = PagingOptions.all;

        public PrintOptions Printing { get; set; } = PrintOptions.full;
    }
}
