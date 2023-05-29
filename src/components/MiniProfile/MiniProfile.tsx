import { Avatar } from '../Avatar';

const MiniProfile = () => {
  return (
    <div
      onclick={onclick}
      className='flex justify-center items-center gap-2 w-[fit-content] cursor-pointer'>
      {/* src.alt,color props & placeholder should be from BackEnd */}
      <Avatar
        src={null}
        alt=''
        size={'md'}
        color={'red'}>
        NM
      </Avatar>

      <div className='leading-25 text-[#1E1E1E] text-16 font-medium'>
        {/* user name should be from BackEnd */}
        نیلوفر موجودی
      </div>
    </div>
  );
};

export default MiniProfile;