import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { housesData } from '../data';
import {BiBath,BiArea,BiBed} from 'react-icons/bi';


const PropertyDetails = () => {

  //get the house id
  const {id}=useParams();
  // console.log(id);
  //get the house based on the id
  const house =housesData.find(house=> house.id===parseInt(id));
  // console.log(house);

  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('Hello I am interested in apartment');
  // const [loading,setLoading] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const handleResponse=()=>{
    let isValid=true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate phone
    if (!phone.trim()) {
      setPhoneError('Phone Number is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Enter a valid 10-digit phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }

      const data={
      id:parseInt(id),
      name,
      phone,
      email,
      message,
     };
    
    axios
      .post(`http://localhost:5000/property/${data.id}`,data)
      .then(()=>{
        // setLoading(false);
        navigate('/');
        console.log(data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  return (
    <section>
      <div className='container mx-auto min-h-[800px] mb-14'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <div>
              <h2 className='text-2xl font-semibold'>{house.name}</h2>
              <h3 className='text-lg mb-4' >{house.address}</h3>
          </div>
          <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
            <div className='bg-blue-500 text-white px-3 rounded-full'>{house.type}</div>
            <div className='bg-violet-500 text-white px-3 rounded-full'>{house.country}</div>
          </div>
          <div className='text-3xl font-semibold text-violet-600'>${house.price}</div>
        </div>
        <div className='flex flex-col items-start gap-8 lg:flex-row '>
          <div className='max-w-[768px]'>
            <div className='mb-8'>
              <img src={house.imageLg} alt="" srcset=""/>
            </div>
            <div className='flex gap-x-6 text-violet-700 mb-6'>
              <div className='flex gap-x-1'>
                  <BiBed className='text-2xl'/>
                  <div>{house.bedrooms}</div>
              </div>
              <div className='flex gap-x-1'>
                  <BiBath className='text-2xl'/>
                  <div>{house.bathrooms}</div>
              </div>
              <div className='flex gap-x-1'>
                  <BiArea className='text-2xl'/>
                  <div>{house.surface}</div>
              </div>
            </div>
            <div>
              {house.description}
            </div>
          </div>
          <div className='flex-1 bg-slate-200 w-full mb-8 border border-gray-300 rounded-lg px-6 py-8 '>
            <div className='flex items-center gap-x-4 mb-8'>
              <div className='w-20 h-20 p-1 border bg-gray-300 rounded-full'><img src={house.agent.image} alt="agent-img"/></div>
              <div>
                <div className='font-bold text-lg '>{house.agent.name}</div>
                <Link to='' className='text-violet-700 text-sm'>View Listings</Link>
              </div>
            </div>
            {/* form  */}
            <form className='flex flex-col gap-4' action=''>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-10 text-sm'
            placeholder='Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && <p className='text-red-500'>{nameError}</p>}

          {/* Add labels and error messages for email and phone fields */}

          <input
            className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-10 text-sm'
            placeholder='Email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className='text-red-500'>{emailError}</p>}

          <input
            className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-10 text-sm'
            placeholder='Phone'
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {phoneError && <p className='text-red-500'>{phoneError}</p>}

          <input
            className='border borrder-gray-300 focus:border-violet-700 outline-none resize-none rounded w-full p-4 h-36 text-sm text-gray-400'
            placeholder='Message'
            defaultValue='Hello, I am interested.'
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='flex gap-x-2'>
            <button
              className='bg-violet-700 hover:bg-violet-800 text-white w-full text-sm p-4 rounded transition'
              onClick={handleResponse}
              type='button'
            >
              Send Message
            </button>
            <button className='border border-violet-700 text-violet-700 hover:border:violet-500 hover:text--violet-500 rounded p-4 text-sm w-full transition'>
              Call
            </button>
          </div>
          
        </form>
          </div>
        </div>
      </div>
    </section>
  )
};

export default PropertyDetails;
