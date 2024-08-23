const SegmentedProgressBar = ({ data, text }) => {
  const totalValue = data.reduce((total, segment) => total + segment.value, 0);

  return (
    <>
      <p className="pb-2">
        <span className="font-bold text-lg"> {totalValue}</span> {text}
      </p>

      <div className="flex rounded-full overflow-hidden h-[30px]">
        {data.map((segment, index) => {
          return (
            <div
              key={index}
              style={{
                width: `${(segment.value / totalValue) * 100}%`,
                backgroundColor: segment.color,
                textAlign: "center",
                lineHeight: "30px",
                color: "#fff",
                fontSize: "12px",
              }}
            ></div>
          );
        })}
      </div>
      <div className="flex flex-wrap mt-6">
        {data.map((segment, index) => (
          <div key={index} className="flex items-center mr-4 mb-2">
            <div
              style={{
                backgroundColor: segment.color,
              }}
              className="w-4 h-4 rounded-full mr-2"
            />
            <span className="text-sm">
              {segment.label}{" "}
              <span className="font-bold">({segment.value})</span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SegmentedProgressBar;
