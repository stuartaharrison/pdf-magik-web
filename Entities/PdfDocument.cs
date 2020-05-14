using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PdfMagikWeb.Entities {

    public class PdfDocument : IDisposable, IDocument {

        private readonly Guid _id;

        public string ID { 
            get {
                return _id.ToString();
            }
        }
        
        public string Filename { get; set; }
        
        public string Password { get; set; }
        
        public string Fullpath { get; }

        public byte[] Data { 
            get {
                return File.ReadAllBytes(Fullpath);
            }
        }

        public void Dispose() {
            if (File.Exists(Fullpath)) {
                File.Delete(Fullpath);
            }
        }

        public PdfDocument(string filePath) {
            _id = Guid.NewGuid();

            // note; going to assume file exists at this stage - may change this later
            var fi = new FileInfo(filePath);
            var tempFilePath = Path.Combine(Path.GetTempPath(), $"{_id}.{fi.Extension}");

            File.Copy(filePath, tempFilePath); // copy the file over
            
            Filename = fi.Name;
            Fullpath = tempFilePath;
        }

        public PdfDocument(byte[] fileData, string filename) {
            _id = Guid.NewGuid();

            var fi = new FileInfo(filename);
            var tempFilePath = Path.Combine(Path.GetTempPath(), $"{_id}.{fi.Extension}");

            File.WriteAllBytes(tempFilePath, fileData);

            Filename = filename;
            Fullpath = tempFilePath;
        }
    }
}
