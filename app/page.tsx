"use client";

import { useState } from "react";

import { BsCopy } from "react-icons/bs";
import {
  TbSquareRoundedCheck,
  TbSquareRoundedCheckFilled,
} from "react-icons/tb";
import { GrPowerReset } from "react-icons/gr";

export default function Home() {
  const [password, setPassword] = useState("Im a password");
  const [max, setMax] = useState(8);
  const [value, setValue] = useState({
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
  });

  const handleSlider = (e: any) => {
    const int = parseInt(e.target.value);
    setMax(int);
  };

  const handleLower = () => setValue({ ...value, lowercase: !value.lowercase });
  const handleUpper = () => setValue({ ...value, uppercase: !value.uppercase });
  const handleNumbers = () => setValue({ ...value, numbers: !value.numbers });
  const handleSymbols = () => setValue({ ...value, symbols: !value.symbols });

  const handleCopy = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => alert("Success copied to clipboard"))
      .catch((err) => alert(err));
  };

  const handleReset = () => {
    setValue({
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
    });
    setMax(8);
    setPassword("Im a password");
  };

  const handleGenerate = () => {
    let generatedPassword = "";

    if (value.lowercase) {
      generatedPassword += "abcdefghijklmnopqrstuvwxyz";
    }
    if (value.uppercase) {
      generatedPassword += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (value.numbers) {
      generatedPassword += "0123456789";
    }
    if (value.symbols) {
      generatedPassword += "!@#$%^&*()_+<>?/.,";
    }

    if (max < 1) return alert("Password length must be greater than 0");
    if (max > 20) return alert("Password length must be less than 20");

    let password = "";
    for (let i = 0; i < max; i++) {
      password += generatedPassword.charAt(
        Math.floor(Math.random() * generatedPassword.length)
      );
    }

    setPassword(password);
  };

  return (
    <div className=" w-full h-[100vh] bg-custom-main flex justify-center items-center flex-col gap-4">
      <div className="max-w-lg bg-cyan-700 w-full p-4 rounded-lg">
        <div className="flex justify-between gap-2">
          <div className=" bg-cyan-500 text-white w-full px-4 py-3 rounded-lg">
            <p>{password}</p>
          </div>
          <div className="flex gap-2">
            <div
              onClick={handleReset}
              className=" bg-cyan-600 text-white p-4 rounded-full flex justify-center items-center cursor-pointer hover:bg-cyan-600/80"
            >
              <GrPowerReset />
            </div>
            <div
              onClick={handleCopy}
              className=" bg-cyan-600 text-white p-4 rounded-full flex justify-center items-center cursor-pointer hover:bg-cyan-600/80"
            >
              <BsCopy />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-lg bg-cyan-700 w-full p-4 rounded-lg flex flex-col justify-center gap-4">
        <div className="flex justify-between gap-4">
          <div className=" bg-cyan-600 text-white px-5 py-3 rounded-lg flex justify-center items-center">
            {max}
          </div>
          <div className=" bg-cyan-500 text-white w-full px-4 py-3 rounded-lg flex items-center">
            <input
              value={max}
              type="range"
              onChange={(e) => handleSlider(e)}
              className="w-full"
            />
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-4">
          <div
            onClick={handleLower}
            className="flex px-4 py-3 w-full bg-cyan-900 rounded-lg items-center gap-2 text-white cursor-pointer"
          >
            {value.lowercase ? (
              <TbSquareRoundedCheckFilled size={25} />
            ) : (
              <TbSquareRoundedCheck size={25} />
            )}
            <p>a-z</p>
          </div>
          <div
            onClick={handleUpper}
            className="flex px-4 py-3 w-full bg-cyan-900 rounded-lg items-center gap-2 text-white cursor-pointer"
          >
            {value.uppercase ? (
              <TbSquareRoundedCheckFilled size={25} />
            ) : (
              <TbSquareRoundedCheck size={25} />
            )}
            <p>A-Z</p>
          </div>
          <div
            onClick={handleNumbers}
            className="flex px-4 py-3 w-full bg-cyan-900 rounded-lg items-center gap-2 text-white cursor-pointer"
          >
            {value.numbers ? (
              <TbSquareRoundedCheckFilled size={25} />
            ) : (
              <TbSquareRoundedCheck size={25} />
            )}
            <p>0-9</p>
          </div>
          <div
            onClick={handleSymbols}
            className="flex px-4 py-3 w-full bg-cyan-900 rounded-lg items-center gap-2 text-white cursor-pointer"
          >
            {value.symbols ? (
              <TbSquareRoundedCheckFilled size={25} />
            ) : (
              <TbSquareRoundedCheck size={25} />
            )}
            <p>!@#$%</p>
          </div>
        </div>
        <p className="text-white text-xs italic">
          * Silakan masukan format yang anda inginkan
        </p>
        <div
          onClick={handleGenerate}
          className="bg-cyan-600 px-4 py-3 rounded-lg cursor-pointer hover:bg-cyan-600/80"
        >
          <p className="text-white text-center">Generate</p>
        </div>
      </div>
    </div>
  );
}
