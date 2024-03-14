import { Link, useLocation } from "react-router-dom";

function BottomMenu() {
  const location = useLocation();

  // Fungsi untuk menentukan kelas aktif berdasarkan rute
  const isActive = (pathname) => {
    return location.pathname === pathname ? 'active' : '';
  };
  console.log('cek path:', location.pathname);
  return (
    <>
        <nav className="fixed bottom-0 w-full bg-white shadow-lg max-w-screen-sm z-50">
            <ul className="flex justify-around py-2">
                <li className={`nav-item ${isActive('/home')}`}>
                    <Link to="/home" className={`flex flex-col text-sm items-center text-gray-500 ${isActive('/home') && 'text-sky-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M13.228 2.688a2 2 0 0 0-2.456 0l-8.384 6.52C1.636 9.795 2.05 11 3.003 11H4v8a2 2 0 0 0 2 2h4v-6a2 2 0 1 1 4 0v6h4a2 2 0 0 0 2-2v-8h.997c.952 0 1.368-1.205.615-1.791z"/></g></svg>
                        Home
                    </Link>
                </li>
                <li className={`nav-item ${isActive('/latihan')}`}>
                    <Link to="/latihan" className={`flex flex-col text-sm items-center text-gray-500 ${isActive('/latihan') && 'text-sky-900'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 18.5q0-.575-.387-1.137t-.863-1.175q-.475-.613-.862-1.275T8.5 13.5q0-1.45 1.025-2.475T12 10q1.45 0 2.475 1.025T15.5 13.5q0 .75-.387 1.413t-.863 1.274q-.475.613-.862 1.175T13 18.5zm1 2.5q-.425 0-.712-.288T11 20v-.5h2v.5q0 .425-.288.713T12 21m6-3q-.225-.225-.262-.575t.162-.625q.525-.825.813-1.787T19 13q0-1.375-.488-2.588T17.15 8.25q-.275-.325-.287-.712t.287-.688q.3-.3.725-.3t.7.3q1.125 1.2 1.775 2.775T21 13q0 1.35-.375 2.588t-1.05 2.287q-.275.425-.75.45T18 18m-13.575-.125q-.675-1.05-1.05-2.287T3 13q0-3.75 2.625-6.375T12 4h.2l-.9-.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l2.6 2.6q.15.15.212.325t.063.375q0 .2-.063.375T15.3 5.7l-2.6 2.6q-.3.3-.7.288t-.7-.313q-.3-.3-.3-.712t.3-.713l.85-.85H12Q9.1 6 7.05 8.05T5 13q0 1.05.288 2.013T6.1 16.8q.2.275.163.625T6 18q-.35.35-.825.325t-.75-.45"/></svg>
                        Latihan
                    </Link>
                </li>
                <li className={`nav-item ${isActive('/skrining')}`}>
                    <Link to="/skrining" className={`flex flex-col text-sm items-center text-gray-500 ${isActive('/skrining') && 'text-sky-900'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2H3v-2h2v-2H3v-2h2v-2H3V9h2V7H3V5h2V3a1 1 0 0 1 1-1zm-6 6h-2v3H9v2h2.999L12 16h2l-.001-3H17v-2h-3z"/></svg>
                        Skrining
                    </Link>
                </li>
                <li className={`nav-item ${isActive('/profile')}`}>
                    <Link to="/profile" className={`flex flex-col text-sm items-center text-gray-500 ${isActive('/profile') && 'text-sky-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 32 32"><path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5"/><path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0"/></svg>
                        Profile
                    </Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default BottomMenu