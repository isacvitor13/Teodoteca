import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

/* Componentes*/
import NavBar from './components/layouts/NavBar';
import Message from './components/layouts/Message'
import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';

// Paginas 
import Login from './components/pages/auth/Login';
import { ServantProvider } from './context/Context';
import Home from './components/pages/Home';
import CreateStudent from './components/pages/Students/CreateStudent';
import ViewStudents from './components/pages/Students/ViewStudents';
import CreateClass from './components/pages/class/CreateClass'
import InfoStudent from './components/pages/Students/InfoStudent';
import ViewBooks from './components/pages/Books/ViewBooks';
import InfoBook from './components/pages/Books/InfoBook';
import EditStudent from './components/pages/Students/EditStudent';
import CreateBook from './components/pages/Books/CreateBook';
import EditBook from './components/pages/Books/EditBook';
import LoanBook from './components/pages/Books/LoanBook';


function App() {
  return (
    <div className="App">
      <Router>
        <ServantProvider>

          <NavBar />
          <Message />

          <Container>

            <Routes>
              {/* Rota de empréstimo */}
              <Route exact path='/book/loan/:id' element={<LoanBook />} />

              {/* Rotas de Livros */}
              <Route exact path='/viewbooks' element={<ViewBooks />} />
              <Route exact path='/book/edit/:id' element={<EditBook />} />
              <Route exact path='/book/create' element={<CreateBook />} />
              <Route exact path='/book/:id' element={<InfoBook />} />

              {/* //rotas de estudantes */}
              <Route exact path='/viewstudents' element={<ViewStudents />} />
              <Route exact path='/editstudent/:id' element={<EditStudent />} />
              <Route exact path='/student/:id' element={<InfoStudent />} />
              <Route exact path='/createstudent' element={<CreateStudent />} />

              {/* Rotas de turmas */}
              <Route exact path='/addclass' element={<CreateClass />} />

              {/* Rotas de Login */}
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />


            </Routes>

          </Container>
          <Footer />
        </ServantProvider>
      </Router>
    </div>
  );
}

export default App;
