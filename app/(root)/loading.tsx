import { BounceLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='absolute left-[50vw] top-[50vh] z-10'>
      <BounceLoader color='#22c55e' size={40} />
    </div>
  );
};

export default Loading;
