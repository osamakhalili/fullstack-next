"use client";

import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { drivingSessionType } from "./types/drivingSession";

export default function CreateDrivingSession() {
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [carType, setCarType] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [sessionCount, setSessionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  let toastPostID: string;

  const { mutate } = useMutation(
    async (newDrivingSession: drivingSessionType) => {
      const { data } = await axios.post(
        "/api/posts/addPost",
        newDrivingSession
      );
      return data;
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    mutate({
      teacher,
      student: "",
      carType: "",
      date: new Date(date),
      startTime: new Date(date + " " + startTime),
      endTime: new Date(date + " " + endTime),
      description: "",
      sessionCount: 0,
    });
  };

  return (
    <form className="bg-white p-8 rounded-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="teacher">
          Teacher
        </label>
        <input
          className="w-full p-4 text-lg rounded-md bg-gray-200"
          id="teacher"
          name="teacher"
          value={teacher}
          onChange={(event) => setTeacher(event.target.value)}
          placeholder="Add a teacher here"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="student">
          Student
        </label>
        <input
          className="w-full p-4 text-lg rounded-md bg-gray-200"
          id="student"
          name="student"
          value={student}
          onChange={(event) => setStudent(event.target.value)}
          placeholder="Add a student here"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="carType">
          Car Type
        </label>
        <div className="flex">
          <label className="radio">
            <input
              type="radio"
              name="carType"
              value="manual"
              checked={carType === "manual"}
              onChange={(event) => setCarType(event.target.value)}
            />
            <span className="text-black ml-4">Manual</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="carType"
              value="automated"
              checked={carType === "automated"}
              onChange={(event) => setCarType(event.target.value)}
            />
            <span className="text-black ml-4">Automated</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
          Date
        </label>
        <input
          className="w-full p-4 text-lg rounded-md bg-gray-200"
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="startTime"
        >
          Start Time
        </label>
        <input
          className="w-full p-4 text-lg rounded-md bg-gray-200"
          id="startTime"
          name="startTime"
          type="time"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="endTime">
          End Time
        </label>
        <input
          className="w-full p-4 text-lg rounded-md bg-gray-200"
          id="endTime"
          name="endTime"
          type="time"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="w-full p-4 text-lg rounded-md bg-gray-200"
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a description here"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="sessionCount"
        >
          Session Count
        </label>
        <div className="flex">
          <button onClick={() => setSessionCount(sessionCount - 1)}>-</button>
          <input
            className="w-full p-4 text-lg rounded-md bg-gray-200"
            id="sessionCount"
            name="sessionCount"
            type="number"
            min="1"
            value={sessionCount}
            onChange={(event) => setSessionCount(event.target.value)}
          />
          <button onClick={() => setSessionCount(sessionCount + 1)}>+</button>
        </div>
      </div>

      <button
        disabled={isDisabled}
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
