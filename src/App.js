import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    initialload();
  }, []);

  const [value, setvalue] = useState([]);

  const initialload = () => {
    fetch("https://www.gimbooks.com/v4/master/city/?query=Rai", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setvalue(data?.results))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <table>
        <thead>
          <th><td>
            ID
            </td>
            </th>
          <th><td>
            Name
            </td>
            </th>
        </thead>
        <tbody>
          {value.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
