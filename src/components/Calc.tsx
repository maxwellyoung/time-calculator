"use client";
import React, { useState } from "react";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";

export default function Calc() {
  const [time, setTime] = useState({ formatted: "00:00:00", isAM: true });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [inputTime, setInputTime] = useState("00:00");

  const calculateTime = () => {
    const inputTimeArray = inputTime.split(":");

    if (inputTimeArray.length !== 2) {
      alert("Invalid input time format. Please use HH:MM.");
      return;
    }

    let inputHours = parseInt(inputTimeArray[0]);
    const inputMinutes = parseInt(inputTimeArray[1]);

    if (
      isNaN(inputHours) ||
      isNaN(inputMinutes) ||
      isNaN(hours) ||
      isNaN(minutes) ||
      isNaN(seconds)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    const totalSeconds =
      inputHours * 3600 +
      inputMinutes * 60 +
      hours * 3600 +
      minutes * 60 +
      seconds;

    let isAM = true;
    if (inputHours >= 12) {
      isAM = false;
    }

    if (inputHours > 12) {
      inputHours -= 12;
    }

    let newHours = Math.floor(totalSeconds / 3600);
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSeconds = totalSeconds % 60;

    if (newHours >= 12) {
      isAM = false;
    }
    if (newHours > 12) {
      newHours -= 12;
    }

    const result = `${String(newHours).padStart(2, "0")}:${String(
      newMinutes,
    ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
    setTime({ formatted: result, isAM });
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-4 bg-white p-4 shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-medium text-black dark:text-white">
          Time Calculator
        </h1>
        <Input
          className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          id="time1"
          type="time"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <h2 className="text-sm font-medium text-black dark:text-white">
          Add Duration:
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label
              htmlFor="hours"
              className="block text-sm text-black dark:text-white"
            >
              Hours
            </label>
            <Input
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              id="hours"
              min="0"
              type="number"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="minutes"
              className="block text-sm text-black dark:text-white"
            >
              Minutes
            </label>
            <Input
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              id="minutes"
              max="59"
              min="0"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="seconds"
              className="block text-sm text-black dark:text-white"
            >
              Seconds
            </label>
            <Input
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              id="seconds"
              max="59"
              min="0"
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value))}
            />
          </div>
        </div>
        <Button
          className="w-full rounded-md border border-transparent bg-indigo-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-green-400 dark:hover:bg-green-500"
          type="button"
          onClick={calculateTime}
        >
          Calculate
        </Button>
        <div className="text-lg font-medium text-black dark:text-white">
          Result:
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {time.formatted} {time.isAM ? "AM" : "PM"}
        </p>
      </div>
    </section>
  );
}
