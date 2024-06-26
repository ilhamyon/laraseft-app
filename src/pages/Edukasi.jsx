import { pdfjs } from "react-pdf"
// import SampelPdf from "../assets/sampel.pdf"
import PDFViewer from "../components/PDFViewer";

// Set worker URL to enable worker support (replace this with your own workerSrc)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Path to your PDF file
const edukasiTbc = '/EDUKASI TBC.pdf';

function Edukasi() {
  return (
    <div className="my-0 mx-auto min-h-full max-w-screen-sm bg-white">
        <div className="border-b-2 border-gray-400">
            <h2 className="text-xl font-bold px-4 py-4">Edukasi Kesehatan</h2>
        </div>

        <div className="py-4 border-b-2 border-gray-400">
          <h2 className="px-4 font-semibold text-xl mb-4">Edukasi TBC</h2>
          <div className="flex justify-center mb-20">
            <PDFViewer file={edukasiTbc} scale={0.45} />
          </div>
        </div>

    </div>
  )
}

export default Edukasi