import React, { useState, useEffect } from 'react';
import APIService from '../../shared/services/api-service';
import NavBarComponent from '../../components/nav-bar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './transfer.css';

const Transfer = () => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
    });
    const [transfers, setTransfers] = useState([]);

    const bill = JSON.parse(localStorage.getItem('bill'));

    useEffect(() => {
        if (bill) {
            fetchTransfers(bill.id);
        }
    }, [bill]);

    const fetchTransfers = async (id) => {
        try {
            const response = await APIService.getTransfer(id);
            setTransfers(response.data);
        } catch (error) {
            console.error('Error fetching transfers:', error);
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
            amount: parseFloat(formData.amount),
            billId: bill.id
        };

        try {
            await APIService.postTransfer(data);
            setVisible(false);
            fetchTransfers(bill.id); // Refresh transfers after creating a new one
        } catch (error) {
            console.error('Error creating transfer:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await APIService.deleteTransfer(id);
            fetchTransfers(bill.id); // Refresh transfers after deleting one
        } catch (error) {
            console.error('Error deleting transfer:', error);
        }
    };

    const renderDeleteButton = (rowData) => {
        return <Button label="Eliminar" onClick={() => handleDelete(rowData.id)} />;
    };

    return (
        <div className="home">
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className='Body'>
                <div className='Header'>
                    <h1>Transferencias</h1>
                    <Button label="Crear Transferencia" onClick={() => setVisible(true)} />
                </div>
                <Dialog header="Crear Transferencia" visible={visible} onHide={() => setVisible(false)}>
                    <div className="p-fluid">
                        <div className="p-field">
                            <InputText name="name" placeholder="Operación" value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div className="p-field">
                            <InputText name="amount" placeholder="Monto" value={formData.amount} onChange={handleInputChange} />
                        </div>
                        <Button label="Crear" onClick={handleSubmit} />
                    </div>
                </Dialog>
                <DataTable value={transfers}>
                    <Column field="id" header="Id"></Column>
                    <Column field="name" header="Operación"></Column>
                    <Column field="startDate" header="Fecha"></Column>
                    <Column field="amount" header="Monto"></Column>
                    <Column header="Herramienta" body={renderDeleteButton}></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default Transfer;
