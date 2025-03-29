const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div className="bg-#141415 p-6 rounded-lg w-[90%] max-w-[600px] relative">
      <button
        className="absolute top-2 right-2 text-gray-500"
        onClick={onClose}>
        ✕
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
