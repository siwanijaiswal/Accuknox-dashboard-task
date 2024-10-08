import CrossIcon from "../../assets/cancel.png";

const Drawer = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  okText,
  cancelText,
  children,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex ${isOpen ? "visible" : "invisible"}`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`relative w-90 bg-white h-full shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ right: 0, position: "absolute", top: 0 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center bg-indigo-900 justify-between p-3 border-b">
            <p className="text-white">{title}</p>
            <button onClick={onClose} className="text-gray-600">
              <span className="material-icons">
                <img src={CrossIcon} width="20px" />
              </span>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">{children}</div>

          <footer className="p-2 border-t border-gray-500 flex justify-end space-x-2">
            <button
              onClick={onCancel}
              className="px-8 py-2 border-2 border-indigo-900 text-indigo-900 rounded hover:bg-indigo-900 hover:text-white"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-8 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-700"
            >
              {okText}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
