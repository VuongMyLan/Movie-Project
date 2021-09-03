import React from 'react';
import AdminTemplate from '../../components/Templates/AdminTemplate/AdminTemplate';
import UserForm from '../../components/Form/UserForm';

const AddUser = () => {
    return (
        <div>
            <AdminTemplate>
                <>
                    <div className='container'>
                        <div className='row changeFilm-container justify-content-center'>
                            <h1>Add User </h1>
                        </div>

                        <div className='row admin-change-film-form'>
                            <div className=' col-12'>
                                <UserForm isEdit={false} />
                            </div>
                        </div>
                    </div>
                </>
            </AdminTemplate>
        </div>
    );
};

export default AddUser;
