const JunkConfirmDlg = ({ text, onOk, onClose }: any) => {
  return (
    <div className="fixed bg-[#3339] backdrop backdrop-blur z-10 left-0 top-0 w-full h-full flex justify-center items-center">
      <div className="relative w-[330px] bg-[#020618] pt-5 px-3 pb-4">
        <div className="text-[#d8ba11] text-[20px] text-center leading-none mb-[30px]">
          {text}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex">
            <button
              onClick={onOk}
              className="mr-[5px] hover:bg-[#fff2] duration-300 border-1 border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px] rounded-[50px]"
            >
              Ok
            </button>
            <button
              onClick={onClose}
              className="mr-[5px] hover:bg-[#fff2] duration-300 border-1 border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px] rounded-[50px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JunkConfirmDlg;
