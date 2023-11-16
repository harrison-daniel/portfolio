'use client';

import Image from 'next/image';
import React from 'react';
import motorcycle from 'public/assets/images/harley-davidson.jpg';
import consultant from 'public/assets/images/scott-graham-consulting.jpg';
import gitpub from 'public/assets/images/yesmore-content-beer.jpg';
import Link from 'next/link';

// import curlyBrackets from 'public/assets/images/curly-brackets.jpeg';

export default function Work() {
  return (
    <>
      <div className='min-h-screen' id='work'>
        {/* <Image src={curlyBrackets} alt='curly bracket cartoon' className='w-64' /> */}
        <div className='flex justify-center'>
          <h2 className='p-12 font-mono text-center text-black text-3xl font-bold '>
            My Work
          </h2>
        </div>
        {/* project container */}
        <div className='grid justify-items-center md:flex md:flex-row md:justify-center md:flex-1'>
          {/* project 1 */}

          <div className='p-4'>
            <div className='splash max-w-sm rounded overflow-hidden shadow-lg'>
              <Image
                src={gitpub}
                alt='picture of full beer mug with foam on top'
              />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>GitPub</div>
                <p className='text-gray-700 text-base'>
                  Search nearby breweries in your area and add/save entries to
                  your profile.
                </p>
                <div className='pt-6'>
                  <Link
                    href='https://gitpub.vercel.app'
                    id=''
                    target='blank'
                    className=' bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded'>
                    Live Site
                  </Link>
                </div>
              </div>
              <div className='px-6 pt-4 pb-2'>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #Next.js
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #React
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #MongoDB
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #Tailwind
                </span>
              </div>
            </div>
          </div>

          {/* project 2 */}
          <div className='p-4'>
            <div className='max-w-sm rounded overflow-hidden shadow-lg'>
              <Image
                src={consultant}
                alt='picture of full beer mug with foam on top'
              />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>
                  Node.js README.md Generator
                </div>
                <p className='text-gray-700 text-base'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className='px-6 pt-4 pb-2'>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #photography
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #travel
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #winter
                </span>
              </div>
            </div>
          </div>
          {/* project 3 */}
          <div className='p-4'>
            <div className='max-w-sm rounded overflow-hidden shadow-lg'>
              <Image
                src={motorcycle}
                alt='picture of motorcycle with sunset backdrop'
                className='object-contain'
              />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>The Coldest Sunset</div>
                <p className='text-gray-700 text-base'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className='px-6 pt-4 pb-2'>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #photography
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #travel
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #winter
                </span>
              </div>
            </div>
          </div>
          {/* project 4 */}
          {/* <div className='p-4'>
          <div className='max-w-sm rounded overflow-hidden shadow-lg'>
            <Image
              src={computerImage}
              alt='picture of full beer mug with foam on top'
            />
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>The Coldest Sunset</div>
              <p className='text-gray-700 text-base'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className='px-6 pt-4 pb-2'>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                #photography
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                #travel
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                #winter
              </span>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
}
