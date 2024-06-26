import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarComponent from '../../components/nav-bar';
import { Button } from 'primereact/button';
import APIService from '../../shared/services/api-service';
import './home.css';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user?.username;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // 
        navigate('/log-in');
    };

    const handleDeleteAccount = async () => {
        try {
            await APIService.deleteOwner(user.id); 
            handleLogout(); 
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    return (
        <div className="home">
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className='home-body'>
                <div className="hb-center">
                    <div className='hb-user'>
                        <h1>Usuario: {username}</h1>
                        <Button label="Cerrar Sesión" onClick={handleLogout} />
                        <Button label="Eliminar Cuenta" severity="warning" onClick={handleDeleteAccount} />
                    </div>
                    <h1>¡Bienvenido a MiCasero!</h1>
                    <p>En MiCasero, podrás calcular el préstamo de crédito a tus clientes en base a: Tasa de Interés Nominal, Efectiva y método Francés.</p>
                    <h3>Nuestra misión</h3>
                    <p>Proporcionar herramientas para que el propietario de un negocio no tenga que preocuparse a la hora del cálculo de interés del préstamo a sus clientes.</p>
                    <h3>Estado del Proyecto</h3>
                    <p>Este software está en proceso de desarrollo, valoramos su comprensión. ¡Espere a nuevas mejoras!</p>
                </div>
            </div>
        </div>
    );
};

export default Home;