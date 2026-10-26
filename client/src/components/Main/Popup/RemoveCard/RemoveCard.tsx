import type {
  CardData,
  HandleCardDelete,
} from '../../../../interfaces/CardData';

type RemoveCardProps = {
  card: CardData;
  handleCardDelete: HandleCardDelete;
};

export default function RemoveCard(props: RemoveCardProps): React.JSX.Element {
  const { card, handleCardDelete } = props;

  const handleConfirm = () => {
    handleCardDelete(card);
  };

  return (
    <button
      className='button popup__button'
      type='button'
      onClick={handleConfirm}
    >
      Sí
    </button>
  );
}
