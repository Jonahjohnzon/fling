import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ImSearch } from 'react-icons/im';
import * as Yup from 'yup';

const SearchBar = ({ onSearch }) => {
  const validationSchema = Yup.object().shape({
    searchTerm: Yup.string().required('Search term is required'),
    searchOption: Yup.string().oneOf(['title', 'body'], 'You must select an option').required('Search option is required'),
  });
    const [show, setShow] = useState(false)
    const handleFocus = () => {
      setShow(true);
    };
  
    const handleBlur = () => {
      // Optionally hide the options if input is empty or on blur
      if (!formik.values.searchTerm) {
        setShow(false);
      }
    };
  const formik = useFormik({
    initialValues: {
      searchTerm: '',
      searchOption: 'body'
    },
    validationSchema,
    onSubmit: (values,{resetForm}) => {
      onSearch(values.searchTerm, values.searchOption);
      resetForm()
      setShow(false);
    }
  });

  return (
<form onSubmit={formik.handleSubmit} className='relative w-full' autocomplete="off">
  <div className='flex items-center'>
    <input
      type="text"
      autocomplete="off"
      name="searchTerm"
      onChange={formik.handleChange}
      value={formik.values.searchTerm}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Search..."
      className='bg-[#383B42] h-9 outline-none px-4 placeholder:text-sm rounded-l-md'
    />
    <div className='relative h-9 w-10 bg-[#383B42] flex justify-center items-center rounded-r-md'>
      <input
        type="submit"
        className='absolute top-0 left-0 cursor-pointer text-white text-sm h-full w-full z-40 rounded-sm opacity-0'
      />
      <ImSearch />
    </div>
  </div>
  

  
  {show && (
    <div className='absolute -bottom-14 bg-textbg z-40 text-sm flex items-center w-full py-4 px-2 border-[1px] border-white border-opacity-20'>
      <label className='flex items-center'>
        <input
          type="radio"
          name="searchOption"
          value="title"
          className='mr-1 w-3 h-3'
          onChange={formik.handleChange}
          checked={formik.values.searchOption === 'title'}
        />
        Title
      </label>
      <label className='ml-4 flex items-center'>
        <input
          type="radio"
          name="searchOption"
          value="body"
          className='mr-1 w-3 h-3'
          onChange={formik.handleChange}
          checked={formik.values.searchOption === 'body'}
        />
        Body
      </label>
    </div>
  )}
</form>

  );
};

export default SearchBar;
