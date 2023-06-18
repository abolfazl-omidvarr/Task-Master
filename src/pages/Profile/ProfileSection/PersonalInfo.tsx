import { Button as MantineBtn } from '@mantine/core';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

import { Button, Avatar, TextInput, Title } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateUserInfoApi } from '../../../services/userApi';
import toast from 'react-hot-toast';
import userSlice from '../../../redux/slices/UserSlice/UserSlice';
import { storeStateTypes } from '../../../util/types';
const PersonalInfo = () => {
  const dispatch = useDispatch();

  const { firstname, lastname, phone, id } = useSelector(
    (state: storeStateTypes) => state.user
  );

  const avatarText = firstname && lastname && `${firstname[0]} ${lastname[0]}`;

  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);

  const handleChange = () => {
    setdisabled(false);
  };
  const { register, handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      firstname,
      lastname,
      phone,
    },
  });

  useEffect(() => {
    setValue('firstname', firstname);
    setValue('lastname', lastname);
    setValue('phone', phone);
  }, [firstname, lastname, phone, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { firstname, lastname, phone } = data;
    setLoading(true);
    try {
      const { data: apiData } = await updateUserInfoApi(id, {
        firstname,
        lastname,
        phone,
      });

      dispatch(
        userSlice.actions.setUserPersonaInfo({ firstname, lastname, phone })
      );
      console.log(apiData);
      toast.success('بروز رسانی اطلاعات با موفقیت انجام شد');
    } catch (error) {
      console.log(error);
      toast.error('بروز رسانی اطلاعات با مشکل مواجه شد');
    }

    setLoading(false);
    setdisabled(true);
  };
  return (
    <div className='flex flex-col'>
      <div>
        <Title
          fz={'31px'}
          fw={'700'}
          lh={'49px'}>
          اطلاعات فردی
        </Title>
      </div>
      <div className='flex flex-row items-center mt-[35px]'>
        <div>
          <Avatar
            color={'red'} //from BackEnd
            fontSize={'35px'}
            className='p-0 m-0'
            size={'100px'}
            radius={'50%'}>
            {avatarText}
          </Avatar>
        </div>
        <div className='flex flex-col mr-[16px]'>
          <MantineBtn
            color={'cyan'}
            p={'10px'}
            variant='outline'
            h={'50px'}
            radius={'8px'}
            fz={'20px'}
            fw={'500'}
            lh={'31px'}>
            ویرایش تصویر پروفایل
          </MantineBtn>
          <div className='mt-[12px] text-[#8A8989] font-normal text-12 leading-19'>
            این تصویر برای عموم قابل نمایش است.
          </div>
        </div>
      </div>
      <div className='w-[354px] mt-[34px]'>
        <form
          className='flex flex-col '
          onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            onChange={handleChange}
            id='firstname'
            register={register}
            label='نام'
          />
          <TextInput
            onChange={handleChange}
            id='lastname'
            register={register}
            label='نام خانوادگی'
            className='mt-[20px]'
          />
          <TextInput
            placeholder={`current phone: ${phone}`}
            onChange={handleChange}
            id='phone'
            type='tel'
            register={register}
            label='شماره موبایل'
            className='mt-[20px]'
          />
          <Button
            loading={loading}
            disabled={disabled}
            className='mt-[48px]'
            type='submit'>
            ثبت تغییرات
          </Button>
        </form>
      </div>
    </div>
  );
};
export default PersonalInfo;
