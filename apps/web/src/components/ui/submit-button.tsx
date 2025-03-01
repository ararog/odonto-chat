import { Button } from '@/components/ui/button';
import { cva } from 'class-variance-authority';

type SubmitButtonProps = {
  disabled: boolean;
  label: string;
}

const submitButton = cva("w-full mt-5 max-sm:w-80 h-14",
{
  variants: {
    disabled: {
      true: 'bg-gray-50',
      false: 'bg-gray-200'
    }
  }
})

const SubmitButton = ({disabled, label} : SubmitButtonProps) => {
  return (
    <Button disabled={disabled} className={submitButton({disabled})} value={label}>
      <input type="submit" value={label} />
    </Button>  
  );
};

export default SubmitButton;