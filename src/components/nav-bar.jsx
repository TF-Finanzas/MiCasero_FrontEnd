import './nav-bar.css'
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const NavBarComponent = () => {
    const navegar = useNavigate()

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => navegar('/home')
        },
        {
            label: 'Cliente',
            icon: 'pi pi-fw pi-users',
            command: () => navegar('/customer')
        },
        {
            label: 'Boleta',
            icon: 'pi pi-fw pi-receipt',
            command: () => navegar('/bill')
        },
        {
            label: 'Transferencias',
            icon: 'pi pi-fw pi-arrows-h',
            command: () => navegar('/transfer')
        }
    ]

    return (
        <div className='nav'>
            <Menubar model={items}  />
        </div>
    )
}

export default NavBarComponent