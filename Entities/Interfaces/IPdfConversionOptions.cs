namespace PdfMagikWeb {

    public enum EncryptionOptions {
        none,
        decrypt,
        encrypt
    }

    public enum EncryptionModification {
        all,
        annotate,
        form,
        assembly,
        none
    }

    public enum PagingOptions {
        all,
        select
    }

    public enum PrintOptions {
        full,
        low,
        disallow
    }
}

namespace PdfMagikWeb.Entities {
    
    public interface IPdfConversionOptions {
        bool Accessibility { get; set; }
        bool TextGraphicExtraction { get; set; }
        int Timeout { get; set; }
        int EncryptionKeyLength { get; set; }
        int PageStart { get; set; }
        int PageEnd { get; set; }
        string MasterPassword { get; set; }
        EncryptionOptions Encryption { get; set; }
        EncryptionModification EncryptionModification { get; set; }
        PagingOptions Paging { get; set; }
        PrintOptions Printing { get; set; }
    }
}
