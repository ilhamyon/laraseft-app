import { Button, Input, Select, message } from "antd"
import { Link } from "react-router-dom"
import { useState } from "react";

const createSanityUser = async (laraseftData) => {
  // eslint-disable-next-line no-unused-vars
  const { Option } = Select;
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
              _type: 'user-laraseft', // Ganti dengan jenis dokumen pengguna di Sanity Anda
              name: laraseftData.name,
              email: laraseftData.email,
              password: laraseftData.password,
              type: laraseftData.type,
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

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'Pilih type pengguna',
    umur: ''
  });

  console.log(formData);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // Send POST request to your Sanity backend to create a new user
      await createSanityUser(formData);

      message.success("Register berhasil.")

      // Reset the form after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        type: 'Pilih type pengguna',
      });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  return (
    <>
      <section className="bg-gray-200">
        <div className="flex justify-center items-center h-screen">
          <div className="lg:w-1/2 lg:py-0 py-10 flex items-center">
            <form className="w-full lg:px-28 px-4 items-center" onSubmit={handleSubmit}>
              <h2 className="font-bold text-sky-950 text-2xl lg:text-4xl mb-10 text-gray-900 uppercase">Register</h2>
              <Select
                defaultValue="pasien"
                name="type"
                size="large"
                className="mb-4 w-full"
                placeholder="Pilih type user"
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
              >
                <Option value="pasien">Pasien</Option>
                <Option value="perawat">Perawat</Option>
              </Select>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                size="large"
                className="mb-4 border"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                size="large"
                className="mb-4 border"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                size="large"
                className="mb-8 border"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Button
                className="text-white bg-gray-800 w-full"
                htmlType="submit"
                size="large"
              >
                Register
              </Button>
              <p className="flex justify-center text-sm font-light mt-8 text-gray-500">
                <Link to="/" className="text-gray-800"> or&nbsp;Login</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register