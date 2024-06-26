import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIService from '../../shared/services/api-service';
import NavBarComponent from '../../components/nav-bar';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './customer.css';

const Customer = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [visible, setVisible] = useState(false);
    const [creditDialogVisible, setCreditDialogVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        dateBirth: '',
        email: '',
        phoneNumber: '',
        dni: '',
        rucEmployer: '',
        address: '',
        payday: '',
        ownerId: user?.id || 0
    });
    const [customers, setCustomers] = useState([]);
    const [creditData, setCreditData] = useState({
        id: 0,
        credit: 0
    });

    useEffect(() => {
        fetchCustomer();
    }, []);

    const fetchCustomer = async () => {
        try {
            const response = await APIService.getCustomer(formData.ownerId);
            setCustomers(response.data); // Assuming response.data is an array of customer objects
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await APIService.postCustomer(formData);
            setVisible(false);
            fetchCustomer();
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await APIService.putBalanceCustomer(id);
            fetchCustomer();
        } catch (error) {
            console.error(`Error updating customer with ID ${id}:`, error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await APIService.deleteCustomer(id);
            fetchCustomer();
        } catch (error) {
            console.error(`Error deleting customer with ID ${id}:`, error);
        }
    };

    const handleCreditChange = async () => {
        try {
            const { id, credit } = creditData;
            await APIService.putCustomer({ id, credit });
            setCreditDialogVisible(false);
            fetchCustomer();
        } catch (error) {
            console.error('Error updating credit:', error);
        }
    };

    const handleView = (customer) => {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            localStorage.removeItem('customer');
            localStorage.setItem('customer', JSON.stringify(customer));
        } else {
            localStorage.setItem('customer', JSON.stringify(customer));
        }
        navigate('/bill');
    };

    return (
        <div className="home">
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className='Body'>
                <div className='Header'>
                    <h1>Clientes</h1>
                    <Button label="Crear Cliente" onClick={() => setVisible(true)} />
                </div>
                <Dialog header="Crear Cliente" visible={visible} onHide={() => setVisible(false)}>
                    <div className="p-fluid">
                        <div className="p-field">
                            <InputText name="name" placeholder="Nombre" value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="dateBirth" placeholder="Año de Nacimiento" value={formData.dateBirth} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="email" placeholder="Correo" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="phoneNumber" placeholder="Teléfono" value={formData.phoneNumber} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="dni" placeholder="DNI" value={formData.dni} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="rucEmployer" placeholder="RUC del Empleado" value={formData.rucEmployer} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="address" placeholder="Dirección" value={formData.address} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="payday" placeholder="Día de Pago" value={formData.payday} onChange={handleInputChange} />
                        </div>
                        <Button label="Crear" onClick={handleSubmit} />
                    </div>
                </Dialog>
                {customers.map(customer => (
                    <Card key={customer.id} title={`Nombre: ${customer.name}`}>
                        <p>Año de Nacimiento: {customer.dateBirth}</p>
                        <p>Correo: {customer.email}</p>
                        <p>Teléfono: {customer.phoneNumber}</p>
                        <p>DNI: {customer.dni}</p>
                        <p>RUC del Empleado: {customer.rucEmployer}</p>
                        <p>Dirección: {customer.address}</p>
                        <p>Día de Pago: {customer.payday}</p>
                        <h2>Límite de Crédito: S/. {customer.creditLimit}</h2>
                        <h2>Balance: S/. {customer.balance}</h2>
                        <h1>Aprobado: {customer.isApproved ? 'Sí' : 'No'}</h1>
                        <Button label="Actualizar" onClick={() => handleUpdate(customer.id)} />
                        <Button label="Eliminar" onClick={() => handleDelete(customer.id)} />
                        <Button label="Cambiar Crédito" onClick={() => {
                            setCreditData({ id: customer.id, credit: customer.creditLimit });
                            setCreditDialogVisible(true);
                        }} />
                        <Button label="Ver" onClick={() => handleView(customer)} />
                    </Card>
                ))}
                <Dialog header="Cambiar Crédito" visible={creditDialogVisible} onHide={() => setCreditDialogVisible(false)}>
                    <div className="p-fluid">
                        <div className="p-field">
                            <InputText value={creditData.credit} onChange={(e) => setCreditData({ ...creditData, credit: e.target.value })} />
                        </div>
                        <Button label="Actualizar" onClick={handleCreditChange} />
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default Customer;
