import { Button, Input, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanity/getClient";
import { v4 as uuidv4 } from "uuid";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already signed in
    const token = localStorage.getItem("laraseft_token");
    if (token) {
      // If signed in, redirect to "/home"
      navigate("/home");
    }
  }, [navigate]);

  const [serverData, setServerData] = useState({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    async function fetchSanityData() {
      try {
        const sanityData = await sanityClient.fetch(`*[_type == 'user-laraseft']{
          _id,
          name,
          email,
          type,
          password,
          ttl,
          gender,
          alamat,
          faskes,
          telepon,
        }`);

        setServerData({
          data: sanityData,
          error: null,
          loading: false,
        });
      } catch (error) {
        setServerData({
          data: [],
          error: 'Error getting data. Please try again later.',
          loading: false,
        });
      }
    }

    fetchSanityData();
  }, []);
  console.log('cek data user: ', serverData)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    // Cek apakah ada data yang cocok dengan hasil input login
    const user = serverData.data.find(
      (laraseftData) => laraseftData.email === username && laraseftData.password === password
    );


    if (user) {
      const filteredData = serverData?.data.filter(item => item._id === user._id);
      
      // Login berhasil
      console.log("Login berhasil:", user.name);
      message.success('Login Berhasil');
      navigate("/home");
      // setError("");

      // Generate token
      const token = uuidv4(); // Generate token using uuid library

      // Simpan token ke dalam local storage
      localStorage.setItem("laraseft_token", token);
      localStorage.setItem("laraseftUser", user.name);
      localStorage.setItem("laraseftId", user._id);
      localStorage.setItem('laraseftData', JSON.stringify(filteredData));

      // Tambahkan logika redirect atau set state untuk login di sini
    } else {
      // Tampilkan pesan error
      // setError("Username atau password salah");
      message.error("Username atau password salah");
    }
  };
  return (
    <>
      <section className="bg-gray-200">
        <div className="flex flex-col justify-center items-center h-screen">
          <h2 className="text-4xl font-bold uppercase">Perawatan pasien TBC dengan La Per SEFTI</h2>
          <p className="py-4">Perawatan TBC dengan Latihan Pernapasan  dan Spritual Emosional Fredom</p>
          <div className="py-10 flex items-center">
            <form className="w-full lg:px-28 px-4 items-center" onSubmit={handleLogin} style={{ margin: '0 auto' }}>
              {/* <h2 className="font-bold text-sky-950 text-3xl lg:text-4xl mb-10 text-gray-900 uppercase">Login</h2> */}
              <Input
                type="text"
                placeholder="Username"
                size="large"
                className="mb-4 border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                size="large"
                className="mb-8 border"
              />
              {/* {error && <p className="text-red-500">{error}</p>} */}
              <Button
                className="text-white bg-gray-800 w-full"
                htmlType="submit"
                size="large"
              >
                Login
              </Button>
              <p className="flex justify-center text-sm font-light mt-8 text-gray-500">
                <Link to="/register" className="text-gray-900"> or&nbsp;Register</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login