type ImagePopupProps = {
  name: string;
  link: string;
};

export default function ImagePopup(props: ImagePopupProps): React.JSX.Element {
  const { name, link } = props;

  return (
    <>
      <img alt={name} className='popup__image' src={link} />
      <p className='popup__caption'>{name}</p>
    </>
  );
}
