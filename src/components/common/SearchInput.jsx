import SearchIcon from "../../assets/search.png";

const SearchInput = ({ onChangeHandler }) => {
  return (
    <div>
      <div className="flex px-4 py-1 rounded-md border-2 border-blue-100 bg-blue-50 overflow-hidden max-w-lg w-[900px] mx-auto">
        <img src={SearchIcon} width="20px" />
        <input
          type="search"
          placeholder="Search anything..."
          className="w-full outline-none bg-transparent text-gray-600 mx-2 text-sm"
          onChange={(e) => onChangeHandler(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
