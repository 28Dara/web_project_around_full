import successIcon from '../../images/success-icon.svg';
import failIcon from '../../images/fail-icon.svg';

type InfoTooltipProps = {
  isOpen: boolean;
  isSuccess: boolean;
  onClose: () => void;
};

export default function InfoTooltip(
  props: InfoTooltipProps
): React.JSX.Element {
  const { isOpen, isSuccess, onClose } = props;

  const icon = isSuccess ? successIcon : failIcon;
  const message = isSuccess
    ? '¡Correcto! Ya estás registrado.'
    : 'Uy, algo salió mal. Por favor, inténtalo de nuevo.';

  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className='popup__content popup__content_type_tooltip'>
        <button
          aria-label='Cerrar ventana'
          className='popup__close'
          type='button'
          onClick={onClose}
        />
        <img
          className='popup__tooltip-icon'
          src={icon}
          alt={isSuccess ? 'Registro exitoso' : 'Error'}
        />
        <p className='popup__message'>{message}</p>
      </div>
    </div>
  );
}
