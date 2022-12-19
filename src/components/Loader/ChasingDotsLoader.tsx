import { ChasingDots } from 'better-react-spinkit';
export const ChasingDotsLoader = ({
  showLoader,
  size = 50,
  color = '#736977'

}: {
  showLoader: boolean;
  size?: number;
  color?: string
}) => {
  if (!showLoader) return null;
  return (
    <div className='chasing-dots-wrapper d-flex justify-content-center h-100'>
      <ChasingDots size={size} color={color} />
    </div>
  );
};
