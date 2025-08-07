import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-4 text-white h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold flex flex-col text-5xl items-center">
          <Image
            src="/logo.png"
            width={128}
            height={128}
            alt="MatchaCado's logo"
          />
          MatchaCado
        </div>
        <p className="font-bold text-center md:text-left">
          website which will help you to drink matcha and eat avocado with the
          help of your audience
        </p>
        <div className="">
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-[#3B4013] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Lets Go!
            </button>
          </Link>
          <Link href={'/about'}>
            <button
              type="button"
              className="text-white bg-[#3B4013] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-2xl font-bold text-center mb-14">
          Your audince can help you drink matcha and eat avocado
        </h2>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-[#A7BF50] rounded-full p-2 text-black"
              width={88}
              src="/man.gif"
              alt=""
            />
            <p className="font-bold text-center">Focus on Your Productivity</p>
            <p className="text-center">
              Your fans are more then happy to fund you.
            </p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-[#A7BF50] rounded-full p-2 text-black"
              width={88}
              src="/coin.gif"
              alt=""
            />
            <p className="font-bold text-center">Let other's help you</p>
            <p className="text-center">
              Your fans are more then happy to fund you.
            </p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-[#A7BF50] rounded-full p-2 text-black"
              width={88}
              src="/group.gif"
              alt=""
            />
            <p className="font-bold text-center">Let Others Help you</p>
            <p className="text-center">
              Your fans are more then happy to fund you.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10 "></div>
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center space-y-4 ">
        <h2 className="text-2xl font-bold text-center mb-14">
          Learn More About Us!
        </h2>
        <p className='p-5 text-center'>
          Our gole is to setup a platform where creators can list them salf and
          fans can support them.
        </p>
        <p className='p-5 text-center'>
          This is why the name is MatchaCad, it is mixture of Matcha and
          Avacado, in this ecomemy matcha and avocado considered as luxury now
          You will be able to afford this luxury
        </p>
      </div>
    </>
  );
}
