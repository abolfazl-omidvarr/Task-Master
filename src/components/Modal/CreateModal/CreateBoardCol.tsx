import { Button, TextInput } from '../../index';
import { ColorInput, Modal } from '@mantine/core';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createBoardApi } from '../../../services/boardApi';
import { useDispatch, useSelector } from 'react-redux';
import { storeStateTypes } from '../../../util/types';
import { ProjectSlice } from '../../../redux/slices';

type CreateBoadColProp = {
  opened: boolean;
  onClose: () => void;
};
function CreateBoadCol({ opened, onClose }: CreateBoadColProp) {
  const { selectedProjectBoardData: prevBoardData, selectedProjectId } =
    useSelector((state: storeStateTypes) => state.project);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      color: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { name, projectId, color } = data;
    try {
      const {
        data: { data: createdBoard },
      } = await createBoardApi(name, selectedProjectId, color);
      dispatch(ProjectSlice.actions.addBoard({ createdBoard, prevBoardData }));
      toast.success('ستون جدید با موفقیت ایجاد شد');
      setValue('name', '');
      setValue('projectId', '');
      setValue('color', '');
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.log(error);
      toast.error('مشکلی پیش آمده است، لطفا مجددا تلاش فرمایید');
    }
  };

  return (
    <Modal
      closeOnClickOutside={true}
      centered={true}
      radius='20px'
      withCloseButton={false}
      dir='rtl'
      opened={opened}
      onClose={onClose}>
      <Modal.Header className='flex justify-center items-center mb-5 font-bold text-center'>
        <Modal.CloseButton size={'1.5rem'} />
        <div className='grow text-xl'>ساخت ستون جدید</div>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-5'>
          <TextInput
            label='نام ستون'
            placeholder='عنوان ستون'
            id='name'
            register={register}
            errors={errors}
            required
          />
          <ColorInput
            id='color'
            onChange={(color) => setValue('color', color)}
            placeholder='انتخاب رنگ'
            label='انتخاب رنگ'
            style={{ textAlign: 'right' }}
          />
          <Button type='submit'>ثبت کن</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateBoadCol;
