import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactList from "./components/contactList";
import CreateContact from "./components/createContact";
import UpdateContact from "./components/updateContact";
import PostSubmit from "./components/PostSubmit";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactList/>}/>
        <Route path="/create" element={<CreateContact/>}/>
        <Route path="/update/:id" element={<UpdateContact/>}/>
        <Route path="/delete/:id" element={<ContactList/>}/>
        <Route path="/postSubmit" element={<PostSubmit/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;