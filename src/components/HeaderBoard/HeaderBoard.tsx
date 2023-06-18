import { AiOutlineShareAlt } from 'react-icons/ai';

import ShareProjectModalSlice from '../../redux/slices/ModalSlices/ShareModalSlices/ShareProjectModalSlice';

import Tabs from './Tabs';
import { tabValues } from '../../constants';
import { Button } from '..';
import { useDispatch } from 'react-redux';

export default function HeaderBoard() {
  const dispatch = useDispatch();
  const shareProjectClickHandler = () => {
    dispatch(ShareProjectModalSlice.actions.onOpen());
  };
  return (
    <>
      <header className='flex flex-col items-center justify-between h-full border-b-[0.5px] border-b-[#AAAAAA]'>
        <section className='flex justify-between w-full h-[100px] border-b-[0.5px] border-b-[#AAAAAA]'>
          <div className='flex items-end gap-5 text-xl'>
            <div className='font-bold mb-[14px]'>پروژه اول</div>
            <Tabs tabsArray={tabValues} />
          </div>
          <Button
            variant='subtle'
            bg='#fafbfc'
            c={'#1E1E1E'}
            mb={'xs'}
            styles={{
              root: {
                alignSelf: 'end',
                '&:hover': {
                  backgroundColor: '#AAAAAA20',
                },
              },
              inner: {
                gap: '0.5rem',
              },
            }}
            onClick={shareProjectClickHandler}
            icon={AiOutlineShareAlt}>
            اشتراک گذاری
          </Button>
        </section>
        <section className='flex justify-between w-full h-[60px]'></section>
      </header>
    </>
  );
}
