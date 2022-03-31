import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { useFoods } from '../../hooks/useFoods';
import { IFood } from '../../types';

import { Container } from './styles';
interface FoodProps {
  food: IFood;
  handleEditFood: (openModal: boolean) => void;
}

export function Food({food, handleEditFood}: FoodProps){
  const [isAvailable, setIsAvailable] = useState(food.available);

  const { deleteFood, setEditingFood, toggleAvailable } = useFoods();

    const toggle = async () => {
      toggleAvailable(food);
      setIsAvailable(!isAvailable);
    }

    const handleEdit = (food: IFood) => {
      setEditingFood(food);
      handleEditFood(true);
    }

    return (
      <Container available={isAvailable} key={food.id}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={() => handleEdit(food)}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => deleteFood(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={toggle}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    );

};

