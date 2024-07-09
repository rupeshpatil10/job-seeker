import React from 'react'

const Button = ({onclickHandler, value, title}) => {
  // console.log(title);
  return (
    <button onClick={onclickHandler} value={value} className={` items-center px-3 py-1 border text-base hover:bg-blue-600 hover:text-white`}>
      {title}
    </button>
  )
}

export default Button