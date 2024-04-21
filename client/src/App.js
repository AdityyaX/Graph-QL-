import logo from './logo.svg';

import { useQuery, gql } from '@apollo/client';
const query = gql`
  query GetTodos {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
      
    }
  }
`;
function App() {
  const { data, loading } = useQuery(query);

  if (loading) return <p>Loading...</p>;


  return (
<>
{console.log(data)}
<h1>Todo List</h1>
<table>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
        {console.log(data)}
      </table>


</>

  
  );
}

export default App;
