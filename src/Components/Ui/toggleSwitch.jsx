const ToggleSwitch = ({ isOn, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`w-14 h-8 ${isOn ? 'bg-gray-500' : 'bg-gray-300'} rounded-full p-1 flex transition-all duration-700 cursor-pointer`}
    >
      <div
        className={`h-full w-[50%] rounded-full ${
          isOn ? 'bg-black ml-[50%]' : 'bg-white'
        } transition-all duration-700`}
      />
    </div>
  );
};

export default ToggleSwitch;
