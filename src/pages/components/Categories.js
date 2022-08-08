import './Categories.scss';

const Categories = ({category, clickHandler}) => {
  return (
    <button className="cat-name" onClick={() => clickHandler()}>
      {category.title}
    </button>
  );
};

export default Categories;
