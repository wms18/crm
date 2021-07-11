import  React from 'react'
import './style.css';
import Menulayout from '../menulayout'
import ReceptionTop from '../../components/receptionTop';

function CustomerMgt () {

        return (
            <div className="customerMgt">
                    <ReceptionTop></ReceptionTop>
                    <Menulayout ></ Menulayout>
            </div>
        );


}

export default CustomerMgt;
