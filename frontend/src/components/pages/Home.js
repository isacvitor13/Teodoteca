//ICONS
import { CgHome } from "react-icons/cg";
import { CgUserAdd } from "react-icons/cg";
import { SiGoogleclassroom } from "react-icons/si";
import { RiBookShelfFill } from "react-icons/ri";
import { BiBookAdd } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";



import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import { useContext } from "react";
import { Context } from '../../context/Context'
import NoAuth from "../layouts/NoAuth";
function Home() {
    const { authenticaded } = useContext(Context)

    return (
        <section className={styles.home}>
            {authenticaded ? (<>
                <div className={styles.home_header}>
                    <Link to="/">
                        <CgHome />
                        <h1> Início</h1>
                    </Link>
                </div>
                <div className={styles.services}>
                    <ul>
                        <div>
                            <li><Link to='/viewbooks'><RiBookShelfFill /> Livros Cadastrados</Link></li>
                            <li><Link to='/viewstudents'><PiStudentFill /> Alunos Cadastrados</Link></li>
                            <li><Link to='/book/create'><BiBookAdd /> Cadastrar Livro</Link></li>
                            <li><Link to='createstudent'><CgUserAdd /> Cadastrar Aluno</Link></li>
                            <li><Link to='/addclass'><SiGoogleclassroom /> Criar Turma</Link></li>
                        </div>
                    </ul>
                </div>
            </>) : (
                <NoAuth />
            )}
        </section>
    )
}

export default Home