import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { Button, Modal, Select, message } from "antd";
import JalanCepat from "../assets/jalancepat.mp3"
import JalanLambat from "../assets/jalanlambat.mp3"
import TerimaKasih from "../assets/terimakasih.mp3"
import TimerAudio from "../assets/timer.mp3"
import { sanityClient } from "../lib/sanity/getClient";
import moment from "moment";

const { Option } = Select;

function Home() {
  const navigate = useNavigate();
  const laraseftId = (localStorage.getItem('laraseftId'));
  const laraseftUser = (localStorage.getItem('laraseftUser'));
  console.log('cek id user: ', laraseftId)

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (!isAuthenticated()) {
      // If not authenticated, redirect to the sign-in page
      message.error("Kamu belum login. Silahkan login terlebir dahulu!");
      navigate("/");
    }
  }, [navigate]);

  const [isLoading, setIsLoading] = useState(true);
  const [serverDataTekananDarah, setServerDataTekananDarah] = useState({
    data: [],
    error: null,
    loading: true,
  });

  async function fetchSanityDataTK() {
    try {
      setIsLoading(true);
      const sanityData = await sanityClient.fetch(`*[_type == 'laraseft-tekanandarah']{
        _id,
        sistole,
        diastole,
        date,
        user,
      }`);

      setServerDataTekananDarah({
        data: sanityData,
        error: null,
        loading: false,
      });
    } catch (error) {
      setServerDataTekananDarah({
        data: [],
        error: 'Error getting data. Please try again later.',
        loading: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const [serverDataGulaDarah, setServerDataGulaDarah] = useState({
    data: [],
    error: null,
    loading: true,
  });

  async function fetchSanityDataGD() {
    try {
      setIsLoading(true);
      const sanityData = await sanityClient.fetch(`*[_type == 'laraseft-guladarah']{
        _id,
        guladarah,
        date,
        user,
      }`);

      setServerDataGulaDarah({
        data: sanityData,
        error: null,
        loading: false,
      });
    } catch (error) {
      setServerDataGulaDarah({
        data: [],
        error: 'Error getting data. Please try again later.',
        loading: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const [serverDataIMT, setServerDataIMT] = useState({
    data: [],
    error: null,
    loading: true,
  });

  async function fetchSanityDataIMT() {
    try {
      setIsLoading(true);
      const sanityData = await sanityClient.fetch(`*[_type == 'laraseft-imt']{
        _id,
        tb,
        bb,
        date,
        user,
      }`);

      setServerDataIMT({
        data: sanityData,
        error: null,
        loading: false,
      });
    } catch (error) {
      setServerDataIMT({
        data: [],
        error: 'Error getting data. Please try again later.',
        loading: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSanityDataTK();
    fetchSanityDataGD();
    fetchSanityDataIMT();
  }, []);

  let dataSourceTK = [];
    if (serverDataTekananDarah && serverDataTekananDarah.data && serverDataTekananDarah.data.length > 0) {
      dataSourceTK = serverDataTekananDarah.data
      .filter(item => item.user?._ref === laraseftId)
      .sort((a, b) => moment(b.date) - moment(a.date))
      .map((item) => ({
        key: item._id,
        sistole: item.sistole,
        diastole: item.diastole,
        date: moment(item.date).format('MM/DD/YYYY') || "-"
      }));
    }
    console.log('cek data tekanan darah: ', dataSourceTK)

    let dataSourceGD = [];
    if (serverDataGulaDarah && serverDataGulaDarah.data && serverDataGulaDarah.data.length > 0) {
      dataSourceGD = serverDataGulaDarah.data
      .filter(item => item.user?._ref === laraseftId)
      .sort((a, b) => moment(b.date) - moment(a.date))
      .map((item) => ({
        key: item._id,
        guladarah: item.guladarah,
        date: moment(item.date).format('MM/DD/YYYY') || "-"
      }));
    }
    console.log('cek data gula darah: ', dataSourceGD)

    let dataSourceIMT = [];
    if (serverDataIMT && serverDataIMT.data && serverDataIMT.data.length > 0) {
      dataSourceIMT = serverDataIMT.data
      .filter(item => item.user?._ref === laraseftId)
      .sort((a, b) => moment(b.date) - moment(a.date))
      .map((item) => ({
        key: item._id,
        tb: item.tb,
        bb: item.bb,
        date: moment(item.date).format('MM/DD/YYYY') || "-"
      }));
    }
    console.log('cek data tekanan darah: ', dataSourceIMT)

  const [time, setTime] = useState(0);
  const [instruction, setInstruction] = useState('');
  const [selectedMode, setSelectedMode] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [repeatAudio] = useState(new Audio(`${TimerAudio}`));
  const [showButton, setShowButton] = useState(false);

  const JalanCepatAudio = new Audio(`${JalanCepat}`);
  const JalanLambatAudio = new Audio(`${JalanLambat}`);
  const TerimaKasihAudio = new Audio(`${TerimaKasih}`);

  const startTimer = (duration) => {
    const id = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    setIntervalId(id);
    setIsRunning(true)
    setShowButton(false);

    setTimeout(() => {
      clearInterval(id);
      setTime(0);
      setInstruction('');
      setSelectedMode(null);
      repeatAudio.pause();
      setIsRunning(false);
      setShowButton(true);
    }, duration * 60000);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setTime(0);
    setInstruction('');
    setSelectedMode(null);
    repeatAudio.pause(); // Hentikan pemutaran audio yang diulang
    repeatAudio.currentTime = 0; // Set waktu audio ke awal
    setIsRunning(false);
    setShowButton(true);
    TerimaKasihAudio.play();
  };

  const handleModeChange = (value) => {
    setSelectedMode(value);
  };

  const handleStartStop = () => {
    if (!isRunning) {
      if (selectedMode) {
        startTimer(parseInt(selectedMode));
        repeatAudio.loop = true;
        repeatAudio.play();
      }
    } else {
      stopTimer();
    }
  };

  useEffect(() => {
    if (time !== 0 && time % 180 === 0) {
      setInstruction(prevInstruction => prevInstruction === 'Jalan Cepat' ? 'Jalan Lambat' : 'Jalan Cepat');
    }
  }, [time]);

  useEffect(() => {
    if (instruction === 'Jalan Cepat') {
      JalanCepatAudio.play();
    } else if (instruction === 'Jalan Lambat') {
      JalanLambatAudio.play();
    }
  }, [instruction]);

  const tentukanKategoriTekananDarah = (sistole) => {
    if (sistole < 90) {
        return "Rendah";
    } else if (sistole >= 90 && sistole <= 129) {
        return "Normal";
    } else {
        return "Tinggi";
    }
  };

  const sistole = dataSourceTK[0]?.sistole;
  const kategoriTekananDarah = tentukanKategoriTekananDarah(sistole);

  const tentukanKategoriTekananDarahDiastolik = (diastole) => {
    if (diastole >= 60 && diastole <= 84) {
        return "Normal";
    } else if (diastole < 60) {
        return "Rendah";
    } else {
        return "Tinggi";
    }
  };

  const diastole = dataSourceTK[0]?.diastole;
  const kategoriTekananDarahDiastolik = tentukanKategoriTekananDarahDiastolik(diastole);

  const tentukanKategoriGulaDarah = (gulaDarah) => {
    if (gulaDarah < 80) {
        return "Rendah";
    } else if (gulaDarah > 200) {
        return "Tinggi";
    } else {
        return "Normal";
    }
  };

  const gulaDarah = dataSourceGD[0]?.guladarah;
  const kategoriGulaDarah = tentukanKategoriGulaDarah(gulaDarah);
  console.log("cek gula darah: ", kategoriGulaDarah)

  const tinggiBadan = dataSourceIMT[0]?.tb;
  const tinggiBadanM = tinggiBadan / 100;
  const beratBadan = dataSourceIMT[0]?.bb;
  const iMT = beratBadan / (tinggiBadanM * tinggiBadanM);
  const iMTBulat = iMT.toFixed(2);
  console.log('IMT: ', iMTBulat);

  const tentukanKategoriIMT = (iMT) => {
    if (iMT < 17) {
        return "Sangat kurus";
    } else if (iMT >= 17 && iMT < 18.5) {
        return "Kurus";
    } else if (iMT >= 18.5 && iMT < 25) {
        return "Normal";
    } else if (iMT >= 25 && iMT < 27) {
        return "Overweight";
    } else {
        return "Obesitas";
    }
  };

  const kategoriIMT = tentukanKategoriIMT(iMTBulat);

  const createSanityLatihan = async (userData) => {
    try {
      const response = await fetch(`https://ln9ujpru.api.sanity.io/v2021-03-25/data/mutate/production`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer skAdQo8vEzaH81Ah4n2X8QDNsgIfdWkJlLmbo3CbT6Nt3nW7iTLx2roYCOm9Rlp1mQV2nEEGCqf4aGSMaJx67iK5PZPe7CgmI9Lx9diRdq0ssoRzl1LhiUFXHQmKu0utxgBa1ttoKwat3KIFt2B5vskrT82ekR5B8sbSzE51VjZHy3T7Q62P`,
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: 'latihan-laraseft', // Ganti dengan jenis dokumen pengguna di Sanity Anda
                user: {
                  _type: 'reference',
                  _ref: laraseftId // Assuming userData.userId contains the ID of the user document
                },
                latihan: userData.latihan,
                date: userData.date,
              },
            },
          ],
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user in Sanity');
      }
  
      const data = await response.json();
      console.log('User created:', data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const [formData, setFormData] = useState({
    user: {
      _type: 'reference',
      _ref: laraseftId
    },
    latihan: '',
    date: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Mengatur tanggal hari ini
    const formattedDate = moment().format();

    // Menyiapkan data yang akan dikirim
    const updatedFormData = {
      ...formData,
      latihan: true,
      date: formattedDate,
    };

    try {
      // Kirim POST request ke backend Sanity untuk membuat screening baru
      await createSanityLatihan(updatedFormData);

      // Tampilkan pesan sukses
      message.success("Anda telah latihan hari ini.");
      setShowButton(false)

    } catch (error) {
      // Tangani kesalahan
      console.error('Error registering user:', error);
    }
  };

  // const [visible, setVisible] = useState(false);
  // const [modalContentId, setModalContentId] = useState(null);

  // const handleOpenModal = (id) => {
  //   setModalContentId(id);
  //   setVisible(true);
  // };

  // const handleCloseModal = () => {
  //   setVisible(false);
  //   setModalContentId(null); // Reset modal content id when modal is closed
  // };

  // useEffect(() => {
  //   if (Notification.permission !== 'granted') {
  //     Notification.requestPermission();
  //   }
  // }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Periksa izin notifikasi saat komponen dimuat
    if (Notification.permission !== 'granted') {
      setVisible(true); // Tampilkan modal jika izin belum diberikan
    }
  }, []);

  const handleOk = () => {
    // Meminta izin notifikasi saat pengguna menyetujui modal
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    setVisible(false);
  };

  const handleCancel = () => {
    // Menutup modal tanpa meminta izin notifikasi
    setVisible(false);
  };
  
  return (
    <>
      <section className="my-0 mx-auto min-h-full max-w-screen-sm bg-white">
        <div className="bg-sky-950 text-white py-6">
          <h3 className="text-2xl px-4 font-semibold">Selamat Datang</h3>
          <hp className="text-lg px-4">{laraseftUser}</hp>
        </div>

        {/* <h2 className="px-4 text-xl font-semibold mt-10">Informasi Kesehatan</h2> */}
        <div className="grid grid-cols-2 p-4 gap-10 mb-20 mt-20">
          <div className="flex flex-col justify-center text-center items-center">
            <Link to="/skrining" className="flex flex-col justify-center text-center items-center">
              <img className="rounded-2xl w-28 h-28 object-cover" src="https://media.istockphoto.com/id/1359055641/id/video/rekan-dokter-di-rumah-sakit-mendiskusikan-kasus-saat-berjalan-di-koridor-rumah-sakit.jpg?s=640x640&k=20&c=Nj6IAu2Yu6R4OPfEpkYFvuprz0QiiYWM3a-r225uOA0=" />
              <div className="text-center">Skrining</div>
            </Link>
          </div>
          <div className="flex flex-col justify-center text-center items-center">
            <Link to="/edukasi-kesehatan" className="flex flex-col justify-center text-center items-center">
              <img className="rounded-2xl w-28 h-28 object-cover" src="https://content.gallup.com/origin/gallupinc/GallupSpaces/Production/Cms/WORKPLACEV9CMS/atqvq8thw0kw3kj1kc_tfa.jpg" />
              <div className="text-center">Edukasi Kesehatan</div>
            </Link>
          </div>
          <div className="flex flex-col justify-center text-center items-center">
            <Link to="/latihan-pernapasan" className="flex flex-col justify-center text-center items-center">
              <img className="rounded-2xl w-28 h-28 object-cover" src="https://cdn0-production-images-kly.akamaized.net/MdGT7J3Lt9lxUzuDVqusgpMLifc=/0x192:1880x1251/800x450/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3339771/original/085161800_1609745425-pexels-photo-4498220.jpeg" />
              <div className="text-center">Latihan Pernapasan</div>
            </Link>
          </div>
          <div className="flex flex-col justify-center text-center items-center">
            <Link to="/seft" className="flex flex-col justify-center text-center items-center">
              <img className="rounded-2xl w-28 h-28 object-cover" src="https://awsimages.detik.net.id/community/media/visual/2016/05/20/a622d1e0-e318-4abe-bc7d-c52c97bba4f4_169.jpg?w=600&q=90" />
              <div className="text-center">Seft</div>
            </Link>
          </div>
          <div className="flex flex-col justify-center text-center items-center">
            <Link to="/latihan" className="flex flex-col justify-center text-center items-center">
              <img className="rounded-2xl w-28 h-28 object-cover" src="https://ae01.alicdn.com/kf/S5064058da054404fb8017948ac2d00a01/Pengukur-waktu-dapur-Stopwatch-belajar-tampilan-LED-Digital-besar-Timer-kue-untuk-memasak-alat-Alarm-latihan.jpg" />
              <div className="text-center">Alarm</div>
            </Link>
          </div>
          <div className="flex flex-col justify-center text-center items-center">
            <Link to="/evaluasi" className="flex flex-col justify-center text-center items-center">
              <img className="rounded-2xl w-28 h-28 object-cover" src="https://www.fastmed.com/wp-content/uploads/2021/07/doctor_with_clipboard-857x571-1.jpg" />
              <div className="text-center">Evaluasi</div>
            </Link>
          </div>
          <div className="flex flex-col justify-center text-center items-center">
            <a href="https://wa.me/6285266393556?text=Hi%2C%20Saya%20ingin%20konsultasi" className="flex flex-col justify-center text-center items-center">
              <img className="rounded-2xl w-28 h-28 object-cover" src="https://awsimages.detik.net.id/community/media/visual/2020/05/05/c7f69650-d103-46d4-992c-d5e876968a6e.jpeg?w=600&q=90" />
              <div className="text-center">Konsultasi</div>
            </a>
          </div>
        </div>
        </section>
        <Modal
          title="Allow Notifications"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button type="primary" key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="ok" type="primary" onClick={handleOk}>
              Allow
            </Button>,
          ]}
        >
          <p>Do you want to allow notifications?</p>
        </Modal>
    </>
  )
}

export default Home