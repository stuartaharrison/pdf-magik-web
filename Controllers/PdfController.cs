using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Options;
using PdfMagikWeb.Entities;
using PdfMagikWeb.Entities.DataTransferObjects;
using PdfMagikWeb.Services.Interfaces;

namespace PdfMagikWeb.Controllers {

    [ApiController]
    [Route("[controller]")]
    public class PdfController : ControllerBase {

        private readonly IPdfConverter _converter;

        [HttpPost]
        [Route("encrypt")]
        public IActionResult Encrypt([FromBody] PdfEncryptionOptionsDto options) {
            try {
                string[] split = options.Base64Data.Split(',');
                byte[] pdfData = Convert.FromBase64String(split.Last());

                var conversionOptions = new PdfConversionOptions() {
                    Encryption = options.EncryptionOptions,
                    MasterPassword = options.NewPassword
                };

                using var document = new PdfDocument(pdfData, options.Filename) {
                    Password = options.CurrentPassword
                };

                using var encrypted = _converter.ConvertPDF(document, conversionOptions);
                return File(encrypted.Data, "application/pdf", options.Filename);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        public PdfController(IPdfConverter converter) {
            _converter = converter;
        }
    }
}