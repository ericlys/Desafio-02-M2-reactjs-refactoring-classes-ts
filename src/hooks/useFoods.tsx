import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { IFood } from "../types";

interface FoodProviderProps {
    children: ReactNode;
}

interface FoodsContextData{
  foods: IFood[];
  editingFood?: IFood;
  toggleAvailable: (food: IFood) => void;
  setEditingFood: (food: IFood) => void;
  createFood: (data: IFood) => void;
  deleteFood: (id: number) => void;
  updateFood: (food: IFood) => void;
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodProviderProps){
    const [foods, setFoods] = useState<IFood[]>([]);
    const [editingFood, setEditingFood] = useState<IFood>();

    useEffect(()=>{
        api.get('foods')
        .then(response => setFoods(response.data))
    },[])

    const createFood = async (food: IFood) => {
        try {
          const response = await api.post('/foods', {
            ...food,
            available: true,
          });
    
          setFoods([...foods, response.data]);
        } catch (err) {
          console.log(err);
        }
      }
    
      const updateFood = async (food: IFood) => {
        try {
          const foodUpdated = await api.put(
            `/foods/${editingFood?.id}`,
            { ...editingFood, ...food },
          );
    
          const foodsUpdated = foods.map(f =>
            f.id !== foodUpdated.data.id ? f : foodUpdated.data,
          );
    
          setFoods(foodsUpdated);
        } catch (err) {
          console.log(err);
        }
      }

      const toggleAvailable = async (food: IFood) => {
        await api.put(`/foods/${food.id}`, {
          ...food,
          available: !food.available,
        });
      }
    
      const deleteFood = async (id:number) => {
        await api.delete(`/foods/${id}`);
        const foodsFiltered = foods.filter(food => food.id !== id);
        setFoods(foodsFiltered);
      }

      return (
        <FoodsContext.Provider value={{foods, editingFood, setEditingFood, createFood, toggleAvailable, deleteFood, updateFood}}>
          {children}
        </FoodsContext.Provider>
    );
}

export function useFoods() {
  const context = useContext(FoodsContext);
  return context;
}