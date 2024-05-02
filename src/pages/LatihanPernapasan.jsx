import { pdfjs } from "react-pdf"
// import SampelPdf from "../assets/sampel.pdf"
import PDFViewer from "../components/PDFViewer";

// Set worker URL to enable worker support (replace this with your own workerSrc)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Path to your PDF file
const latihanPernapasan = '/LATIHAN PERNAPASAN ACBT.pdf';

function LatihanPernapasan() {
  return (
    <div className="my-0 mx-auto min-h-full max-w-screen-sm bg-white">
        <div className="border-b-2 border-gray-400">
            <h2 className="text-xl font-bold px-4 py-4">Latihan Pernapasan</h2>
        </div>

        <div className="py-4 border-b-2 border-gray-400">
          <h2 className="px-4 font-semibold text-xl mb-4">Latihan Pernapasan ACBT</h2>
          <div className="flex justify-center mb-2">
            <PDFViewer file={latihanPernapasan} scale={0.45} />
          </div>
        </div>

        <div className="py-4 border-b-2 border-gray-400">
          <h2 className="px-4 font-semibold text-xl mb-4">Video</h2>
          <div className="flex px-4 justify-center mb-20">
            <iframe width="750" height="342" src="https://www.youtube.com/embed/nkiIzz3yKDo?rel=0" frameBorder="0" allowfullscreen></iframe>
          </div>
        </div>

    </div>
  )
}

export default LatihanPernapasan