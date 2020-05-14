using Microsoft.Extensions.Options;
using PdfMagikWeb.Entities;
using PdfMagikWeb.Entities.Options;
using PdfMagikWeb.Services.Interfaces;
using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;

namespace PdfMagikWeb.Services {
    
    public sealed class QPdfConverter : IPdfConverter {

        private readonly QpdfOptions _options;

        public IDocument ConvertPDF(IDocument document, IPdfConversionOptions options) {
            // check qpdf location is valid
            if (!File.Exists(_options.InstallDirectory)) {
                throw new Exception("Could not find a valid version of QPDF!");
            }

            // check that the file we are working with is valid
            if (!File.Exists(document.Fullpath)) {
                throw new Exception("Source document could not be found!");
            }

            // get the arguments for the QPDF executable
            var outputDocument = new QPdfDocument(document.Filename);
            var arguments = GetQPdfArguments(options, document, outputDocument);

            // execute QPDF
            using var process = new Process();
            process.StartInfo.FileName = _options.InstallDirectory;
            process.StartInfo.Arguments = arguments;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.RedirectStandardInput = true;

            using var outputWaitHandler = new AutoResetEvent(false);
            using var errorWaitHandler = new AutoResetEvent(false);

            var output = new StringBuilder();
            DataReceivedEventHandler outputHandler = (sender, e) => {
                if (e.Data == null) {
                    outputWaitHandler.Set();
                } else {
                    output.AppendLine(e.Data);
                }
            };

            var error = new StringBuilder();
            DataReceivedEventHandler errorHandler = (sender, e) => {
                if (e.Data == null) {
                    errorWaitHandler.Set();
                } else {
                    error.AppendLine(e.Data);
                }
            };

            process.OutputDataReceived += outputHandler;
            process.ErrorDataReceived += errorHandler;

            try {
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();

                if (process.WaitForExit(options.Timeout) && outputWaitHandler.WaitOne(options.Timeout) && errorWaitHandler.WaitOne(options.Timeout)) {
                    if (process.ExitCode != 0 || !File.Exists(outputDocument.Fullpath)) {
                        throw new Exception("QPDF failed to convert!");
                    }
                } else {
                    if (!process.HasExited) {
                        process.Kill();
                    }

                    throw new Exception("QPDF has timed out!");
                }
            }
            finally {
                process.OutputDataReceived -= outputHandler;
                process.ErrorDataReceived -= errorHandler;
            }

            // handle the return value
            outputDocument.SetData(File.ReadAllBytes(outputDocument.Fullpath));
            return outputDocument;
        }

        private string GetQPdfArguments(IPdfConversionOptions options, IDocument from, IDocument to) {
            var paramsBuilder = new StringBuilder();

            // check for a password
            if (!string.IsNullOrWhiteSpace(from.Password)) {
                paramsBuilder.Append($"--password={from.Password} ");
            }

            // handle encryption options
            if (options.Encryption == EncryptionOptions.decrypt) {
                paramsBuilder.Append("--decrypt ");
            } else if (options.Encryption == EncryptionOptions.encrypt) {
                // check for valid encryption password
                if (string.IsNullOrWhiteSpace(options.MasterPassword)) {
                    throw new Exception("Master Password has to be set for encryption to take place!");
                }

                paramsBuilder.Append($"--encrypt {options.MasterPassword} {options.MasterPassword} {options.EncryptionKeyLength} ");

                paramsBuilder.AppendFormat("--accessibility={0} ", options.Accessibility ? "y" : "n");
                paramsBuilder.AppendFormat("--extract={0} ", options.TextGraphicExtraction ? "y" : "n");

                string printOption = string.Empty;
                switch (options.Printing) {
                    case PrintOptions.full:
                        printOption = "full";
                        break;
                    case PrintOptions.low:
                        printOption = "low";
                        break;
                    case PrintOptions.disallow:
                        printOption = "none";
                        break;
                }

                if (!string.IsNullOrWhiteSpace(printOption)) {
                    paramsBuilder.AppendFormat("--print={0} ", printOption);
                }

                string modifyOption = string.Empty;
                switch (options.EncryptionModification) {
                    case EncryptionModification.all:
                        modifyOption = "all";
                        break;
                    case EncryptionModification.annotate:
                        modifyOption = "annotate";
                        break;
                    case EncryptionModification.form:
                        modifyOption = "form";
                        break;
                    case EncryptionModification.assembly:
                        modifyOption = "assembly";
                        break;
                    case EncryptionModification.none:
                        modifyOption = "none";
                        break;
                }

                if (!string.IsNullOrWhiteSpace(modifyOption)) {
                    paramsBuilder.AppendFormat("--modify={0} ", modifyOption);
                }

                paramsBuilder.Append("-- ");
            }

            // handle paging
            if (options.Paging == PagingOptions.all) {
                paramsBuilder.AppendFormat("\"{0}\" \"{1}\"", from.Fullpath, to.Fullpath);
            } else {
                paramsBuilder.AppendFormat("\"{0}\" --pages \"{0}\" {1}-{2} -- \"{3}\"", from.Fullpath, options.PageStart, options.PageEnd, to.Fullpath);
            }

            return paramsBuilder.ToString();
        }

        public QPdfConverter(IOptions<QpdfOptions> options) {
            _options = options.Value;
        }

        private class QPdfDocument : IDisposable, IDocument {

            private readonly Guid _id;

            public string ID {
                get {
                    return _id.ToString();
                }
            }

            public string Filename { get; set; }

            public string Password { get; set; }

            public string Fullpath { get; }

            public byte[] Data { get; private set; }

            public void Dispose() {
                if (File.Exists(Fullpath)) {
                    File.Delete(Fullpath);
                }
            }

            public void SetData(byte[] vs) {
                Data = vs;
            }

            public QPdfDocument(string filename) {
                _id = Guid.NewGuid();

                var fi = new FileInfo(filename);
                var tempFilePath = Path.Combine(Path.GetTempPath(), $"{_id}.{fi.Extension}");

                Filename = filename;
                Fullpath = tempFilePath;
            }
        }
    }
}
