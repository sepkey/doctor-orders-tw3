import { Toaster as HotToast } from 'react-hot-toast';

export default function Toaster() {
  return (
    <HotToast
      position="top-right"
      gutter={12}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: { duration: 4000 },
        error: {
          duration: 4000,
        },
        style: {
          fontSize: '0.8rem',
          maxWidth: '500px',
          padding: '12px 20px',
          backgroundColor: 'white',
          color: 'black',
        },
      }}
    />
  );
}
