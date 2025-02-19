'use client'; // We need client-side interactivity for the form
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Example form submission handler (no real backend here)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong.');
      }

      setStatusMessage('Email submitted successfully!');
      setEmail('');
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-white">
      <div className="flex flex-col items-center justify-center h-full mt-48">
        

        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-900">
          Give Genes, Get Paid, Repeat
        </h1>

        <p className="text-md md:text-lg text-gray-700 mb-8">
          Give your genes and information once and get paid when they are utilized
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-72"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
          >
            Join Waitlist
          </button>
        </form>

        <p className="text-lg text-red-600 font-semibold mb-4">
          Only 9 spots left on the waitlist! 
        </p>

        {/* Status / Error messages */}
        {statusMessage && <p className="text-green-600">{statusMessage}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>

      {/* Spacer to ensure scrolling */}
      <div className="h-96"></div>

     {/* Testimonials Section */}
<div className="mt-12">
  <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
  <div className="grid gap-8 md:grid-cols-3">
    <div className="p-4 border rounded shadow">
      <img
        src="/pexelmitchell.jpg"
        alt="Customer testimonial"
        className="mx-auto mb-4 w-16 h-16 object-cover rounded-full"
      />
      <p className="text-lg italic">
        "I put in my 23andMe into the system and got paid shortly after with DoorDash credit. After joining the waitlist, I was sent information on their use of blockchain with enhanced encryption and learned that no one can see my data unless I get paid. Even today, I still randomly get paid for the data I donated once!"
      </p>
      <p className="mt-2 font-semibold">- Jeff S.</p>
    </div>
    <div className="p-4 border rounded shadow">
      <img
        src="/pexelskarolina.jpg"
        alt="Customer testimonial"
        className="mx-auto mb-4 w-16 h-16 object-cover rounded-full"
      />
      <p className="text-lg italic">
        "I put in my Ancestry.com information and added in some of my basic medical history and got paid shortly after with Walmart credit. I also learned a few new things about my health and it recommended that I might be one of those individuals who may only need 6 hours of sleep! "
      </p>
      <p className="mt-2 font-semibold">- Jake W.</p>
    </div>
    <div className="p-4 border rounded shadow">
      <img
        src="/pexelsjeff.jpg"
        alt="Customer testimonial"
        className="mx-auto mb-4 w-16 h-16 object-cover rounded-full"
      />
      <p className="text-lg italic">
        "It took a month to get off of the waitlist but I am glad I signed up. Once I got into the platform, it was easy to use and I got paid quite quickly! I wasn't really familiar with blockchain or crypto but this application transcended that and really just focused on making the platform understandable and easy to use!"
      </p>
      <p className="mt-2 font-semibold">- Mitchell M.</p>
    </div>
  </div>
</div>
    </section>
  );
}
