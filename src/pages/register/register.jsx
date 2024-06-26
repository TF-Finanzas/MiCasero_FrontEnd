import './register.css'
import APIService from '../../shared/services/api-service';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const Register = () => {
    const toast = useRef(null);
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const showToast = (severity, summary, detail) => {
        toast.current.show({severity: severity, summary: summary, detail: detail});
    }

    const register = async () => {
        if (username === '' || password === '' || repetirPassword === '') {
            showToast('error', 'Error', 'Por favor, complete todos los campos.')
            return;
        } else if (password !== repetirPassword) {
            showToast('error', 'Error', 'Las contraseñas no coinciden.')
            return;
        }

        const data = {
            "username": username,
            "password": password
        }

        try {
            const response = await APIService.postRegisterOwner(data)
            showToast('success', 'Cuenta creada', 'Ahora inicia sesión.')
            navigate('/log-in')
        } catch (error) {
            showToast('error', 'Error', 'Ocurrió un error al crear el paciente. Por favor, intenta nuevamente.')
            console.log(error)
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            register()
        }
    }

    return (
        <div className="sign-up">
            <Toast ref={toast} />
            <div className='su-body'>
                <div className="sub-title">
                    <h1>Crea tu cuenta</h1>
                </div>
                <p>¿Ya tienes una cuenta? <a href='/sign-in'>Inicia sesión</a></p>
                <label htmlFor="username">Usuario</label>
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
                <label htmlFor="repeat-password">Repetir Contraseña</label>
                <InputText
                id='repeat-password'
                placeholder='Repeat Password'
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
                />
                <Button
                label='Registrarse'
                onClick={register}
                onKeyDown={handleEnter}
                />
            </div>
        </div>
    )
}

export default Register