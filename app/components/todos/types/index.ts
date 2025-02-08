export interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
}

export type TodosProps = {
  data: ITodo[] | [];
};
