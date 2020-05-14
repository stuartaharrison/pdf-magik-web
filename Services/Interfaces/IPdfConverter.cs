using PdfMagikWeb.Entities;

namespace PdfMagikWeb.Services.Interfaces {
    
    public interface IPdfConverter {
        IDocument ConvertPDF(IDocument document, IPdfConversionOptions options);
    }
}
