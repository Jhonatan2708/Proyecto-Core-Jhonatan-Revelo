import logo from './logo.svg';
import './App.css';
import { Container, Typography } from "@material-ui/core";
import Order from "./components/Order";

// Se agrega la etiqueta para order
function App() {
  return (
    <Container maxWidth="md">
      <Typography
      gutterBottom
      variant="h1"
      align ="center">
        Restaurant Shop
      </Typography>
      <Order /> 
    </Container>
  );
}

export default App;
