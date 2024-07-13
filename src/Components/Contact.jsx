import { useState, useRef } from "react";

import emailjs from "@emailjs/browser";
import EarthRender from "./EarthRender";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        // "service_guu9ib5",
        // "template_zfop21k",
        "service_7csj1em",
        "template_yrlss19",
        {
          from_name: form.name,
          to_name: "Anshul",
          from_email: form.email,
          to_email: "anshulraturi007@gmail.com",
          message: form.message,
        },
        "1TVurSpp00nkAoHhR"
        // "5BpJcb_erFST9t_56"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong.");
        }
      );
  };

  return (
    <div className='bg-gray-950 md:h-screen h-full w-full flex flex-col'>
      <h1 className='text-white text-center text-5xl font-extrabold'>
        Consult Our Doctors
      </h1>
      <div className='md:flex-row flex-col flex w-full h-screen'>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex flex-col justify-center items-center md:gap-8 w-full'
        >
          <label className='flex flex-col w-1/2'>
            <span className='text-white font-medium'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              autoComplete='off'
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col w-1/2'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              autoComplete='off'
              placeholder="What's your email?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col w-1/2'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows='5'
              name='message'
              value={form.message}
              onChange={handleChange}
              autoComplete='off'
              placeholder='What do you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <button
            type='submit'
            className='bg-tertiary py-3 px-10 outline-none w-fit text-white font-bold bg-slate-700 rounded-xl'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        <div className='w-full h-full '>
          <EarthRender />
        </div>
      </div>
    </div>
  );
};

export default Contact;
