type PopupProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export default function Popup(props: PopupProps): React.JSX.Element {
  const { title, children, onClose, isOpen } = props;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? 'popup_is-opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`popup__content ${
          !title ? 'popup__content_content_image' : ''
        }`}
      >
        <button
          aria-label='Close modal'
          className='popup__close'
          type='button'
          onClick={onClose}
        />

        {title && <h3 className='popup__title'>{title}</h3>}

        {children}
      </div>
    </div>
  );
}
