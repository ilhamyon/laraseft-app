import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { Button, Table, message } from "antd";
import moment from "moment";
import { sanityClient } from "../lib/sanity/getClient";

const columns = [
  {
    title: 'Aktivitas',
    dataIndex: 'latihan',
    key: 'latihan',
  },
  {
    title: 'Waktu',
    dataIndex: 'date',
    key: 'date',
  },
];

function Latihan() {
    const navigate = useNavigate();
    // const laraseftData = JSON.parse(localStorage.getItem('laraseftData'));
    const laraseftId = (localStorage.getItem('laraseftId'));
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
    const [serverDataLatihan, setServerDataLatihan] = useState({
      data: [],
      error: null,
      loading: true,
    });

    async function fetchSanityData() {
        try {
            setIsLoading(true);
            const sanityData = await sanityClient.fetch(`*[_type == 'latihan-laraseft']{
            _id,
            latihan,
            date,
            user,
            }`);

            setServerDataLatihan({
            data: sanityData,
            error: null,
            loading: false,
            });
        } catch (error) {
            setServerDataLatihan({
            data: [],
            error: 'Error getting data. Please try again later.',
            loading: false,
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSanityData();
      }, []);

    let dataSource = [];
    if (serverDataLatihan && serverDataLatihan.data && serverDataLatihan.data.length > 0) {
      dataSource = serverDataLatihan.data
      .filter(item => item.user?._ref === laraseftId)
      .map((item) => ({
        key: item._id,
        latihan: item.latihan ? 'Sudah latihan' : '-',
        date: moment(item.date).format('MM/DD/YYYY, h:mm a') || "-"
      }));
    }
    console.log('cek data latihan: ', dataSource);

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
            fetchSanityData();

        } catch (error) {
            // Tangani kesalahan
            console.error('Error registering user:', error);
        }
    };
    return (
      <div>
          <div className="my-0 mx-auto min-h-full max-w-screen-sm bg-white">
              <div className="border-b-2 border-gray-400">
                  <h2 className="text-xl font-bold px-4 py-4">Latihan</h2>
              </div>

              <div className="px-4">
                <Button onClick={handleSubmit} className="mt-6 bg-sky-950 text-white w-full" size="large">
                    Klik! untuk absen latihan
                </Button>
              </div>

              <div className="px-4 py-10 pb-[300px]">
                <Table className='font-normal' columns={columns} dataSource={dataSource} loading={isLoading}/>
              </div>
          </div>
      </div>
    )
  }
  
  export default Latihan