import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../Modal';
import { onClose } from '../../../redux/slices/ModalSlices/CreateWorkSpaceModalSlice';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { TextInput, ColorInput } from '../..';
import { workSpaceColors } from '../../../constants';
import { RxValueNone } from 'react-icons/rx';
import { AiOutlineCheck } from 'react-icons/ai';
import { Avatar } from '@mantine/core';

interface CreateWorkSpaceModalProps {
  children?: React.ReactNode;
  title?: string;
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
}

enum STEPS {
  NAME = 0,
  COLOR = 1,
  OVERVIEW = 2,
}

const CreateWorkSpaceModal = ({}: CreateWorkSpaceModalProps) => {
  const [step, setStep] = useState(STEPS.NAME);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      workSpaceName: '',
      selectedWorkSpaceColor: '#76BC86',
    },
  });

  const selectedWorkSpaceColor = watch('selectedWorkSpaceColor');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.CreateWorkSpaceModal.open);

  let title;
  let body;
  let footer;

  if (step === STEPS.NAME) {
    title = 'ساختن ورک‌اسپیس جدید';
    body = (
      <>
        <TextInput
          id='workSpaceName'
          register={register}
          label='نام ورک‌اسپیس'
        />
      </>
    );
  }
  if (step === STEPS.COLOR) {
    title = 'انتخاب رنگ ورک‌اسپیس';
    body = (
      <>
        <div className='grid grid-cols-[6fr,1fr] gap-4'>
          <div className='flex flex-col'>
            <p className='text-right text-14 mb-6'>رنگ ورک‌اسپیس</p>
            <div className='grid grid-cols-[repeat(12,1fr)] gap-2'>
              {workSpaceColors.map((color) => (
                <ColorInput
                  key={color}
                  width='15px'
                  height='15px'
                  bg={color}
                  radius='2px'
                  selected={selectedWorkSpaceColor === color}
                  icon={
                    color === null
                      ? RxValueNone
                      : selectedWorkSpaceColor === color
                      ? AiOutlineCheck
                      : null
                  }
                  onClick={() =>
                    setCustomValue('selectedWorkSpaceColor', color)
                  }
                />
              ))}
            </div>
          </div>
          <div
            style={{ backgroundColor: selectedWorkSpaceColor }}
            className='w-[70px] h-[70px] rounded-8 text-24 font-bold grid justify-center items-center transition'>
            ط ت
          </div>
        </div>
      </>
    );
  }
  if (step === STEPS.OVERVIEW) {
    title = 'مرور اطلاعات';
    body = (
      <>
        <div className='border border-neutral-300 rounded-md flex flex-col gap-5 py-[18px] px-[10px]'>
          <div className='flex flex-row justify-between items-center'>
            <p className='font-semibold'>{getValues('workSpaceName')}</p>
            <p className='text-14 font-semibold'>نام ورک‌اسپیس</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <ColorInput
              width='15px'
              height='15px'
              bg={selectedWorkSpaceColor}
              radius='2px'
            />
            <p className='text-14 font-semibold'> رنگ ورک‌اسپیس</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <Avatar radius='xl' />
            <p className='text-14 font-semibold'>اعضا</p>
          </div>
        </div>
      </>
    );
  }

  const onBack = () => {
    if (step === STEPS.NAME) return;
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.OVERVIEW) {
      return 'ساختن ورک‌اسپیس';
    }
    return 'ادامه';
  }, [step]);

  const haveback = useMemo(() => {
    if (step === STEPS.NAME) {
      return false;
    }
    return true;
  }, [step]);

  const onSubmit = () => {
    if (step !== STEPS.OVERVIEW) return onNext();

    ///submit functionality here
    console.log(getValues());
  };

  return (
    <Modal
      opened={open}
      onClose={() => dispatch(onClose())}
      title={title}
      body={body}
      footer={footer}
      actionLabel={actionLabel}
      action={onSubmit}
      back={haveback}
      backAction={onBack}
    />
  );
};

export default CreateWorkSpaceModal;
