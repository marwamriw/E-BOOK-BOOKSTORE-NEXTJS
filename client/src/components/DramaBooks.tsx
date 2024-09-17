"use client"
import { bookType } from '@/types/book';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import LoadingSpinners from './LoadingSpinners';

const fetchDramaBooks = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/book/drama'); 
        const data =  response.data.data;
        return data
        console.log
    } catch (error) {
        console.error('Unexpected error:', error);
        }
    }


const  DramaBooks  = () => {
    const { data, error, isLoading } = useQuery<bookType[]>('fetchDramaBooks', fetchDramaBooks);
    if (isLoading) return <div><LoadingSpinners/></div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div >
           <h1 className='text-sm md:text-6xl font-bold text-center mb-12 mt-12 italic' style={{ fontFamily: "Georgia, sans-serif" }}>Drama Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center">
                {data && data.length > 0 ? (
                    data.map((book) => (
                        <div key={book._id}
                        className="flex flex-col rounded-lg bg-white shadow-orange-300 text-surface shadow-md dark:bg-surface-dark dark:text-white md:max-w-xl md:flex-row
                    transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-amber-50 h-72">
                             <img
              className="h-80 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
              src={`http://localhost:4000/file/${book.coverImage}`}
              alt=""
            />
            <div className="flex flex-col justify-start p-6">
              <h5
                className="mb-2 text-xl font-medium text-orange-500"
                style={{ fontFamily: "verdana" }}
              >
                {book.title}
              </h5>
              <p className="mb-4 text-xs" style={{ fontFamily: "verdana" }}>
                {book.summary}
              </p>
              <p
                className="text-xs text-surface/75 dark:text-neutral-300"
                style={{ fontFamily: "verdana" }}
              >
                Author: {book.author}
              </p>
              <p className="text-xs text-surface/75 dark:text-neutral-300"
                style={{ fontFamily: "verdana" }}>Category:{book.category}</p>
              <p
                className="text-xs text-surface/75 dark:text-neutral-300"
                style={{ fontFamily: "verdana" }}
              >
                Price: {book.price} DT
              </p>
            </div>
                        </div>
                    ))
                ) : (
                    <p>No Drama books available.</p>
                )}
            </div>
        </div>
    );
};

export default DramaBooks;
