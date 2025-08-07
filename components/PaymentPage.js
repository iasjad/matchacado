'use client';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useSession } from 'next-auth/react';
import {
  fetchuser,
  fetchpayments,
  createPayment,
} from '@/app/actions/useractions';
import { useSearchParams } from 'next/navigation';
import { Bounce, Slide, toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({
    name: '',
    message: '',
    amount: '',
  });
  const { data: session } = useSession({});
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get('Paymentdone') == 'true') {
      toast('Payment Done', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
      router.push(`/${username}`);
    }
  }, []);

  const getData = async (prams) => {
    try {
      let u = await fetchuser(username);
      setCurrentUser(u || {});
      let dbpayments = await fetchpayments(username);
      setPayments(dbpayments || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setCurrentUser({});
      setPayments([]);
    }
  };

  const pay = async (amount) => {
    let a = await createPayment(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: `${currentUser.razorpayid}`,
      amount: amount,
      currency: 'INR',
      name: 'MatchaCado',
      description: 'Test Transaction',
      image: './logo.png',
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_HOST_URL}/api/razorpay`,
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '+919876543210',
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: 'Most Used Methods',
              instruments: [
                {
                  method: 'wallet',
                  wallets: ['freecharge'],
                },
                {
                  method: 'upi',
                },
              ],
            },
          },
          sequence: ['block.banks'],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="pb-10">
        <div className="cover w-full relative">
          <img
            className="w-full h-[350px] object-cover"
            src={
              currentUser.coverPicture ||
              'https://media.licdn.com/dms/image/v2/D5616AQGRk3Qvlr-Dog/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1736967106820?e=1756944000&v=beta&t=JIhf2G1hJxFDnsiBlJEik1SIxPpgGvZ9G4Sq90uWv7k'
            }
            alt="cover"
          />
          <div className="absolute -bottom-14 right-[50%] translate-x-[50%]">
            <img
              className="w-[100px] h-[100px] rounded-full border-2 border-white"
              src={currentUser.profilePicture || './unknownAvatar.png'}
              alt=""
            />
          </div>
        </div>
        <div className="info flex justify-center items-center gap-2 mt-14 flex-col">
          <div className="text-2xl font-bold">@{username}</div>
          <div className="text-sm text-slate-400">
            Let's help {username} to achieve their goals
          </div>
          <div className="text-slate-400">
            {payments.length} members || ₹
            {payments.reduce((acc, p) => acc + p.amount, 0)} donated
          </div>
          <div className="payment flex gap-3 w-[80%] mx-auto mt-10 flex-col md:flex-row">
            <div className="supporters w-full md:w-1/2 bg-[#BF8C60] rounded-lg p-4">
              <h2 className="text-2xl font-bold my-2">Supporters</h2>
              <ul className="flex flex-col gap-2 mt-4 mx-5 ">
                {payments.length === 0 && (
                  <li className="text-sm my-2 flex gap-2 items-center">
                    No supporters yet
                  </li>
                )}
                {payments.map((p, i) => {
                  return (
                    <li
                      key={i}
                      className="text-sm my-2 flex gap-2 items-center"
                    >
                      <img
                        src="./avatar.gif"
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                      <span className="text-[#3B4013] font-bold">{p.name}</span>{' '}
                      donated{' '}
                      <span className="text-[#3B4013] font-bold">
                        ₹{p.amount}
                      </span>{' '}
                      with a message "{p.message}"
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="makePayment md:w-1/2 w-full bg-[#3B4013] rounded-lg p-4">
              <h2 className="text-2xl font-bold my-2">Make Payment</h2>
              <div className="flex flex-col gap-2 mt-4 mx-5">
                <div className="flex gap-2 flex-col md:flex-row ">
                  <input
                    name="name"
                    onChange={handleChange}
                    value={paymentform.name}
                    type="text"
                    placeholder="Name"
                    className="w-full border-2 border-[#69731D] rounded-md p-2"
                  />
                  <input
                    name="message"
                    onChange={handleChange}
                    value={paymentform.message}
                    type="text"
                    placeholder="Message"
                    className="w-full border-2 border-[#69731D] rounded-md p-2"
                  />
                  <input
                    name="amount"
                    onChange={handleChange}
                    value={paymentform.amount}
                    type="text"
                    placeholder="Amount"
                    className="w-full border-2 border-[#69731D] rounded-md p-2"
                  />
                  <button
                    onClick={() => {
                      pay(Number.parseInt(paymentform.amount) * 100);
                    }}
                    className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!paymentform.amount}
                  >
                    Pay
                  </button>
                </div>
                <div className="flex gap-2 mt-4 ">
                  <button
                    onClick={() => pay(1000)}
                    className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300"
                  >
                    Pay ₹10
                  </button>
                  <button
                    onClick={() => pay(2000)}
                    className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300"
                  >
                    Pay ₹20
                  </button>
                  <button
                    onClick={() => pay(3000)}
                    className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300"
                  >
                    Pay ₹30
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
