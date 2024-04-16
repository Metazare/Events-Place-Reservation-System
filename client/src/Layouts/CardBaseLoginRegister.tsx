import React from 'react'
import Logo from '../Images/Logo/LogoBox.svg'

interface PropsType{
  title:string
  subTitle:string
  children:any
  otherStyle?:string
}
function CardBaseLoginRegister({title,subTitle,children,otherStyle}:PropsType) {
  return (
    <div className={`bg-[white] px-4 py-5 rounded-xl w-full max-w-[450px] ${otherStyle} `}>
      <div className='flex items-center mb-6'>
        <div className='grow'>
          <h5 className='text-[24px] leading-[24px] font-[600] text-primary'>{title}</h5>
          <h6 className='text-[18px] opacity-50'>{subTitle}</h6>
        </div>
        <img src={Logo} alt="" />
      </div>
      {children}
    </div>
  )
}

export default CardBaseLoginRegister