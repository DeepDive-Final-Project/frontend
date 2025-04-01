import Button from '@/components/common/Button';

interface ConfirmModalProps {
  title: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-full tablet:w-[400px] p-5 rounded-lg border border-[#222325] bg-[#141415]">
        <h3 className="font-semibold mb-2 leading-normal">{title}</h3>
        {description && (
          <p className="text-sm mt-2 leading-normal">{description}</p>
        )}
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            className="w-[74px] flex-shrink-0"
            onClick={onCancel}
            variant="secondary">
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
