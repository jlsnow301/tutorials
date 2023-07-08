import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import "./App.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { z } from "zod";
import axios from "axios";

type Todo = z.infer<typeof todoSchema>;

const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  userId: z.number(),
});

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

function Todos() {
  const { data: todos = [], isError, isLoading } = useGetTodos();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong</div>;

  return (
    <div>
      <h1>Todos</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.completed ? "Completed" : "Not completed"}</p>
        </div>
      ))}
    </div>
  );
}

function useGetTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return new Promise<Todo[]>((resolve, reject) => {
        setTimeout(() => {
          axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then((res) => {
              resolve(z.array(todoSchema).parse(res.data));
            })
            .catch((err) => {
              reject(err);
            });
        }, 1000);
      });
    },
  });
}
