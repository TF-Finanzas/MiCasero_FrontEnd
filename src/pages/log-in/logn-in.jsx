import './log-in.css'
import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import APIService from '../../shared/services/api-service';

const LogIn = () => {
    const navegar = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({severity: severity, summary: summary, detail: detail});
    }

    const signIn = async () => {
        if (username === '' || password === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const data = {
            "username": username,
            "password": password
        }

        try {
            const response = await APIService.postLogInOwner(data)
            localStorage.setItem('user', JSON.stringify(response.data))
            navegar('/home')
        } catch (error) {
            showToast('error', 'Error', 'Credenciales incorrectas')
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            signIn()
        }
    }

    return (
        <div className="sign-in">
            <Toast ref={toast} />
            <div className='si-left'>
                <div className='sill'>
                    <h1>Bienvenido a MiCasero!</h1>
                    <p>Inicie sesión y olvídese de los cálculos para su negocio.</p>
                </div>
            </div>
            <div className="si-right">
                <div className='sir-body'>
                    <label htmlFor="username">Username</label>
                    <InputText
                    id='username'
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <InputText
                    id='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                    label='Iniciar sesión'
                    onClick={signIn}
                    onKeyDown={handleEnter}
                    />
                    <p>¿No tienes una cuenta? <a href='/register'>Registrate</a></p>
                </div>
            </div>
        </div>
    )
}

export default LogIn