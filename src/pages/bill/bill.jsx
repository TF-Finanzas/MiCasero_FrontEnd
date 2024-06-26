import React, { useState, useEffect } from 'react';
import APIService from '../../shared/services/api-service';
import NavBarComponent from '../../components/nav-bar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

const Bill = () => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        finishDate: '',
        isNominalRate: '',
        isEffectiveRate: '',
        interestRate: '',
        isFrenchMethod: '',
        moratoriumRate: '',
        initialFee: '',
    });
    const [bills, setBills] = useState([]);
    const navigate = useNavigate();

    const customer = JSON.parse(localStorage.getItem('customer'));

    useEffect(() => {
        if (customer) {
            fetchBills(customer.id);
        }
    }, [customer]);

    const fetchBills = async (id) => {
        try {
            const response = await APIService.getBill(id);
            setBills(response.data);
        } catch (error) {
            console.error('Error fetching bills:', error);
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
        const data = {
            ...formData,
            isNominalRate: formData.isNominalRate.toLowerCase() === 'si',
            isEffectiveRate: formData.isEffectiveRate.toLowerCase() === 'si',
            isFrenchMethod: formData.isFrenchMethod.toLowerCase() === 'si',
            interestRate: parseFloat(formData.interestRate),
            moratoriumRate: parseFloat(formData.moratoriumRate),
            initialFee: parseFloat(formData.initialFee),
            customerId: customer.id,
        };

        try {
            await APIService.postBill(data);
            setVisible(false);
            fetchBills(customer.id); // Refresh bills after creating a new one
        } catch (error) {
            console.error('Error creating bill:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await APIService.deleteBill(id);
            fetchBills(customer.id); // Refresh bills after deleting one
        } catch (error) {
            console.error('Error deleting bill:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await APIService.putBalanceBill(id);
            fetchBills(customer.id); // Refresh bills after updating one
        } catch (error) {
            console.error('Error updating bill:', error);
        }
    };

    const handleCalculateInterest = async (id, bill) => {
        try {
            let response;
            if (bill.isNominalRate) {
                response = await APIService.getNominalBill(id);
            } else if (bill.isEffectiveRate) {
                response = await APIService.getEffectiveBill(id);
            } else if (bill.isFrenchMethod) {
                response = await APIService.getFrenchBill(id);
            }
            console.log('Interest Calculation Result:', response.data);
        } catch (error) {
            console.error('Error calculating interest:', error);
        }
    };

    const handleView = (bill) => {
        localStorage.removeItem('bill');
        localStorage.setItem('bill', JSON.stringify(bill));
        navigate('/transfer');
    };

    return (
        <div className="home">
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className='Body'>
                <div className='Header'>
                    <h1>Boletas</h1>
                    <Button label="Crear Boleta" onClick={() => setVisible(true)} />
                </div>
                <Dialog header="Crear Boleta" visible={visible} onHide={() => setVisible(false)}>
                    <div className="p-fluid">
                        <div className="p-field">
                            <InputText name="finishDate" placeholder="Fecha de Pago" value={formData.finishDate} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="isNominalRate" placeholder="Tasa Nominal (Si o No)" value={formData.isNominalRate} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="isEffectiveRate" placeholder="Tasa Efectiva (Si o No)" value={formData.isEffectiveRate} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="interestRate" placeholder="Tasa de Interés (TEA)" value={formData.interestRate} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="isFrenchMethod" placeholder="Método Francés (Si o No)" value={formData.isFrenchMethod} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="moratoriumRate" placeholder="Tasa Moratoria" value={formData.moratoriumRate} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="initialFee" placeholder="Cuota Inicial" value={formData.initialFee} onChange={handleInputChange} />
                        </div>
                        <Button label="Crear" onClick={handleSubmit} />
                    </div>
                </Dialog>
                {bills.map(bill => (
                    <Card key={bill.id} title={`Boleta: ${bill.id}`}>
                        <p>Fecha de Inicio: {bill.startDate}</p>
                        <p>Fecha de Fin: {bill.finishDate}</p>
                        <p>Tasa Nominal: {bill.isNominalRate ? 'Si' : 'No'}</p>
                        <p>Tasa Efectiva: {bill.isEffectiveRate ? 'Si' : 'No'}</p>
                        <p>Método Francés: {bill.isFrenchMethod ? 'Si' : 'No'}</p>
                        <p>Cuota Inicial: {bill.initialFee}%</p>
                        <p>Tasa Moratoria: {bill.moratoriumRate}%</p>
                        <h2>Tasa de Interés (TEA): {bill.interestRate}%</h2>
                        <h1>Balance: {bill.balance}</h1>
                        <Button label="Calcular Interés" onClick={() => handleCalculateInterest(bill.id, bill)} />
                        <Button label="Actualizar" onClick={() => handleUpdate(bill.id)} />
                        <Button label="Eliminar" onClick={() => handleDelete(bill.id)} />
                        <Button label="Ver" onClick={() => handleView(bill)} />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Bill;



