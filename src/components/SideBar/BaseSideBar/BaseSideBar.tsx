import { ReactNode } from 'react';
import LogoType from '../../LogoType/LogoType';
interface BaseSideBarProp {
children: ReactNode
}

const BaseSideBar = ({children}:BaseSideBarProp) => {
  return( 
  <div className='flex flex-col w-[100%] h-[100%] py-[40px] pr-[50px] pl-[16px] border-[#AAAAAA] border-[0.5px]'>
    <LogoType />
    {children}
  </div>
  
  )
};

export default BaseSideBar;