import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  disabled: boolean;
  label: string;
}

const SubmitButton = ({disabled, label} : SubmitButtonProps) => {
  return (
    <Button disabled={disabled} className={`w-full mt-5 max-sm:w-80 ${disabled ? 'bg-gray-50' : 'bg-gray-200'} h-14`} value={label}>
      <input type="submit" value={label} />
    </Button>  
  );
};

export default SubmitButton;