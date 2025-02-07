type PageTitleProps = {
  text: string;
};

const PageTitle = (props: PageTitleProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-20">
      <h1 className='text-2xl font-extrabold text-center text-gray-700'>{props.text}</h1>
    </div>
  );
};

export default PageTitle;