import { Button, Radio, message } from "antd"
import { useEffect, useState } from "react";

function Skrining() {
    const [scores, setScores] = useState({
        cough: "",
        phlegm: "",
        chestPressure: "",
        breathlessness: "",
        limitedActivity: "",
        anxiety: "",
        sleepDifficulty: "",
        fatigue: ""
    });
    const [result, setResult] = useState('');
    const newResult = localStorage.getItem('laraseft_skrining');

    const laraseftId = localStorage.getItem('laraseftId');

    useEffect(() => {
        try {
            const historyString = localStorage.getItem("skriningHistory");
            if (historyString) {
                const historyObj = JSON.parse(historyString);
                console.log("Parsed history object:", historyObj);
    
                // Mengecek apakah ID objek cocok dengan laraseftId
                if (historyObj.id === laraseftId) {
                    console.log("Found matching history entry:", historyObj);
                    // Jika cocok, atur state scores ke nilai skor dari objek tersebut
                    setScores(historyObj.scores);
                    setResult(historyObj.result)
                    console.log('cek result:', historyObj.result)
                } else {
                    console.log("No matching history entry found for laraseftId:", laraseftId);
                }
            } else {
                console.log("No skriningHistory found in localStorage.");
            }
        } catch (error) {
            console.error("Error parsing or processing skriningHistory from localStorage:", error);
        }
    }, []);    

    const handleChange = (question, value) => {
        setScores((prevState) => ({
        ...prevState,
        [question]: parseInt(value.target.value)
        }));
    };

    const handleSubmit = async () => {
        const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
        let result;
        if (totalScore <= 10) {
        result = "Anda Tidak Sesak";
        } else if (totalScore <= 40) {
        result = "Anda Sesak";
        } else {
        result =
            "Hasil tidak dapat ditentukan, silakan periksa kembali jawaban Anda.";
        }
        console.log("Hasil skrining:", result);
        message.success("Berhasil submit skrining")
        setResult(result);
        localStorage.setItem("laraseft_skrining", result);
        updateSanityUser(result);
        await updateSanityUser(formUpdate);
        
        // Menghasilkan ID berdasarkan timestamp
        const id = laraseftId;

        // Membuat objek hasil yang akan disimpan
        const resultToSave = {
            id,
            scores,
            result: result,
            timestamp: new Date().toISOString() // Menyimpan waktu submit
        };

        // Menyimpan ke localStorage
        localStorage.setItem('skriningHistory', JSON.stringify(resultToSave));
    };

    const updateSanityUser = async (result) => {
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
                    patch: {
                    id: laraseftId, // The _id of the document to update
                    set: {
                        skrining: result,
                    },
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

    const [formUpdate, setFormUpdate] = useState({
        skrining: result,
    });
    return (
        <div>
            <div className="my-0 mx-auto min-h-full max-w-screen-sm bg-white">
                <div className="border-b-2 border-gray-400">
                    <h2 className="text-xl font-bold px-4 py-4">Skrining</h2>
                </div>

                <div className="px-4 py-6 mb-20">
                    <h3 className="text-center text-lg py-10">Pilih salah satu pada pertanyaan-pertanyaan dibawah ini sesuai dengan kondisi bapak/ibu saat ini</h3>

                    {/* Question 1 */}
                    <div className="grid grid-cols-3 py-4">
                        <div className="col-span-2">
                            <p>Saya selalu batuk</p>
                        </div>
                        <div>
                            <Radio.Group
                                value={scores.cough}
                                onChange={(e) => handleChange("cough", e)}
                                className="flex"
                            >
                                {[0, 1, 2, 3, 4, 5].map((val) => (
                                <Radio
                                    key={val}
                                    className="flex flex-col text-xs"
                                    value={val}
                                >
                                    {val}
                                </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 py-4">
                        <div className="col-span-2">
                            <p>Dada saya penuh dengan dahak</p>
                        </div>
                        <div>
                            <Radio.Group
                                value={scores.phlegm}
                                onChange={(e) => handleChange("phlegm", e)}
                                className="flex"
                            >
                                {[0, 1, 2, 3, 4, 5].map((val) => (
                                <Radio
                                    key={val}
                                    className="flex flex-col text-xs"
                                    value={val}
                                >
                                    {val}
                                </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 py-4">
                        <div className="col-span-2">
                            <p>Dada saya terasa berat (tertekan) sekali</p>
                        </div>
                        <div>
                            <Radio.Group
                                value={scores.chestPressure}
                                onChange={(e) => handleChange("chestPressure", e)}
                                className="flex"
                            >
                                {[0, 1, 2, 3, 4, 5].map((val) => (
                                <Radio
                                    key={val}
                                    className="flex flex-col text-xs"
                                    value={val}
                                >
                                    {val}
                                </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 py-4">
                        <div className="col-span-2">
                            <p>Ketika saya jalan mendaki/ naik tangga, saya sangat sesak </p>
                        </div>
                        <div>
                            <Radio.Group
                                value={scores.breathlessness}
                                onChange={(e) => handleChange("breathlessness", e)}
                                className="flex"
                            >
                                {[0, 1, 2, 3, 4, 5].map((val) => (
                                <Radio
                                    key={val}
                                    className="flex flex-col text-xs"
                                    value={val}
                                >
                                    {val}
                                </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 py-4">
                        <div className="col-span-2">
                            <p>Aktivitas sehari-hari saya dirumah sangat terbatas</p>
                        </div>
                        <div>
                            <Radio.Group
                                value={scores.limitedActivity}
                                onChange={(e) => handleChange("limitedActivity", e)}
                                className="flex"
                            >
                                {[0, 1, 2, 3, 4, 5].map((val) => (
                                <Radio
                                    key={val}
                                    className="flex flex-col text-xs"
                                    value={val}
                                >
                                    {val}
                                </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 py-4">
                        <div className="col-span-2">
                            <p>Saya sangat khawatir  keluar rumah meskipun saya menderita penyakit paru</p>
                        </div>
                        <div>
                            <Radio.Group
                                value={scores.anxiety}
                                onChange={(e) => handleChange("anxiety", e)}
                                className="flex"
                            >
                                {[0, 1, 2, 3, 4, 5].map((val) => (
                                <Radio
                                    key={val}
                                    className="flex flex-col text-xs"
                                    value={val}
                                >
                                    {val}
                                </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 py-4">
                        <div className="col-span-2">
                            <p>Saya tidak dapat tidur dengan nyenyak karena kondisi paru saya</p>
                        </div>
                        <div>
                            <Radio.Group
                                value={scores.sleepDifficulty}
                                onChange={(e) => handleChange("sleepDifficulty", e)}
                                className="flex"
                            >
                                {[0, 1, 2, 3, 4, 5].map((val) => (
                                <Radio
                                    key={val}
                                    className="flex flex-col text-xs"
                                    value={val}
                                >
                                    {val}
                                </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 py-4">
                        <div className="col-span-2">
                            <p>Saya tidak punya tenaga sama sekali</p>
                        </div>
                        <div>
                            <Radio.Group
                                value={scores.fatigue}
                                onChange={(e) => handleChange("fatigue", e)}
                                className="flex"
                            >
                                {[0, 1, 2, 3, 4, 5].map((val) => (
                                <Radio
                                    key={val}
                                    className="flex flex-col text-xs"
                                    value={val}
                                >
                                    {val}
                                </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>

                    <div>
                        <Button disabled={!!result} onClick={handleSubmit} size="large" className="w-full bg-sky-950 text-white">Submit</Button>
                    </div>

                    <div className="py-10">
                        <h3 className="text-lg font-bold">Hasil skrining: {result}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skrining